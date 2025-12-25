import React from 'react'
import AuthStar from '@/components/auth/AuthStar'
import Badge from '@/components/badge/Badge'
import NumberFlow from '@number-flow/react'
import { getIcon } from '@/components/icon'
import DonationReceiversPopup from './DonationReceiversPopup'

export interface ReceiverInfoProps {
  nickname: string
  icon?: string
  isMaintainer: boolean
  amount: number
  sunshines: number
  stars: number
  receivers?: ReceiverInfoProps[]
}

const ReceiverInfo: React.FC<ReceiverInfoProps> = ({
  nickname,
  icon,
  isMaintainer,
  amount,
  sunshines,
  stars,
  receivers
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 py-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <AuthStar
            src={icon}
            nickname={nickname}
            sunshines={sunshines}
            stars={stars}
            isMaintainer={isMaintainer}
            className="flex-shrink-0"
          />
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Badge variant={isMaintainer ? 'blue' : 'gray'} static={true}>
              {isMaintainer ? 'Maintainer' : 'Donator'}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              {getIcon({ iconType: 'star', className: 'w-3 h-3' })}
              <NumberFlow
                value={stars}
                locales="en-US"
                format={{ style: 'decimal', maximumFractionDigits: 2 }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <NumberFlow
            value={amount}
            locales="en-US"
            format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
            className="text-sm font-medium text-gray-800 dark:text-gray-400"
          />
          {receivers && receivers.length > 0 && (
            <DonationReceiversPopup receivers={receivers} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ReceiverInfo

