'use client'

import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import { generateStructuredData } from '@/components/SEO'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// LUSG cover art variants (self-hosted hi-res; Spotify CDN caps at 640px).
const LUSG_SRCSET = [
  '/assets/img/optimized/lusg-cover-400.avif 400w',
  '/assets/img/optimized/lusg-cover-800.avif 800w',
  '/assets/img/optimized/lusg-cover-1200.avif 1200w',
  '/assets/img/optimized/lusg-cover-1400.avif 1400w',
].join(', ')

// Featured cover fills one column of the md:grid-cols-2 layout inside the
// max-w-6xl container (px-6/px-10/lg:px-16 gutters, gap-10/md:gap-16).
const FEATURED_COVER_SIZES =
  '(min-width: 1200px) 480px, (min-width: 1024px) calc((100vw - 192px) / 2), (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)'

interface CatalogRelease {
  id: string
  title: string
  year: string
  type: string
  duration: string
  cover: string
  spotifyUrl: string
}

const CATALOG: CatalogRelease[] = [
  {
    id: '4RnwmBIaSuOqGEu8R2nIsU',
    title: 'LUSG',
    year: '2026',
    type: 'Single',
    duration: '5:46',
    cover: '/assets/img/optimized/lusg-cover-400.avif',
    spotifyUrl: 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU',
  },
  {
    id: '5gQpSHmOlmQTrz2H1iznYV',
    title: 'Cyclothymia',
    year: '2026',
    type: 'Single',
    duration: '—',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f4434c21202aac2f3d05fd2e',
    spotifyUrl: 'https://open.spotify.com/track/5gQpSHmOlmQTrz2H1iznYV',
  },
  {
    id: '1XIv8JGEDU9MZT6HEFmdk8',
    title: 'Orbit',
    year: '2025',
    type: 'Single',
    duration: '—',
    cover: '/assets/img/optimized/orbit-cover-1200.avif',
    spotifyUrl: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8',
  },
]

const FEATURED = CATALOG[0]

export default function MusicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('MusicGroup', {
          name: 'Lazy Perfectionist',
          description: 'Instrumental progressive rock project from Hong Kong. Latest single "LUSG", following "Cyclothymia" and the debut "Orbit".',
          url: 'https://lazyperfectionist.com/music',
          genre: ['Progressive Rock', 'Progressive Metal', 'Instrumental Rock'],
          origin: 'Hong Kong',
          foundingDate: '2023',
          album: {
            '@type': 'MusicAlbum',
            name: 'Orbit',
            releaseDate: '2025',
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

        <main>
        <section className="relative pt-36 pb-16 px-6 md:px-10 lg:px-16" data-testid="music-page">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <motion.div
              className="mb-16 md:mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: EASE }}
              data-testid="music-header"
            >
              <span className="block text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium mb-6">
                Discography
              </span>
              <h1 className="text-5xl md:text-7xl font-display italic text-oryzo-cream leading-[0.95] mb-6">
                Music
              </h1>
              <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body leading-relaxed">
                Instrumental progressive rock from a Hong Kong bedroom studio.
                Technical precision, emotional storytelling — no words required.
              </p>
            </motion.div>

            {/* Featured release — LUSG */}
            <motion.article
              className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE }}
              data-testid="music-featured"
            >
              {/* Cover art */}
              <a
                href={FEATURED.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl overflow-hidden border border-oryzo-border"
                aria-label={`Play ${FEATURED.title} on Spotify`}
              >
                <div className="aspect-square bg-oryzo-surface">
                  {/* FEATURED is LUSG (CATALOG[0]); swap srcSet/src if the featured release changes */}
                  <img
                    src="/assets/img/optimized/lusg-cover-1200.avif"
                    srcSet={LUSG_SRCSET}
                    sizes={FEATURED_COVER_SIZES}
                    alt={`Lazy Perfectionist — ${FEATURED.title} cover art`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-oryzo-canvas/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-oryzo-ember rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Play size={28} className="text-oryzo-canvas ml-1" fill="currentColor" />
                  </div>
                </div>
              </a>

              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-oryzo-ember rounded-full animate-pulse" />
                  <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
                    Latest Single
                  </span>
                </div>

                <h2 className="text-5xl md:text-6xl font-display italic text-oryzo-cream leading-[0.95] mb-4">
                  {FEATURED.title}
                </h2>

                <div className="flex items-center flex-wrap gap-3 text-sm text-oryzo-muted font-oryzo-body mb-6">
                  <span>{FEATURED.year}</span>
                  <span aria-hidden>•</span>
                  <span>{FEATURED.type}</span>
                  <span aria-hidden>•</span>
                  <span>{FEATURED.duration}</span>
                  <span aria-hidden>•</span>
                  <span>Instrumental Rock</span>
                </div>

                <p className="text-oryzo-muted leading-relaxed max-w-md mb-10 font-oryzo-body">
                  Orchestral layers meet modern synths in a sound-walk experiment.
                  The third single — and the quietest one yet.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={FEATURED.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-full px-8 py-4 font-medium text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2"
                    data-testid="music-stream-button"
                  >
                    <Play size={16} />
                    STREAM NOW
                  </a>
                  <a
                    href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-8 py-4 font-medium text-sm text-oryzo-cream transition-colors inline-flex items-center justify-center gap-2"
                    data-testid="music-follow-button"
                  >
                    FOLLOW
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Catalog — editorial rows */}
            <div>
              <motion.div
                className="mb-8 flex items-baseline justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: EASE }}
                data-testid="music-catalog-header"
              >
                <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
                  The Catalog
                </span>
                <span className="text-xs text-oryzo-muted font-oryzo-body">
                  {CATALOG.length} releases
                </span>
              </motion.div>

              <div className="border-t border-oryzo-border">
                {CATALOG.map((release, index) => (
                  <motion.a
                    key={release.id}
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_auto_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-8 border-b border-oryzo-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
                    data-testid="music-card"
                  >
                    <span className="text-xs text-oryzo-muted font-medium hidden md:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-oryzo-surface border border-oryzo-border flex-shrink-0">
                      <img
                        src={release.cover}
                        alt={`${release.title} cover art`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl md:text-2xl font-display italic text-oryzo-cream group-hover:text-oryzo-ember transition-colors duration-300 mb-1">
                        {release.title.toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-3 text-xs md:text-sm text-oryzo-muted font-oryzo-body">
                        <span>{release.year}</span>
                        <span aria-hidden>•</span>
                        <span>{release.type}</span>
                        {release.duration !== '—' && (
                          <>
                            <span aria-hidden>•</span>
                            <span>{release.duration}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="text-xs text-oryzo-muted group-hover:text-oryzo-cream group-hover:translate-x-1 transition-all duration-300 font-medium whitespace-nowrap">
                      LISTEN →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Closing strip */}
            <motion.div
              className="mt-20 md:mt-28 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE }}
              data-testid="music-closing"
            >
              <p className="font-display italic text-2xl md:text-4xl text-oryzo-cream mb-4">
                The next one is already taking shape.
              </p>
              <p className="text-sm text-oryzo-muted font-oryzo-body mb-10">
                Follow along so you don&apos;t miss it.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full px-8 py-4 font-medium text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2"
                >
                  FOLLOW ON SPOTIFY
                </a>
                <a
                  href="https://linktr.ee/lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-8 py-4 font-medium text-sm text-oryzo-cream transition-colors inline-flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  ALL LINKS
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        </main>
      </div>
    </>
  )
}
