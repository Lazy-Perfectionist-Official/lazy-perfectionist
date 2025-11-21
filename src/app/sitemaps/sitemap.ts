import { MetadataRoute } from 'next'

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

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    release_date: string
  }
  external_urls: {
    spotify: string
  }
}

async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://lazy-perfectionist.vercel.app'}/api/medium`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!response.ok) {
      console.warn('Failed to fetch Medium posts for sitemap')
      return []
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.warn('Error fetching Medium posts for sitemap:', error)
    return []
  }
}

async function getSpotifyTracks(): Promise<SpotifyTrack[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://lazy-perfectionist.vercel.app'}/api/spotify`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!response.ok) {
      console.warn('Failed to fetch Spotify tracks for sitemap')
      return []
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.warn('Error fetching Spotify tracks for sitemap:', error)
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lazy-perfectionist.vercel.app'

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/platform-links`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // Known Medium profile
    {
      url: 'https://medium.com/@lazyperfectist',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Known popular Medium posts (update these as needed)
    {
      url: 'https://medium.com/@lazyperfectist/how-i-created-orbit-for-lazy-perfectionist-from-bedroom-to-release-8bbcdc2b30f2',
      lastModified: new Date('2025-10-28'),
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  ]
}