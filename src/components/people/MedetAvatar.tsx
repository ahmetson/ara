'use client'
import React from 'react'
import SpotlightCard from './SpotlightCard'
import { cn } from '@/lib/utils'

interface MedetAvatarProps {
  className?: string
}

const MedetAvatar: React.FC<MedetAvatarProps> = ({ className }) => {
  return (
    <SpotlightCard
      className={cn(
        'w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden',
        'bg-slate-900 dark:bg-slate-800',
        'border border-slate-700 dark:border-slate-600',
        'shadow-2xl',
        className
      )}
      spotlightColor="59, 130, 246" // Blue color for cosmic theme
    >
      <img
        src="/medet-ahmetson.png"
        alt="Medet Ahmetson"
        className="w-full h-full object-cover"
      />
    </SpotlightCard>
  )
}

export default MedetAvatar
