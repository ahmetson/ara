import { useState, useEffect, useCallback, useRef } from 'react';

export type AnimationPhase =
  | 'idle'
  | 'userToAra'
  | 'araToProjectB'
  | 'highlightB'
  | 'bToA'
  | 'highlightA'
  | 'aToDeps'
  | 'depsReceive'
  | 'checkIteration'
  | 'forkB'
  | 'createProjectC'
  | 'cReceives'
  | 'cSplit'
  | 'returnToStart';

export interface FundingState {
  phase: AnimationPhase;
  iteration: number;
  userAmount: number;
  projectBAmount: number;
  projectAAmount: number;
  projectCAmount: number;
  depsAmount: number;
  isProjectBHighlighted: boolean;
  isProjectAHighlighted: boolean;
  isProjectCHighlighted: boolean;
  projectCExists: boolean;
  activeFlow?: {
    from: string;
    to: string;
    amount: number;
    progress: number;
  };
}

const HIGHLIGHT_DURATION = 2000; // 2 seconds
const FLOW_DURATION = 1500; // 1.5 seconds for money flow animation
const WAIT_AFTER_HIGHLIGHT = 2000; // 2 seconds wait after highlight

/**
 * Generate random funding amount
 */
function generateRandomAmount(): number {
  return Math.floor(Math.random() * 50000) + 10000; // $10k - $60k
}

/**
 * Custom hook for managing funding flow animation state machine
 */
export function useFundingAnimation() {
  const [state, setState] = useState<FundingState>({
    phase: 'idle',
    iteration: 0,
    userAmount: 0,
    projectBAmount: 0,
    projectAAmount: 0,
    projectCAmount: 0,
    depsAmount: 0,
    isProjectBHighlighted: false,
    isProjectAHighlighted: false,
    isProjectCHighlighted: false,
    projectCExists: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flowProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startFlow = useCallback(
    (from: string, to: string, amount: number) => {
      flowProgressRef.current = 0;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        flowProgressRef.current = Math.min(elapsed / FLOW_DURATION, 1);

        setState((prev) => ({
          ...prev,
          activeFlow: {
            from,
            to,
            amount,
            progress: flowProgressRef.current,
          },
        }));

        if (flowProgressRef.current < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          flowProgressRef.current = 0;
          setState((prev) => ({
            ...prev,
            activeFlow: undefined,
          }));
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    []
  );

  const transitionTo = useCallback(
    (phase: AnimationPhase, delay: number = 0) => {
      clearTimers();
      timeoutRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, phase }));
      }, delay);
    },
    [clearTimers]
  );

  const startCycle = useCallback(() => {
    const randomAmount = generateRandomAmount();
    
    setState((prev) => ({
      ...prev,
      phase: 'userToAra',
      userAmount: randomAmount,
      activeFlow: {
        from: 'user',
        to: 'ara',
        amount: randomAmount,
        progress: 0,
      },
    }));

    startFlow('user', 'ara', randomAmount);
    transitionTo('araToProjectB', FLOW_DURATION);
  }, [startFlow, transitionTo]);

  // State machine transitions
  useEffect(() => {
    switch (state.phase) {
      case 'idle':
        // Auto-start after a brief delay
        transitionTo('userToAra', 500);
        break;

      case 'userToAra':
        if (!state.activeFlow) {
          // Flow completed, move to next phase
          transitionTo('araToProjectB', 100);
        }
        break;

      case 'araToProjectB': {
        const amount = state.userAmount;
        setState((prev) => ({
          ...prev,
          projectBAmount: amount,
          phase: 'highlightB',
        }));
        startFlow('ara', 'projectB', amount);
        transitionTo('highlightB', FLOW_DURATION);
        break;
      }

      case 'highlightB':
        setState((prev) => ({
          ...prev,
          isProjectBHighlighted: true,
        }));
        transitionTo('bToA', HIGHLIGHT_DURATION);
        break;

      case 'bToA': {
        const amountToA = Math.floor(state.projectBAmount * 0.2); // 20%
        setState((prev) => ({
          ...prev,
          isProjectBHighlighted: false,
          projectAAmount: amountToA,
          phase: 'highlightA',
        }));
        startFlow('projectB', 'projectA', amountToA);
        transitionTo('highlightA', FLOW_DURATION);
        break;
      }

      case 'highlightA':
        setState((prev) => ({
          ...prev,
          isProjectAHighlighted: true,
        }));
        transitionTo('aToDeps', HIGHLIGHT_DURATION);
        break;

      case 'aToDeps': {
        // Flow from Project A to dependencies (2% of original amount X)
        const amountToDeps = Math.floor(state.userAmount * 0.02); // 2% of original user amount X
        setState((prev) => ({
          ...prev,
          isProjectAHighlighted: false,
          depsAmount: amountToDeps,
          phase: 'depsReceive',
        }));
        startFlow('projectA', 'dependencies', amountToDeps);
        transitionTo('depsReceive', FLOW_DURATION);
        break;
      }

      case 'depsReceive':
        transitionTo('checkIteration', WAIT_AFTER_HIGHLIGHT);
        break;

      case 'checkIteration': {
        const nextIteration = state.iteration + 1;
        const isEven = nextIteration % 2 === 0;

        if (isEven && !state.projectCExists) {
          // Fork to Project C
          setState((prev) => ({
            ...prev,
            iteration: nextIteration,
          }));
          transitionTo('forkB', 500);
        } else {
          // Return to start
          setState((prev) => ({
            ...prev,
            iteration: nextIteration,
            phase: 'returnToStart',
            userAmount: 0,
            projectBAmount: 0,
            projectAAmount: 0,
            projectCAmount: 0,
            depsAmount: 0,
            isProjectBHighlighted: false,
            isProjectAHighlighted: false,
            isProjectCHighlighted: false,
          }));
          transitionTo('userToAra', 1000);
        }
        break;
      }

      case 'forkB':
        setState((prev) => ({
          ...prev,
          phase: 'createProjectC',
          projectCExists: true,
        }));
        transitionTo('createProjectC', 500);
        break;

      case 'createProjectC': {
        const randomAmount = generateRandomAmount();
        setState((prev) => ({
          ...prev,
          projectCAmount: randomAmount,
          phase: 'cReceives',
          isProjectCHighlighted: true,
        }));
        startFlow('user', 'projectC', randomAmount);
        transitionTo('cReceives', FLOW_DURATION);
        break;
      }

      case 'cReceives':
        transitionTo('cSplit', WAIT_AFTER_HIGHLIGHT);
        break;

      case 'cSplit': {
        const amountToB = Math.floor(state.projectCAmount * 0.1); // 10% to B
        const amountToA = Math.floor(state.projectCAmount * 0.1); // 10% to A
        
        setState((prev) => ({
          ...prev,
          isProjectCHighlighted: false,
          projectBAmount: prev.projectBAmount + amountToB,
          projectAAmount: prev.projectAAmount + amountToA,
          phase: 'returnToStart',
        }));
        
        // Animate splits
        startFlow('projectC', 'projectB', amountToB);
        setTimeout(() => {
          startFlow('projectC', 'projectA', amountToA);
        }, 300);
        
        transitionTo('returnToStart', FLOW_DURATION + 500);
        break;
      }

      case 'returnToStart':
        // Reset state and start new cycle
        const newRandomAmount = generateRandomAmount();
        setState((prev) => ({
          ...prev,
          iteration: prev.iteration + 1,
          phase: 'userToAra',
          userAmount: newRandomAmount,
          projectBAmount: 0,
          projectAAmount: 0,
          projectCAmount: 0,
          depsAmount: 0,
          isProjectBHighlighted: false,
          isProjectAHighlighted: false,
          isProjectCHighlighted: false,
          projectCExists: false, // Reset for next cycle
          activeFlow: {
            from: 'user',
            to: 'ara',
            amount: newRandomAmount,
            progress: 0,
          },
        }));
        startFlow('user', 'ara', newRandomAmount);
        transitionTo('araToProjectB', FLOW_DURATION);
        break;
    }
  }, [state.phase, state.iteration, state.projectCExists, state.activeFlow, transitionTo, startFlow]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    state,
    startCycle,
  };
}

