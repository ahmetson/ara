import React from 'react'
import Tooltip from '../custom-ui/Tooltip'
import { getIcon } from '../icon'
import NumberFlow from '@number-flow/react'

export interface ProjectRatingProps {
  sunshines: number
  stars: number
}

const ProjectRating: React.FC<ProjectRatingProps> = ({ sunshines, stars }) => {
  // Calculate percentage of shines turned into stars
  const sunshinesToStar = 360
  const totalSunshines = sunshines || 0
  const totalStars = stars || 0
  const shinesInStars = totalStars * sunshinesToStar
  const percentage = totalSunshines > 0 ? ((shinesInStars / totalSunshines) * 100) : 0

  const percentageTooltip = (
    <div className="text-sm">
      How much shines turned into the stars: {percentage.toFixed(1)}%
    </div>
  )

  return (
    <div className="flex items-center space-x-2">
      {sunshines !== undefined && (
        <div className="flex items-center gap-1">
          {getIcon({ iconType: 'sunshine', className: 'w-4 h-4' })}
          <NumberFlow
            value={sunshines}
            locales="en-US"
            format={{ style: 'decimal', maximumFractionDigits: 0 }}
            className="text-sm text-slate-800 dark:text-slate-300"
          />
        </div>
      )}

      {stars !== undefined && (
        <div className="flex items-center gap-1">
          {getIcon({ iconType: 'star', className: 'w-4 h-4' })}
          <NumberFlow
            value={stars}
            locales="en-US"
            format={{ style: 'decimal', maximumFractionDigits: 2 }}
            className="text-sm text-slate-800 dark:text-slate-300"
          />
        </div>
      )}

      {sunshines !== undefined && stars !== undefined && (
        <Tooltip content={percentageTooltip}>
          <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
            {getIcon({ iconType: 'energy', className: 'w-4 h-4' })}
            <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default ProjectRating
