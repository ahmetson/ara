'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

type GradientBackgroundProps = HTMLMotionProps<'div'>;

function GradientBackground({
  className,
  transition = { duration: 15, ease: 'easeInOut', repeat: Infinity },
  ...props
}: GradientBackgroundProps) {
  return (
    <motion.div
      data-slot="gradient-background"
      className={cn(
        // Light theme: light grayish colors
        'size-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300',
        // Dark theme: cosmic universe colors (deep purples, blues, dark colors)
        'dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950',
        'bg-[length:400%_400%]',
        className,
      )}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={transition}
      {...props}
    />
  );
}

export { GradientBackground, type GradientBackgroundProps };
