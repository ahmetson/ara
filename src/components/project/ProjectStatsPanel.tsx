import React from 'react'
import PageLikePanel from '@/components/panel/PageLikePanel'
import NumberFlow from '@number-flow/react'
import TimeAgo from 'timeago-react'
import Badge from '../badge/Badge'

const ProjectStats: React.FC = () => {
  return (
    <PageLikePanel
      bg="bg-white/50 dark:bg-slate-900/50"
      className="mb-8 hover:bg-white dark:hover:bg-slate-900 transition-colors"
      interactive={false}
      title="Project Stats" >
      <div className="space-y-3 text-sm py-4 text-slate-800 dark:text-slate-400">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 w-24">Balance:</span>
          <NumberFlow value={1240} locales="en-US" format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2, signDisplay: 'negative' }} className='text-gray-700' />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 w-24">Cascade Balance:</span>
          <NumberFlow value={1240} locales="en-US" format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2, signDisplay: 'negative' }} className='text-gray-700' />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 w-24">Last Commit:</span>
          <TimeAgo datetime={1730457600000} />
        </div>
        <div className='flex justify-between items-center'>
          <span className="text-gray-600 dark:text-gray-400 w-24">Total Commits:</span>
          <span className="flex items-center gap-2">
            <NumberFlow value={1240} locales="en-US" format={{ style: 'decimal', maximumFractionDigits: 2 }} />
            <Badge static={true} variant="info">5 commits / day</Badge>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 w-24">Created:</span>
          <TimeAgo datetime={1730457600000} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 w-24">Updated:</span>
          <TimeAgo datetime={1730457600000} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 w-24">Influencers:</span>
          <span>N/A</span>
        </div>
      </div>
    </PageLikePanel>
  )
}

export default ProjectStats
