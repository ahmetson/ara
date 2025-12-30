import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { renderIsometricCube } from '../utils/isometricNodeRenderer';
import { motion } from 'motion/react';

export interface IsometricUserNodeData {
  label?: string;
  amount?: number;
  isHighlighted?: boolean;
}

const IsometricUserNode: React.FC<NodeProps<IsometricUserNodeData>> = ({
  data,
  selected,
}) => {
  const {
    label = 'User',
    amount,
    isHighlighted = false,
  } = data || {};

  // User node is smaller and more transparent (far position)
  const color = '#6366f1';
  const glowColor = '#818cf8';

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isHighlighted ? 1.05 : 0.85, // Smaller scale for depth
          opacity: isHighlighted ? 0.95 : 0.7, // More transparent for depth
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width="100"
          height="100"
          viewBox="-50 -50 100 100"
          className="drop-shadow-md"
        >
          {renderIsometricCube({
            width: 60,
            height: 50,
            depth: 15,
            color,
            glowColor,
            opacity: 0.7,
            isHighlighted: isHighlighted || selected,
            label,
            amount,
            scale: 0.85,
          })}
        </svg>
      </motion.div>
      
      {/* Handle for outgoing connection */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: color,
          width: 10,
          height: 10,
          border: `2px solid ${color}`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default IsometricUserNode;

