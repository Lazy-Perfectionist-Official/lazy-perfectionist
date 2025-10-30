'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, Clock, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface BlogCardProps {
  post: MediumPost
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return date.toLocaleDateString(undefined, options)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Return simple placeholder during SSR to avoid hydration issues
  if (!isClient) {
    return (
      <div className="group">
        <Card className="linktree-button backdrop-blur-md border-black/20 overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-6 bg-white/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-3"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="linktree-button backdrop-blur-md border-black/20 overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl">
        <CardContent className="p-0">
          {/* Article Image - Fills entire card */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
            {!imageError && post.thumbnail && (
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}

            {/* Loading skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
            )}

            {/* Fallback placeholder */}
            {imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs">Article Image</p>
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Read time indicator */}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm border-0 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {post.readTime}
              </Badge>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 2).map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="text-xs bg-white/20 text-white backdrop-blur-sm border-0"
                  >
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs bg-white/10 text-white/80 backdrop-blur-sm border-0">
                    +{post.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Title */}
            <h3 className="font-bold text-lg mb-2 line-clamp-2 text-white group-hover:text-blue-200 transition-colors duration-200">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-sm mb-4 line-clamp-1 leading-relaxed">
              {post.subtitle}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span>{formatDate(post.publishedDate)}</span>
                {post.claps && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.claps.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center text-blue-300 group-hover:text-blue-200 transition-colors">
                <span className="mr-1">Read</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}