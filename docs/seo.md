# SEO Documentation

This document describes the comprehensive SEO implementation for the Lazy Perfectionist website, including structured data, meta tags, and optimization strategies.

## Overview

The SEO implementation includes:
- **Metadata Management**: Centralized SEO component for consistent meta tags
- **Structured Data**: JSON-LD schema markup for enhanced search results
- **Technical SEO**: Sitemap, robots.txt, and performance optimization
- **Music Industry SEO**: Specialized optimization for music discovery

## 🏗️ Architecture

### SEO Component (`/src/components/SEO.tsx`)

Central component for generating SEO metadata across all pages.

```typescript
import { generateSEOMetadata, generateStructuredData } from '@/components/SEO'

// Generate metadata for a page
export const metadata: Metadata = generateSEOMetadata({
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  ogType: 'website',
})

// Generate structured data
const structuredData = generateStructuredData('MusicGroup', {
  name: 'Lazy Perfectionist',
  description: 'Artist description',
  // ... other properties
})
```

### Metadata Options

The `generateSEOMetadata` function accepts:

```typescript
interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'music.song' | 'music.album'
  noindex?: boolean
  keywords?: string[]
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
  music?: {
    artist?: string
    album?: string
    releaseDate?: string
    duration?: string
    preview?: string
  }
}
```

## 📊 Structured Data Implementation

### MusicGroup Schema

Used for the artist/brand identity on the home page:

```json
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Lazy Perfectionist",
  "description": "Instrumental progressive rock/metal project from Hong Kong",
  "url": "https://lazyperfectionist.com",
  "image": "https://lazyperfectionist.com/assets/img/logo.png",
  "genre": ["Progressive Rock", "Progressive Metal", "Instrumental Rock"],
  "origin": "Hong Kong",
  "foundingDate": "2023",
  "member": {
    "@type": "Person",
    "name": "Sammy Lee",
    "jobTitle": "Musician, Producer"
  },
  "sameAs": [
    "https://open.spotify.com/artist/...",
    "https://youtube.com/@lazyperfectionist",
    "https://medium.com/@lazyperfectist",
    "https://ko-fi.com/lazyperfectionist"
  ]
}
```

### WebSite Schema

Enhances the website's search presence:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lazy Perfectionist",
  "url": "https://lazyperfectionist.com",
  "description": "Instrumental progressive rock/metal from Hong Kong",
  "potentialAction": {
    "@type": "ListenAction",
    "target": "https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8",
    "action-status": "ActiveActionStatus"
  }
}
```

### MusicSong Schema

Used on platform-links pages for individual tracks:

```json
{
  "@context": "https://schema.org",
  "@type": "MusicSong",
  "name": "Orbit",
  "byArtist": {
    "@type": "MusicGroup",
    "name": "Lazy Perfectionist"
  },
  "url": "https://open.spotify.com/track/...",
  "potentialAction": {
    "@type": "ListenAction",
    "target": ["spotify://...", "apple://...", ...],
    "action-status": "ActiveActionStatus"
  }
}
```

## 🔧 Technical SEO

### Sitemap (`/sitemap.xml`)

Dynamic sitemap generation with proper priorities:

- **Home**: Priority 1.0, Weekly updates
- **Music**: Priority 0.8, Weekly updates
- **Blog**: Priority 0.7, Daily updates
- **Store**: Priority 0.6, Monthly updates

### Robots.txt (`/robots.txt`)

Comprehensive crawling rules:

```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

Sitemap: https://lazyperfectionist.com/sitemap.xml
```

### Performance Optimization

- **Preconnect**: External domains (Spotify, YouTube, social platforms)
- **DNS Prefetch**: Social media platforms
- **Image Optimization**: Alt text and structured data for images
- **Resource Hints**: Font loading and critical resources

## 🎵 Music Industry SEO

### Music Discovery Meta Tags

Specialized meta tags for music platforms:

```html
<meta name="music:artist" content="Lazy Perfectionist">
<meta name="music:genre" content="Instrumental Progressive Rock">
<meta name="music:release_date" content="2025-10-17">
<meta name="music:title" content="Orbit">
<meta name="geo.region" content="HK">
<meta name="geo.placename" content="Hong Kong">
```

### Platform Integration

- **Spotify**: Rich integration with album art and track metadata
- **Apple Music**: Deep linking and preview functionality
- **YouTube**: Video schema and thumbnail optimization
- **Social Media**: Open Graph for music sharing

## 📱 Social Media Optimization

### Open Graph Tags

Comprehensive social media sharing:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Lazy Perfectionist">
<meta property="og:description" content="Instrumental progressive rock/metal from Hong Kong">
<meta property="og:image" content="https://lazyperfectionist.com/assets/img/logo.png">
<meta property="og:url" content="https://lazyperfectionist.com">
```

### Twitter Cards

Optimized for Twitter sharing:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Lazy Perfectionist">
<meta name="twitter:description" content="Hong Kong-based instrumental progressive rock project">
<meta name="twitter:image" content="https://lazyperfectionist.com/assets/img/logo.png">
<meta name="twitter:creator" content="@lazyperfectist">
```

## 🖼️ Image SEO

### Alt Text Optimization

Descriptive alt text for accessibility and search:

```html
<!-- Hero image -->
<img
  src="/assets/img/logo.png"
  alt="Lazy Perfectionist - Instrumental Progressive Rock/Metal Artist from Hong Kong"
  width="1200"
  height="630"
  loading="eager"
  priority
>

<!-- Album art -->
<img
  src="/assets/img/logo-handwritten.png"
  alt="Lazy Perfectionist - Orbit single cover art"
  width="400"
  height="400"
  loading="lazy"
>
```

### Image Structured Data

Images included in structured data for rich results:

```json
{
  "image": [
    {
      "url": "https://lazyperfectionist.com/assets/img/logo.png",
      "width": 1200,
      "height": 630,
      "caption": "Lazy Perfectionist Logo"
    }
  ]
}
```

## 🎯 Local SEO

### Geographic Targeting

Hong Kong-focused optimization:

```html
<meta name="geo.region" content="HK">
<meta name="geo.placename" content="Hong Kong">
```

### Local Business Schema

```json
{
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hong Kong",
      "addressCountry": "Hong Kong"
    }
  }
}
```

## 📊 Monitoring & Analytics

### Search Console Setup

1. **Verify Ownership**: Add domain to Google Search Console
2. **Submit Sitemap**: Submit `/sitemap.xml`
3. **Monitor Performance**: Track impressions, clicks, and rankings
4. **Enhancements**: Monitor structured data and Core Web Vitals

### Analytics Integration

- **Page Views**: Track SEO-driven traffic
- **Events**: Track music plays and downloads
- **Conversions**: Track store visits and support actions
- **Goals**: Set up SEO conversion goals

## 🔄 Maintenance

### Regular Tasks

- **Content Updates**: Keep blog posts fresh for crawl frequency
- **Schema Updates**: Update structured data for new releases
- **Performance Monitoring**: Monitor Core Web Vitals
- **Keyword Tracking**: Monitor music industry keywords
- **Backlink Building**: Build relationships with music blogs

### Technical Maintenance

- **Sitemap Updates**: Automatic with new content
- **Schema Validation**: Test with Google's Rich Results Test
- **Mobile Testing**: Ensure mobile-first indexing compliance
- **Speed Optimization**: Monitor and improve load times

## 📈 SEO Best Practices

### Content Strategy

- **Blog Posts**: Regular content about music creation and process
- **Music Releases**: SEO-optimized launch pages for new tracks
- **Behind the Scenes**: Studio insights and creative process
- **Local Focus**: Hong Kong music scene coverage

### Link Building

- **Music Blogs**: Reviews and features
- **Collaborations**: Guest posts with other musicians
- **Social Media**: Cross-platform promotion
- **Local Press**: Hong Kong music publications

### Technical Excellence

- **Mobile-First**: Responsive design for all devices
- **Speed**: Fast loading times (under 3 seconds)
- **Security**: HTTPS certificate and security headers
- **Accessibility**: WCAG compliance for better user experience

## 🧪 Testing & Validation

### SEO Testing Tools

1. **Google Rich Results Test**: Test structured data
2. **Google PageSpeed Insights**: Performance testing
3. **Screaming Frog**: Technical SEO audit
4. **Ahrefs/Semrush**: Keyword and competitive analysis
5. **GTmetrix**: Performance optimization

### Validation Checklist

- [ ] Meta tags are present and optimized
- [ ] Structured data validates without errors
- [ ] Images have descriptive alt text
- [ ] Internal linking is logical
- [ ] Page load speed is optimal
- [ ] Mobile usability is excellent
- [ ] URLs are clean and descriptive
- [ ] Content is unique and valuable

## 📚 Additional Resources

### Documentation Links

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

### Industry Specific Resources

- [Music SEO Guide](https://dottedmusic.com/music-seo/)
- [Spotify for Artists SEO](https://artists.spotify.com/help)
- [Apple Music for Artists](https://artists.apple.com/support)
- [YouTube Music SEO](https://creator.youtube.com/how-youtube-works)

---

## 🎵 Implementation Summary

This SEO implementation provides:

1. **Comprehensive Metadata**: All pages have optimized meta tags
2. **Rich Structured Data**: Enhanced search results with music schemas
3. **Technical Excellence**: Fast, accessible, and mobile-friendly
4. **Music Industry Focus**: Specialized optimization for music discovery
5. **Local Targeting**: Hong Kong market optimization
6. **Social Integration**: Optimized sharing across platforms

The implementation follows best practices and is designed to improve search engine visibility, drive organic traffic, and enhance music discovery across platforms.