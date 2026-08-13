'use client'

import { useState, useEffect } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import BlogCard from '@/components/blog/BlogCard'
import BlogSortSelect from '@/components/blog/BlogSortSelect'
import BlogLoadingSkeleton from '@/components/blog/BlogLoadingSkeleton'
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

export default function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [sortedPosts, setSortedPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
            target: 'https://medium.com/@lazyperfectist'
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

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-8 mb-6">
                <div className="w-8 h-px bg-oryzo-border" />
                <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
                  Journal
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display italic text-oryzo-cream mb-4">
                Behind the Music
              </h1>

              <p className="text-base md:text-lg text-oryzo-muted max-w-3xl leading-relaxed mb-8">
                Stories, process notes, and creative insights from the Lazy Perfectionist journey.
              </p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={mounted ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-start"
              >
                <BlogSortSelect value={sortBy} onChange={setSortBy} />
                <a
                  href="https://medium.com/@lazyperfectist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full inline-flex items-center gap-2 px-6 py-3 text-sm font-oryzo-display text-oryzo-cream hover:scale-[1.03] transition-transform"
                >
                  <BookOpen size={16} />
                  FOLLOW ON MEDIUM
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <BookOpen className="w-12 h-12 text-oryzo-muted mx-auto mb-4" />
                  <h3 className="text-xl font-oryzo-display text-oryzo-cream mb-2">
                    STORIES TEMPORARILY UNAVAILABLE
                  </h3>
                  <p className="text-oryzo-muted mb-6">{error}</p>
                  <Button
                    onClick={fetchMediumData}
                    className="rounded-full border border-oryzo-border hover:border-oryzo-cream bg-transparent text-oryzo-cream hover:bg-transparent"
                  >
                    Refresh Stories
                  </Button>
                </div>
              </motion.div>
            ) : loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogLoadingSkeleton />
              </div>
            ) : sortedPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <BookOpen className="w-12 h-12 text-oryzo-muted mx-auto mb-4" />
                  <h3 className="text-xl font-oryzo-display text-oryzo-cream mb-2">
                    STORIES COMING SOON
                  </h3>
                  <p className="text-oryzo-muted mb-6">
                    New stories about the creative process are on the way.
                  </p>
                  <a
                    href="https://medium.com/@lazyperfectist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-full inline-flex items-center gap-2 px-6 py-3 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform"
                  >
                    VISIT MEDIUM PROFILE
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <p className="text-oryzo-muted text-sm">
                    Showing {sortedPosts.length} {sortedPosts.length === 1 ? 'story' : 'stories'}
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {sortedPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <a
                    href="https://medium.com/@lazyperfectist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-full inline-flex items-center gap-2 px-8 py-4 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.03] transition-transform group"
                  >
                    EXPLORE COMPLETE ARCHIVE
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
