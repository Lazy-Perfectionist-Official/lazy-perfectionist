import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';
import MusicPage from './MusicPage';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Music - Instrumental Progressive Rock from Hong Kong',
  description: 'Listen to Lazy Perfectionist\'s instrumental progressive rock music. Featuring the debut single "Orbit" - a blend of technical precision and emotional storytelling from Hong Kong.',
  keywords: [
    'instrumental progressive rock',
    'Lazy Perfectionist music',
    'Orbit single',
    'Hong Kong musician',
    'bedroom producer',
    'progressive metal',
    'instrumental rock',
    'Spotify music'
  ],
  ogType: 'website',
  canonical: 'https://lazyperfectionist.com/music',
  music: {
    artist: 'Lazy Perfectionist',
    album: 'Orbit',
    releaseDate: '2024',
  }
});

export default function Music() {
  return <MusicPage />;
}