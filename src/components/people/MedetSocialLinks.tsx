'use client'
import React from 'react'
import Link from '@/components/custom-ui/Link'
import { FaGithub, FaLinkedin, FaTelegram, FaYoutube } from 'react-icons/fa'
import { getIcon } from '@/components/icon'
import { medetSocialLinks } from '@/types/ahmetson'

const MedetSocialLinks: React.FC = () => {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <FaGithub className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
      case 'linkedin':
        return <FaLinkedin className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
      case 'telegram':
        return <FaTelegram className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
      case 'bluesky':
        return getIcon({ iconType: 'bluesky', className: 'w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-[#00A3FF] transition-colors' })
      case 'youtube':
        return getIcon({ iconType: 'youtube', className: 'w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors' })
      case 'email':
        return getIcon({ iconType: 'email', className: 'w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors' })
      case 'website':
        return (
          <svg
            className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        )
      default:
        return null
    }
  }

  // Filter to only show GitHub, LinkedIn, Website, and YouTube
  const displayedLinks = medetSocialLinks.filter(
    (social) => ['github', 'linkedin', 'website', 'youtube'].includes(social.type)
  )

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
      {displayedLinks.map((social) => (
        <Link
          key={social.type}
          uri={social.url}
          asNewTab={true}
          className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200 hover:scale-110 hover:shadow-md"
          aria-label={social.label}
        >
          {getSocialIcon(social.type)}
        </Link>
      ))}
    </div>
  )
}

export default MedetSocialLinks
