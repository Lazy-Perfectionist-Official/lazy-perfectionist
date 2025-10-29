'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Music, Play, ExternalLink, Clock, Album, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
    release_date: string
  }
  duration_ms: number
  external_urls: { spotify: string }
  preview_url: string | null
}

export default function MusicPage() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchSpotifyData()
  }, [])

  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify')
      const data = await response.json()
      setTracks(data.data || [])
    } catch (error) {
      console.error('Failed to fetch Spotify data:', error)
      setTracks([])
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen linktree-gradient">

      {/* ========== NAVBAR (Fixed, Responsive, Capped) ========== */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto linktree-button backdrop-blur-md z-50 border border-black/20 rounded-2xl shadow-2xl">
        <div className="h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Back Arrow */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-3 linktree-text/80 hover:opacity-80 transition-colors" size={20} />
                <span className="linktree-text font-semibold text-lg font-dm-serif">✨ Lazy Perfectionist</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="linktree-text/80 hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link href="/music" className="linktree-text/80 hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                  Music
                </Link>
                <Link href="/blog" className="linktree-text/80 hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                  Blog
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger – instant tap */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="linktree-text/80 p-2 touch-manipulation"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu – smooth height expand */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden linktree-button backdrop-blur-md border-t border-black/20 rounded-b-2xl overflow-hidden"
          style={{ overflow: 'hidden' }}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-1">
            <Link href="/" className="linktree-text block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors">
              Home
            </Link>
            <Link href="/music" className="linktree-text/80 block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors">
              Music
            </Link>
            <Link href="/blog" className="linktree-text/80 block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors">
              Blog
            </Link>
            <a
              href="https://linktr.ee/lazyperfectionist_official"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-text/80 block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors flex items-center gap-1"
            >
              Links <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Rounded Logo */}
            <motion.div
              className="mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={mounted ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm p-3">
                <img
                  src="/assets/img/logo.png"
                  alt="Lazy Perfectionist Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold linktree-header-text mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Music
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl linktree-header-text/90 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Bedroom Instrumental Rock! Check out my debut single "Orbit"
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a
                href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-button inline-flex items-center px-8 py-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Play className="mr-2" size={22} />
                Stream "Orbit" Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
            <h2 className="text-2xl font-bold linktree-text mb-6 flex items-center">
              <Music className="mr-3" size={24} />
              Latest Releases
            </h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-orange-100/50 rounded-2xl p-4 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-orange-200/50 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-orange-200/50 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-orange-200/50 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {tracks.map((track, index) => (
                  <div key={track.id} className="bg-orange-50/50 rounded-2xl p-4 hover:bg-orange-100/50 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src="/assets/img/logo.png"
                          alt="Lazy Perfectionist Logo"
                          width={64}
                          height={64}
                          className="rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="text-white" size={20} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="linktree-text font-semibold truncate">{track.name}</h3>
                        <p className="linktree-text/70 text-sm truncate">{track.artists.map(a => a.name).join(', ')}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="linktree-text/60 text-xs flex items-center">
                            <Album className="mr-1" size={12} />
                            {track.album.name}
                          </span>
                          <span className="linktree-text/60 text-xs flex items-center">
                            <Clock className="mr-1" size={12} />
                            {formatDuration(track.duration_ms)}
                          </span>
                        </div>
                      </div>
                      
                      <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linktree-text hover:underline transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center">
              <a
                href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-button inline-flex items-center px-6 py-2 font-semibold transition-all"
              >
                Listen on Spotify
                <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}