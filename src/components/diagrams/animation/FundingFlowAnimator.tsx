import React from 'react';
import { useFundingAnimation, FundingState } from './useFundingAnimation';

export interface FundingFlowAnimatorProps {
  children: (state: FundingState) => React.ReactNode;
  autoStart?: boolean;
}

export type { FundingState };

/**
 * Animation orchestrator component that manages the funding flow state machine
 * and provides state to child components
 */
const FundingFlowAnimator: React.FC<FundingFlowAnimatorProps> = ({
  children,
  autoStart = true,
}) => {
  const { state, startCycle } = useFundingAnimation();

  React.useEffect(() => {
    if (autoStart && state.phase === 'idle') {
      // Small delay before starting
      const timer = setTimeout(() => {
        startCycle();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, state.phase, startCycle]);

  return <>{children(state)}</>;
};

export default FundingFlowAnimator;

