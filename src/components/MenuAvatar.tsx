import React from 'react'
import Link from '@/components/custom-ui/Link'
import Tooltip from './custom-ui/Tooltip'
import NumberFlow from '@number-flow/react'
import { getIcon } from './icon'
import { Roles } from '@/scripts/user'
import { cn } from '@/lib/utils'

interface MenuAvatarProps {
  src?: string
  alt?: string
  className?: string
  imgClassName?: string
  uri?: string
  nickname?: string
  sunshines?: number
  stars?: number
  role?: Roles
}

const MenuAvatar: React.FC<MenuAvatarProps> = ({
  src,
  alt,
  className,
  imgClassName = '',
  uri = '/data/profile',
  nickname = 'Ahmetson',
  sunshines,
  stars,
  role
}) => {
  const defaultSrc = 'https://api.backdropbuild.com/storage/v1/object/public/avatars/9nFM8HasgS.jpeg'
  const defaultAlt = 'Avatar'
  const profileUri = nickname ? `${uri}?nickname=${nickname}` : uri

  const tooltipContent = (
    <div className="text-sm space-y-2">
      <div className="flex items-center gap-2">
        <img
          src={src || defaultSrc}
          alt={alt || defaultAlt}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{nickname}</span>
            {role && (
              <span className={cn(
                "text-xs text-white px-1.5 py-0.5 rounded",
                role === 'maintainer' && 'bg-blue-500',
                role === 'user' && 'bg-green-500',
                role === 'contributor' && 'bg-purple-500'
              )}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            )}
          </div>
          {(sunshines !== undefined || stars !== undefined) && (
            <div className="flex items-center gap-2 mt-1">
              {sunshines !== undefined && (
                <div className="flex items-center gap-1">
                  {getIcon({ iconType: 'sunshine', className: 'w-4 h-4' })}
                  <NumberFlow
                    value={sunshines}
                    locales="en-US"
                    format={{ style: 'decimal', maximumFractionDigits: 0 }}
                    className="text-xs"
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
                    className="text-xs"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <Tooltip content={tooltipContent}>
      <Link uri={profileUri} className={`hover:bg-teal-300 bg-blue-200 dark:bg-blue-400 rounded-full h-8 w-8 flex items-center justify-center overflow-hidden ${className}`}>
        <img
          src={src || defaultSrc}
          alt={alt || defaultAlt}
          width={32}
          height={32}
          className={`w-full h-full rounded-full object-cover ${imgClassName}`}
          style={{ minWidth: '28px', minHeight: '28px' }}
        />
      </Link>
    </Tooltip>

  )
}

export default MenuAvatar
