import React from 'react'
import PageLikePanel from '@/components/panel/PageLikePanel'
import MenuItem from './MenuItem';

type MenuName = 'ihistory' | 'iwork' | 'balance' | 'cbalance' | 'project' | 'marketing' | 'work' | 'cwork' | 'guide' | 'dependencies' | 'roadmap' | 'issues' | 'share-btn' | 'donations';

interface Props {
  title?: string
  activeMenuItem: MenuName
  focusMenuItem?: MenuName
  onlyCustomChildren?: boolean
  children?: any
}

const isOnlyInfluencerMenu = (activeMenuItem: MenuName): boolean => {
  return activeMenuItem === 'ihistory' || activeMenuItem === 'iwork';
}

const maintainerMainItems = (activeMenuItem: MenuName, focusMenuItem?: MenuName): React.ReactNode[] => {
  return [
    <MenuItem
      icon="balance"
      label="Balance"
      uri={"/maintainer/balance"}
      active={activeMenuItem === 'balance'}
      focus={focusMenuItem === 'balance'}
    />,
    <MenuItem
      icon="cascading-balance"
      label="Cascading balance"
      uri={"/maintainer/cbalance"}
      active={activeMenuItem === 'cbalance'}
      focus={focusMenuItem === 'cbalance'}
    />,
    <MenuItem
      icon="project-info"
      label="Project Info"
      badges={[
        {
          children: "2+",
          variant: "info",
          active: false,
          static: true
        }
      ]}
      uri={"/data/project"}
      active={activeMenuItem === 'project'}
      focus={focusMenuItem === 'project'}
    />,
  ]
}
const influencerMainItems = (activeMenuItem: MenuName, focusMenuItem?: MenuName): React.ReactNode[] => {
  return [
    <MenuItem
      icon="influencer-history"
      label="Transaction History"
      uri="/influencer/history"
      active={activeMenuItem === 'ihistory'}
      focus={focusMenuItem === 'ihistory'}
    />
  ]
}

const maintainerCollabItems = (activeMenuItem: MenuName, disableAnimation: boolean = false, focusMenuItem?: MenuName): React.ReactNode[] => {
  return [
    <MenuItem
      icon="marketing"
      label="Marketing"
      uri="/maintainer/marketing"
      active={activeMenuItem === 'marketing'}
      focus={focusMenuItem === 'marketing'}
    />,
    <MenuItem
      icon="guide"
      label="Guide"
      uri="/project/guide"
      active={activeMenuItem === 'guide'}
      focus={focusMenuItem === 'guide'}
    />,
    <MenuItem
      icon="work"
      label="Work"
      badges={[
        {
          children: "3",
          variant: "success",
          active: activeMenuItem === 'work',
          static: disableAnimation
        }
      ]}
      uri="/maintainer/work"
      active={activeMenuItem === 'work'}
      focus={focusMenuItem === 'work'}
    />,
    <MenuItem
      icon="cascading-work"
      label="Cascading work"
      badges={[
        {
          children: "2",
          variant: "danger",
          active: activeMenuItem === 'cwork',
          static: disableAnimation
        }
      ]}
      uri="/maintainer/cwork"
      active={activeMenuItem === 'cwork'}
      focus={focusMenuItem === 'cwork'}
    />,
    <MenuItem
      icon="dependencies"
      label="Dependencies"
      uri="/project/dependencies"
      active={activeMenuItem === 'dependencies'}
      focus={focusMenuItem === 'dependencies'}
    />,
    <MenuItem
      icon="roadmap"
      label="Roadmap"
      uri="/project/roadmap"
      active={activeMenuItem === 'roadmap'}
      focus={focusMenuItem === 'roadmap'}
    />,
    <MenuItem
      icon="work"
      label="Issues"
      uri="/project/issues"
      active={activeMenuItem === 'issues'}
      focus={focusMenuItem === 'issues'}
    />,
    <MenuItem
      icon="share"
      label="Share Button"
      uri="/project/share-btn"
      active={activeMenuItem === 'share-btn'}
      focus={focusMenuItem === 'share-btn'}
    />,
    <MenuItem
      icon="money"
      label="Donations"
      uri="/project/donations"
      active={activeMenuItem === 'donations'}
      focus={focusMenuItem === 'donations'}
    />
  ]
}
const influencerCollabItems = (activeMenuItem: MenuName, focusMenuItem?: MenuName): React.ReactNode[] => {
  return [
    <MenuItem
      icon="influencer-work"
      label="Influencer Work"
      uri="/influencer/work"
      focus={focusMenuItem === 'iwork'}
      active={activeMenuItem === 'iwork'}
    />
  ]
}

const isBadgedItemAnimated = (onlyCustomChildren: boolean, children: any, activeItem: MenuName): boolean => {
  if (onlyCustomChildren || children) {
    return false;
  }
  return activeItem === 'work' || activeItem === 'cwork';
}

const noChildren = <div className="text-center py-8 text-gray-500 dark:text-gray-400">
  <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-400" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.58L19 8l-9 9z" />
  </svg>
  <p className="text-sm">No menu items available</p>
  <p className="text-xs text-gray-400 mt-1">Add some items to get started</p>
</div>

const Panel: React.FC<Props> = ({ activeMenuItem, focusMenuItem, title = 'Main Menu', onlyCustomChildren = false, children }) => {
  const titleC = <div className='text-sm font-medium   text-gray-500'>{title}</div>
  const disableAnimation = isBadgedItemAnimated(onlyCustomChildren, children, activeMenuItem);

  return <PageLikePanel interactive={false} title={titleC} >
    <div className="p-1 z-10 w-full overflow-hidden justify-between">
      {onlyCustomChildren && !children ? noChildren : children}
      {!onlyCustomChildren && (!isOnlyInfluencerMenu(activeMenuItem) ? maintainerMainItems(activeMenuItem, focusMenuItem) : influencerMainItems(activeMenuItem, focusMenuItem))}
      {!onlyCustomChildren &&
        (<>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 mt-3">Collaboration Menu</h3>
          <div className="p-1 w-full overflow-hidden justify-between">
            {!isOnlyInfluencerMenu(activeMenuItem) ? maintainerCollabItems(activeMenuItem, disableAnimation, focusMenuItem) : influencerCollabItems(activeMenuItem, focusMenuItem)}
          </div>
        </>)}
    </div>
  </PageLikePanel>
}


export default Panel
