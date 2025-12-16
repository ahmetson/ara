'use client'
import React from 'react'
import UserStar from '@/components/all-stars/UserStar'
import { Popover } from '@base-ui-components/react/popover'
import { getIcon } from '@/components/icon'

const SergeyStar: React.FC = () => {
  return (
    <Popover.Root>
      <Popover.Trigger className="cursor-pointer">
        <UserStar
          x={0}
          y={0}
          nickname="Sergey Pak"
          src="https://dummyimage.com/80x80/6B46C1/ffffff?text=SP"
          alt="Sergey Pak"
          role="maintainer"
          sunshines={980}
          stars={7.5}
          disableTooltip={true}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} side="bottom" className="z-999!">
          <Popover.Popup className="w-80 origin-[var(--transform-origin)] rounded-xs bg-[canvas] px-6 py-4 text-gray-900 shadow-sm shadow-gray-900 dark:text-slate-300 dark:shadow-slate-300 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <Popover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              {getIcon('arrow')}
            </Popover.Arrow>
            <Popover.Title className="text-gray-500 dark:text-gray-400 font-medium text-md mb-2">
              Sergey Pak
            </Popover.Title>
            <Popover.Description className="text-gray-600 dark:text-slate-400 text-sm space-y-2">
              <p>
                Sergey has been in IT since the mid-90s — before Medet was even born. He built CRMs and hotel booking apps back when the internet was dial-up.
              </p>
              <p>
                If Medet brings the restless startup kid energy, Sergey brings decades of perspective. He's the one who takes messy visions and says, "Okay, let's strip it down, simplify it, and actually ship it."
              </p>
              <p>
                He believed in Ara early on, and helped cut through the noise to make it real. Where Medet is the "big idea" person, Sergey is the "make it work" person.
              </p>
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default SergeyStar
