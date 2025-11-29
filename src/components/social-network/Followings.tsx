import React, { useState } from 'react'
import Button from '@/components/custom-ui/Button'
import type { PanelEvents } from '@/types/eventTypes'
import Tooltip from '../custom-ui/Tooltip'
import { getIcon } from '../icon'
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';

export type FollowingsProps = PanelEvents & {
  following: boolean
  followers: number
  selfProfile?: boolean
}

const Followings: React.FC<FollowingsProps> = ({ following, followers, selfProfile = false, onActionClick }) => {
  const [isFollowing, setIsFollowing] = useState(following)
  const [isLoading, setIsLoading] = useState(false)
  const [followerCount, setFollowerCount] = useState(followers)

  const onClick = async () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsFollowing(!isFollowing)
      setFollowerCount(followerCount + 1)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Tooltip
      content={
        <div className="text-sm">
          {selfProfile ? `How many people follows you? Also, do you follow yourself? I recommend.` : isFollowing ? 'Unsubscribe' : 'Like & Subscribe'}
        </div>
      }
    >
      <Button
        variant={isFollowing ? "danger" : "secondary"}
        disabled={isLoading}
        onClick={onClick}
        className={`cursor flex items-center space-x-1 ${isFollowing && 'opacity-70'} h-8 text-slate-800 dark:text-slate-100`}
      >
        <div className="flex items-center space-x-1 w-full px-1">
          {isLoading ?
            <Spinner className='w-5 h-5' key={'ellipsis'} variant={'ellipsis'} /> :
            (<>{getIcon({
              iconType: 'heart',
              fill: (isFollowing ? 'currentColor' : 'none'),
              className: 'text-slate-100 dark:text-slate-100 w-5 h-5 mt-0.5'
            })}
            </>)}
          <span>{followerCount}</span>
        </div>
      </Button>
    </Tooltip>
  )
}

export default Followings
