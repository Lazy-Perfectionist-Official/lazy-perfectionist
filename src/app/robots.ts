import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// The crawler's rulebook, generated rather than served verbatim so it can
// carry the sitemap URL of whatever host this deploy actually answers on.
// The openness is deliberate: search engines, renderers and AI agents are
// all welcome, while /admin and /api stay out. /_next/ (the JS, CSS and
// optimized images a renderer needs) is never disallowed.
const EVERYTHING = ["/api/", "/admin/"];

const AI_AGENTS = [
  // OpenAI: training (GPTBot) and search/browse citations (OAI-SearchBot,
  // ChatGPT-User).
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: training (ClaudeBot) and Claude's search/browse agents.
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  // Google-Extended grounds Gemini training; it does not govern AI
  // Overviews or AI Mode — Googlebot does.
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: EVERYTHING },
      { userAgent: "Googlebot", allow: "/", disallow: EVERYTHING },
      { userAgent: "Bingbot", allow: "/", disallow: EVERYTHING, crawlDelay: 2 },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: EVERYTHING,
      })),
      // Music discovery platforms: welcome, with the same two doors shut.
      { userAgent: "Spotify", allow: "/", disallow: EVERYTHING },
      { userAgent: "Applebot", allow: "/", disallow: EVERYTHING },
    ],
    sitemap: SITE_URL ? `${SITE_URL}/sitemap.xml` : undefined,
    host: SITE_URL,
  };
}
