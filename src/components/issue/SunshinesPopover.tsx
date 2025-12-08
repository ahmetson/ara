import React, { useState, useEffect } from 'react'
import { Popover } from '@base-ui-components/react/popover'
import * as RadixSlider from '@radix-ui/react-slider'
import NumberFlow, { NumberFlowGroup, continuous } from '@number-flow/react'
import { getIcon } from '../icon'
import Button from '../custom-ui/Button'
import Badge from '../badge/Badge'
import { cn } from '@/lib/utils'
import { Spinner } from '../ui/shadcn-io/spinner'
import Tooltip from '../custom-ui/Tooltip'

interface SunshinesPopoverProps {
    availableSunshines: number  // User's available sunshines
    currentSunshines: number    // Current sunshines on this issue
    issueId: string             // Issue ID
    galaxyId: string            // Galaxy ID
    userId: string              // Current user ID
    onApply: (newSunshines: number) => void  // Callback when Apply is clicked
}

const SunshinesPopover: React.FC<SunshinesPopoverProps> = ({
    availableSunshines,
    currentSunshines,
    issueId,
    galaxyId,
    userId,
    onApply
}) => {
    const [sliderValue, setSliderValue] = useState(currentSunshines)
    const [isApplying, setIsApplying] = useState(false)
    const [originalSunshines] = useState(currentSunshines)

    // Reset slider when currentSunshines changes (after apply)
    useEffect(() => {
        setSliderValue(currentSunshines)
    }, [currentSunshines])

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0])
    }

    const handleApply = () => {
        setIsApplying(true)
        onApply(sliderValue)

        // Reset after 2 seconds
        setTimeout(() => {
            setIsApplying(false)
        }, 2000)
    }

    const sunshinesToAdd = sliderValue - originalSunshines
    let calculatedRemaining = availableSunshines - sunshinesToAdd
    if (calculatedRemaining > availableSunshines) {
        calculatedRemaining = availableSunshines
    }
    if (calculatedRemaining < 0) {
        calculatedRemaining = 0
    }
    
    const hasChanged = sliderValue !== originalSunshines
    const maxSunshines = currentSunshines + availableSunshines
    const potentialStars = Math.floor(sliderValue / 360) // 360 sunshines = 1 star

    const potentialStarsTooltip = Math.floor(currentSunshines / 360);
    
    const trigger = (
        <Tooltip
            content={
                <div className="text-sm space-y-3">
                    <div className="font-semibold">Total sunshines: {currentSunshines}</div>
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-4xl">
                            {getIcon({ iconType: 'star', className: 'w-10 h-10 text-yellow-400 dark:text-yellow-500', fill: 'currentColor' })}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{potentialStarsTooltip}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Potential Stars</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">({currentSunshines} ÷ 360)</div>
                        </div>
                    </div>
                </div>
            }
            openDelay={500}
        >
            <div className="flex items-center space-x-1 justify-center cursor-pointer hover:opacity-80 transition-opacity">
                {getIcon({ iconType: 'sunshine', fill: 'currentColor', className: 'w-5 h-5 mt-0.5 mr-1' })}
                <NumberFlow
                    value={currentSunshines}
                    locales="en-US"
                    format={{ useGrouping: true }}
                    className="text-sm font-semibold"
                />
            </div>
        </Tooltip>
    )

    return (
        <Popover.Root>
            <Popover.Trigger className="hyperlink flex items-center justify-center shadow-none">
                {trigger}
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner sideOffset={8} side='bottom' className={'z-700!'}>
                    <Popover.Popup className="w-96 origin-[var(--transform-origin)] rounded-xs bg-[canvas] px-6 py-4 text-gray-900 shadow-sm shadow-gray-900 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
                        <Popover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                            {getIcon('arrow')}
                        </Popover.Arrow>

                        <Popover.Title className="text-gray-500 font-medium text-md flex items-center flex-row p-1 mb-4 gap-1">
                            Issue's Sunshines
                            <Badge variant="success" static={true}>
                                <NumberFlowGroup>
                                    <NumberFlow
                                        value={currentSunshines}
                                        locales="en-US"
                                        format={{ useGrouping: false }}
                                        className="font-semibold text-sky-500 dark:text-sky-200"
                                    />
                                    {hasChanged && (
                                        <>
                                            <span className="text-xs">→</span>
                                            <NumberFlow
                                                value={sliderValue}
                                                locales="en-US"
                                                format={{ useGrouping: false }}
                                                className="text-xs text-slate-500 dark:text-slate-200"
                                            />
                                        </>
                                    )}
                                </NumberFlowGroup>
                            </Badge>
                        </Popover.Title>

                        <Popover.Description className="text-gray-600">
                            {/* Large Star Icon and Potential Stars */}
                            <div className="flex flex-col items-center mb-6 mt-4">
                                <div className="text-6xl mb-2">
                                    {getIcon({ iconType: 'star', className: 'w-16 h-16 text-yellow-400 dark:text-yellow-500', fill: 'currentColor' })}
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                                        <NumberFlow
                                            value={potentialStars}
                                            locales="en-US"
                                            format={{ useGrouping: false }}
                                        />
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Potential Stars
                                    </div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        ({sliderValue} sunshines ÷ 360)
                                    </div>
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="mb-4">
                                <RadixSlider.Root
                                    value={[sliderValue]}
                                    onValueChange={handleSliderChange}
                                    max={maxSunshines}
                                    min={0}
                                    step={1}
                                    className="relative flex h-5 w-full touch-none select-none items-center"
                                >
                                    <RadixSlider.Track className="relative h-[3px] grow rounded-full bg-zinc-300 dark:bg-zinc-800">
                                        <RadixSlider.Range className="absolute h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                                        {/* Dashed line from original position when dragging */}
                                        {hasChanged && (
                                            <div
                                                className="absolute h-full border-l-2 border-dashed border-gray-400 opacity-50"
                                                style={{ left: `${(originalSunshines / maxSunshines) * 100}%` }}
                                            />
                                        )}
                                    </RadixSlider.Track>
                                    <RadixSlider.Thumb className="relative hyperlink block h-5 w-5 rounded-[1rem] bg-white dark:bg-slate-300 dark:hover:bg-slate-200 shadow-md ring ring-black/10">
                                        <NumberFlow
                                            value={sliderValue}
                                            locales="en-US"
                                            format={{ useGrouping: false }}
                                            plugins={[continuous]}
                                            className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-500 font-semibold"
                                        />
                                    </RadixSlider.Thumb>
                                </RadixSlider.Root>
                            </div>

                            {/* Remaining Sunshines */}
                            <div className="mb-4 text-center">
                                <span className="text-sm text-gray-500">Your Sunshines: </span>
                                <NumberFlow
                                    value={availableSunshines}
                                    locales="en-US"
                                    format={{ useGrouping: false }}
                                    className="font-semibold"
                                />
                                {hasChanged && (
                                    <>
                                        <span className="text-xs">→</span>
                                        <NumberFlow
                                            value={calculatedRemaining}
                                            locales="en-US"
                                            format={{ useGrouping: false }}
                                            className="text-xs"
                                        />
                                    </>
                                )}
                            </div>

                            {/* Apply Button */}
                            <div className="flex justify-center">
                                <Button
                                    variant="primary"
                                    onClick={handleApply}
                                    disabled={isApplying || !hasChanged || sunshinesToAdd > availableSunshines}
                                    className={cn(
                                        "px-6",
                                        isApplying && "cursor-wait"
                                    )}
                                >
                                    {isApplying ? <>
                                        <Spinner className='w-5 h-5' key={'ellipsis'}
                                            variant={'ellipsis'} /> saving...</> :
                                        'Save'}
                                </Button>
                            </div>
                        </Popover.Description>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default SunshinesPopover

