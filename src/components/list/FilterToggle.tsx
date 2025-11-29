import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Button from '@/components/custom-ui/Button'

export interface FilterOption {
    id: string
    label: string
    className?: string
    sortIds: Array<{ id: string; label: string }>
}

export interface FilterToggleProps {
    className?: string
    onValueChange: (filterId: string, sortId: string) => void
    filters: FilterOption[]
    defaultFilterId?: string
}

/**
 * FilterToggle Component
 *
 * Purpose:
 * A universal filter component that uses Radix UI ToggleGroup to display filter buttons
 * with integrated sort functionality. Each filter can have its own set of sort options
 * that are displayed in a dropdown when that filter is active.
 *
 * Use Case:
 * - When you want filter buttons with individual sort options for each filter
 * - For creating consistent filter interfaces across different parts of the application
 *
 * When To Use:
 * - When you need filter buttons with toggle behavior (single selection)
 * - When each filter requires different sort options
 * - When you want to maintain consistent styling with animate-ui components
 * - For replacing existing filter implementations with a more flexible solution
 *
 * When Not To Use:
 * - For simple dropdown filters without toggle behavior
 * - When you need multiple filter selections simultaneously
 * - For filters that don't require sort functionality
 */
const FilterToggle: React.FC<FilterToggleProps> = ({
    className,
    onValueChange,
    filters,
    defaultFilterId,
}) => {
    // Initialize active filter with defaultFilterId or first filter
    const initialFilterId = defaultFilterId || filters[0]?.id
    const [activeFilterId, setActiveFilterId] = useState<string>(initialFilterId)

    // Get current filter's sort options
    const currentFilter = filters.find(f => f.id === activeFilterId)
    const currentSortOptions = currentFilter?.sortIds || []

    // Initialize active sort with first sort option of current filter
    const [activeSortId, setActiveSortId] = useState<string>(
        currentSortOptions[0]?.id || ''
    )

    // Update sort when filter changes
    useEffect(() => {
        if (currentSortOptions.length > 0) {
            const firstSortId = currentSortOptions[0].id
            setActiveSortId(firstSortId)
            onValueChange(activeFilterId, firstSortId)
        }
    }, [activeFilterId, currentSortOptions, onValueChange])

    // Handle filter change from ToggleGroup
    const handleFilterChange = (value: string) => {
        if (value) {
            setActiveFilterId(value)
        }
    }

    // Handle sort change from dropdown
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortId = event.target.value
        setActiveSortId(newSortId)
        onValueChange(activeFilterId, newSortId)
    }

    // Initial call to onValueChange on mount
    useEffect(() => {
        if (activeFilterId && activeSortId) {
            onValueChange(activeFilterId, activeSortId)
        }
    }, []) // Only run on mount

    return (
        <div className={cn('flex items-center justify-between mb-6', className)}>
            {/* Filter Toggle Group */}
            <div className="flex items-center space-x-2">
                {filters.map((filter) => {
                    const isActive = activeFilterId === filter.id
                    return (
                        <Button
                            key={filter.id}
                            variant="secondary"
                            size="sm"
                            disabled={isActive}
                            onClick={() => handleFilterChange(filter.id)}
                            className={cn(
                                'rounded-xs',
                                filter.className
                            )}
                        >
                            {filter.label}
                        </Button>
                    )
                })}
            </div>

            {/* Sort Dropdown */}
            {currentSortOptions.length > 0 && (
                <div className="flex items-center space-x-2 ml-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sort</span>
                    <select
                        value={activeSortId}
                        onChange={handleSortChange}
                        className="border border-gray-300 hover:border-teal-500! hover:bg-teal-100/10! dark:hover:bg-teal-900/10! dark:border-teal-700! cursor-pointer rounded-xs px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-400"
                    >
                        {currentSortOptions.map((sortOption) => (
                            <option key={sortOption.id} value={sortOption.id}>
                                {sortOption.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}

export default FilterToggle
