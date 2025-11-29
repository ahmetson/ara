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
      return { colorFrom: '#f43f5e', colorTo: '#0ea5e9' } // bg-rose-500, hover:bg-sky-600
    case 'secondary':
      return { colorFrom: '#9ca3af', colorTo: '#5eead4' } // bg-gray-400, hover:bg-teal-300
    case 'danger':
      return { colorFrom: '#f97316', colorTo: '#8b5cf6' } // bg-orange-500, hover:bg-violet-600
    case 'success':
      return { colorFrom: '#22c55e', colorTo: '#4f46e5' } // bg-green-500, hover:bg-indigo-600
    default:
      return { colorFrom: '#f0fdfa', colorTo: '#d1d5db' } // bg-teal-50, hover:bg-gray-200
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
    const defaultStyle = 'border! text-white! border-gray-300! bg-blue-500! hover:bg-gray-200! dark:border-gray-700! dark:bg-blue-600! dark:hover:bg-gray-700!'

    switch (variant) {
      case 'primary':
        return 'text-white! bg-sky-400! text-gray-100! dark:bg-sky-400! dark:text-slate-100! dark:hover:bg-sky-700!'
      case 'secondary':
        return 'text-gray-100! bg-gray-500! dark:bg-gray-700! dark:text-slate-100! dark:hover:bg-teal-700!'
      case 'danger':
        return 'text-gray-100! bg-orange-500! dark:bg-orange-700! dark:text-slate-100! dark:hover:bg-violet-700!'
      case 'success':
        return 'text-gray-100! bg-green-500! dark:bg-green-700! dark:text-slate-100! dark:hover:bg-indigo-700!'
      default:
        return defaultStyle
    }
  }


  const getVariantStyles = () => {
    const defaultStyle = 'border text-white border-gray-300 bg-blue-500 hover:bg-gray-200 dark:border-gray-700 dark:bg-blue-600 dark:text-white dark:hover:bg-gray-700'

    switch (variant) {
      case 'primary':
        return 'bg-rose-500 text-white hover:bg-sky-500 dark:bg-rose-700 dark:text-slate-300/80 text-shadow-sm text-shadow-gray-900/50 dark:hover:bg-sky-700'
      case 'secondary':
        return 'bg-gray-500 text-white hover:bg-teal-500 dark:bg-gray-700 dark:text-slate-300/80 text-shadow-sm text-shadow-gray-900/50 dark:hover:bg-teal-700'
      case 'danger':
        return 'bg-orange-500 text-white hover:bg-violet-500 dark:bg-orange-700 dark:text-slate-300/80 text-shadow-sm text-shadow-gray-900/50 dark:hover:bg-violet-700'
      case 'success':
        return 'bg-green-500 text-white hover:bg-indigo-500 dark:bg-green-700 dark:text-slate-300/80 text-shadow-sm text-shadow-gray-900/50 dark:hover:bg-indigo-700'
      default:
        return defaultStyle
    }
  }

  const getOutlineStyles = (): string => {
    if (!outline) {
      return ''
    }
    let outlineStyle = 'bg-transparent! text-gray-700! dark:text-gray-300! hover:text-stone-700 dark:hover:text-gray-300 border-1 border-gray-300! dark:border-teal-700! '

    switch (variant) {
      case 'primary':
        outlineStyle += 'border-rose-300 hover:border-sky-600! hover:bg-sky-100/10!';
        break;
      case 'secondary':
        outlineStyle += 'border-gray-300 hover:border-teal-500! hover:bg-teal-100/10!';
        break;
      case 'danger':
        outlineStyle += 'border-orange-300 hover:border-violet-600! hover:bg-violet-100/10!';
        break;
      case 'success':
        outlineStyle += 'border-green-300 hover:border-indigo-600! hover:bg-indigo-100/10!';
        break;
      default:
        outlineStyle += 'border-gray-300 hover:border-gray-600 hover:bg-teal-100/10!';
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
