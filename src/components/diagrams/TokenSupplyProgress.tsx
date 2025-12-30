import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import NumberFlow from '@number-flow/react';

interface TokenSupplyProgressProps {
  className?: string;
}

const TokenSupplyProgress: React.FC<TokenSupplyProgressProps> = ({
  className = '',
}) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFullyMinted, setShowFullyMinted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const animationRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowFullyMinted(false);
    setProgress(0);

    const startTime = Date.now();
    const duration = 10000; // 10 seconds

    // Easing function for smooth animation (ease-in-out)
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(rawProgress);
      const newProgress = easedProgress * 100;
      
      setProgress(newProgress);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Set to 100% and start countdown
        setProgress(100);
        setShowFullyMinted(true);
        setIsAnimating(false);
        
        // Start countdown from 5 seconds
        setCountdown(5);
        let remaining = 5;
        
        countdownIntervalRef.current = setInterval(() => {
          remaining -= 1;
          setCountdown(remaining);
          
          if (remaining <= 0) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
            }
            // Reset to 0 after countdown
            resetToZero();
            startAnimation(); // Restart animation
          }
        }, 1000);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const resetToZero = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    setIsAnimating(false);
    setShowFullyMinted(false);
    setProgress(0);
    setCountdown(5);
  };

  const setToHundred = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    setIsAnimating(false);
    setProgress(100);
    setShowFullyMinted(true);
    
    // Start countdown from 5 seconds
    setCountdown(5);
    let remaining = 5;
    
    countdownIntervalRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      
      if (remaining <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
        }
        // Reset to 0 after countdown
        resetToZero();
        startAnimation(); // Restart animation
      }
    }, 1000);
  };

  useEffect(() => {
    // Auto-start animation on mount
    startAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const isFullyMinted = progress >= 100 && showFullyMinted;
  const isAtHundred = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`token-supply-progress ${className} space-y-6`}
    >
      {/* Progress Bar with Controls */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Token supply minted
          </span>
          {isAtHundred && (
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              Supply minted
            </span>
          )}
        </div>

        {/* Progress Bar with Buttons */}
        <div className="relative w-full flex items-center gap-2">
          {/* Reset to 0 Button */}
          <button
            onClick={resetToZero}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors flex-shrink-0"
          >
            Reset to 0
          </button>

          {/* Progress Bar */}
          <div className="relative flex-1 h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`absolute top-0 left-0 h-full transition-colors duration-300 ${
                isAtHundred
                  ? 'bg-green-500 dark:bg-green-400'
                  : 'bg-yellow-500 dark:bg-yellow-400'
              }`}
              style={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.05,
                ease: 'linear',
              }}
            />
            {/* Progress text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Set to 100 Button */}
          <button
            onClick={setToHundred}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors flex-shrink-0 min-w-[100px]"
          >
            {isAtHundred ? (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <NumberFlow
                  value={countdown}
                  locales="en-US"
                  format={{ style: 'decimal', maximumFractionDigits: 0 }}
                  className="text-xs font-semibold"
                />
                <span>s to reset</span>
              </span>
            ) : (
              'Set to 100'
            )}
          </button>
        </div>
      </div>

      {/* Token Supply Cards - Show based on progress */}
      <div className="mt-4">
        {!isFullyMinted ? (
          // Not Fully Minted Card
          <div className="backdrop-blur-md bg-yellow-500/10 dark:bg-yellow-900/20 border-2 border-yellow-500/40 dark:border-yellow-400/40 rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-4">
                Supply not fully minted
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                  <span>Maintainer control</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                  <span>Tokens locked</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                  <span>No governance</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Fully Minted Card
          <div className="backdrop-blur-md bg-green-500/10 dark:bg-green-900/20 border-2 border-green-500/40 dark:border-green-400/40 rounded-xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
                Supply fully minted
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <span>Tokens unlock</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <span>Token holders = owners</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <span>Gradual ownership shift</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TokenSupplyProgress;

