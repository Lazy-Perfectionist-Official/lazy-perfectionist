'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ExternalLink, Calendar, Clock, User, Menu, X, Book } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import BlogCard from '@/components/blog/BlogCard'
import BlogSortSelect from '@/components/blog/BlogSortSelect'
import BlogLoadingSkeleton from '@/components/blog/BlogLoadingSkeleton'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchMediumData()
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
    } catch (error) {
      console.error('Failed to fetch Medium data:', error)
      setError('Unable to load articles. Please try again later.')
      setPosts([])
      setSortedPosts([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen linktree-gradient relative">
      {/* -----------------------------------------------------------------
          Background gradient (base layer) */}
      <div className="fixed inset-0 -z-20 pointer-events-none" />

      {/* -----------------------------------------------------------------
          Noise texture overlay - OVER the gradient */}
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
            {/* Icon */}
            <motion.div
              className="mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={mounted ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookOpen className="w-24 h-24 linktree-text mx-auto" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold linktree-header-text mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Stories & Thoughts
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl linktree-text/80 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Read my latest posts on Medium, where I share my stories and thoughts.
            </motion.p>

            {/* Sorting and CTA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            >
              <BlogSortSelect value={sortBy} onChange={setSortBy} />
              <a
                href="https://medium.com/@lazyperfectist"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-button inline-flex items-center px-8 py-4 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <BookOpen className="mr-2" size={22} />
                Follow on Medium
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
                <div className="text-orange-400 mb-4">
                  <Book className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Unable to Load Articles
                </h3>
                <p className="linktree-text/80 mb-6">
                  {error}
                </p>
                <Button
                  onClick={fetchMediumData}
                  className="linktree-button"
                >
                  Try Again
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
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Articles Found
                </h3>
                <p className="linktree-text/80 mb-6">
                  Be the first to know when new stories are published.
                </p>
                <a
                  href="https://medium.com/@lazyperfectist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linktree-button inline-flex items-center px-6 py-3 font-semibold transition-all"
                >
                  Visit Medium
                  <ExternalLink className="ml-2" size={16} />
                </a>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Article count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-8"
              >
                <p className="linktree-text/70">
                  Showing {sortedPosts.length} of {posts.length} articles
                </p>
              </motion.div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {sortedPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Enhanced See More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex flex-col items-center">
                  <p className="linktree-text/70 mb-4 text-sm">
                    Read more stories on Medium
                  </p>
                  <a
                    href="https://medium.com/@lazyperfectist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linktree-button inline-flex items-center px-8 py-4 font-semibold text-lg transition-all hover:scale-105 active:scale-95 group"
                  >
                    <span className="group-hover:text-orange-300 transition-colors">
                      View All Stories on Medium
                    </span>
                    <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </a>
                  <p className="linktree-text/60 text-xs mt-3">
                    Full archive with {posts.length > 15 ? '100+' : `${posts.length}+`} articles
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}