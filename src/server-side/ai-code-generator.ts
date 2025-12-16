export interface GeneratedPersonalization {
  code: string;
  uris: string[];
}

/**
 * Generate code and URIs from user prompt using AI
 * For now: Placeholder that returns example code
 * Later: Replace with actual Cursor API call
 */
export async function generateCode(params: {
  prompt: string;
  context: string;
  componentStructure: string[];
}): Promise<GeneratedPersonalization> {
  // TODO: Replace with actual Cursor API call
  // For now, return placeholder code based on prompt

  const { prompt, componentStructure } = params;

  // Simple placeholder logic - in production, this would call Cursor API
  // with the prompt, context, and component structure

  // Example: If prompt mentions zoom and percentages, generate zoom code
  if (prompt.toLowerCase().includes('zoom')) {
    const zoomMatch = prompt.match(/(\d+)%/);
    const defaultZoom = zoomMatch ? parseInt(zoomMatch[1]) : 50;

    // Check if prompt mentions specific project
    const araAppMatch = prompt.toLowerCase().includes('ara app') ||
      prompt.toLowerCase().includes("'ara app'") ||
      prompt.toLowerCase().includes('"ara app"');

    if (araAppMatch) {
      const araAppZoomMatch = prompt.match(/ara app.*?(\d+)%/i) ||
        prompt.match(/(\d+)%.*?ara app/i);
      const araAppZoom = araAppZoomMatch ? parseInt(araAppZoomMatch[1]) : 10;

      // Extract URIs from prompt - look for project mentions, page mentions, etc.
      const uris: string[] = [];
      if (prompt.toLowerCase().includes('project')) {
        uris.push('/project');
      }
      if (prompt.toLowerCase().includes('all-stars') || prompt.toLowerCase().includes('all stars')) {
        uris.push('/all-stars');
      }
      // If no specific pages mentioned, apply to current page
      if (uris.length === 0) {
        uris.push('/project');
        uris.push('/all-stars');
      }

      return {
        code: `
// Generated code for: ${prompt}
const currentUri = location.pathname + location.search;
const isAraAppProject = projectId === '693f178fe2790a79200798b3' || 
                        projectName === 'Ara App' ||
                        currentUri.includes('galaxy=693f178fe2790a79200798b3');

if (isAraAppProject) {
  setZoom(${araAppZoom});
} else {
  setZoom(${defaultZoom});
}
      `.trim(),
        uris,
      };
    }

    // Default: Set zoom to the specified percentage for the current page
    // Extract URIs from prompt
    const uris: string[] = [];
    if (prompt.toLowerCase().includes('project')) {
      uris.push('/project');
    }
    if (prompt.toLowerCase().includes('all-stars') || prompt.toLowerCase().includes('all stars')) {
      uris.push('/all-stars');
    }
    // If no specific pages mentioned, apply to current page
    if (uris.length === 0) {
      uris.push('/project');
      uris.push('/all-stars');
    }

    return {
      code: `
// Generated code for: ${prompt}
setZoom(${defaultZoom});
    `.trim(),
      uris,
    };
  }

  // Default placeholder - extract URIs from prompt
  const uris: string[] = [];
  if (prompt.toLowerCase().includes('project')) {
    uris.push('/project');
  }
  if (prompt.toLowerCase().includes('all-stars') || prompt.toLowerCase().includes('all stars')) {
    uris.push('/all-stars');
  }
  if (uris.length === 0) {
    uris.push('/project');
  }

  return {
    code: `
// Generated code for: ${prompt}
// TODO: Implement based on prompt
console.log('Personalization applied:', '${prompt}');
  `.trim(),
    uris,
  };
}
