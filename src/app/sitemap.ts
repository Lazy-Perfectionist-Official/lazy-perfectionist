import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// The cover and the four plate screens. SITE_URL resolves to the deploy's
// own host (a domain when set, Vercel's otherwise); with no host at all the
// urlset stays empty rather than naming a localhost or a parked domain.
// No lastModified: a build timestamp would claim the pages changed every
// deploy, and an untrue lastmod is worse than none.
const ROUTES = ["", "/music", "/discography", "/shop", "/writing"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  return ROUTES.map((route) => ({
    url: new URL(route || "/", SITE_URL).toString(),
    changeFrequency: "monthly",
    priority: route ? 0.8 : 1,
  }));
}
