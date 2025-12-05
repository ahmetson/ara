import React from 'react'
import BorderBeam from '../ui/border-beam'
import ElectricBorder from '../ElectricBorder'
import { cn } from '@/lib/utils'
import { RippleButton, RippleButtonRipples } from '../animate-ui/components/buttons/ripple'
import { RoundedSize } from '@/types/eventTypes'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'default'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
  outline?: boolean
  focus?: boolean
}

export const getAnimationColors = (variant: ButtonVariant): { colorFrom: string, colorTo: string } => {
  switch (variant) {
    case 'primary':
      return { colorFrom: '#4f46e5', colorTo: '#2563eb' } // indigo-600 to blue-600
    case 'secondary':
      return { colorFrom: '#64748b', colorTo: '#475569' } // slate-500 to slate-600 (subtle)
    case 'danger':
      return { colorFrom: '#dc2626', colorTo: '#b91c1c' } // red-600 to red-700
    case 'success':
      return { colorFrom: '#059669', colorTo: '#047857' } // emerald-600 to emerald-700
    default:
      return { colorFrom: '#94a3b8', colorTo: '#cbd5e1' } // slate-400 to slate-300 (very subtle)
  }
}

/**
 * @param outline - Whether the button should have an outline, 
 * if variant is secondary, the outline will show less important outline
 * @param variant - The variant of the button
 * @returns 
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  outline = false,
  focus = false,
}) => {

  const getDisabledButtonStyles = () => {
    const defaultStyle = 'border! text-slate-400! border-slate-300! bg-slate-200! hover:bg-slate-200! dark:border-slate-600! dark:bg-slate-700! dark:text-slate-500! dark:hover:bg-slate-700!'

    switch (variant) {
      case 'primary':
        return 'text-white! bg-indigo-400! opacity-60! cursor-not-allowed! dark:bg-indigo-600! dark:opacity-60!'
      case 'secondary':
        return 'text-slate-300! bg-slate-400! opacity-60! cursor-not-allowed! dark:bg-slate-600! dark:text-slate-400! dark:opacity-60!'
      case 'danger':
        return 'text-white! bg-red-400! opacity-60! cursor-not-allowed! dark:bg-red-600! dark:opacity-60!'
      case 'success':
        return 'text-white! bg-emerald-400! opacity-60! cursor-not-allowed! dark:bg-emerald-600! dark:opacity-60!'
      default:
        return defaultStyle
    }
  }


  const getVariantStyles = () => {
    const defaultStyle = 'border text-slate-700 border-slate-300 bg-slate-200 hover:bg-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'

    switch (variant) {
      case 'primary':
        // Professional blue with high contrast white text
        return 'bg-indigo-600 text-white font-semibold hover:bg-indigo-700 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600 shadow-sm hover:shadow-md transition-all'
      case 'secondary':
        // Subtle gray, less attention-grabbing
        return 'bg-slate-500 text-slate-100 hover:bg-slate-600 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500'
      case 'danger':
        // Attention-grabbing red with bright white text
        return 'bg-red-600 text-white font-semibold hover:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-600 shadow-sm hover:shadow-md transition-all'
      case 'success':
        // Vibrant green with white text for attention
        return 'bg-emerald-600 text-white font-semibold hover:bg-emerald-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all'
      default:
        return defaultStyle
    }
  }

  const getOutlineStyles = (): string => {
    if (!outline) {
      return ''
    }
    let outlineStyle = 'bg-transparent! text-slate-600! dark:text-slate-300! hover:text-slate-700 dark:hover:text-slate-200 border-1 border-slate-300! dark:border-slate-600! '

    switch (variant) {
      case 'primary':
        outlineStyle += 'border-indigo-500! text-indigo-600! hover:border-indigo-600! hover:bg-indigo-50! dark:border-indigo-400! dark:text-indigo-400! dark:hover:bg-indigo-950/20!';
        break;
      case 'secondary':
        outlineStyle += 'border-slate-400! text-slate-600! hover:border-slate-500! hover:bg-slate-50! dark:border-slate-500! dark:text-slate-400! dark:hover:bg-slate-800/30!';
        break;
      case 'danger':
        outlineStyle += 'border-red-500! text-red-600! hover:border-red-600! hover:bg-red-50! dark:border-red-400! dark:text-red-400! dark:hover:bg-red-950/20!';
        break;
      case 'success':
        outlineStyle += 'border-emerald-500! text-emerald-600! hover:border-emerald-600! hover:bg-emerald-50! dark:border-emerald-400! dark:text-emerald-400! dark:hover:bg-emerald-950/20!';
        break;
      default:
        outlineStyle += 'border-slate-300! text-slate-500! hover:border-slate-400! hover:bg-slate-50! dark:border-slate-600! dark:text-slate-400! dark:hover:bg-slate-800/30!';
        break;
    }

    return outlineStyle
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 pr-2 py-1 text-sm'
      case 'md':
        return 'px-4 pr-3 py-2 text-sm'
      case 'lg':
        return 'px-6 pr-5 py-3 text-base'
      default:
        return 'px-4 pr-3 py-2 text-sm'
    }
  }

  return (

    <BorderBeam size={12} colorFrom={getAnimationColors(variant).colorFrom} colorTo={getAnimationColors(variant).colorTo}>
      <RippleButton
        onClick={onClick}
        disabled={disabled}
        className={`
          ${disabled ? '' : 'hyperlink'}
          ${disabled ? getDisabledButtonStyles() : getVariantStyles()}
          ${getOutlineStyles()}
          ${focus ? '' : getSizeStyles()}
          ${RoundedSize.roundedXs} font-medium transition-colors duration-200
          ${className}
          `}
      >
        <ElectricBorder
          color={getAnimationColors(variant).colorFrom}
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 2 }}
          className={cn(
            `${getSizeStyles()}`,
            'mr-1 '
          )}
          disabled={!focus}
        >
          {children}
        </ElectricBorder>
        <RippleButtonRipples color={getAnimationColors(variant).colorFrom} />
      </RippleButton>
    </BorderBeam>
  )
}

export default Button
