import React from 'react';
import { motion } from 'motion/react';

interface AraLayerStackProps {
  className?: string;
}

const AraLayerStack: React.FC<AraLayerStackProps> = ({
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`ara-layer-stack ${className} flex flex-col items-center gap-4`}
    >
      {/* Ara Layer */}
      <div className="w-full max-w-md backdrop-blur-md bg-blue-500/20 dark:bg-blue-400/20 border-2 border-blue-500/40 dark:border-blue-400/40 rounded-xl p-4 shadow-lg">
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Ara Layer
          </div>
        </div>
        
        {/* Mini Panels Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Funded issues panel */}
          <div className="backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 border border-blue-300/50 dark:border-blue-500/50 rounded-lg p-2 text-center">
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
              Funded issues
            </div>
          </div>
          
          {/* Roadmap panel */}
          <div className="backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 border border-blue-300/50 dark:border-blue-500/50 rounded-lg p-2 text-center">
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
              Roadmap
            </div>
          </div>
          
          {/* Versions panel */}
          <div className="backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 border border-blue-300/50 dark:border-blue-500/50 rounded-lg p-2 text-center">
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
              Versions
            </div>
          </div>
          
          {/* Transparent Record panel */}
          <div className="backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 border border-blue-300/50 dark:border-blue-500/50 rounded-lg p-2 text-center">
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
              Transparent Record
            </div>
          </div>
        </div>
      </div>

      {/* Arrow pointing down */}
      <div className="flex flex-col items-center">
        <svg
          className="w-6 h-6 text-slate-600 dark:text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* GitHub/GitLab Repository */}
      <div className="w-full max-w-md backdrop-blur-md bg-slate-500/20 dark:bg-slate-600/20 border-2 border-slate-500/40 dark:border-slate-500/40 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
            GitHub / GitLab repository
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 italic">
            (unchanged)
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AraLayerStack;

