// Single source of truth for the site's links and content. The old
// platform-links machinery (Spotify ID → per-platform URLs via API) is
// gone; only verified URLs live here. The copy — announcement, liner note,
// the singles — lives in content.json so /admin (Sveltia, committing
// straight to this repo) can edit it without touching code.

import content from "./content.json";

export const LINKS = {
  spotifyArtist: 'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
  youtube: 'https://www.youtube.com/@lazyperfectionist_official',
  instagram: 'https://www.instagram.com/lazyperfectionist_official/',
  medium: 'https://medium.com/@lazyperfectist',
  kofi: 'https://ko-fi.com/lazyperfectionist',
  store: 'https://ko-fi.com/lazyperfectionist/shop',
} as const;

// The deploy's own host. Unset until the site has a domain, in which case
// canonical URLs and the sitemap are omitted rather than guessing (the
// obvious guess, lazyperfectionist.com, is parked and for sale).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// The bellyband's news. One line to change at the next release: the bar's
// label and the link it carries live together, so the copy cannot outlive
// the link it points at — the fold's stamp links through it too. Editable
// at /admin.
export const ANNOUNCEMENT: { label: string; href: string } =
  content.announcement;

// The back cover's one line about who and where. Editable at /admin.
export const LINER_NOTE: string = content.linerNote;

export interface Release {
  year: string;
  title: string;
  /** Printed under the title only when it earns its line — Orbit's debut
      note is the one the catalog keeps. Optional in content.json and in
      the /admin form. */
  description?: string;
  href: string;
}

// Newest first — the hero already features the newest single, so the list
// reads as a running catalog. Editable at /admin.
export const RELEASES: Release[] = content.releases;
