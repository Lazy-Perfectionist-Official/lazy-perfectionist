import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import "@/lib/ssr-polyfills";
import PageTransition from "@/components/PageTransition";
import LenisProvider from "@/components/LenisProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import MonitoringInit from "@/components/MonitoringInit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

const instrumentalSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

// Enhanced metadata for SEO optimization
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lazyperfectionist.com'),
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
        url: 'https://lazyperfectionist.com/assets/img/optimized/logo-800.avif',
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
      'https://lazyperfectionist.com/assets/img/optimized/logo-800.avif',
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

// Note: Structured data is now handled at the page level to avoid conflicts

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

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#100904" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lazy Perf" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Lazy Perfectionist" />

        {/* Note: Structured data is now handled at the page level to avoid conflicts */}
      </head>
      <body
        className={`${inter.variable} ${instrumentalSerif.variable} antialiased bg-background text-foreground`}
      >
        <LenisProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </LenisProvider>
        <ServiceWorkerRegistration />
        <MonitoringInit />
        <Toaster />
      </body>
    </html>
  );
}
