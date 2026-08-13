'use client'

import { useState, useEffect } from 'react'
import { Music as MusicIcon, Play, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import { generateStructuredData } from '@/components/SEO'

interface CatalogRelease {
  id: string
  title: string
  year: string
  type: string
  duration: string
  cover: string
  spotifyUrl: string
  preview_url: string | null
}

const CATALOG: CatalogRelease[] = [
  {
    id: '4RnwmBIaSuOqGEu8R2nIsU',
    title: 'LUSG',
    year: '2026',
    type: 'Single',
    duration: '5:46',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02aa095364f6ef874ee7d6ddaf',
    spotifyUrl: 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU',
    preview_url: null,
  },
  {
    id: '5gQpSHmOlmQTrz2H1iznYV',
    title: 'Cyclothymia',
    year: '2026',
    type: 'Single',
    duration: '—',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f4434c21202aac2f3d05fd2e',
    spotifyUrl: 'https://open.spotify.com/track/5gQpSHmOlmQTrz2H1iznYV',
    preview_url: null,
  },
  {
    id: '1XIv8JGEDU9MZT6HEFmdk8',
    title: 'Orbit',
    year: '2025',
    type: 'Single',
    duration: '—',
    cover: '/assets/img/optimized/orbit-cover-1200.avif',
    spotifyUrl: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8',
    preview_url: null,
  },
]

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

    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setPlayingTrack(null)
    }

    if (playingTrack === track.id) {
      return
    }

    const audio = new Audio(track.preview_url)
    audio.play()
    setCurrentAudio(audio)
    setPlayingTrack(track.id)

    audio.onended = () => {
      setCurrentAudio(null)
      setPlayingTrack(null)
    }
  }

  return (
    <>
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

      <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream relative">
        <Background />
        <Navigation currentPage="music" />

        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="mb-6">
                <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
                  Discography
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display italic text-oryzo-cream mb-3">
                Music
              </h1>
              <p className="text-oryzo-body text-oryzo-muted max-w-2xl">
                Instrumental progressive rock from a Hong Kong bedroom studio.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Left Column - Featured Track */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Featured Single Card */}
                <div className="bg-oryzo-surface/40 border border-oryzo-border rounded-3xl overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 bg-oryzo-ember rounded-full animate-pulse" />
                      <span className="text-oryzo-muted text-sm font-oryzo-display uppercase tracking-wider">
                        Latest Single
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Album Art */}
                      <div className="relative group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-oryzo-canvas border border-oryzo-border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={CATALOG[0].cover}
                            alt={`Lazy Perfectionist - ${CATALOG[0].title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-oryzo-canvas/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <a
                              href={CATALOG[0].spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-16 h-16 md:w-20 md:h-20 bg-oryzo-ember rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform"
                              aria-label={`Play ${CATALOG[0].title} on Spotify`}
                            >
                              <Play size={28} className="text-oryzo-canvas ml-1" fill="currentColor" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Track Info */}
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-3xl md:text-4xl font-display italic text-oryzo-cream mb-1">{CATALOG[0].title}</h2>
                          <p className="text-lg text-oryzo-muted">Lazy Perfectionist</p>
                        </div>

                        <div className="flex items-center flex-wrap gap-3 text-oryzo-muted text-sm">
                          <span>{CATALOG[0].year}</span>
                          <span>•</span>
                          <span>Instrumental Rock</span>
                          <span>•</span>
                          <span>{CATALOG[0].type}</span>
                        </div>

                        <p className="text-oryzo-muted leading-relaxed">
                          Latest instrumental progressive rock release. Orchestral layers meet modern synths in a sound walk experiment.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <a
                            href={CATALOG[0].spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="liquid-glass rounded-full px-6 py-3 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2"
                          >
                            <Play size={16} />
                            STREAM NOW
                          </a>
                          <a
                            href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-6 py-3 font-oryzo-display text-sm text-oryzo-cream transition-colors inline-flex items-center justify-center gap-2"
                          >
                            <MusicIcon size={16} />
                            FOLLOW
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracklist */}
                <div className="bg-oryzo-surface/40 border border-oryzo-border rounded-3xl overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl md:text-2xl font-oryzo-display text-oryzo-cream">
                        DISCOGRAPHY
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-oryzo-muted text-sm">
                          {CATALOG.length} {CATALOG.length === 1 ? 'release' : 'releases'}
                        </span>
                        {playingTrack && (
                          <div className="flex items-center gap-1 text-oryzo-ember">
                            <div className="w-2 h-2 bg-oryzo-ember rounded-full animate-pulse" />
                            <span className="text-xs font-oryzo-display">PLAYING</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {CATALOG.map((release, index) => (
                        <a
                          key={release.id}
                          href={release.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-oryzo-canvas/30 hover:bg-oryzo-canvas/50 rounded-xl p-4 transition-colors flex items-center gap-4"
                        >
                          <div className="w-8 h-8 bg-oryzo-border/40 group-hover:bg-oryzo-ember/20 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                            <span className="text-oryzo-muted group-hover:text-oryzo-ember font-oryzo-display text-sm">
                              {index + 1}
                            </span>
                          </div>

                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={release.cover}
                            alt={`${release.title} cover art`}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="text-oryzo-cream font-oryzo-display truncate group-hover:text-oryzo-ember transition-colors">
                              {release.title.toUpperCase()}
                            </h4>
                            <div className="flex items-center gap-3 text-oryzo-muted text-xs">
                              <span>{release.year}</span>
                              <span>•</span>
                              <span>{release.type}</span>
                              {release.duration !== '—' && (
                                <>
                                  <span>•</span>
                                  <span>{release.duration}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-oryzo-muted group-hover:text-oryzo-ember transition-colors flex-shrink-0">
                            <Play size={16} fill="currentColor" />
                            <span className="text-xs font-oryzo-display hidden md:inline">PLAY</span>
                          </div>
                        </a>
                      ))}
                    </div>
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
                <div className="bg-oryzo-surface/40 border border-oryzo-border rounded-3xl p-6">
                  <h3 className="text-lg font-oryzo-display text-oryzo-cream mb-4">ABOUT</h3>
                  <p className="text-oryzo-muted leading-relaxed mb-4">
                    Instrumental progressive rock/metal project blending technical precision with emotional storytelling.
                  </p>
                  <div className="space-y-3 pt-4 border-t border-oryzo-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-oryzo-muted">Location</span>
                      <span className="text-oryzo-cream">Hong Kong</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-oryzo-muted">Genre</span>
                      <span className="text-oryzo-cream">Instrumental Rock</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-oryzo-muted">Active</span>
                      <span className="text-oryzo-cream">2024 — Present</span>
                    </div>
                  </div>
                </div>

                <div className="bg-oryzo-surface/40 border border-oryzo-border rounded-3xl p-6">
                  <h3 className="text-lg font-oryzo-display text-oryzo-cream mb-4">CONNECT</h3>
                  <div className="space-y-3">
                    <a
                      href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass rounded-full w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.02] transition-transform"
                    >
                      <MusicIcon size={16} />
                      FOLLOW ON SPOTIFY
                    </a>
                    <a
                      href="https://linktr.ee/lazyperfectionist_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-oryzo-border hover:border-oryzo-cream w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-oryzo-display text-sm text-oryzo-cream transition-colors"
                    >
                      <ExternalLink size={16} />
                      ALL LINKS
                    </a>
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
