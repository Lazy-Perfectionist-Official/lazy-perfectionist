// Single source of truth for the stripped-down site's links and releases.
// The old platform-links machinery (Spotify ID → per-platform URLs via API)
// is gone; only verified URLs live here.

export const LINKS = {
  spotifyArtist: 'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
  spotifyLusg: 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU',
  spotifyCyclothymia: 'https://open.spotify.com/track/5gQpSHmOlmQTrz2H1iznYV',
  spotifyOrbit: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8',
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
// the link it points at.
export const ANNOUNCEMENT = {
  label: 'LUSG — the new single · out now',
  href: LINKS.spotifyLusg,
} as const;

export interface Release {
  year: string;
  title: string;
  description: string;
  href: string;
}

// Newest first — the hero already features LUSG, so the list reads as a
// running catalog.
export const RELEASES: Release[] = [
  {
    year: '2026',
    title: 'LUSG',
    // Final wording is the artist's call.
    description: 'The bedroom at full scale — strings and synths stacked to the ceiling.',
    href: LINKS.spotifyLusg,
  },
  {
    year: '2026',
    title: 'Cyclothymia',
    description: 'Loud and quiet learning to live inside the same song.',
    href: LINKS.spotifyCyclothymia,
  },
  {
    year: '2025',
    title: 'Orbit',
    description: 'The debut single — a first orbit around a sound still taking shape.',
    href: LINKS.spotifyOrbit,
  },
];
