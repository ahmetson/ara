import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import HolographicUserNode from './nodes/HolographicUserNode';
import AraPortalNode from './nodes/AraPortalNode';
import IsometricProjectNode from './nodes/IsometricProjectNode';
import IsometricDependencyNode from './nodes/IsometricDependencyNode';
import AnimatedMoneyEdge from './edges/AnimatedMoneyEdge';
import FundingFlowAnimator, { FundingState } from './animation/FundingFlowAnimator';
import { getNodePositions } from './utils/isometricUtils';
import { motion } from 'motion/react';

// Register custom node types
const nodeTypes = {
  user: HolographicUserNode,
  ara: AraPortalNode,
  project: IsometricProjectNode,
  dependency: IsometricDependencyNode,
};

// Register custom edge types
const edgeTypes = {
  animatedMoney: AnimatedMoneyEdge,
};

// Custom edge style for money flows
const getEdgeStyle = (animated: boolean, color: string) => ({
  stroke: color,
  strokeWidth: 3,
  strokeDasharray: animated ? '5,5' : 'none',
  opacity: animated ? 0.8 : 0.4,
});

interface IsometricFundingFlowProps {
  className?: string;
}

const IsometricFundingFlow: React.FC<IsometricFundingFlowProps> = ({
  className = '',
}) => {
  return (
    <FundingFlowAnimator autoStart={true}>
      {(animationState) => (
        <IsometricFundingFlowInner
          className={className}
          animationState={animationState}
        />
      )}
    </FundingFlowAnimator>
  );
};

interface IsometricFundingFlowInnerProps {
  className: string;
  animationState: FundingState;
}

const IsometricFundingFlowInner: React.FC<IsometricFundingFlowInnerProps> = ({
  className,
  animationState,
}) => {
  // Calculate node positions using isometric projection
  // Position user at top left, then flow rightward
  const positions = useMemo(() => {
    // Start from top left area, flow to the right
    const startX = -400; // Left side
    const startY = -200; // Top area
    const spacing = 200;
    
    return {
      user: { x: startX, y: startY, scale: 0.85, opacity: 0.7 },
      ara: { x: startX + spacing * 0.8, y: startY + 50, scale: 0.95, opacity: 0.9 },
      projectB: { x: startX + spacing * 1.6, y: startY + 100, scale: 1, opacity: 1 },
      projectA: { x: startX + spacing * 2.4, y: startY + 100, scale: 1, opacity: 1 },
      dependencies: { x: startX + spacing * 3.2, y: startY + 100, scale: 1, opacity: 1 },
    };
  }, []);

  // Initial nodes setup
  const initialNodes: Node[] = useMemo(
    () => [
      {
        id: 'user',
        type: 'user',
        position: { x: positions.user.x, y: positions.user.y },
        data: {
          label: 'User',
          amount: animationState.userAmount,
        },
      },
      {
        id: 'ara',
        type: 'ara',
        position: { x: positions.ara.x, y: positions.ara.y },
        data: {
          label: 'Ara',
          isActive: (animationState.activeFlow?.from === 'user' && animationState.activeFlow?.to === 'ara') ||
                    (animationState.activeFlow?.from === 'ara' && animationState.activeFlow?.to === 'projectB'),
        },
      },
      {
        id: 'projectB',
        type: 'project',
        position: { x: positions.projectB.x, y: positions.projectB.y },
        data: {
          label: 'Project B',
          amount: animationState.projectBAmount,
          isHighlighted: animationState.isProjectBHighlighted,
          isReceiving: animationState.activeFlow?.to === 'projectB',
          color: '#8b5cf6',
          glowColor: '#a78bfa',
        },
      },
      {
        id: 'projectA',
        type: 'project',
        position: { x: positions.projectA.x, y: positions.projectA.y },
        data: {
          label: 'Project A',
          amount: animationState.projectAAmount,
          isHighlighted: animationState.isProjectAHighlighted,
          isReceiving: animationState.activeFlow?.to === 'projectA',
          color: '#10b981',
          glowColor: '#34d399',
        },
      },
      {
        id: 'dependencies',
        type: 'dependency',
        position: { x: positions.dependencies.x, y: positions.dependencies.y },
        data: {
          label: 'Dependencies',
          amount: animationState.depsAmount,
          extendsBeyond: true,
          isReceiving: animationState.activeFlow?.to === 'dependencies',
        },
      },
      // Conditionally add Project C
      ...(animationState.projectCExists
        ? [
            {
              id: 'projectC',
              type: 'project',
              position: {
                x: positions.projectB.x,
                y: positions.projectB.y - 150,
              },
              data: {
                label: 'Project C',
                amount: animationState.projectCAmount,
                isHighlighted: animationState.isProjectCHighlighted,
                isReceiving: animationState.activeFlow?.to === 'projectC',
                color: '#f59e0b',
                glowColor: '#fbbf24',
              },
            } as Node,
          ]
        : []),
    ],
    [
      positions,
      animationState.userAmount,
      animationState.projectBAmount,
      animationState.projectAAmount,
      animationState.projectCAmount,
      animationState.depsAmount,
      animationState.isProjectBHighlighted,
      animationState.isProjectAHighlighted,
      animationState.isProjectCHighlighted,
      animationState.projectCExists,
      animationState.activeFlow,
    ]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes when animation state changes
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const updated = { ...node };
        switch (node.id) {
          case 'user':
            updated.data = {
              ...updated.data,
              amount: animationState.userAmount,
            };
            break;
          case 'ara':
            updated.data = {
              ...updated.data,
              isActive: (animationState.activeFlow?.from === 'user' && animationState.activeFlow?.to === 'ara') ||
                        (animationState.activeFlow?.from === 'ara' && animationState.activeFlow?.to === 'projectB'),
            };
            break;
          case 'projectB':
            updated.data = {
              ...updated.data,
              amount: animationState.projectBAmount,
              isHighlighted: animationState.isProjectBHighlighted,
              isReceiving: animationState.activeFlow?.to === 'projectB',
            };
            break;
          case 'projectA':
            updated.data = {
              ...updated.data,
              amount: animationState.projectAAmount,
              isHighlighted: animationState.isProjectAHighlighted,
              isReceiving: animationState.activeFlow?.to === 'projectA',
            };
            break;
          case 'projectC':
            if (animationState.projectCExists) {
              updated.data = {
                ...updated.data,
                amount: animationState.projectCAmount,
                isHighlighted: animationState.isProjectCHighlighted,
                isReceiving: animationState.activeFlow?.to === 'projectC',
              };
            }
            break;
          case 'dependencies':
            updated.data = {
              ...updated.data,
              amount: animationState.depsAmount,
              isReceiving: animationState.activeFlow?.to === 'dependencies',
            };
            break;
        }
        return updated;
      })
    );
  }, [
    animationState,
    setNodes,
    animationState.userAmount,
    animationState.projectBAmount,
    animationState.projectAAmount,
    animationState.projectCAmount,
    animationState.depsAmount,
    animationState.isProjectBHighlighted,
    animationState.isProjectAHighlighted,
    animationState.isProjectCHighlighted,
    animationState.projectCExists,
    animationState.activeFlow,
  ]);

  // Update edges based on active flow
  React.useEffect(() => {
    const newEdges: Edge[] = [];

    // User -> Ara -> Project B flow (Green money icons)
    if (
      animationState.activeFlow?.from === 'user' &&
      animationState.activeFlow?.to === 'ara'
    ) {
      newEdges.push({
        id: 'user-ara',
        source: 'user',
        target: 'ara',
        type: 'animatedMoney',
        animated: true,
        style: getEdgeStyle(true, '#10b981'),
        markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
        data: {
          amount: animationState.activeFlow.amount,
          progress: animationState.activeFlow.progress,
          color: '#10b981', // Green color for money icon
        },
      });
    }

    if (
      animationState.activeFlow?.from === 'ara' &&
      animationState.activeFlow?.to === 'projectB'
    ) {
      newEdges.push({
        id: 'ara-projectB',
        source: 'ara',
        target: 'projectB',
        type: 'animatedMoney',
        animated: true,
        style: getEdgeStyle(true, '#10b981'),
        markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
        data: {
          amount: animationState.activeFlow.amount,
          progress: animationState.activeFlow.progress,
          color: '#10b981', // Green color for money icon
        },
      });
    }

    // Project B -> Project A flow (20% of X, Green money icon)
    if (
      animationState.activeFlow?.from === 'projectB' &&
      animationState.activeFlow?.to === 'projectA'
    ) {
      newEdges.push({
        id: 'projectB-projectA',
        source: 'projectB',
        target: 'projectA',
        type: 'animatedMoney',
        animated: true,
        style: getEdgeStyle(true, '#10b981'),
        markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
        data: {
          amount: animationState.activeFlow.amount,
          progress: animationState.activeFlow.progress,
          color: '#10b981', // Green color for money icon
        },
      });
    }

    // Project A -> Dependencies flow (2% of X)
    if (
      animationState.activeFlow?.from === 'projectA' &&
      animationState.activeFlow?.to === 'dependencies'
    ) {
      newEdges.push({
        id: 'projectA-dependencies',
        source: 'projectA',
        target: 'dependencies',
        type: 'animatedMoney',
        animated: true,
        style: getEdgeStyle(true, '#10b981'),
        markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
        data: {
          amount: animationState.activeFlow.amount,
          progress: animationState.activeFlow.progress,
          color: '#10b981', // Green color for money icon
        },
      });
    }

    // Project C flows
    if (animationState.projectCExists) {
      if (
        animationState.activeFlow?.from === 'user' &&
        animationState.activeFlow?.to === 'projectC'
      ) {
        newEdges.push({
          id: 'user-projectC',
          source: 'user',
          target: 'projectC',
          type: 'animatedMoney',
          animated: true,
          style: getEdgeStyle(true, '#f59e0b'),
          markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
          data: {
            amount: animationState.activeFlow.amount,
            progress: animationState.activeFlow.progress,
            color: '#f59e0b',
          },
        });
      }

      if (
        animationState.activeFlow?.from === 'projectC' &&
        animationState.activeFlow?.to === 'projectB'
      ) {
        newEdges.push({
          id: 'projectC-projectB',
          source: 'projectC',
          target: 'projectB',
          type: 'animatedMoney',
          animated: true,
          style: getEdgeStyle(true, '#f59e0b'),
          markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
          data: {
            amount: animationState.activeFlow.amount,
            progress: animationState.activeFlow.progress,
            color: '#f59e0b',
          },
        });
      }

      if (
        animationState.activeFlow?.from === 'projectC' &&
        animationState.activeFlow?.to === 'projectA'
      ) {
        newEdges.push({
          id: 'projectC-projectA',
          source: 'projectC',
          target: 'projectA',
          type: 'animatedMoney',
          animated: true,
          style: getEdgeStyle(true, '#f59e0b'),
          markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
          data: {
            amount: animationState.activeFlow.amount,
            progress: animationState.activeFlow.progress,
            color: '#f59e0b',
          },
        });
      }

    }


    setEdges(newEdges);
  }, [animationState.activeFlow, animationState.projectCExists, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`isometric-funding-flow w-full h-full ${className}`}
        style={{ height: '100%', width: '100%' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={16} />
        </ReactFlow>
      </motion.div>
    </ReactFlowProvider>
  );
};

export default IsometricFundingFlow;

