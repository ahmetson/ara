import React from 'react';
import { Popover } from '@base-ui-components/react/popover';
import { getIcon } from '@/components/icon';
import MenuItem from '@/components/menu/MenuItem';
import Tooltip from '@/components/custom-ui/Tooltip';

interface GalaxyBarMenuPopoverProps {
  galaxyId: string;
  activeMenuItem?: string;
}

const GalaxyBarMenuPopover: React.FC<GalaxyBarMenuPopoverProps> = ({
  galaxyId,
  activeMenuItem,
}) => {
  const baseUri = (path: string) => `${path}?galaxy=${galaxyId}`;

  const menuItems = [
    {
      key: 'guide',
      icon: 'info' as const,
      label: 'Guide',
      uri: baseUri('/project/guide'),
      active: activeMenuItem === 'guide',
    },
    {
      key: 'share-btn',
      icon: 'arrow-right' as const,
      label: 'Share Button',
      uri: baseUri('/project/share-btn'),
      active: activeMenuItem === 'share-btn',
    },
    {
      key: 'donations',
      icon: 'money' as const,
      label: 'Donations',
      uri: baseUri('/project/donations'),
      active: activeMenuItem === 'donations',
    },
  ];

  const trigger = (
    <Tooltip content="More menu options">
      <div
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-slate-100/40 dark:hover:bg-slate-800/30 transition-colors text-slate-600 dark:text-slate-400 cursor-pointer"
        aria-label="More menu options"
        role="button"
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
    </Tooltip>
  );

  return (
    <Popover.Root>
      <Popover.Trigger className="hyperlink flex items-center justify-center shadow-none">
        {trigger}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} side="bottom" className={'z-700!'}>
          <Popover.Popup className="w-64 origin-[var(--transform-origin)] rounded-xs bg-[canvas] px-2 py-2 text-gray-900 shadow-sm shadow-gray-900 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <Popover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              {getIcon('arrow')}
            </Popover.Arrow>

            <Popover.Title className="text-gray-500 font-medium text-sm flex items-center flex-row p-1 mb-2">
              More Options
            </Popover.Title>

            <Popover.Description className="text-gray-600">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    uri={item.uri}
                    active={item.active}
                  />
                ))}
              </div>
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default GalaxyBarMenuPopover;

