import React, { useRef } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial } from 'three';
import { motion } from 'motion/react';

export interface HolographicUserNodeData {
  label?: string;
  amount?: number;
  isHighlighted?: boolean;
}

// Holographic shader material
const holographicVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const holographicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    // Scan line effect
    float scanLine = sin(vUv.y * 20.0 + uTime * 2.0) * 0.5 + 0.5;
    scanLine = pow(scanLine, 3.0);
    
    // Edge glow
    float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    edge = pow(edge, 2.0);
    
    // Holographic color shift
    vec3 color = uColor;
    color.r += sin(uTime + vPosition.x) * 0.2;
    color.b += cos(uTime + vPosition.y) * 0.2;
    
    // Combine effects
    vec3 finalColor = color * (0.7 + scanLine * 0.3) + edge * uColor * 2.0;
    float alpha = uOpacity * (0.6 + edge * 0.4);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function HolographicUserModel({ isHighlighted }: { isHighlighted: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const headMaterialRef = useRef<ShaderMaterial>(null);
  const bodyMaterialRef = useRef<ShaderMaterial>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
    timeRef.current = state.clock.elapsedTime;
    const opacity = isHighlighted ? 0.9 : 0.7;
    
    if (headMaterialRef.current) {
      headMaterialRef.current.uniforms.uTime.value = timeRef.current;
      headMaterialRef.current.uniforms.uOpacity.value = opacity;
    }
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.uniforms.uTime.value = timeRef.current;
      bodyMaterialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  return (
    <group>
      {/* Head */}
      <mesh ref={meshRef} position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <shaderMaterial
          ref={headMaterialRef}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: [0.39, 0.42, 0.95] }, // #6366f1
            uOpacity: { value: 0.7 },
          }}
          transparent
          side={2} // DoubleSide
        />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.15]} />
        <shaderMaterial
          ref={bodyMaterialRef}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: [0.39, 0.42, 0.95] },
            uOpacity: { value: 0.7 },
          }}
          transparent
          side={2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={[0, 0, 0]} scale={isHighlighted ? 1.3 : 1.1}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={isHighlighted ? 0.2 : 0.1}
        />
      </mesh>
    </group>
  );
}

const HolographicUserNode: React.FC<NodeProps<HolographicUserNodeData>> = ({
  data,
  selected,
}) => {
  const {
    label = 'User',
    amount,
    isHighlighted = false,
  } = data || {};

  const color = '#6366f1';
  const isActive = isHighlighted || selected;

  return (
    <div className="relative">
      <motion.div
        animate={{
          scale: isActive ? 1.05 : 0.9,
          opacity: isActive ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="w-[120px] h-[120px]">
          <Canvas
            camera={{ position: [0, 0, 1.5], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={1} />
            <HolographicUserModel isHighlighted={isActive} />
          </Canvas>
        </div>
        
        {/* Label */}
        {label && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {label}
            </span>
          </div>
        )}
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

export default HolographicUserNode;

