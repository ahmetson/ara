import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { renderIsometricCube } from '../utils/isometricNodeRenderer';
import { motion } from 'motion/react';

export interface IsometricProjectNodeData {
  label: string;
  amount?: number;
  isHighlighted?: boolean;
  isReceiving?: boolean;
  color?: string;
  glowColor?: string;
}

const IsometricProjectNode: React.FC<NodeProps<IsometricProjectNodeData>> = ({
  data,
  selected,
}) => {
  const {
    label,
    amount,
    isHighlighted = false,
    isReceiving = false,
    color = '#8b5cf6',
    glowColor = '#a78bfa',
  } = data || {};

  const nodeColor = selected || isHighlighted ? glowColor : color;
  const nodeGlow = selected || isHighlighted ? glowColor : undefined;

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isHighlighted ? 1.15 : 1,
          opacity: isReceiving ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{
          filter: isHighlighted ? 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
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
            color: nodeColor,
            glowColor: nodeGlow,
            opacity: 1,
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
          background: nodeColor,
          width: 12,
          height: 12,
          border: `2px solid ${nodeColor}`,
          borderRadius: '50%',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: nodeColor,
          width: 12,
          height: 12,
          border: `2px solid ${nodeColor}`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default IsometricProjectNode;

