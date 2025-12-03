import React, { useState } from 'react';
import { motion } from 'motion/react';
import Button from '@/components/custom-ui/Button';
import { getIcon } from '@/components/icon';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';

const PlaceCtaPanel: React.FC = () => {
    const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

    const triggerConfetti = () => {
        if (hasTriggeredConfetti) return; // Prevent multiple triggers

        setHasTriggeredConfetti(true);
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                setHasTriggeredConfetti(false); // Allow triggering again after animation ends
                return;
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    return (
        <motion.div
            className={cn(
                "relative w-full max-w-2xl mx-auto mt-12",
                "backdrop-blur-md bg-white/20 dark:bg-slate-900/20",
                "border border-slate-200/30 dark:border-slate-700/30",
                "rounded-lg p-8",
                "overflow-hidden"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Twinkling stars around the panel */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 text-center">
                    Add your star on the page! ✨
                </h3>

                {/* Large animated star with number */}
                <div className="flex items-center justify-center ">
                    <motion.div
                        className="relative"
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {getIcon({ iconType: 'star', className: 'w-16 h-16 text-yellow-500 dark:text-yellow-500/90', fill: 'currentColor' })}
                    </motion.div>
                    <NumberFlow
                        value={1}
                        locales="en-US"
                        className="text-4xl font-bold text-slate-500 dark:text-yellow-500/70 -mt-2"
                        format={{ style: 'decimal', maximumFractionDigits: 0 }}
                    />
                </div>

                {/* Message */}
                <p className="text-lg text-center text-slate-700 dark:text-slate-300 -mt-4">
                    <span className="text-base">Drag and drop your star to the page.</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={() => {
                            // Virtual Screen button
                            console.log('Virtual Screen clicked');
                            triggerConfetti();
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        <span>Virtual Screen</span>
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={() => {
                            // Monitor Screen button
                            console.log('Monitor Screen clicked');
                            triggerConfetti();
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        <span>Monitor Screen</span>
                    </Button>
                </div>
            </div>

            {/* Twinkle animation styles */}
            <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
        </motion.div>
    );
};

export default PlaceCtaPanel;

