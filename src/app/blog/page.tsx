import { Metadata } from 'next';
import { generateSEOMetadata, generateStructuredData } from '@/components/SEO';
import { getMediumPosts } from '@/lib/medium';
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

// Revalidate the server-rendered story list hourly: fresh enough for a
// Medium-sourced journal, cheap enough to stay effectively static.
export const revalidate = 3600;

export default async function Blog() {
  const { posts } = await getMediumPosts(15, 'latest');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('WebSite', {
          name: 'Lazy Perfectionist Blog',
          url: 'https://lazyperfectionist.com/blog',
          description: "Read about Lazy Perfectionist's music production journey, creative process, and insights into instrumental rock composition from Hong Kong.",
          potentialAction: {
            '@type': 'ReadAction',
            target: 'https://medium.com/@lazyperfectist'
          }
        })}
      />

      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData('Article', {
            '@type': 'Blog',
            name: 'Lazy Perfectionist Blog Posts',
            description: "Creative stories and insights from Lazy Perfectionist's music production journey",
            url: 'https://lazyperfectionist.com/blog',
            author: {
              '@type': 'Person',
              name: 'Sammy Lee',
              jobTitle: 'Musician, Producer'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Lazy Perfectionist'
            },
            datePublished: posts[0]?.publishedDate || new Date().toISOString(),
            dateModified: posts[0]?.publishedDate || new Date().toISOString()
          })}
        />
      )}

      <BlogPage initialPosts={posts} />
    </>
  );
}
