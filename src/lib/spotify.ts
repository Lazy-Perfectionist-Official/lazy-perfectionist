import SpotifyWebApi from 'spotify-web-api-node'

// Spotify API configuration
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

const ARTIST_ID = process.env.SPOTIFY_ARTIST_ID

// Cache for access token
let accessToken: string | null = null
let tokenExpiry: number = 0

async function getAccessToken(): Promise<string> {
  // Check if current token is still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken
  }

  try {
    const response = await spotifyApi.clientCredentialsGrant()
    accessToken = response.body.access_token
    // Set expiry to 1 hour from now (with 5 minute buffer)
    tokenExpiry = Date.now() + (response.body.expires_in - 300) * 1000
    spotifyApi.setAccessToken(accessToken)
    return accessToken
  } catch (error) {
    console.error('Error getting Spotify access token:', error)
    throw new Error('Failed to authenticate with Spotify')
  }
}

export interface SpotifyTrack {
  id: string
  name: string
  track_number: number
  duration_ms: number
  preview_url: string | null
  explicit: boolean
  popularity: number
  external_urls: {
    spotify: string
  }
  album: {
    id: string
    name: string
    release_date: string
    total_tracks: number
    images: Array<{
      url: string
      height: number | null
      width: number | null
    }>
    album_type: string
  }
  external_ids: {
    isrc: string | null
  }
}

export interface SpotifyArtist {
  id: string
  name: string
  followers: {
    total: number
  }
  popularity: number
  images: Array<{
    url: string
    height: number | null
    width: number | null
  }>
  genres: string[]
}

export interface SpotifyAlbum {
  id: string
  name: string
  release_date: string
  total_tracks: number
  images: Array<{
    url: string
    height: number | null
    width: number | null
  }>
  album_type: string
  external_urls: {
    spotify: string
  }
}

export async function getArtist(): Promise<SpotifyArtist | null> {
  try {
    await getAccessToken()
    const response = await spotifyApi.getArtist(ARTIST_ID!)
    return response.body
  } catch (error) {
    console.error('Error fetching artist:', error)
    return null
  }
}

export async function getArtistAlbums(): Promise<SpotifyAlbum[]> {
  try {
    await getAccessToken()
    const response = await spotifyApi.getArtistAlbums(ARTIST_ID!, {
      limit: 50,
      include_groups: 'album,single,compilation',
    })
    return response.body.items
  } catch (error) {
    console.error('Error fetching artist albums:', error)
    return []
  }
}

export async function getAlbumTracks(albumId: string): Promise<SpotifyTrack[]> {
  try {
    await getAccessToken()
    const response = await spotifyApi.getAlbumTracks(albumId, { limit: 50 })

    // Get detailed track information with audio features
    const tracks = response.body.items
    const detailedTracks = []

    for (const track of tracks) {
      if (track.id) {
        try {
          const trackResponse = await spotifyApi.getTrack(track.id)
          detailedTracks.push(trackResponse.body)
        } catch (error) {
          console.error(`Error fetching track ${track.id}:`, error)
          // Still include basic track info if detailed fetch fails
          detailedTracks.push(track as any)
        }
      }
    }

    return detailedTracks
  } catch (error) {
    console.error('Error fetching album tracks:', error)
    return []
  }
}

export async function getAllArtistTracks(): Promise<SpotifyTrack[]> {
  try {
    const albums = await getArtistAlbums()
    const allTracks: SpotifyTrack[] = []

    for (const album of albums) {
      const tracks = await getAlbumTracks(album.id)
      allTracks.push(...tracks)
    }

    // Sort by release date (newest first) and track number
    allTracks.sort((a, b) => {
      const dateA = new Date(a.album.release_date).getTime()
      const dateB = new Date(b.album.release_date).getTime()
      if (dateB !== dateA) {
        return dateB - dateA
      }
      return a.track_number - b.track_number
    })

    return allTracks
  } catch (error) {
    console.error('Error fetching all artist tracks:', error)
    return []
  }
}

export async function searchTrackOnPlatforms(trackName: string, artistName: string): Promise<any> {
  // This will be implemented with Songlink API later
  // For now, return placeholder data
  return {
    platforms: {
      spotify: `https://open.spotify.com/search/${encodeURIComponent(`${trackName} ${artistName}`)}`,
      apple_music: `https://music.apple.com/search?term=${encodeURIComponent(`${trackName} ${artistName}`)}`,
      youtube_music: `https://music.youtube.com/search?q=${encodeURIComponent(`${trackName} ${artistName}`)}`,
    }
  }
}