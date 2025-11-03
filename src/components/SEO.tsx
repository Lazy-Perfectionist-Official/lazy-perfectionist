import { Metadata } from 'next'

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

const siteName = 'Lazy Perfectionist'
const siteUrl = 'https://lazyperfectionist.com'
const defaultDescription = 'Lazy Perfectionist - Instrumental progressive rock/metal from Hong Kong. Discover technical precision meets emotional storytelling with orchestral layers, EDM-inspired synths, and anime music influences.'

export function generateSEOMetadata(props: SEOProps): Metadata {
  const {
    title,
    description = defaultDescription,
    canonical,
    ogImage = '/assets/img/logo.png',
    ogType = 'website',
    noindex = false,
    keywords = [],
    article,
    music
  } = props

  const fullTitle = title ? `${title} | ${siteName}` : siteName

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonical || siteUrl,
    },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      ...article && {
        article: {
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: article.author ? [article.author] : [],
          section: article.section,
          tags: article.tags,
        },
      },
      ...music && {
        music: {
          artists: music.artist ? [music.artist] : [],
          album: music.album,
          releaseDate: music.releaseDate,
          duration: music.duration,
          preview: music.preview,
        },
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@lazyperfectist',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code',
    },
  }

  return metadata
}

export function generateStructuredData(type: 'Organization' | 'Person' | 'MusicGroup' | 'WebSite' | 'Article' | 'MusicSong', data: any) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return {
    __html: JSON.stringify(baseStructuredData, null, 2),
  }
}