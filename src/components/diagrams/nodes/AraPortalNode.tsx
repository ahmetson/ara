import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'motion/react';

export interface AraPortalNodeData {
  label?: string;
  amount?: number;
  isHighlighted?: boolean;
  isActive?: boolean; // When money is flowing through
}

const AraPortalNode: React.FC<NodeProps<AraPortalNodeData>> = ({
  data,
  selected,
}) => {
  const {
    label = 'Ara',
    amount,
    isHighlighted = false,
    isActive = false,
  } = (data || {}) as AraPortalNodeData;

  const color = '#3b82f6';
  const glowColor = '#60a5fa';
  const isPortalActive = isHighlighted || selected || isActive;

  // Isometric projection for vertical panel
  // Thin side (depth) touches ground, wide side (width) faces user, height visible on sides
  const ISO_ANGLE = Math.PI / 6; // 30 degrees
  const COS_ISO = Math.cos(ISO_ANGLE);
  const SIN_ISO = Math.sin(ISO_ANGLE);

  // Panel dimensions: vertical panel standing up
  // width = horizontal (left-right, faces user)
  // height = vertical (up-down, visible on sides)
  // depth = thin dimension (into screen, touches ground)
  const screenWidth = 80;  // Wide face visible to user
  const screenHeight = 60;  // Vertical dimension visible on sides
  const screenDepth = 15;   // Thin edge touching ground

  // Project to isometric view (oriented from top-right to bottom-left)
  const project = (x: number, y: number, z: number) => ({
    x: (y - x) * COS_ISO,  // Top-right to bottom-left orientation
    y: (x + y) * SIN_ISO - z,
  });

  // Front face corners (z=0, the face visible to user)
  // x: left-right (width), y: up-down (height)
  const frontTopLeft = { x: -screenWidth / 2, y: -screenHeight / 2, z: 0 };
  const frontTopRight = { x: screenWidth / 2, y: -screenHeight / 2, z: 0 };
  const frontBottomLeft = { x: -screenWidth / 2, y: screenHeight / 2, z: 0 };
  const frontBottomRight = { x: screenWidth / 2, y: screenHeight / 2, z: 0 };

  // Back face corners (z=-screenDepth, going into screen)
  const backTopLeft = { x: -screenWidth / 2, y: -screenHeight / 2, z: -screenDepth };
  const backTopRight = { x: screenWidth / 2, y: -screenHeight / 2, z: -screenDepth };
  const backBottomLeft = { x: -screenWidth / 2, y: screenHeight / 2, z: -screenDepth };
  const backBottomRight = { x: screenWidth / 2, y: screenHeight / 2, z: -screenDepth };

  // Front face (screen surface - wide face visible to user)
  const front1 = project(frontTopRight.x, frontTopRight.y, frontTopRight.z);
  const front2 = project(frontTopLeft.x, frontTopLeft.y, frontTopLeft.z);
  const front3 = project(frontBottomLeft.x, frontBottomLeft.y, frontBottomLeft.z);
  const front4 = project(frontBottomRight.x, frontBottomRight.y, frontBottomRight.z);

  // Back face (thin edge going into screen)
  const back1 = project(backTopRight.x, backTopRight.y, backTopRight.z);
  const back2 = project(backTopLeft.x, backTopLeft.y, backTopLeft.z);
  const back3 = project(backBottomLeft.x, backBottomLeft.y, backBottomLeft.z);
  const back4 = project(backBottomRight.x, backBottomRight.y, backBottomRight.z);

  // Right side edge (visible on the side)
  const right1 = project(frontTopRight.x, frontTopRight.y, frontTopRight.z);
  const right2 = project(frontBottomRight.x, frontBottomRight.y, frontBottomRight.z);
  const right3 = project(backBottomRight.x, backBottomRight.y, backBottomRight.z);
  const right4 = project(backTopRight.x, backTopRight.y, backTopRight.z);

  // Left side edge (visible on the side)
  const left1 = project(frontTopLeft.x, frontTopLeft.y, frontTopLeft.z);
  const left2 = project(frontBottomLeft.x, frontBottomLeft.y, frontBottomLeft.z);
  const left3 = project(backBottomLeft.x, backBottomLeft.y, backBottomLeft.z);
  const left4 = project(backTopLeft.x, backTopLeft.y, backTopLeft.z);

  const gradientId = `glass-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const glowId = `glass-glow-${Math.random().toString(36).substr(2, 9)}`;
  const reflectionId = `glass-reflection-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isPortalActive ? 1.08 : 1,
          opacity: isPortalActive ? 1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width="120"
          height="120"
          viewBox="-60 -60 120 120"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Glassy gradient */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={glowColor} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0.2" />
            </linearGradient>

            {/* Reflection gradient */}
            <linearGradient id={reflectionId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter */}
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow effect when active */}
          {isPortalActive && (
            <g filter={`url(#${glowId})`} opacity={0.4}>
              <polygon
                points={`${front1.x},${front1.y} ${front2.x},${front2.y} ${front3.x},${front3.y} ${front4.x},${front4.y}`}
                fill={glowColor}
                opacity={0.3}
              />
            </g>
          )}

          {/* Front face (screen surface - wide face visible to user) */}
          <polygon
            points={`${front1.x},${front1.y} ${front2.x},${front2.y} ${front3.x},${front3.y} ${front4.x},${front4.y}`}
            fill={`url(#${gradientId})`}
            stroke={color}
            strokeWidth={1.5}
            strokeOpacity={0.6}
            style={{
              filter: 'blur(0.5px)',
            }}
          >
            {isPortalActive && (
              <animate
                attributeName="opacity"
                values="0.6;0.9;0.6"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </polygon>

          {/* Reflection overlay */}
          <polygon
            points={`${front1.x},${front1.y} ${front2.x},${front2.y} ${front3.x},${front3.y} ${front4.x},${front4.y}`}
            fill={`url(#${reflectionId})`}
            opacity={0.5}
          />

          {/* Right side edge (height visible on the side) */}
          <polygon
            points={`${right1.x},${right1.y} ${right2.x},${right2.y} ${right3.x},${right3.y} ${right4.x},${right4.y}`}
            fill={color}
            fillOpacity={0.2}
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.4}
          />

          {/* Left side edge (height visible on the side) */}
          <polygon
            points={`${left1.x},${left1.y} ${left2.x},${left2.y} ${left3.x},${left3.y} ${left4.x},${left4.y}`}
            fill={color}
            fillOpacity={0.15}
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.3}
          />

          {/* Back face (thin edge going into screen) */}
          <polygon
            points={`${back1.x},${back1.y} ${back2.x},${back2.y} ${back3.x},${back3.y} ${back4.x},${back4.y}`}
            fill={color}
            fillOpacity={0.1}
            stroke={color}
            strokeWidth={0.5}
            strokeOpacity={0.2}
          />
        </svg>
      </motion.div>

      {/* Label */}
      {label && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {label}
          </span>
        </div>
      )}

      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: color,
          width: 11,
          height: 11,
          border: `2px solid ${color}`,
          borderRadius: '50%',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: color,
          width: 11,
          height: 11,
          border: `2px solid ${color}`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default AraPortalNode;
