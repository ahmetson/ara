import React from 'react'
import BasePanel, { BasePanelProps } from './Panel'
import { getIcon, IconType, IconProps } from '@/components/icon'
import { cn } from '@/lib/utils'
import { BorderSize } from '@/types/eventTypes'

export interface ControlPanelProps extends Omit<BasePanelProps, 'children'> {
    icon?: IconType | IconProps
    title?: React.ReactNode
    children?: React.ReactNode
    titleClassName?: string
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    key,
    icon,
    title,
    children,
    className = '',
    titleClassName = '',
    ...baseProps
}) => {
    const titleColor = 'text-slate-400 dark:text-slate-500';
    const textColor = 'text-slate-400 dark:text-slate-500';
    const borderColor = 'border-slate-300/20 dark:border-slate-600/20';

    const renderHeader = () => {
        if (!title) return null;
        const iconProps = typeof icon === 'object' ? icon : (icon ? { iconType: icon } : undefined);

        return (
            <div key={key} className="mb-2">
                <h2 className={`text-xs font-mono flex items-center gap-2 ${titleColor} ${titleClassName}`}>
                    {iconProps && getIcon(iconProps)}
                    <span>{title}</span>
                </h2>
            </div>
        )
    }

    // Very light background matching GalacticMeasurements
    const lightBg = `backdrop-blur-lg ${textColor}`;

    return (
        <BasePanel
            {...baseProps}
            border={{ size: BorderSize.border1, color: borderColor }}
            bg="bg-transparent"
            className={cn(
                'shadow-none',
                lightBg,
                className
            )}
        >
            {renderHeader()}
            {children && (
                <div className={`font-mono text-xs ${textColor}`}>
                    {children}
                </div>
            )}
        </BasePanel>
    )
}

export default ControlPanel

