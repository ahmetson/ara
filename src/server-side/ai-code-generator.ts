import Anthropic from '@anthropic-ai/sdk';
import { getCachedContext } from './ai-context-builder';

export interface GeneratedPersonalization {
  code: string;
  uris: string[];
}

/**
 * Extract code from Claude response (handles markdown code blocks)
 */
function extractCodeFromResponse(text: string): string {
  // Try to extract from markdown code blocks
  const codeBlockRegex = /```(?:javascript|js|typescript|ts)?\n?([\s\S]*?)```/;
  const match = text.match(codeBlockRegex);
  if (match && match[1]) {
    return match[1].trim();
  }

  // If no code block, try to find code between markers
  const codeStart = text.indexOf('```');
  if (codeStart !== -1) {
    const codeEnd = text.indexOf('```', codeStart + 3);
    if (codeEnd !== -1) {
      return text.substring(codeStart + 3, codeEnd).trim();
    }
  }

  // Fallback: return the text as-is (might be plain code)
  return text.trim();
}

/**
 * Extract URIs from Claude response
 */
function extractUrisFromResponse(text: string, prompt: string): string[] {
  // Try to find JSON array of URIs
  const jsonArrayRegex = /\["([^"]+)"(?:\s*,\s*"([^"]+)")*\]/;
  const jsonMatch = text.match(jsonArrayRegex);
  if (jsonMatch) {
    const uris: string[] = [];
    for (let i = 1; i < jsonMatch.length; i++) {
      if (jsonMatch[i]) {
        uris.push(jsonMatch[i]);
      }
    }
    if (uris.length > 0) {
      return uris;
    }
  }

  // Try to find URIs list format: "URIs: /project, /all-stars"
  const urisListRegex = /(?:URIs?|uris?|applies? to):\s*([^\n]+)/i;
  const listMatch = text.match(urisListRegex);
  if (listMatch && listMatch[1]) {
    const uris = listMatch[1]
      .split(',')
      .map(uri => uri.trim())
      .filter(uri => uri.startsWith('/'));
    if (uris.length > 0) {
      return uris;
    }
  }

  // Fallback: extract from prompt
  const uris: string[] = [];
  if (prompt.toLowerCase().includes('project')) {
    uris.push('/project');
  }
  if (prompt.toLowerCase().includes('all-stars') || prompt.toLowerCase().includes('all stars')) {
    uris.push('/all-stars');
  }
  if (uris.length === 0) {
    uris.push('/project');
    uris.push('/all-stars');
  }

  return uris;
}

/**
 * Fallback placeholder logic (used when API fails)
 */
function generatePlaceholderCode(prompt: string): GeneratedPersonalization {
  const uris: string[] = [];
  if (prompt.toLowerCase().includes('project')) {
    uris.push('/project');
  }
  if (prompt.toLowerCase().includes('all-stars') || prompt.toLowerCase().includes('all stars')) {
    uris.push('/all-stars');
  }
  if (uris.length === 0) {
    uris.push('/project');
    uris.push('/all-stars');
  }

  // Simple zoom detection
  if (prompt.toLowerCase().includes('zoom')) {
    const zoomMatch = prompt.match(/(\d+)%/);
    const defaultZoom = zoomMatch ? parseInt(zoomMatch[1]) : 50;
    return {
      code: `setZoom(${defaultZoom});`,
      uris,
    };
  }

  return {
    code: `// Generated code for: ${prompt}\n// TODO: Implement based on prompt\nconsole.log('Personalization applied:', '${prompt}');`,
    uris,
  };
}

/**
 * Generate code and URIs from user prompt using Claude API
 */
export async function generateCode(params: {
  prompt: string;
  context: string;
  componentStructure: string[];
}): Promise<GeneratedPersonalization> {
  const { prompt, componentStructure } = params;

  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('ANTHROPIC_API_KEY not set, using placeholder logic');
    return generatePlaceholderCode(prompt);
  }

  try {
    // Initialize Claude client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Get cached context (built once, reused for all requests)
    const cachedContext = getCachedContext();

    // Construct the user message
    const userMessage = `${cachedContext}

---

## User Request

${prompt}

## Task

Generate JavaScript code that personalizes the GalaxyLayoutBody component based on the user's request above. 

**Requirements:**
1. Generate valid JavaScript code that can be executed in the component's execution context
2. The code should directly manipulate state using the available setters (e.g., setZoom, setShowDialog, etc.)
3. Extract or infer URIs from the prompt that indicate where this personalization should apply
4. Return the code in a markdown code block (\`\`\`javascript)
5. List the URIs either as a JSON array or in the format "URIs: /path1, /path2"

**Response Format:**
\`\`\`javascript
// Your generated code here
\`\`\`

URIs: /project, /all-stars
`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      system: `You are a code generator for React component personalization. You generate JavaScript code that personalizes UI components based on user requests. The code you generate will be executed in a controlled environment with access to specific state variables and setters. Always generate valid, executable JavaScript code.`,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    // Extract text from response
    const responseText = response.content
      .filter((block: any): block is { type: 'text'; text: string } => block.type === 'text')
      .map((block: { type: 'text'; text: string }) => block.text)
      .join('\n');

    if (!responseText) {
      console.error('Empty response from Claude API');
      return generatePlaceholderCode(prompt);
    }

    // Extract code and URIs
    const code = extractCodeFromResponse(responseText);
    const uris = extractUrisFromResponse(responseText, prompt);

    if (!code || code.length === 0) {
      console.error('No code extracted from Claude response');
      return generatePlaceholderCode(prompt);
    }

    console.log('Successfully generated code from Claude API:', {
      codeLength: code.length,
      urisCount: uris.length,
      uris,
    });

    return {
      code: code.trim(),
      uris,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    // Fallback to placeholder logic
    return generatePlaceholderCode(prompt);
  }
}
