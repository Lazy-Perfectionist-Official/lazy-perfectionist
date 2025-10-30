'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Music, ExternalLink, Clock, Album } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { analyticsService } from '@/lib/analytics'

interface Platform {
  platform: string
  name: string
  url: string
  color: string
  icon: string
  order: number
}

interface PlatformLinksPageProps {
  searchParams: {
    trackId?: string
    trackName?: string
    artistName?: string
  }
}

export default function PlatformLinksPage({ searchParams }: PlatformLinksPageProps) {
  const { trackId, trackName, artistName } = searchParams
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (trackId) {
      fetchPlatformLinks()
    }
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
    if (trackId && trackName && artistName) {
      await analyticsService.trackPlatformClick({
        trackId,
        trackName: decodeURIComponent(trackName),
        artistName: decodeURIComponent(artistName),
        platform: platform.platform,
        platformName: platform.name,
        url: platform.url
      })
    }

    // Open in new window
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!mounted) {
    return (
      <div className="min-h-screen linktree-gradient flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen linktree-gradient relative">
      {/* Background gradient (base layer) */}
      <div className="fixed inset-0 -z-20 pointer-events-none" />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("/assets/img/noise.jpg")`,
          backgroundSize: '300px 300px',
          backgroundPosition: '0 0, 150px 150px',
          backgroundRepeat: 'repeat',
          opacity: 0.25,
          mixBlendMode: 'overlay',
          transform: 'scale(1.2)',
        }}
      />

      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto linktree-button backdrop-blur-md z-50 border border-black/20 rounded-2xl shadow-2xl">
        <div className="h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/music" className="flex items-center">
              <ArrowLeft className="mr-3 linktree-text/80 hover:opacity-80 transition-colors" size={20} />
              <span className="linktree-text font-semibold text-lg font-dm-serif">
                {trackName ? decodeURIComponent(trackName) : 'Back to Music'}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={mounted ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm p-2">
                <img
                  src="/assets/img/logo.png"
                  alt="Lazy Perfectionist Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold linktree-header-text mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Choose Your Platform
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl linktree-header-text/90 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {trackName && artistName
                ? `Listen to "${decodeURIComponent(trackName)}" by ${decodeURIComponent(artistName)}`
                : 'Select your preferred streaming platform'
              }
            </motion.p>
          </motion.div>

          {/* Platform Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="linktree-button rounded-2xl p-6 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-black/20 rounded-xl"></div>
                        <div className="h-5 bg-black/20 rounded w-32"></div>
                      </div>
                      <div className="w-6 h-6 bg-black/20 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : platforms.length > 0 ? (
              <AnimatePresence>
                {platforms.map((platform, index) => (
                  <motion.a
                    key={platform.platform}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePlatformClick(platform.url, platform)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                    className="linktree-button flex items-center justify-between p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-black/20 rounded-xl text-2xl">
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold linktree-text">
                          {platform.name}
                        </h3>
                        <p className="text-sm linktree-text/70">
                          Stream in {platform.name.replace('Music', '').replace('Cloud', '')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-linktree/60 group-hover:text-linktree transition-colors">
                      <span className="text-sm font-medium">Open</span>
                      <ExternalLink size={18} />
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-xl font-semibold linktree-text mb-2">
                  Platforms loading...
                </h3>
                <p className="linktree-text/70">
                  Finding the best streaming options for you
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/music"
              className="linktree-text/70 hover:text-linktree transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to music
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}