import { MetadataRoute } from 'next'

const baseUrl = 'https://lazyperfectionist.com'

// /store is a server-side redirect to the external Ko-fi shop, so it is not
// listed. Medium posts live on medium.com — sitemaps may only contain URLs
// on the sitemap's own host, so they are intentionally excluded here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/platform-links`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
