import type { MetadataRoute } from "next";

// One page, so the sitemap is one entry — and only when the deploy knows its
// own host. Without NEXT_PUBLIC_SITE_URL an empty urlset is honest; a
// localhost or parked-domain URL in it would not be.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
