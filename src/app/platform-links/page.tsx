'use client'

import { useState, useEffect, use, useMemo, useCallback } from 'react'
import { ArrowLeft, Music, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { analyticsService } from '@/lib/analytics-stub'
import Background from '@/components/Background'
import Navigation from '@/components/Navigation'
import { generateStructuredData } from '@/components/SEO'

interface Platform {
  platform: string
  name: string
  url: string
  color: string
  icon: string
  order: number
}

interface PlatformLinksPageProps {
  searchParams: Promise<{
    trackId?: string
    trackName?: string
    artistName?: string
  }>
}

export default function PlatformLinksPage({ searchParams }: PlatformLinksPageProps) {
  const resolvedParams = use(searchParams)
  const { trackId, trackName, artistName } = resolvedParams
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [albumArt, setAlbumArt] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (trackId) {
      fetchPlatformLinks()
      fetchAlbumArt()
    } else {
      setLoading(false)
    }

    return () => {
      setMounted(false)
    }
  }, [trackId])

  const fetchAlbumArt = async () => {
    try {
      const response = await fetch(`/api/platform-links?trackId=${trackId}`)
      const data = await response.json()

      if (data.success && data.data && data.data.albumImage) {
        setAlbumArt(data.data.albumImage)
      }
    } catch (error) {
      console.error('Error fetching album art:', error)
    }
  }

  const fetchPlatformLinks = async () => {
    try {
      setLoading(true)
      setFailed(false)
      const response = await fetch(`/api/platform-links?trackId=${trackId}`)
      const data = await response.json()

      if (data.success && data.data) {
        setPlatforms(data.data.platforms || [])
        if (data.data.albumImage) {
          setAlbumArt(data.data.albumImage)
        }
      } else {
        setFailed(true)
      }
    } catch (error) {
      console.error('Error fetching platform links:', error)
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePlatformClick = useCallback(async (url: string, platform: Platform) => {
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

    window.open(url, '_blank', 'noopener,noreferrer')
  }, [trackId, trackName, artistName])

  const externalLinkIcon = useMemo(() => <ExternalLink size={18} />, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-oryzo-canvas flex items-center justify-center text-oryzo-muted">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream relative">
      {trackName && artistName && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData('MusicSong', {
            name: decodeURIComponent(trackName),
            byArtist: {
              '@type': 'MusicGroup',
              name: decodeURIComponent(artistName)
            },
            url: `https://open.spotify.com/track/${trackId}`,
            potentialAction: {
              '@type': 'ListenAction',
              target: platforms.map(p => p.url),
              'action-status': 'ActiveActionStatus'
            }
          })}
        />
      )}
      <Background />
      <Navigation currentPage="music" />

      <main>
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
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border border-oryzo-border shadow-2xl bg-oryzo-surface/40">
                {albumArt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={albumArt}
                    alt={`${trackName ? decodeURIComponent(trackName) : 'Track'} cover art`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-12 h-12 text-oryzo-muted" />
                  </div>
                )}
              </div>
            </motion.div>

            <div className="flex items-center gap-8 mb-6 justify-center">
              <div className="w-8 h-px bg-oryzo-border" />
              <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
                Listen
              </span>
              <div className="w-8 h-px bg-oryzo-border" />
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-display italic text-oryzo-cream mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Choose Your Platform
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-oryzo-muted mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {trackName && artistName
                ? `Listen to "${decodeURIComponent(trackName)}" by ${decodeURIComponent(artistName)}`
                : 'Select your preferred streaming platform'}
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
                  <div key={i} className="liquid-glass rounded-2xl p-6 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-oryzo-border/40 rounded-xl"></div>
                        <div className="h-5 bg-oryzo-border/40 rounded w-32"></div>
                      </div>
                      <div className="w-6 h-6 bg-oryzo-border/40 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : platforms.length > 0 ? (
              <AnimatePresence>
                {platforms.map((platform, index) => (
                  <motion.a
                    key={`${platform.platform}-${index}`}
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
                    className="liquid-glass flex items-center justify-between p-6 rounded-2xl hover:border-oryzo-cream/40 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-oryzo-surface/60 rounded-xl text-2xl">
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-oryzo-display text-oryzo-cream">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-oryzo-muted">
                          Stream in {platform.name.replace('Music', '').replace('Cloud', '')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-oryzo-muted group-hover:text-oryzo-ember transition-colors">
                      <span className="text-sm font-medium">Open</span>
                      {externalLinkIcon}
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
                <Music className="w-12 h-12 text-oryzo-muted mx-auto mb-4" />
                <h3 className="text-xl font-oryzo-display text-oryzo-cream mb-2">
                  {trackId ? 'PLATFORM LINKS UNAVAILABLE' : 'START LISTENING'}
                </h3>
                <p className="text-oryzo-muted mb-6 max-w-md mx-auto">
                  {trackId
                    ? 'Streaming options could not be loaded right now — the track is still one click away.'
                    : 'Stream the latest single "LUSG" on Spotify, or browse the catalog and pick where you listen.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/music"
                    className="liquid-glass rounded-full inline-flex items-center gap-2 px-6 py-3 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform"
                  >
                    <ArrowLeft size={16} />
                    BROWSE MUSIC
                  </Link>
                  <a
                    href={
                      trackId
                        ? `https://open.spotify.com/track/${trackId}`
                        : 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-oryzo-border hover:border-oryzo-cream inline-flex items-center gap-2 px-6 py-3 font-oryzo-display text-sm text-oryzo-cream transition-colors"
                  >
                    {trackId ? 'STREAM ON SPOTIFY' : 'STREAM "LUSG" ON SPOTIFY'}
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/music"
              className="text-oryzo-muted hover:text-oryzo-cream transition-colors inline-flex items-center gap-2 text-sm"
            >
              <ArrowLeft size={16} />
              Back to music
            </Link>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  )
}
