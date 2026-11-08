import { LINKS, LINER_NOTE, RELEASES, SITE_URL, type Release } from "@/lib/site";

// The catalog as crawlers read it. The @ids are the Spotify pages, so the
// graph ties itself together without waiting on a domain; the WebSite and
// CollectionPage nodes only appear when the deploy knows its own host.
const GENRES = ["Instrumental Rock", "Instrumental Metal"];

const url = (path: string) => (SITE_URL ? new URL(path, SITE_URL).toString() : path);
const id = (path: string) => `${url(path)}#${path === "/" ? "website" : "page"}`;

const recording = (release: Release) => ({
  "@type": "MusicRecording",
  "@id": release.href,
  name: release.title,
  datePublished: release.year,
  url: release.href,
  byArtist: { "@id": LINKS.spotifyArtist },
});

const musicGroup = {
  "@type": "MusicGroup",
  "@id": LINKS.spotifyArtist,
  name: "Lazy Perfectionist",
  genre: GENRES,
  description: LINER_NOTE,
  locationCreated: { "@type": "Place", name: "Hong Kong" },
  url: LINKS.spotifyArtist,
  sameAs: [LINKS.youtube, LINKS.instagram, LINKS.medium, LINKS.kofi],
};

// The cover: who the band is, which site it speaks for, and every single as
// a recording pointing at where it actually plays.
export const siteGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": id("/"),
      name: "Lazy Perfectionist",
      url: url("/"),
      inLanguage: "en",
      publisher: { "@id": LINKS.spotifyArtist },
    },
    musicGroup,
    ...RELEASES.map(recording),
  ],
});

// A plate screen that lists the catalog: the page, and the list it holds.
// Only for screens whose rows are the releases themselves (/music and
// /discography) — the shop and the writing plate list other things.
export const catalogGraph = ({ name, path }: { name: string; path: string }) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": id(path),
      name,
      url: url(path),
      inLanguage: "en",
      isPartOf: { "@id": id("/") },
      mainEntity: { "@id": `${url(path)}#releases` },
      about: { "@id": LINKS.spotifyArtist },
    },
    {
      "@type": "ItemList",
      "@id": `${url(path)}#releases`,
      name,
      numberOfItems: RELEASES.length,
      itemListElement: RELEASES.map((release, position) => ({
        "@type": "ListItem",
        position: position + 1,
        item: recording(release),
      })),
    },
  ],
});
