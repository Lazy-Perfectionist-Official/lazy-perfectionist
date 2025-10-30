'use client'

import { useEffect, useState } from 'react'
import { ArrowUpDown, Clock, TrendingUp, Calendar } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return a simple static placeholder during SSR
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <span className="text-sm linktree-text whitespace-nowrap">Sort by:</span>
        <div className="linktree-button w-full sm:w-48 h-12 flex items-center justify-center px-4">
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  const selectedOption = sortOptions.find(option => option.value === value)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <span className="text-sm linktree-text whitespace-nowrap">Sort by:</span>
      <div className="w-full sm:w-auto">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="linktree-button w-full sm:w-48 h-12 px-4 py-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {selectedOption && <selectedOption.icon className="w-4 h-4 flex-shrink-0" />}
                <SelectValue placeholder="Sort by" className="text-sm" />
              </div>
              <ArrowUpDown className="w-4 h-4 flex-shrink-0 ml-2" />
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