import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// The cover and the three plate screens, and only when the deploy knows
// its own host. Without SITE_URL an empty urlset is honest; a localhost or
// parked-domain URL in it would not be.
const ROUTES = ["", "/music", "/shop", "/writing"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  return ROUTES.map((route) => ({
    url: new URL(route || "/", SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route ? 0.8 : 1,
  }));
}
