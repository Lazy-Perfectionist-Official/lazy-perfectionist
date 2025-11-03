import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';
import BlogPage from './BlogPage';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog - Music Production and Creative Journey',
  description: 'Read about Lazy Perfectionist\'s music production journey, creative process, and insights into instrumental rock composition from Hong Kong. Discover the stories behind the music.',
  keywords: [
    'music production blog',
    'Lazy Perfectionist blog',
    'instrumental rock blog',
    'Hong Kong music blog',
    'bedroom producer blog',
    'music composition',
    'creative process',
    'DIY musician',
    'progressive rock blog',
    'music production tips'
  ],
  ogType: 'website',
  canonical: 'https://lazyperfectionist.com/blog'
});

export default function Blog() {
  return <BlogPage />;
}