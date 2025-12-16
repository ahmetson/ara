import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Cache for the context (built once, reused for all requests)
let cachedContext: string | null = null;

/**
 * Get the project root directory
 */
function getProjectRoot(): string {
  // Try process.cwd() first (works in most cases)
  const cwd = process.cwd();
  if (existsSync(join(cwd, 'package.json'))) {
    return cwd;
  }

  // Fallback: calculate from current file location
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);

  // Try going up from src/server-side to project root
  let root = join(currentDir, '../../..');
  if (existsSync(join(root, 'package.json'))) {
    return root;
  }

  // Try one more level up
  root = join(currentDir, '../../../..');
  if (existsSync(join(root, 'package.json'))) {
    return root;
  }

  // Last resort: use current directory
  console.warn('Could not find project root, using current directory');
  return cwd;
}

/**
 * Read a file from the project
 */
function readProjectFile(relativePath: string): string {
  try {
    const projectRoot = getProjectRoot();
    const filePath = join(projectRoot, relativePath);
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${relativePath}:`, error);
    return `// Error reading file: ${relativePath}`;
  }
}

/**
 * Build the context documentation describing execution environment
 */
function buildExecutionContextDocs(): string {
  return `
## Available Execution Context

When generating code, you have access to the following in the execution context:

### State Variables (read/write via setters)
- \`zoom\` (number): Current zoom level (typically 25-100)
- \`showDialog\` (boolean): Whether navigation dialog is shown
- \`virtualScreenSize\` (object): \`{ width: number, height: number }\` - Virtual screen dimensions
- \`isAllStarsPage\` (boolean): Whether currently on the all-stars page

### State Setters
- \`setZoom(zoom: number)\`: Set the zoom level
- \`setShowDialog(show: boolean)\`: Show/hide navigation dialog
- \`setVirtualScreenSize(size: { width: number, height: number })\`: Set virtual screen size
- \`setIsAllStarsPage(isAllStars: boolean)\`: Set all-stars page state

### Props (read-only)
- \`projectId\` (string | undefined): Current project ID
- \`projectName\` (string | undefined): Current project name
- \`initialZoom\` (number): Initial zoom value (default: 100)
- \`minZoom\` (number): Minimum zoom value (default: 25)
- \`maxZoom\` (number): Maximum zoom value (default: 100)
- \`maxGalaxyContent\` (number): Maximum galaxy content scale (default: 100)

### Refs (read-only access)
- \`hasShownDialogRef\`: Ref tracking if dialog has been shown
- \`previousZoomRef\`: Ref storing previous zoom value
- \`scrollPositionRef\`: Ref storing scroll position \`{ x: number, y: number }\`
- \`isZoomingRef\`: Ref tracking if zooming is in progress

### Utilities
- \`window\`: Browser window object
- \`location\`: Browser location object (window.location)

## Code Generation Guidelines

1. **Code Execution**: Generated code will be executed using:
   \`\`\`javascript
   const func = new Function(...Object.keys(context), code);
   func(...Object.values(context));
   \`\`\`
   This means your code has direct access to all the variables listed above.

2. **Code Format**: 
   - Must be valid JavaScript
   - Should NOT include function wrapper or return statements
   - Should directly manipulate state using setters
   - Can use conditionals, loops, and all JavaScript features
   - **CRITICAL: DO NOT declare variables with names that already exist in the context** (e.g., do NOT use \`const initialZoom = ...\` because \`initialZoom\` is already available as a prop)
   - If you need a new variable, use a different name (e.g., \`const calculatedZoom = ...\` instead of \`const initialZoom = ...\`)

3. **URI Extraction**:
   - Extract URIs from the user's prompt
   - Common URIs: \`/project\`, \`/all-stars\`
   - If prompt mentions specific pages, include those URIs
   - If no specific pages mentioned, default to \`['/project', '/all-stars']\`

4. **Examples**:
   - To set zoom: \`setZoom(50);\`
   - To check project: \`if (projectId === 'some-id') { setZoom(10); }\`
   - To check URI: \`if (location.pathname.includes('/all-stars')) { setZoom(75); }\`
   - To calculate a value: \`const calculatedValue = someCalculation(); setZoom(calculatedValue);\` (use unique variable names)
   - **WRONG**: \`const initialZoom = 50; setZoom(initialZoom);\` (conflicts with existing prop)
   - **CORRECT**: \`const zoomValue = 50; setZoom(zoomValue);\` (uses unique name)
`;
}

/**
 * Build the complete context string (brief version)
 */
function buildContext(): string {
  // Build brief context document without full component code
  const context = `# GalaxyLayoutBody Component - Brief Context

This document provides essential information for generating personalization code for the GalaxyLayoutBody React component.

## Component Overview

**GalaxyLayoutBody** is a React component that:
- Manages zoom level (25-100 range)
- Controls virtual screen size (width/height)
- Shows/hides navigation dialog
- Executes user-generated personalization code
- Supports test mode for previewing changes

**Related Components** (for reference only):
- **GalaxyZoomControls**: Zoom in/out buttons and slider
- **GalacticMeasurements**: Displays width/height measurements
- **GalaxyNavigationDialog**: Dialog shown when zooming out too far
- **AllStarsLink**: Navigation link to all-stars page

${buildExecutionContextDocs()}
`;

  return context;
}

/**
 * Get cached context, building it if not already cached
 */
export function getCachedContext(): string {
  if (!cachedContext) {
    console.log('Building brief context for LLM API (this happens once per server restart)');
    cachedContext = buildContext();
    console.log(`Brief context built successfully (${cachedContext.length} characters, ~${Math.ceil(cachedContext.length / 4)} tokens)`);
  }
  return cachedContext;
}
