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

// The deploy's own host: `NEXT_PUBLIC_SITE_URL` when a domain is set,
// otherwise the host Vercel puts in the build environment
// (`VERCEL_PROJECT_PRODUCTION_URL`, falling back to the deployment URL).
// Nothing is guessed — the parked lazyperfectionist.com is never
// substituted — but a live deploy is no longer canonical-less either: the
// vercel.app host is the site's own address until a domain replaces it.
const withScheme = (value: string | undefined) => {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export const SITE_URL: string | undefined =
  withScheme(process.env.NEXT_PUBLIC_SITE_URL) ??
  withScheme(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  withScheme(process.env.VERCEL_URL);

// The bellyband's news. One line to change at the next release: the bar's
// label and the link it carries live together, so the copy cannot outlive
// the link it points at. Editable at /admin.
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
