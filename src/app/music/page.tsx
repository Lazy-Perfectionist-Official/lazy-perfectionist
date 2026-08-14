import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';
import MusicPage from './MusicPage';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Music - Instrumental Progressive Rock from Hong Kong',
  description: 'Listen to Lazy Perfectionist instrumental progressive rock. Latest single "LUSG", followed by "Cyclothymia" and the debut "Orbit" — technical precision and emotional storytelling from Hong Kong.',
  keywords: [
    'Lazy Perfectionist Band',
    'Lazy Perfectionist Project',
    'instrumental progressive rock',
    'Lazy Perfectionist music',
    'LUSG single',
    'Cyclothymia single',
    'Orbit Band',
    'Orbit single',
    'Hong Kong rock band',
    'Hong Kong musician',
    'bedroom producer',
    'progressive metal band',
    'instrumental rock band',
    'Spotify music'
  ],
  ogType: 'website',
  canonical: 'https://lazyperfectionist.com/music',
  music: {
    artist: 'Lazy Perfectionist',
    album: 'LUSG',
    releaseDate: '2026',
  }
});

export default function Music() {
  return <MusicPage />;
}