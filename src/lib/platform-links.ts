// Platform Links Service for Multi-Platform Integration

export interface PlatformLink {
  platform: string
  url: string
  country: string
  entityUniqueIds: {
    [key: string]: string
  }
}

export interface PlatformLinksResponse {
  entityId: string
  userCountry: string
  userCountryEntityUniqueId: string
  pageUrl: string
  linksByPlatform: {
    [platform: string]: PlatformLink[]
  }
  entities: {
    [key: string]: {
      title: string
      artistName: string
      thumbnailUrl: string
      thumbnailWidth: number
      thumbnailHeight: number
    }
  }
}

// Platform configurations
export const PLATFORM_CONFIGS = {
  spotify: {
    name: 'Spotify',
    color: '#1DB954',
    icon: '🎵',
    order: 1
  },
  apple_music: {
    name: 'Apple Music',
    color: '#FC3C44',
    icon: '🎵',
    order: 2
  },
  youtube_music: {
    name: 'YouTube Music',
    color: '#FF0000',
    icon: '▶️',
    order: 3
  },
  soundcloud: {
    name: 'SoundCloud',
    color: '#FF5500',
    icon: '🎵',
    order: 4
  },
  bandcamp: {
    name: 'Bandcamp',
    color: '#1DA0DC',
    icon: '💿',
    order: 5
  },
  amazon_music: {
    name: 'Amazon Music',
    color: '#00A8E1',
    icon: '🎵',
    order: 6
  },
  tidal: {
    name: 'TIDAL',
    color: '#000000',
    icon: '🎵',
    order: 7
  },
  deezer: {
    name: 'Deezer',
    color: '#E31E24',
    icon: '🎵',
    order: 8
  },
  napster: {
    name: 'Napster',
    color: '#E94B3C',
    icon: '🎵',
    order: 9
  },
  pandora: {
    name: 'Pandora',
    color: '#005483',
    icon: '🎵',
    order: 10
  }
}

export class PlatformLinksService {
  private songlinkApiKey: string | null = null
  private cache: Map<string, { data: PlatformLinksResponse; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

  constructor() {
    this.songlinkApiKey = process.env.SONGLINK_API_KEY || null
  }

  private getCacheKey(trackName: string, artistName: string, isrc?: string): string {
    return `${trackName}-${artistName}-${isrc || 'no-isrc'}`
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION
  }

  async getPlatformLinks(
    trackName: string,
    artistName: string,
    isrc?: string,
    spotifyId?: string
  ): Promise<PlatformLinksResponse | null> {
    const cacheKey = this.getCacheKey(trackName, artistName, isrc)
    const cached = this.cache.get(cacheKey)

    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data
    }

    // Try different methods to find the track
    let result = null

    // Method 1: Use ISRC if available (most reliable)
    if (isrc) {
      result = await this.searchByISRC(isrc)
      if (result) {
        this.cache.set(cacheKey, { data: result, timestamp: Date.now() })
        return result
      }
    }

    // Method 2: Use Spotify ID if available
    if (spotifyId) {
      result = await this.searchBySpotifyId(spotifyId)
      if (result) {
        this.cache.set(cacheKey, { data: result, timestamp: Date.now() })
        return result
      }
    }

    // Method 3: Search by track name and artist
    result = await this.searchByMetadata(trackName, artistName)
    if (result) {
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() })
      return result
    }

    // If all methods fail, return a basic fallback
    return this.createFallbackLinks(trackName, artistName)
  }

  private async searchByISRC(isrc: string): Promise<PlatformLinksResponse | null> {
    try {
      if (!this.songlinkApiKey) {
        console.log('Songlink API key not configured, using fallback')
        return null
      }

      const response = await fetch(
        `https://api.song.link/v1/links?url=isrc:${encodeURIComponent(isrc)}&userCountry=US&key=${this.songlinkApiKey}`
      )

      if (!response.ok) {
        console.error('Songlink API error:', response.status, response.statusText)
        return null
      }

      return await response.json()
    } catch (error) {
      console.error('Error searching by ISRC:', error)
      return null
    }
  }

  private async searchBySpotifyId(spotifyId: string): Promise<PlatformLinksResponse | null> {
    try {
      if (!this.songlinkApiKey) {
        console.log('Songlink API key not configured, using fallback')
        return null
      }

      const spotifyUrl = `https://open.spotify.com/track/${spotifyId}`
      const response = await fetch(
        `https://api.song.link/v1/links?url=${encodeURIComponent(spotifyUrl)}&userCountry=US&key=${this.songlinkApiKey}`
      )

      if (!response.ok) {
        console.error('Songlink API error:', response.status, response.statusText)
        return null
      }

      return await response.json()
    } catch (error) {
      console.error('Error searching by Spotify ID:', error)
      return null
    }
  }

  private async searchByMetadata(trackName: string, artistName: string): Promise<PlatformLinksResponse | null> {
    try {
      if (!this.songlinkApiKey) {
        console.log('Songlink API key not configured, using fallback')
        return null
      }

      // Search using track name and artist
      const searchQuery = `${trackName} ${artistName}`
      const response = await fetch(
        `https://api.song.link/v1/search?type=song&query=${encodeURIComponent(searchQuery)}&userCountry=US&key=${this.songlinkApiKey}`
      )

      if (!response.ok) {
        console.error('Songlink API error:', response.status, response.statusText)
        return null
      }

      const data = await response.json()

      // Return the first result if available
      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0]
        return await this.searchBySpotifyId(firstResult.id)
      }

      return null
    } catch (error) {
      console.error('Error searching by metadata:', error)
      return null
    }
  }

  private createFallbackLinks(trackName: string, artistName: string): PlatformLinksResponse {
    // Use consistent search query across all platforms with proper URL encoding
    const searchQuery = `${trackName} ${artistName}`
    const spotifyQuery = encodeURIComponent(searchQuery).replace(/\+/g, '%20')
    const appleSearchQuery = encodeURIComponent(searchQuery).replace(/\+/g, '%20')
    const youtubeQuery = encodeURIComponent(searchQuery).replace(/\+/g, '%20')
    const soundcloudQuery = encodeURIComponent(searchQuery).replace(/\+/g, '%20')

    const fallbackLinks: PlatformLinksResponse = {
      entityId: 'fallback',
      userCountry: 'US',
      userCountryEntityUniqueId: 'fallback',
      pageUrl: `https://song.link/search/${spotifyQuery}`,
      linksByPlatform: {
        spotify: [{
          platform: 'spotify',
          url: `https://open.spotify.com/search/${spotifyQuery}`,
          country: 'US',
          entityUniqueIds: { 'trackId': 'search' }
        }],
        apple_music: [{
          platform: 'apple_music',
          url: `https://music.apple.com/search?term=${appleSearchQuery}`,
          country: 'US',
          entityUniqueIds: { 'trackId': 'search' }
        }],
        youtube_music: [{
          platform: 'youtube_music',
          url: `https://music.youtube.com/search?q=${youtubeQuery}`,
          country: 'US',
          entityUniqueIds: { 'trackId': 'search' }
        }],
        soundcloud: [{
          platform: 'soundcloud',
          url: `https://soundcloud.com/search/sounds?q=${soundcloudQuery}`,
          country: 'US',
          entityUniqueIds: { 'trackId': 'search' }
        }]
      },
      entities: {
        fallback: {
          title: trackName,
          artistName: artistName,
          thumbnailUrl: '',
          thumbnailWidth: 0,
          thumbnailHeight: 0
        }
      }
    }

    return fallbackLinks
  }

  getAvailablePlatforms(links: PlatformLinksResponse): Array<{
    platform: string
    name: string
    url: string
    color: string
    icon: string
    order: number
  }> {
    const platforms = []

    for (const [platformKey, config] of Object.entries(PLATFORM_CONFIGS)) {
      const platformLinks = links.linksByPlatform[platformKey]
      if (platformLinks && platformLinks.length > 0) {
        platforms.push({
          platform: platformKey,
          name: config.name,
          url: platformLinks[0].url,
          color: config.color,
          icon: config.icon,
          order: config.order
        })
      }
    }

    // Sort by order number
    return platforms.sort((a, b) => a.order - b.order)
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const platformLinksService = new PlatformLinksService()