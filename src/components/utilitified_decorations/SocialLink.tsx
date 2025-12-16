import React from 'react'
import { FaGithub, FaTwitter, FaTelegram, FaDiscord, FaLinkedin } from 'react-icons/fa'
import { getIcon } from '../icon'
import { SocialLink as SocialLinkType, SocialLinkType as LinkType } from '@/types/ara'
import Link from '../custom-ui/Link'

interface SocialLinkProps {
  link: SocialLinkType
  className?: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ link,
  className = "flex rounded-sm w-8 h-8"
}) => {
  // Brand colors for each social platform
  const brandColors: Record<LinkType, string> = {
    github: '#00accc', // GitHub dark gray/black
    telegram: '#0088cc', // Telegram blue
    twitter: '#00acee', // Twitter/X black
    bluesky: '#00A3FF', // Bluesky blue
    discord: '#5865F2', // Discord blurple
    linkedin: '#0077B5', // LinkedIn blue
  }

  // Tailwind color classes for custom icons (bluesky)
  const brandColorClasses: Record<LinkType, string> = {
    github: 'text-black w-5 h-5', // GitHub dark gray/black
    telegram: 'text-[#0088cc] w-5 h-5', // Telegram blue
    twitter: 'text-blue-500 w-5 h-5', // Twitter/X black
    bluesky: 'text-[#00A3FF] w-5 h-5', // Bluesky blue
    discord: 'text-[#5865F2] w-5 h-5', // Discord blurple
    linkedin: 'text-[#0077B5] w-5 h-5', // LinkedIn blue
  }

  const renderIcon = () => {
    if (link.useCustomIcon) {
      return getIcon({
        iconType: link.type as any,
        className: brandColorClasses[link.type]
      })
    }

    const iconMap: Record<LinkType, React.ReactNode> = {
      github: <FaGithub color={brandColors.github} size={20} className={brandColorClasses.github} />,
      telegram: <FaTelegram color={brandColors.telegram} size={20} className={brandColorClasses.telegram} />,
      twitter: <FaTwitter color={brandColors.twitter} size={20} className={brandColorClasses.twitter} />,
      bluesky: getIcon({ iconType: 'bluesky', className: brandColorClasses.bluesky }),
      discord: <FaDiscord color={brandColors.discord} size={20} className={brandColorClasses.discord} />,
      linkedin: <FaLinkedin color={brandColors.linkedin} size={20} className={brandColorClasses.linkedin} />,
    }

    return iconMap[link.type]
  }

  return (
    <Link
      uri={link.url}
      asNewTab={true}
      className={className}
      aria-label={`Visit our ${link.type} page`}
    >
      {renderIcon()}
    </Link>
  )
}

export default SocialLink

