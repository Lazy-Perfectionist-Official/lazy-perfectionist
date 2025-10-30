'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Headphones } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { analyticsService } from '@/lib/analytics'

interface Platform {
  platform: string
  name: string
  url: string
  color: string
  icon: string
  order: number
}

interface PlatformButtonsProps {
  trackId: string
  trackName: string
  artistName: string
  className?: string
}

export default function PlatformButtons({
  trackId,
  trackName,
  artistName,
  className = ''
}: PlatformButtonsProps) {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchPlatformLinks()
  }, [trackId])

  const fetchPlatformLinks = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/platform-links?trackId=${trackId}`)
      const data = await response.json()

      if (data.success && data.data) {
        setPlatforms(data.data.platforms || [])
      }
    } catch (error) {
      console.error('Error fetching platform links:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlatformClick = async (url: string, platform: Platform) => {
    // Track the click analytics
    await analyticsService.trackPlatformClick({
      trackId,
      trackName,
      artistName,
      platform: platform.platform,
      platformName: platform.name,
      url: platform.url
    })

    // Open in new window
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className={`flex gap-2 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-10 h-10 bg-gray-200/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (platforms.length === 0) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <a
          href={`https://song.link/search/${encodeURIComponent(`${trackName} ${artistName}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-black/20 text-white rounded-lg hover:bg-black/30 transition-colors text-sm"
        >
          <ExternalLink size={16} />
          <span>Find on platforms</span>
        </a>
      </div>
    )
  }

  const visiblePlatforms = isOpen ? platforms : platforms.slice(0, 3)
  const hasMore = platforms.length > 3

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <AnimatePresence mode="wait">
        {visiblePlatforms.map((platform) => (
          <motion.button
            key={platform.platform}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => handlePlatformClick(platform.url, platform.name)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium"
            style={{
              backgroundColor: platform.color + '20',
              color: platform.color,
              border: `1px solid ${platform.color}40`
            }}
          >
            <span className="text-base">{platform.icon}</span>
            <span>{platform.name}</span>
          </motion.button>
        ))}
      </AnimatePresence>

      {hasMore && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-black/10 text-black/60 rounded-lg hover:bg-black/20 transition-colors text-sm font-medium"
        >
          <Headphones size={16} />
          <span>{isOpen ? 'Show less' : `${platforms.length - 3}+ more`}</span>
        </motion.button>
      )}
    </div>
  )
}