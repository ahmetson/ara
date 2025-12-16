import React, { useEffect, useState } from 'react';
import GradientText from './GradientText';

export default function AraGradientText({ className = '' }: { className?: string }) {
  const [colors, setColors] = useState(['#4a90e2', '#7dd3c0', '#4a90e2']);

  useEffect(() => {
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      // Light mode: cascade-blue to cascade-green (original cascade colors)
      // Dark mode: brighter versions for better visibility
      setColors(
        isDark
          ? ['#5ba0f2', '#8de3d3', '#5ba0f2'] // Brighter for dark mode
          : ['#4a90e2', '#7dd3c0', '#4a90e2'] // Original cascade colors
      );
    };

    // Initial check
    updateColors();

    // Watch for theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <GradientText colors={colors} animationSpeed={8} className={className}>
      Ara
    </GradientText>
  );
}

