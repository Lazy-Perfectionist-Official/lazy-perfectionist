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
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400 hidden sm:block">Sort by:</span>
        <div className="linktree-button border-black/20 bg-black/20 backdrop-blur-sm text-white w-[140px] sm:w-[160px] h-[40px] flex items-center justify-center">
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  const selectedOption = sortOptions.find(option => option.value === value)

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-blue-300 hidden sm:block">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="linktree-button border-black/20 bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-all duration-200 w-[140px] sm:w-[180px] h-10">
          <div className="flex items-center gap-2">
            {selectedOption && <selectedOption.icon className="w-4 h-4 flex-shrink-0" />}
            <SelectValue placeholder="Sort by" className="text-sm" />
          </div>
          <ArrowUpDown className="w-4 h-4 ml-auto opacity-50 flex-shrink-0" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white min-w-[200px]">
          {sortOptions.map((option) => {
            const Icon = option.icon
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                className="focus:bg-orange-500/20 focus:text-orange-300 cursor-pointer py-3"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-blue-200/70">{option.description}</div>
                  </div>
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}