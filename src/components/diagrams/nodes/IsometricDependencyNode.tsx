import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { renderIsometricCube } from '../utils/isometricNodeRenderer';
import { motion } from 'motion/react';

export interface IsometricDependencyNodeData {
  label?: string;
  amount?: number;
  isHighlighted?: boolean;
  extendsBeyond?: boolean; // Indicates node extends beyond viewport
}

const IsometricDependencyNode: React.FC<NodeProps<IsometricDependencyNodeData>> = ({
  data,
  selected,
}) => {
  const {
    label = 'Dependencies',
    amount,
    isHighlighted = false,
    extendsBeyond = true,
  } = data || {};

  const color = '#10b981';
  const glowColor = '#34d399';

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isHighlighted ? 1.15 : 1,
          opacity: isHighlighted ? 1 : 0.85,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{
          filter: isHighlighted ? 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="-60 -60 120 120"
          className="drop-shadow-lg"
        >
          {renderIsometricCube({
            width: 80,
            height: 60,
            depth: 20,
            color,
            glowColor,
            opacity: 0.8,
            isHighlighted: isHighlighted || selected,
            label,
            amount,
            scale: 1,
          })}
        </svg>
        
        {/* Dotted line indicator for "beyond area" */}
        {extendsBeyond && (
          <line
            x1="40"
            y1="0"
            x2="60"
            y2="0"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="3,3"
            opacity="0.6"
            markerEnd="url(#arrowhead)"
          />
        )}
      </motion.div>
      
      {/* Handle for incoming connection */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: color,
          width: 12,
          height: 12,
          border: `2px solid ${color}`,
          borderRadius: '50%',
        }}
      />
      
      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3, 0 6"
            fill={color}
            opacity="0.6"
          />
        </marker>
      </defs>
    </div>
  );
};

export default IsometricDependencyNode;

