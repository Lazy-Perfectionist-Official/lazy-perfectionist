'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Music, Play, ExternalLink, Clock, Album } from 'lucide-react'
import { motion } from 'framer-motion'
import PlatformButtons from '@/components/music/PlatformButtons'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import { generateStructuredData } from '@/components/SEO'

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
    <>
      {/* Structured Data for Music Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('MusicGroup', {
          name: 'Lazy Perfectionist',
          description: 'Instrumental progressive rock/metal project from Hong Kong featuring the debut single "Orbit"',
          url: 'https://lazyperfectionist.com/music',
          genre: ['Progressive Rock', 'Progressive Metal', 'Instrumental Rock'],
          origin: 'Hong Kong',
          foundingDate: '2023',
          album: {
            '@type': 'MusicAlbum',
            name: 'Orbit',
            releaseDate: '2024',
            byArtist: {
              '@type': 'MusicGroup',
              name: 'Lazy Perfectionist'
            }
          }
        })}
      />

      <div className="min-h-screen linktree-gradient relative">
        <Background />
        <Navigation currentPage="music" />

        {/* Modern Premium Layout */}
        <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-start">

              {/* Left Column - Featured Track */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Featured Single Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-black/10">
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-black/60 text-sm font-medium">Featured Single</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Album Art */}
                      <div className="relative group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src="/assets/img/logo-handwritten.png"
                            alt="Lazy Perfectionist - Orbit"
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <a
                              href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform"
                            >
                              <Play size={28} className="text-white ml-1" fill="currentColor" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Track Info */}
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">Orbit</h1>
                          <p className="text-xl text-black/70 font-medium">Lazy Perfectionist</p>
                        </div>

                        <div className="flex items-center gap-4 text-black/60 text-sm">
                          <span>2024</span>
                          <span>•</span>
                          <span>Instrumental Rock</span>
                          <span>•</span>
                          <span>Single</span>
                        </div>

                        <p className="text-black/70 leading-relaxed">
                          My debut single "Orbit" is an instrumental progressive rock sound walk experiment. Featuring a fusion of orchestral layers and modern synths.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <a
                            href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linktree-button inline-flex items-center justify-center px-6 py-3 font-semibold transition-all hover:scale-105"
                          >
                            <Play className="mr-2" size={18} />
                            Stream Now
                          </a>
                          <a
                            href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linktree-button inline-flex items-center justify-center px-6 py-3 font-semibold transition-all hover:scale-105"
                          >
                            <Music className="mr-2" size={18} />
                            Follow
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracklist */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-black/10">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-black flex items-center">
                        <Music className="mr-3" size={24} />
                        Discography
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-black/60 text-sm">
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
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-gray-100/50 rounded-xl p-4 animate-pulse">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-200/50 rounded-lg"></div>
                              <div className="flex-1">
                                <div className="h-4 bg-gray-200/50 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200/50 rounded w-1/2"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {tracks.map((track, index) => (
                          <div key={track.id} className="group bg-gray-50/50 hover:bg-gray-100/50 rounded-xl p-4 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                              {/* Track Number */}
                              <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                <span className="text-black/60 group-hover:text-green-600 font-semibold text-sm">
                                  {index + 1}
                                </span>
                              </div>

                              {/* Album Art */}
                              <div className="relative">
                                <img
                                  src={track.album.images[0]?.url || "/assets/img/logo-handwritten.png"}
                                  alt={`${track.album.name} cover art`}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 rounded-lg object-contain"
                                />
                                {track.preview_url && (
                                  <div
                                    className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => playPreview(track)}
                                  >
                                    {playingTrack === track.id ? (
                                      <Play size={16} className="text-white ml-0.5" fill="currentColor" />
                                    ) : (
                                      <Play size={16} className="text-white" />
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Track Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-black font-semibold truncate">{track.name}</h3>
                                <div className="flex items-center gap-3 text-black/60 text-xs">
                                  <span>{new Date(track.album.release_date).getFullYear()}</span>
                                  <span>•</span>
                                  <span>{formatDuration(track.duration_ms)}</span>
                                </div>
                              </div>

                              {/* Platform Buttons */}
                              <div className="hidden md:block">
                                <PlatformButtons
                                  trackId={track.id}
                                  trackName={track.name}
                                  artistName={track.artists[0]?.name || 'Lazy Perfectionist'}
                                  className="scale-75"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Artist Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                {/* About Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-black/10">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-4">About</h3>
                    <div className="space-y-4">
                      <p className="text-black/70 leading-relaxed">
                        Lazy Perfectionist is an instrumental progressive rock/metal project blending technical precision with emotional storytelling.
                      </p>

                      <div className="space-y-3 pt-4 border-t border-black/10">
                        <div className="flex justify-between">
                          <span className="text-black/60 text-sm">Location</span>
                          <span className="text-black font-medium text-sm">Hong Kong</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-black/60 text-sm">Genre</span>
                          <span className="text-black font-medium text-sm">Instrumental Rock</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-black/60 text-sm">Active</span>
                          <span className="text-black font-medium text-sm">2024 - Present</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-black/10">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <a
                        href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linktree-button w-full inline-flex items-center justify-center px-4 py-3 font-semibold transition-all hover:scale-105"
                      >
                        <Music className="mr-2" size={18} />
                        Follow on Spotify
                      </a>
                      <a
                        href="https://linktr.ee/lazyperfectionist_official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linktree-button w-full inline-flex items-center justify-center px-4 py-3 font-semibold transition-all hover:scale-105"
                      >
                        <ExternalLink className="mr-2" size={18} />
                        All Links
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-black/10">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-4">Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{tracks.length}</div>
                        <div className="text-black/60 text-sm">Tracks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">1</div>
                        <div className="text-black/60 text-sm">Album</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}