import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  definition: string;
  className?: string;
  id?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  definition,
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const diagramId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#3b82f6',
        lineColor: '#64748b',
        secondaryColor: '#e2e8f0',
        tertiaryColor: '#f1f5f9',
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    });

    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Clear previous content
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Render the diagram
        const { svg } = await mermaid.render(diagramId.current, definition);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [definition]);

  // Update theme when dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (containerRef.current && definition) {
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#3b82f6',
            lineColor: '#64748b',
            secondaryColor: '#e2e8f0',
            tertiaryColor: '#f1f5f9',
          },
        });
        
        const renderDiagram = async () => {
          try {
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
              const { svg } = await mermaid.render(diagramId.current, definition);
              if (containerRef.current) {
                containerRef.current.innerHTML = svg;
              }
            }
          } catch (err) {
            console.error('Mermaid re-render error:', err);
          }
        };
        
        renderDiagram();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [definition]);

  if (error) {
    return (
      <div className={`text-red-500 text-sm p-4 ${className}`}>
        Error rendering diagram: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram ${className} ${isLoading ? 'opacity-50' : ''}`}
      id={id}
      aria-label="Mermaid diagram"
    />
  );
};

export default MermaidDiagram;

