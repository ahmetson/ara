import React from 'react';
import { motion } from 'motion/react';
import MermaidDiagram from './MermaidDiagram';

interface DependencyFlowDiagramProps {
  className?: string;
}

const DependencyFlowDiagram: React.FC<DependencyFlowDiagramProps> = ({
  className = '',
}) => {
  const mermaidDefinition = `
    graph TD
      A["Project A<br/>(library)"] 
      B["Project B<br/>(app)"]
      Funding["Funding on Ara"]
      
      B -->|dependency| A
      Funding -->|"part of funding<br/>flows upstream"| A
      Funding --> B
      
      style A fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
      style B fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
      style Funding fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`dependency-flow-diagram ${className}`}
    >
      <MermaidDiagram definition={mermaidDefinition} />
    </motion.div>
  );
};

export default DependencyFlowDiagram;

