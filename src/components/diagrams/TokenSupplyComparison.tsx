import React from 'react';
import { motion } from 'motion/react';

interface TokenSupplyComparisonProps {
  className?: string;
}

const TokenSupplyComparison: React.FC<TokenSupplyComparisonProps> = ({
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`token-supply-comparison ${className} grid md:grid-cols-2 gap-6`}
    >
      {/* Not Fully Minted */}
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

      {/* Fully Minted */}
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
    </motion.div>
  );
};

export default TokenSupplyComparison;

