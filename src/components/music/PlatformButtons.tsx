'use client'

import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
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
  useEffect(() => {
    // Pre-verify platform availability (optional)
  }, [trackId])

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
  }

  // Create a smart link that opens platform selection
  const smartLinkUrl = `/platform-links?trackId=${trackId}&trackName=${encodeURIComponent(trackName)}&artistName=${encodeURIComponent(artistName)}`

  return (
    <div className={className}>
      <motion.a
        href={smartLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handlePlatformClick(smartLinkUrl, { platform: 'smartlink', name: 'Smart Link', url: smartLinkUrl } as Platform)}
        className="linktree-button inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold transition-all hover:scale-105 active:scale-95 w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ExternalLink size={18} />
        <span>Listen</span>
      </motion.a>
    </div>
  )
}