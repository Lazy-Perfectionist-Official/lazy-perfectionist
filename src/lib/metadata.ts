import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";

// One share card for the whole issue: the print's own paper, wordmark and
// bellyband, struck 2400×1260 for a 2× 1200×630 frame.
export const SHARE_CARD = {
  url: "/assets/img/og-card.png",
  width: 2400,
  height: 1260,
  alt: "Lazy Perfectionist — instrumental rock/metal from Hong Kong",
} as const;

// A plate screen's head: its own title, description and canonical, and —
// because Next replaces the whole `openGraph` object rather than merging it
// — its own social copy too. Without this the screens shared the cover's
// card text, which is how a discography link previewed as the new single.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/discography". */
  path: string;
}): Metadata {
  // The <title> template in the root layout only applies to the document
  // title, so the social copy carries the same suffix itself.
  const fullTitle = `${title} | Lazy Perfectionist`;

  return {
    title,
    description,
    alternates: SITE_URL ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      siteName: "Lazy Perfectionist",
      title: fullTitle,
      description,
      url: SITE_URL ? new URL(path, SITE_URL).toString() : undefined,
      images: [SHARE_CARD],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_CARD.url],
    },
  };
}
