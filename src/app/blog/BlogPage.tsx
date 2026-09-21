'use client'

import { useMemo, useState } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import BlogSortSelect from '@/components/blog/BlogSortSelect'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import { sortMediumPosts, type MediumPost, type MediumSort } from '@/lib/medium'

type SortOption = MediumSort

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const MEDIUM_PROFILE_URL = 'https://medium.com/@lazyperfectist'

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

// Stories are fetched on the server (see page.tsx) so crawlers and AI agents
// see them in the initial HTML; this component only re-sorts interactively.
export default function BlogPage({ initialPosts }: { initialPosts: MediumPost[] }) {
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  const sortedPosts = useMemo(
    () => sortMediumPosts(initialPosts, sortBy),
    [initialPosts, sortBy]
  )

  return (
    <>
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
            {sortedPosts.length === 0 ? (
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
