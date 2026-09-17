'use client'

import { useState, useEffect } from 'react'
import { BookOpen, ExternalLink, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import BlogSortSelect from '@/components/blog/BlogSortSelect'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import { generateStructuredData } from '@/components/SEO'

interface MediumPost {
  id: string
  title: string
  subtitle: string
  author: string
  publishedDate: string
  readTime: string
  link: string
  thumbnail: string
  tags: string[]
  claps?: number
}

type SortOption = 'latest' | 'oldest' | 'popular'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const MEDIUM_PROFILE_URL = 'https://medium.com/@lazyperfectist'

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

export default function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [sortedPosts, setSortedPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMediumData()
  }, [sortBy])

  const fetchMediumData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/medium?limit=15&sort=${sortBy}`)
      if (!response.ok) {
        throw new Error('Failed to fetch Medium data')
      }
      const data = await response.json()
      setPosts(data.data || [])
      setSortedPosts(data.data || [])
      setError(null)
    } catch (err) {
      console.error('Failed to fetch Medium data:', err)
      setError('Unable to load articles. Please try again later.')
      setPosts([])
      setSortedPosts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('WebSite', {
          name: 'Lazy Perfectionist Blog',
          url: 'https://lazyperfectionist.com/blog',
          description: "Read about Lazy Perfectionist's music production journey, creative process, and insights into instrumental rock composition from Hong Kong.",
          potentialAction: {
            '@type': 'ReadAction',
            target: MEDIUM_PROFILE_URL
          }
        })}
      />

      {sortedPosts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData('Article', {
            '@type': 'Blog',
            name: 'Lazy Perfectionist Blog Posts',
            description: "Creative stories and insights from Lazy Perfectionist's music production journey",
            url: 'https://lazyperfectionist.com/blog',
            author: {
              '@type': 'Person',
              name: 'Sammy Lee',
              jobTitle: 'Musician, Producer'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Lazy Perfectionist'
            },
            datePublished: sortedPosts[0]?.publishedDate || new Date().toISOString(),
            dateModified: new Date().toISOString()
          })}
        />
      )}

      <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream relative">
        <Background />
        <Navigation currentPage="blog" />

        <main>
        <section className="relative pt-36 pb-16 px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <motion.div
              className="mb-16 md:mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: EASE }}
              data-testid="blog-header"
            >
              <span className="block text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display mb-6">
                Journal
              </span>
              <h1 className="text-5xl md:text-7xl font-display italic text-oryzo-cream leading-[0.95] mb-6">
                Behind the Music
              </h1>
              <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body leading-relaxed mb-10">
                Stories, process notes, and creative insights from the Lazy Perfectionist journey.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <BlogSortSelect value={sortBy} onChange={setSortBy} />
                <a
                  href={MEDIUM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full inline-flex items-center gap-2 px-8 py-4 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform"
                  data-testid="blog-follow-medium"
                >
                  <BookOpen size={16} />
                  FOLLOW ON MEDIUM
                </a>
              </div>
            </motion.div>

            {/* Stories */}
            {error ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="blog-error"
              >
                <div className="max-w-md mx-auto">
                  <BookOpen className="w-12 h-12 text-oryzo-muted mx-auto mb-4" />
                  <h2 className="text-xl font-oryzo-display text-oryzo-cream mb-2">
                    STORIES TEMPORARILY UNAVAILABLE
                  </h2>
                  <p className="text-oryzo-muted font-oryzo-body mb-8">{error}</p>
                  <button
                    onClick={fetchMediumData}
                    className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-8 py-4 font-oryzo-display text-sm text-oryzo-cream transition-colors inline-flex items-center gap-2"
                    data-testid="blog-retry"
                  >
                    <RefreshCw size={16} />
                    TRY AGAIN
                  </button>
                </div>
              </motion.div>
            ) : loading ? (
              <div data-testid="blog-loading">
                <div className="mb-8 flex items-baseline justify-between">
                  <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
                    The Stories
                  </span>
                </div>
                <div className="border-t border-oryzo-border">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      data-testid="loading-skeleton"
                      className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_auto_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-8 border-b border-oryzo-border animate-pulse"
                    >
                      <span className="hidden md:block h-3 w-6 bg-oryzo-cream/10 rounded" />
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-oryzo-cream/10" />
                      <div className="space-y-2">
                        <div className="h-4 bg-oryzo-cream/10 rounded w-3/4" />
                        <div className="h-3 bg-oryzo-cream/5 rounded w-1/3" />
                      </div>
                      <div className="h-3 w-10 bg-oryzo-cream/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : sortedPosts.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="blog-empty"
              >
                <div className="max-w-md mx-auto">
                  <BookOpen className="w-12 h-12 text-oryzo-muted mx-auto mb-4" />
                  <h2 className="text-xl font-oryzo-display text-oryzo-cream mb-2">
                    STORIES COMING SOON
                  </h2>
                  <p className="text-oryzo-muted font-oryzo-body mb-8">
                    New stories about the creative process are on the way.
                  </p>
                  <a
                    href={MEDIUM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-full inline-flex items-center gap-2 px-8 py-4 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform"
                  >
                    VISIT MEDIUM PROFILE
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Catalog header */}
                <motion.div
                  className="mb-8 flex items-baseline justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  data-testid="blog-catalog-header"
                >
                  <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
                    The Stories
                  </span>
                  <span className="text-xs text-oryzo-muted font-oryzo-body">
                    {sortedPosts.length} {sortedPosts.length === 1 ? 'story' : 'stories'}
                  </span>
                </motion.div>

                {/* Editorial rows */}
                <div className="border-t border-oryzo-border">
                  {sortedPosts.map((post, index) => (
                    <motion.a
                      key={post.id}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read article: ${post.title}`}
                      className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_auto_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-8 border-b border-oryzo-border"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.7, ease: EASE, delay: Math.min(index, 4) * 0.08 }}
                      data-testid="blog-card"
                    >
                      <span className="text-xs text-oryzo-muted font-oryzo-display hidden md:block">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-oryzo-surface border border-oryzo-border flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.thumbnail}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg md:text-xl font-oryzo-display text-oryzo-cream group-hover:text-oryzo-ember transition-colors duration-300 mb-1 truncate">
                          {post.title}
                        </h2>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs md:text-sm text-oryzo-muted font-oryzo-body">
                          <span>{formatDate(post.publishedDate)}</span>
                          <span aria-hidden>•</span>
                          <span>{post.readTime}</span>
                          {post.tags && post.tags.length > 0 && (
                            <>
                              <span aria-hidden>•</span>
                              <span>{post.tags[0].replace(/-/g, ' ')}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="text-xs text-oryzo-muted group-hover:text-oryzo-cream group-hover:translate-x-1 transition-all duration-300 font-oryzo-display whitespace-nowrap">
                        READ →
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {/* Closing strip */}
            <motion.div
              className="mt-20 md:mt-28 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE }}
              data-testid="blog-closing"
            >
              <p className="font-display italic text-2xl md:text-4xl text-oryzo-cream mb-4">
                Every track starts as a story.
              </p>
              <p className="text-sm text-oryzo-muted font-oryzo-body mb-10">
                Read the long-form versions on Medium.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={MEDIUM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full px-8 py-4 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2"
                  data-testid="blog-archive-link"
                >
                  <BookOpen size={16} />
                  EXPLORE COMPLETE ARCHIVE
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
