'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Music, Play, ExternalLink, Clock, Album } from 'lucide-react'
import { motion } from 'framer-motion'
import PlatformButtons from '@/components/music/PlatformButtons'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'

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
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

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

  const playPreview = (track: SpotifyTrack) => {
    if (!track.preview_url) return

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setPlayingTrack(null)
    }

    // If clicking the same track, just stop it
    if (playingTrack === track.id) {
      return
    }

    // Play new track
    const audio = new Audio(track.preview_url)
    audio.play()
    setCurrentAudio(audio)
    setPlayingTrack(track.id)

    audio.onended = () => {
      setCurrentAudio(null)
      setPlayingTrack(null)
    }
  }

  const stopPreview = () => {
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setPlayingTrack(null)
    }
  }

  return (
    <div className="min-h-screen linktree-gradient relative">
      <Background />
      <Navigation currentPage="music" />

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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold linktree-text flex items-center">
                <Music className="mr-3" size={24} />
                Discography
              </h2>
              <div className="flex items-center gap-2">
                <span className="linktree-text/70 text-sm">
                  {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
                </span>
                {playingTrack && (
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Playing</span>
                  </div>
                )}
              </div>
            </div>
            
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
                          src={track.album.images[0]?.url || "/assets/img/logo.png"}
                          alt={`${track.album.name} cover art`}
                          width={64}
                          height={64}
                          className="rounded-xl object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center transition-opacity cursor-pointer ${
                            track.preview_url ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                          }`}
                          onClick={() => playPreview(track)}
                        >
                          {playingTrack === track.id ? (
                            <div className="text-white flex items-center gap-1">
                              <Play className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent" />
                              <Play className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent" />
                            </div>
                          ) : (
                            <Play className="text-white" size={20} />
                          )}
                        </div>
                        {track.preview_url && (
                          <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1 py-0.5">
                            <span className="text-white text-xs">Preview</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="linktree-text font-semibold text-lg truncate">{track.name}</h3>
                        <p className="linktree-text/70 text-sm mb-1 truncate">{track.album.name}</p>
                        <div className="flex items-center space-x-4">
                          <span className="linktree-text/60 text-xs flex items-center">
                            <Album className="mr-1" size={12} />
                            {new Date(track.album.release_date).getFullYear()}
                          </span>
                          <span className="linktree-text/60 text-xs flex items-center">
                            <Clock className="mr-1" size={12} />
                            {formatDuration(track.duration_ms)}
                          </span>
                          {track.popularity > 0 && (
                            <span className="linktree-text/60 text-xs">
                              ♫ {track.popularity}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Listen Button - Desktop only */}
                      <div className="hidden md:block">
                        <PlatformButtons
                          trackId={track.id}
                          trackName={track.name}
                          artistName={track.artists[0]?.name || 'Lazy Perfectionist'}
                          className="mb-2"
                        />
                      </div>
                    </div>

                    {/* Listen Button - Mobile only */}
                    <div className="md:hidden mt-3">
                      <PlatformButtons
                        trackId={track.id}
                        trackName={track.name}
                        artistName={track.artists[0]?.name || 'Lazy Perfectionist'}
                        className="mb-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <p className="linktree-text/70 text-sm">
                  Available on multiple platforms
                </p>
                <a
                  href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linktree-button inline-flex items-center px-6 py-2 font-semibold transition-all"
                >
                  <Music className="mr-2" size={16} />
                  Follow on Spotify
                  <ExternalLink className="ml-2" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}