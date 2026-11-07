import AnnouncementBar from "@/components/AnnouncementBar";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Releases from "@/components/Releases";
import Shop from "@/components/Shop";
import SkipLink from "@/components/SkipLink";
import Writing from "@/components/Writing";

import { LINKS, RELEASES } from "@/lib/site";

// The catalog as crawlers read it: the group, then every single as a
// MusicRecording pointing at where it actually plays. The @ids are the
// Spotify pages — stable, and they don't wait on the site's own domain
// (SITE_URL, still unset) to tie the graph together.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": LINKS.spotifyArtist,
      name: "Lazy Perfectionist",
      genre: "Instrumental Rock",
      locationCreated: { "@type": "Place", name: "Hong Kong" },
      url: LINKS.spotifyArtist,
      sameAs: [LINKS.youtube, LINKS.instagram, LINKS.medium, LINKS.kofi],
    },
    ...RELEASES.map((release) => ({
      "@type": "MusicRecording",
      "@id": release.href,
      name: release.title,
      datePublished: String(release.year),
      url: release.href,
      byArtist: { "@id": LINKS.spotifyArtist },
    })),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SkipLink />
      <AnnouncementBar />
      <Header />

      {/* Paper holds below the last plate before the ink footer: the rules
          end, the page keeps breathing, then the back cover starts. */}
      <main id="main" tabIndex={-1} className="pb-16 md:pb-24">
        <Hero />
        <Releases />
        <Shop />
        <Writing />
        <Connect />
      </main>

      <Footer />
    </>
  );
}
