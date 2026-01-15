import { cn } from '@/lib/utils'
import NumberFlow, { Format, Value } from '@number-flow/react'
import React from 'react'

interface ContentItemProps {
  value: Value
  format: Format
  description: string
  className?: string
}

const ContentItem: React.FC<ContentItemProps> = ({ value, format, description, className }) => {
  return (
    <div className={cn("flex flex-col space-x-4 items-center justify-center", className)}>
      <NumberFlow
        value={value}
        locales="en-US"
        format={format}
        className="font-bold text-2xl md:text-4xl text-sky-600 dark:text-sky-400"
      />
      <p className="text-gray-500 dark:text-gray-500 leading-relaxed flex-1">{description}</p>
    </div>
  )
}

export default ContentItem
