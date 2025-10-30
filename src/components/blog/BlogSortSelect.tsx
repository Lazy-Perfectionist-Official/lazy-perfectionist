'use client'

import { useEffect, useState } from 'react'
import { ArrowUpDown, Clock, TrendingUp, Calendar } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

type SortOption = 'latest' | 'oldest' | 'popular'

interface BlogSortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions = [
  {
    value: 'latest' as SortOption,
    label: 'Latest First',
    icon: Clock,
    description: 'Most recent articles first'
  },
  {
    value: 'oldest' as SortOption,
    label: 'Oldest First',
    icon: Calendar,
    description: 'Earliest articles first'
  },
  {
    value: 'popular' as SortOption,
    label: 'Most Popular',
    icon: TrendingUp,
    description: 'Articles with most engagement'
  }
]

export default function BlogSortSelect({ value, onChange }: BlogSortSelectProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const selectedOption = sortOptions.find(option => option.value === value)

  if (!isClient) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <span className="text-sm linktree-text whitespace-nowrap">Sort by:</span>
        <div className="linktree-button w-full sm:w-48 h-12 flex items-center gap-2 px-4">
          <Clock className="w-4 h-4 flex-shrink-0 text-gray-700" />
          <span className="text-sm font-medium flex-1 truncate">Latest First</span>
          <ArrowUpDown className="w-4 h-4 flex-shrink-0 text-gray-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <span className="text-sm linktree-text whitespace-nowrap">Sort by:</span>
      <div className="w-full sm:w-auto">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            aria-label="Sort blog posts"
            className="linktree-button w-full sm:w-48 h-12 px-4 py-3"
          >
            <div className="flex items-center gap-2 w-full justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {selectedOption && (
                  <selectedOption.icon className="w-4 h-4 flex-shrink-0 text-gray-700" />
                )}
                <span className="text-sm font-medium truncate">
                  {selectedOption?.label || 'Sort by'}
                </span>
              </div>
              <ArrowUpDown className="w-4 h-4 flex-shrink-0 text-gray-500" />
            </div>
          </SelectTrigger>

          <SelectContent className="bg-white border-[#1c205d] text-[#090c34] min-w-[240px] shadow-lg">
            {sortOptions.map((option) => {
              const Icon = option.icon
              return (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-orange-100 focus:text-orange-600 cursor-pointer py-3 px-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}