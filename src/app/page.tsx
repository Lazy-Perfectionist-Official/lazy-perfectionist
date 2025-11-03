import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';
import HomePage from './HomePage';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home - Bedroom Instrumental Rock from Hong Kong',
  description: 'Lazy Perfectionist - Instrumental progressive rock/metal project from Hong Kong. Discover technical precision meets emotional storytelling with orchestral layers, EDM-inspired synths, and anime music influences. featuring the Orbit single.',
  keywords: [
    'Lazy Perfectionist Band',
    'Lazy Perfectionist Project',
    'instrumental rock',
    'progressive metal',
    'bedroom producer',
    'Hong Kong music',
    'orchestral rock',
    'EDM influences',
    'anime music',
    'Lazy Perfectionist',
    'Orbit Band',
    'Orbit Single',
    'Hong Kong rock band',
    'progressive metal band',
    'instrumental rock band',
    'bedroom rock band'
  ],
  ogType: 'website',
  canonical: 'https://lazyperfectionist.com'
});

export default function Home() {
  return <HomePage />;
}