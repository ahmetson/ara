import React, { useMemo, useRef, useEffect, useState } from 'react';
import { EdgeProps, getSmoothStepPath } from '@xyflow/react';
import { motion } from 'motion/react';

interface AnimatedMoneyEdgeData {
  amount?: number;
  progress?: number; // 0 to 1
  color?: string;
}

const AnimatedMoneyEdge: React.FC<EdgeProps<AnimatedMoneyEdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const { amount, progress = 0, color = '#3b82f6' } = data || {};
  const pathRef = useRef<SVGPathElement>(null);
  const [moneyPosition, setMoneyPosition] = useState({ x: sourceX, y: sourceY });

  // Calculate the edge path using React Flow's utility
  const [edgePath] = useMemo(() => {
    return getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  }, [sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition]);

  // Calculate position along path based on progress using SVG getPointAtLength
  useEffect(() => {
    const updatePosition = () => {
      if (!pathRef.current) {
        // Fallback to linear interpolation if path not ready
        const x = sourceX + (targetX - sourceX) * Math.max(0, Math.min(1, progress));
        const y = sourceY + (targetY - sourceY) * Math.max(0, Math.min(1, progress));
        setMoneyPosition({ x, y });
        return;
      }
      
      try {
        if (progress > 0 && progress < 1) {
          const pathLength = pathRef.current.getTotalLength();
          if (pathLength > 0) {
            const point = pathRef.current.getPointAtLength(pathLength * progress);
            setMoneyPosition({ x: point.x, y: point.y });
          } else {
            // Fallback if path length is 0
            const x = sourceX + (targetX - sourceX) * Math.max(0, Math.min(1, progress));
            const y = sourceY + (targetY - sourceY) * Math.max(0, Math.min(1, progress));
            setMoneyPosition({ x, y });
          }
        } else if (progress <= 0) {
          setMoneyPosition({ x: sourceX, y: sourceY });
        } else if (progress >= 1) {
          setMoneyPosition({ x: targetX, y: targetY });
        }
      } catch (error) {
        // Fallback to linear interpolation if path calculation fails
        const x = sourceX + (targetX - sourceX) * Math.max(0, Math.min(1, progress));
        const y = sourceY + (targetY - sourceY) * Math.max(0, Math.min(1, progress));
        setMoneyPosition({ x, y });
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    return () => cancelAnimationFrame(rafId);
  }, [progress, sourceX, sourceY, targetX, targetY, edgePath]);

  return (
    <>
      {/* Base edge path (hidden, used for path calculation) */}
      <path
        ref={pathRef}
        id={id}
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Visible edge path */}
      <path
        id={`${id}-visible`}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      {/* Animated money icon/number */}
      {amount !== undefined && progress > 0 && progress <= 1 && (
        <g style={{ pointerEvents: 'none' }}>
          {/* Glowing circle background */}
          <circle
            cx={moneyPosition.x}
            cy={moneyPosition.y}
            r={16}
            fill={color}
            opacity={0.3}
          >
            <animate
              attributeName="r"
              values="14;18;14"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.4;0.2"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Money icon circle */}
          <circle
            cx={moneyPosition.x}
            cy={moneyPosition.y}
            r={14}
            fill={color}
            opacity={0.95}
          >
            <animate
              attributeName="r"
              values="12;15;12"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Dollar sign icon */}
          <text
            x={moneyPosition.x}
            y={moneyPosition.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            style={{ 
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            $
          </text>
          
          {/* Amount label following the icon */}
          <text
            x={moneyPosition.x}
            y={moneyPosition.y - 22}
            textAnchor="middle"
            fill={color}
            fontSize="12"
            fontWeight="700"
            style={{ 
              pointerEvents: 'none',
              userSelect: 'none',
              textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.3)',
            }}
          >
            ${amount.toLocaleString()}
          </text>
        </g>
      )}
    </>
  );
};

export default AnimatedMoneyEdge;

