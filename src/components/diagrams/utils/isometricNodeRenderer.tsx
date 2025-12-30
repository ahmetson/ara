/**
 * SVG rendering utilities for isometric nodes
 */

import React from 'react';

export interface IsometricCubeProps {
  width: number;
  height: number;
  depth: number;
  color: string;
  glowColor?: string;
  opacity?: number;
  isHighlighted?: boolean;
  label?: string;
  amount?: number;
  scale?: number;
}

/**
 * Render an isometric cube/box in SVG
 */
export function renderIsometricCube({
  width,
  height,
  depth,
  color,
  glowColor,
  opacity = 1,
  isHighlighted = false,
  label,
  amount,
  scale = 1,
}: IsometricCubeProps): JSX.Element {
  const w = width * scale;
  const h = height * scale;
  const d = depth * scale;
  
  // Isometric projection constants
  const ISO_ANGLE = Math.PI / 6; // 30 degrees
  const COS_ISO = Math.cos(ISO_ANGLE);
  const SIN_ISO = Math.sin(ISO_ANGLE);
  
  // Calculate isometric coordinates
  const topLeft = { x: -w / 2, y: -h / 2 };
  const topRight = { x: w / 2, y: -h / 2 };
  const bottomLeft = { x: -w / 2, y: h / 2 };
  const bottomRight = { x: w / 2, y: h / 2 };
  
  // Project to isometric view
  const project = (x: number, y: number, z: number) => ({
    x: (x - y) * COS_ISO,
    y: (x + y) * SIN_ISO - z,
  });
  
  // Top face (z = 0)
  const top1 = project(topLeft.x, topLeft.y, 0);
  const top2 = project(topRight.x, topRight.y, 0);
  const top3 = project(bottomRight.x, bottomRight.y, 0);
  const top4 = project(bottomLeft.x, bottomLeft.y, 0);
  
  // Bottom face (z = -d)
  const bot1 = project(topLeft.x, topLeft.y, -d);
  const bot2 = project(topRight.x, topRight.y, -d);
  const bot3 = project(bottomRight.x, bottomRight.y, -d);
  const bot4 = project(bottomLeft.x, bottomLeft.y, -d);
  
  // Create gradient ID
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const glowId = `glow-${Math.random().toString(36).substr(2, 9)}`;
  
  const highlightIntensity = isHighlighted ? 1.5 : 1;
  const glowOpacity = isHighlighted ? 0.6 : 0.3;
  
  return (
    <g opacity={opacity}>
      <defs>
        {/* Holographic gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.9 * highlightIntensity} />
          <stop offset="50%" stopColor={color} stopOpacity={0.7 * highlightIntensity} />
          <stop offset="100%" stopColor={glowColor || color} stopOpacity={0.5 * highlightIntensity} />
        </linearGradient>
        
        {/* Enhanced glow filter with multiple layers */}
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feGaussianBlur stdDeviation="2" result="coloredBlur2" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Scan line pattern for holographic effect */}
        <pattern id={`scan-${gradientId}`} x="0" y="0" width="100%" height="4" patternUnits="userSpaceOnUse">
          <rect width="100%" height="2" fill={color} opacity="0.3" />
        </pattern>
      </defs>
      
      {/* Glow effect */}
      {isHighlighted && (
        <g filter={`url(#${glowId})`} opacity={glowOpacity}>
          <polygon
            points={`${top1.x},${top1.y} ${top2.x},${top2.y} ${top3.x},${top3.y} ${top4.x},${top4.y}`}
            fill={glowColor || color}
            opacity={0.4}
          />
        </g>
      )}
      
      {/* Top face with holographic pattern */}
      <polygon
        points={`${top1.x},${top1.y} ${top2.x},${top2.y} ${top3.x},${top3.y} ${top4.x},${top4.y}`}
        fill={`url(#${gradientId})`}
        stroke={color}
        strokeWidth={isHighlighted ? 3 : 1.5}
        strokeOpacity={0.8}
      >
        {isHighlighted && (
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </polygon>
      
      {/* Right face */}
      <polygon
        points={`${top2.x},${top2.y} ${bot2.x},${bot2.y} ${bot3.x},${bot3.y} ${top3.x},${top3.y}`}
        fill={color}
        fillOpacity={0.6 * highlightIntensity}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      
      {/* Left face */}
      <polygon
        points={`${top1.x},${top1.y} ${top4.x},${top4.y} ${bot4.x},${bot4.y} ${bot1.x},${bot1.y}`}
        fill={color}
        fillOpacity={0.4 * highlightIntensity}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      
      {/* Label */}
      {label && (
        <text
          x={0}
          y={top1.y - 10}
          textAnchor="middle"
          fill="currentColor"
          fontSize="12"
          fontWeight="bold"
          className="fill-slate-800 dark:fill-slate-200"
        >
          {label}
        </text>
      )}
      
      {/* Amount display */}
      {amount !== undefined && (
        <text
          x={0}
          y={top3.y + 15}
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="600"
          className="fill-green-600 dark:fill-green-400"
        >
          ${amount.toLocaleString()}
        </text>
      )}
    </g>
  );
}

/**
 * Render a connection line with animated particles
 */
export interface ConnectionLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  animated?: boolean;
  amount?: number;
  progress?: number; // 0 to 1
}

export function renderConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  color,
  animated = false,
  amount,
  progress = 0,
}: ConnectionLineProps): React.ReactElement {
  const dx = toX - fromX;
  const dy = toY - fromY;
  
  // Control points for smooth bezier curve
  const cp1x = fromX + dx * 0.3;
  const cp1y = fromY;
  const cp2x = toX - dx * 0.3;
  const cp2y = toY;
  
  const path = `M ${fromX} ${fromY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${toX} ${toY}`;
  
  // Calculate particle position along path
  const particleX = fromX + (toX - fromX) * progress;
  const particleY = fromY + (toY - fromY) * progress;
  
  return (
    <g>
      {/* Base path */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeOpacity={0.3}
        strokeDasharray={animated ? "5,5" : "none"}
      />
      
      {/* Animated particle */}
      {animated && progress > 0 && progress < 1 && (
        <circle
          cx={particleX}
          cy={particleY}
          r={4}
          fill={color}
          opacity={0.8}
        >
          <animate
            attributeName="r"
            values="3;6;3"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      
      {/* Amount label */}
      {amount !== undefined && progress > 0.1 && progress < 0.9 && (
        <text
          x={particleX}
          y={particleY - 10}
          textAnchor="middle"
          fill={color}
          fontSize="10"
          fontWeight="600"
          className="fill-current"
        >
          ${amount.toLocaleString()}
        </text>
      )}
    </g>
  );
}

