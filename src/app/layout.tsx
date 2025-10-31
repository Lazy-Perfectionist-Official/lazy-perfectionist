import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Text({
  weight: ["400"],               // regular
  style: ["normal", "italic"],   // both normal & italic
  subsets: ["latin"],
  variable: "--font-dm-serif",   // CSS variable name
  display: "swap",               // prevents FOIT
});

// Enhanced metadata for SEO optimization
export const metadata: Metadata = {
  title: {
    default: 'Lazy Perfectionist - Bedroom Instrumental Rock | Hong Kong',
    template: '%s | Lazy Perfectionist'
  },
  description: 'Lazy Perfectionist is a Hong Kong-based instrumental progressive rock project creating bedroom rock that blends technical precision with emotional storytelling. Debut single "Orbit" available now on all platforms.',
  keywords: [
    'Lazy Perfectionist',
    'instrumental rock',
    'bedroom rock',
    'Hong Kong music',
    'progressive rock',
    'instrumental progressive',
    'bedroom producer',
    'DIY musician',
    'Orbit single',
    'Hong Kong artist',
    'instrumental metal',
    'progressive metal',
    'ambient rock',
    'experimental music',
    'independent artist',
    'Sammy Lee',
    'music production',
    'guitar instrumental',
    'progressive rock Hong Kong'
  ],
  authors: [{ name: 'Sammy Lee', url: 'https://lazyperfectionist.com' }],
  creator: 'Sammy Lee',
  publisher: 'Lazy Perfectionist',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lazyperfectionist.com',
    siteName: 'Lazy Perfectionist',
    title: 'Lazy Perfectionist - Bedroom Instrumental Rock | Hong Kong',
    description: 'Lazy Perfectionist is a Hong Kong-based instrumental progressive rock project creating bedroom rock that blends technical precision with emotional storytelling.',
    images: [
      {
        url: 'https://lazyperfectionist.com/assets/img/logo.png',
        width: 1200,
        height: 1200,
        alt: 'Lazy Perfectionist Logo',
      },
      {
        url: 'https://lazyperfectionist.com/assets/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lazy Perfectionist - Bedroom Instrumental Rock',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lazy Perfectionist - Bedroom Instrumental Rock',
    description: 'Hong Kong-based instrumental progressive rock project. Debut single "Orbit" available now.',
    images: [
      'https://lazyperfectionist.com/assets/img/logo.png',
      'https://lazyperfectionist.com/assets/img/twitter-image.jpg',
    ],
    creator: '@lazyperfectist',
    site: '@lazyperfectist',
  },
  alternates: {
    canonical: 'https://lazyperfectionist.com',
  },
  other: {
    'music.artist': 'Lazy Perfectionist',
    'music.genre': 'Instrumental Progressive Rock',
    'music.release_date': '2025-10-17',
    'music.release_type': 'single',
    'music.title': 'Orbit',
    'geo.region': 'HK',
    'geo.placename': 'Hong Kong',
  },
};

// JSON-LD structured data for music artist
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Lazy Perfectionist',
  description: 'Hong Kong-based instrumental progressive rock project creating bedroom rock that blends technical precision with emotional storytelling.',
  url: 'https://lazyperfectionist.com',
  image: 'https://lazyperfectionist.com/assets/img/logo.png',
  sameAs: [
    'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
    'https://www.youtube.com/watch?v=Hw2a43RV1p0',
    'https://medium.com/@lazyperfectist',
    'https://instagram.com/lazyperfectionist_official',
    'https://tiktok.com/@lazyperfectionist_official',
  ],
  genre: ['Instrumental Progressive Rock', 'Bedroom Rock', 'Progressive Metal'],
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressCountry: 'Hong Kong',
    },
  },
  album: {
    '@type': 'MusicAlbum',
    name: 'Orbit - Single',
    releaseDate: '2025-10-17',
    byArtist: {
      '@type': 'MusicGroup',
      name: 'Lazy Perfectionist',
    },
  },
  track: {
    '@type': 'MusicRecording',
    name: 'Orbit',
    byArtist: {
      '@type': 'MusicGroup',
      name: 'Lazy Perfectionist',
    },
    duration: 'PT4M32S',
    genre: 'Instrumental Progressive Rock',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.scdn.co" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* DNS prefetch for social media platforms */}
        <link rel="dns-prefetch" href="//open.spotify.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//medium.com" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="dns-prefetch" href="//tiktok.com" />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Additional meta tags for music discovery */}
        <meta name="music:artist" content="Lazy Perfectionist" />
        <meta name="music:genre" content="Instrumental Progressive Rock" />
        <meta name="music:release_date" content="2025-10-17" />
        <meta name="music:title" content="Orbit" />
        <meta name="geo.region" content="HK" />
        <meta name="geo.placename" content="Hong Kong" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
