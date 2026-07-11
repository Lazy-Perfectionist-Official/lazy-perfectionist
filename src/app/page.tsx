import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';
import LazyPerfectionistHero from './LazyPerfectionistHero';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home - Bedroom Instrumental Rock | Hong Kong',
  description: 'Lazy Perfectionist - Instrumental progressive rock/metal project from Hong Kong. Where technical precision meets emotional storytelling without saying a word.',
  keywords: [
    'Lazy Perfectionist',
    'instrumental rock',
    'progressive metal',
    'bedroom producer',
    'Hong Kong music',
    'progressive rock',
    'instrumental progressive',
    'cinematic design',
    'glassmorphic interface'
  ],
  ogType: 'website',
  canonical: 'https://lazyperfectionist.com'
});

export default function Home() {
  return <LazyPerfectionistHero />;
}
