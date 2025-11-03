# SEO Implementation Examples

This document provides practical examples of how to use the SEO components and implement SEO features in the Lazy Perfectionist website.

## 🏗️ SEO Component Usage

### Basic Page Metadata

```typescript
// src/app/example-page/page.tsx
import { generateSEOMetadata } from '@/components/SEO'

export const metadata = generateSEOMetadata({
  title: 'Music',
  description: 'Discover Lazy Perfectionist\'s instrumental progressive rock/metal music',
  keywords: ['instrumental rock', 'progressive metal', 'Hong Kong musician'],
  ogType: 'website',
})
```

### Blog Post Metadata

```typescript
// src/app/blog/[slug]/page.tsx
import { generateSEOMetadata } from '@/components/SEO'

export const metadata = generateSEOMetadata({
  title: blogPost.title,
  description: blogPost.excerpt,
  keywords: blogPost.tags,
  ogType: 'article',
  article: {
    publishedTime: blogPost.publishedAt,
    modifiedTime: blogPost.updatedAt,
    author: 'Sammy Lee',
    section: 'Music Production',
    tags: blogPost.tags,
  },
})
```

### Music Release Metadata

```typescript
// src/app/music/[release]/page.tsx
import { generateSEOMetadata } from '@/components/SEO'

export const metadata = generateSEOMetadata({
  title: `${release.title} - Single`,
  description: `Listen to ${release.title} by Lazy Perfectionist. ${release.description}`,
  keywords: [...release.genres, 'instrumental rock', 'progressive metal'],
  ogImage: release.coverImage,
  ogType: 'music.album',
  music: {
    artist: 'Lazy Perfectionist',
    album: release.title,
    releaseDate: release.releaseDate,
    duration: release.duration,
    preview: release.previewUrl,
  },
})
```

## 📊 Structured Data Examples

### Music Group Schema

```typescript
import { generateStructuredData } from '@/components/SEO'

const artistSchema = generateStructuredData('MusicGroup', {
  name: 'Lazy Perfectionist',
  description: 'Instrumental progressive rock/metal project from Hong Kong',
  url: 'https://lazyperfectionist.com',
  image: 'https://lazyperfectionist.com/assets/img/logo.png',
  genre: ['Progressive Rock', 'Progressive Metal', 'Instrumental Rock'],
  origin: 'Hong Kong',
  foundingDate: '2023',
  member: {
    '@type': 'Person',
    name: 'Sammy Lee',
    jobTitle: 'Musician, Producer',
    nationality: 'Hong Kong'
  },
  sameAs: [
    'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
    'https://youtube.com/@lazyperfectionist',
    'https://medium.com/@lazyperfectist',
    'https://ko-fi.com/lazyperfectionist'
  ]
})
```

### Music Recording Schema

```typescript
const trackSchema = generateStructuredData('MusicRecording', {
  name: 'Orbit',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Lazy Perfectionist'
  },
  url: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8',
  image: 'https://lazyperfectionist.com/assets/img/orbit-cover.jpg',
  duration: 'PT4M32S',
  genre: 'Instrumental Progressive Rock',
  datePublished: '2025-10-17',
  recordLabel: 'Independent',
  provider: {
    '@type': 'MusicRelease',
    name: 'Orbit - Single',
    releaseDate: '2025-10-17'
  }
})
```

### Article Schema for Blog Posts

```typescript
const articleSchema = generateStructuredData('Article', {
  headline: blogPost.title,
  description: blogPost.excerpt,
  image: blogPost.featuredImage,
  datePublished: blogPost.publishedAt,
  dateModified: blogPost.updatedAt,
  author: {
    '@type': 'Person',
    name: 'Sammy Lee',
    url: 'https://lazyperfectionist.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lazy Perfectionist',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lazyperfectionist.com/assets/img/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://lazyperfectionist.com/blog/${blogPost.slug}`
  }
})
```

## 🎵 Music-Specific SEO Examples

### Album Page Optimization

```typescript
// src/app/music/album/[slug]/page.tsx
export const metadata = generateSEOMetadata({
  title: `${album.title} - Album | Lazy Perfectionist`,
  description: `Complete album ${album.title} by Lazy Perfectionist. ${album.trackCount} tracks of instrumental progressive rock/metal.`,
  keywords: [
    ...album.genres,
    'album',
    'full album',
    'instrumental music',
    'progressive rock',
    'Hong Kong musician'
  ],
  ogImage: album.coverImage,
  ogType: 'music.album',
  music: {
    artist: 'Lazy Perfectionist',
    album: album.title,
    releaseDate: album.releaseDate,
  }
})

// Structured data for the album
const albumSchema = generateStructuredData('MusicAlbum', {
  name: album.title,
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Lazy Perfectionist'
  },
  releaseDate: album.releaseDate,
  genre: album.genres,
  numTracks: album.trackCount,
  track: album.tracks.map((track, index) => ({
    '@type': 'MusicRecording',
    position: index + 1,
    name: track.title,
    duration: track.duration,
    url: track.spotifyUrl
  })),
  image: album.coverImage
})
```

### Platform Links Page Optimization

```typescript
// src/app/platform-links/page.tsx
const trackSchema = generateStructuredData('MusicSong', {
  name: trackName,
  byArtist: {
    '@type': 'MusicGroup',
    name: artistName
  },
  url: `https://open.spotify.com/track/${trackId}`,
  potentialAction: {
    '@type': 'ListenAction',
    target: platforms.map(platform => platform.url),
    'action-status': 'ActiveActionStatus'
  }
})
```

## 🖼️ Image SEO Examples

### Optimized Image Components

```typescript
import Image from 'next/image'

// Hero image with SEO optimization
<Image
  src="/assets/img/logo.png"
  alt="Lazy Perfectionist - Instrumental Progressive Rock/Metal Artist from Hong Kong"
  fill
  quality={85}
  className="object-cover object-center"
  sizes="100vw"
  priority
/>

// Album cover with structured data integration
<Image
  src={album.coverImage}
  alt={`${album.title} album cover by Lazy Perfectionist`}
  width={400}
  height={400}
  className="rounded-lg shadow-lg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

### Image Structured Data

```typescript
const imageSchema = generateStructuredData('ImageObject', {
  contentUrl: 'https://lazyperfectionist.com/assets/img/logo.png',
  description: 'Lazy Perfectionist logo - instrumental progressive rock artist',
  name: 'Lazy Perfectionist Logo',
  width: 1200,
  height: 630,
  thumbnailUrl: 'https://lazyperfectionist.com/assets/img/logo-thumb.jpg',
  author: {
    '@type': 'Person',
    name: 'Sammy Lee'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lazy Perfectionist'
  }
})
```

## 📱 Social Media SEO Examples

### Enhanced Social Sharing

```typescript
// For a new music release
export const metadata = generateSEOMetadata({
  title: '🎵 New Release: Orbit - Out Now!',
  description: 'My latest instrumental progressive rock track "Orbit" is now available on all streaming platforms! 🎸',
  keywords: ['new release', 'Orbit', 'instrumental rock', 'progressive metal'],
  ogImage: '/assets/img/orbit-release-social.jpg',
  ogType: 'music.song',
})

// Social sharing component
function SocialShare({ title, description, url }: SocialShareProps) {
  return (
    <div className="flex gap-4">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600"
      >
        Share on Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700"
      >
        Share on Facebook
      </a>
    </div>
  )
}
```

## 🔍 Local SEO Examples

### Hong Kong Business Schema

```typescript
const localBusinessSchema = generateStructuredData('LocalBusiness', {
  name: 'Lazy Perfectionist',
  description: 'Instrumental progressive rock/metal project based in Hong Kong',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hong Kong',
    addressCountry: 'HK',
    addressRegion: 'Hong Kong'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.3193,
    longitude: 114.1694
  },
  areaServed: 'Hong Kong',
  sameAs: [
    'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
    'https://youtube.com/@lazyperfectionist'
  ]
})
```

## 📊 Performance SEO Examples

### Component Loading Optimization

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const YouTubeEmbed = dynamic(() => import('@/components/YouTubeEmbed'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />,
  ssr: false
})

// Optimized image gallery
function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={image} className="relative aspect-square">
          <Image
            src={image}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            loading={index < 6 ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  )
}
```

## 🧪 SEO Testing Examples

### Rich Results Testing

```typescript
// Test structured data validity
function validateStructuredData(schema: any) {
  const validationEndpoint = 'https://search.google.com/test/rich-results'

  // Log structured data for testing
  console.log('Structured Data:', JSON.stringify(schema, null, 2))

  // In development, show validation UI
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-lg text-sm">
        <p className="font-semibold">SEO Debug Info:</p>
        <p>Schema Type: {schema['@type']}</p>
        <button
          onClick={() => navigator.clipboard.writeText(JSON.stringify(schema, null, 2))}
          className="mt-2 px-2 py-1 bg-yellow-200 rounded text-xs"
        >
          Copy Schema JSON
        </button>
      </div>
    )
  }
}
```

### Meta Tags Preview

```typescript
// Development component to preview meta tags
function MetaTagsPreview({ metadata }: { metadata: Metadata }) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">SEO Preview:</h3>
      <p><strong>Title:</strong> {metadata.title?.toString()}</p>
      <p><strong>Description:</strong> {metadata.description?.toString()}</p>
      <p><strong>Keywords:</strong> {metadata.keywords?.toString()}</p>
    </div>
  )
}
```

## 📈 Analytics Integration Examples

### SEO Event Tracking

```typescript
// Track SEO-driven interactions
function trackSEOEvent(action: string, label: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', action, {
      event_category: 'SEO',
      event_label: label,
      value: 1
    })
  }
}

// Usage in components
function StreamingLink({ platform, url }: { platform: string, url: string }) {
  const handleClick = () => {
    trackSEOEvent('streaming_platform_click', platform)
  }

  return (
    <a
      href={url}
      onClick={handleClick}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
    >
      {platform}
    </a>
  )
}
```

These examples provide practical implementations for various SEO features in the Lazy Perfectionist website. Adapt them to your specific needs and content types.