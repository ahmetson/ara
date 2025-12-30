/**
 * Isometric projection utilities for 2.5D visualization
 */

export interface IsometricPoint {
  x: number;
  y: number;
  z?: number; // Depth for scaling/opacity
}

export interface IsometricTransform {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

/**
 * Isometric projection constants
 * Standard isometric angle: 30 degrees
 */
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const COS_ISO = Math.cos(ISO_ANGLE);
const SIN_ISO = Math.sin(ISO_ANGLE);

/**
 * Convert 3D isometric coordinates to 2D screen coordinates
 * @param point 3D point in isometric space
 * @returns 2D screen coordinates
 */
export function isometricToScreen(point: IsometricPoint): { x: number; y: number } {
  const { x, y, z = 0 } = point;
  
  // Isometric projection: rotate around X and Y axes
  const screenX = (x - y) * COS_ISO;
  const screenY = (x + y) * SIN_ISO - z;
  
  return { x: screenX, y: screenY };
}

/**
 * Convert 2D grid coordinates to isometric 3D coordinates
 * @param gridX Grid X position
 * @param gridY Grid Y position
 * @param depth Z depth (0 = front, higher = back)
 * @returns Isometric 3D point
 */
export function gridToIsometric(
  gridX: number,
  gridY: number,
  depth: number = 0
): IsometricPoint {
  return {
    x: gridX,
    y: gridY,
    z: depth,
  };
}

/**
 * Calculate depth-based scaling
 * @param depth Z depth (0 = front, higher = back)
 * @param minScale Minimum scale at max depth (default 0.5)
 * @param maxDepth Maximum depth value (default 5)
 * @returns Scale factor (1.0 at front, minScale at back)
 */
export function getDepthScale(
  depth: number,
  minScale: number = 0.5,
  maxDepth: number = 5
): number {
  const normalizedDepth = Math.min(Math.max(depth / maxDepth, 0), 1);
  return 1 - normalizedDepth * (1 - minScale);
}

/**
 * Calculate depth-based opacity
 * @param depth Z depth (0 = front, higher = back)
 * @param minOpacity Minimum opacity at max depth (default 0.6)
 * @param maxDepth Maximum depth value (default 5)
 * @returns Opacity (1.0 at front, minOpacity at back)
 */
export function getDepthOpacity(
  depth: number,
  minOpacity: number = 0.6,
  maxDepth: number = 5
): number {
  const normalizedDepth = Math.min(Math.max(depth / maxDepth, 0), 1);
  return 1 - normalizedDepth * (1 - minOpacity);
}

/**
 * Get full isometric transform (position, scale, opacity)
 * @param gridX Grid X position
 * @param gridY Grid Y position
 * @param depth Z depth
 * @param gridSize Grid cell size in pixels
 * @returns Complete transform object
 */
export function getIsometricTransform(
  gridX: number,
  gridY: number,
  depth: number = 0,
  gridSize: number = 200
): IsometricTransform {
  const isoPoint = gridToIsometric(gridX, gridY, depth);
  const screen = isometricToScreen(isoPoint);
  
  return {
    x: screen.x * gridSize,
    y: screen.y * gridSize,
    scale: getDepthScale(depth),
    opacity: getDepthOpacity(depth),
  };
}

/**
 * Calculate node positions for the funding flow diagram
 * Layout: User (far) -> Ara -> Project B -> Project A -> Dependencies (beyond)
 */
export interface NodePositions {
  user: IsometricTransform;
  ara: IsometricTransform;
  projectB: IsometricTransform;
  projectA: IsometricTransform;
  projectC?: IsometricTransform;
  dependencies: IsometricTransform;
}

/**
 * Get standard node positions for the funding flow
 * @param centerX Center X coordinate
 * @param centerY Center Y coordinate
 * @param spacing Grid spacing multiplier
 * @returns Node positions
 */
export function getNodePositions(
  centerX: number = 0,
  centerY: number = 0,
  spacing: number = 1
): NodePositions {
  return {
    user: getIsometricTransform(centerX - 3 * spacing, centerY, 2, 150),
    ara: getIsometricTransform(centerX - 1.5 * spacing, centerY, 1, 150),
    projectB: getIsometricTransform(centerX, centerY, 0, 150),
    projectA: getIsometricTransform(centerX + 1.5 * spacing, centerY, 0, 150),
    dependencies: getIsometricTransform(centerX + 3 * spacing, centerY, 0, 150),
  };
}

/**
 * Calculate edge path for isometric connection
 * @param from Starting transform
 * @param to Ending transform
 * @returns SVG path string
 */
export function getIsometricEdgePath(
  from: IsometricTransform,
  to: IsometricTransform
): string {
  // Use smooth bezier curve for isometric flow
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Control points for smooth curve
  const cp1x = from.x + dx * 0.3;
  const cp1y = from.y;
  const cp2x = to.x - dx * 0.3;
  const cp2y = to.y;
  
  return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
}

