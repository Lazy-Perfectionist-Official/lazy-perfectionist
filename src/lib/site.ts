// Single source of truth for the stripped-down site's links and releases.
// The old platform-links machinery (Spotify ID → per-platform URLs via API)
// is gone; only verified URLs live here.

export const LINKS = {
  spotifyArtist: 'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
  spotifyLusg: 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU',
  spotifyCyclothymia: 'https://open.spotify.com/track/5gQpSHmOlmQTrz2H1iznYV',
  spotifyOrbit: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8',
  youtube: 'https://youtube.com/@lazyperfectionist',
  instagram: 'https://instagram.com/lazyperfectionist',
  twitter: 'https://twitter.com/lazyperfectionist',
  medium: 'https://medium.com/@lazyperfectist',
  kofi: 'https://ko-fi.com/lazyperfectionist',
  store: 'https://ko-fi.com/lazyperfectionist/shop',
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
