import React from 'react'
import { memo } from 'react'
import { useDrag } from 'react-dnd'
import IssueLink from './IssueLink'
import { ActionProps } from '@/types/eventTypes'
import { Issue } from './types'

const IssueCard: React.FC<Issue & { actions?: ActionProps[] }> = memo((props) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'issue',
      item: { id: props.id, title: props.title },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [props.id, props.title],
  )

  return (<>
    <div
      ref={drag as any} data-testid={props.id}
      className={`cursor-move! opacity-${opacity} border-1 border-blue-100/50 hover:border-blue-200 dark:border-blue-500/50 dark:hover:border-blue-500/90 transition-colors p-2 border-dashed`}
    >
      <IssueLink {...props} />
    </div>
  </>
  )
})


export default IssueCard
