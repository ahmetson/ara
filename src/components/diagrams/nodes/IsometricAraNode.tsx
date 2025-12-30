import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { renderIsometricCube } from '../utils/isometricNodeRenderer';
import { motion } from 'motion/react';

export interface IsometricAraNodeData {
  label?: string;
  amount?: number;
  isHighlighted?: boolean;
}

const IsometricAraNode: React.FC<NodeProps<IsometricAraNodeData>> = ({
  data,
  selected,
}) => {
  const {
    label = 'Ara',
    amount,
    isHighlighted = false,
  } = data || {};

  // Ara branding colors (blue theme)
  const color = '#3b82f6';
  const glowColor = '#60a5fa';

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isHighlighted ? 1.08 : 1,
          opacity: isHighlighted ? 1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width="110"
          height="110"
          viewBox="-55 -55 110 110"
          className="drop-shadow-lg"
        >
          {renderIsometricCube({
            width: 70,
            height: 55,
            depth: 18,
            color,
            glowColor,
            opacity: 0.9,
            isHighlighted: isHighlighted || selected,
            label,
            amount,
            scale: 1,
          })}
        </svg>
      </motion.div>
      
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

export default IsometricAraNode;

