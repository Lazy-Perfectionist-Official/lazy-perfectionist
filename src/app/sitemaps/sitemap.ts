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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lazy-perfectionist.vercel.app'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
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
  ]

  try {
    // Fetch dynamic content
    const [mediumPosts, spotifyTracks] = await Promise.all([
      getMediumPosts(),
      getSpotifyTracks()
    ])

    // Add Medium blog posts to sitemap
    const blogPages: MetadataRoute.Sitemap = mediumPosts.map((post) => ({
      url: post.link,
      lastModified: new Date(post.publishedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Add music platform links for each track
    const trackPages: MetadataRoute.Sitemap = spotifyTracks.map((track) => ({
      url: `${baseUrl}/platform-links?trackId=${track.id}`,
      lastModified: new Date(track.album.release_date),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }))

    return [...staticPages, ...blogPages, ...trackPages]
  } catch (error) {
    console.warn('Error generating dynamic sitemap content:', error)
    // Return static pages only if dynamic content fails
    return staticPages
  }
}