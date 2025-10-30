'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ExternalLink, Calendar, Clock, User, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

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
}

export default function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchMediumData()
  }, [])

  const fetchMediumData = async () => {
    try {
      const response = await fetch('/api/medium')
      const data = await response.json()
      setPosts(data.data || [])
    } catch (error) {
      console.error('Failed to fetch Medium data:', error)
      setPosts([])
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
              className="text-xl md:text-2xl linktree-header-text/90 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Read my latest posts on Medium, where I share my stories and thoughts.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
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
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/90 rounded-2xl p-6 backdrop-blur-sm shadow-xl animate-pulse">
                  <div className="aspect-video rounded-xl bg-orange-100/50 mb-4"></div>
                  <div className="h-6 bg-orange-100/50 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-orange-100/50 rounded w-full mb-4"></div>
                  <div className="h-4 bg-orange-100/50 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white/90 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="relative">
                    <img
                      src="/assets/img/logo.png"
                      alt="Lazy Perfectionist Logo"
                      width={400}
                      height={250}
                      className="w-full h-48 object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm linktree-text/70 mb-3">
                      <span className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1" size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold linktree-text mb-2 group-hover:underline transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="linktree-text/70 mb-4 line-clamp-3">
                      {post.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-orange-200/50 text-linktree-text text-xs rounded-full border border-orange-300/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm linktree-text/60 flex items-center">
                        <User className="mr-1" size={14} />
                        {post.author}
                      </span>
                      
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linktree-text hover:underline font-medium inline-flex items-center text-sm transition-colors"
                      >
                        Read more <ExternalLink className="ml-1" size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <a
              href="https://medium.com/@lazyperfectist"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center px-8 py-3 font-semibold transition-all"
            >
              View All Stories on Medium
              <ExternalLink className="ml-2" size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}