export interface MedetSocialLink {
  type: 'github' | 'linkedin' | 'telegram' | 'bluesky' | 'youtube' | 'email' | 'website'
  url: string
  label: string
}

export const medetSocialLinks: MedetSocialLink[] = [
  {
    type: 'github',
    url: 'https://github.com/ahmetson',
    label: 'GitHub',
  },
  {
    type: 'linkedin',
    url: 'https://www.linkedin.com/in/ahmetson',
    label: 'LinkedIn',
  },
  {
    type: 'telegram',
    url: 'https://t.me/blocklord',
    label: 'Telegram',
  },
  {
    type: 'bluesky',
    url: 'https://bsky.app/profile/ahmetson.bsky.social',
    label: 'Bluesky',
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/@medet-ahmetson',
    label: 'YouTube',
  },
  {
    type: 'email',
    url: 'mailto:medet@ara.foundation',
    label: 'Email',
  },
  {
    type: 'website',
    url: 'https://ahmetson.com',
    label: 'Personal Website',
  },
]
