import AnnouncementBar from "@/components/AnnouncementBar";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Releases from "@/components/Releases";
import Shop from "@/components/Shop";
import Writing from "@/components/Writing";

import { LINKS } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Lazy Perfectionist",
  genre: "Instrumental Rock",
  locationCreated: { "@type": "Place", name: "Hong Kong" },
  url: LINKS.spotifyArtist,
  sameAs: [LINKS.youtube, LINKS.instagram, LINKS.twitter, LINKS.medium, LINKS.kofi],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <AnnouncementBar />
      <Header />

      {/* Paper holds below the last plate before the ink footer: the rules
          end, the page keeps breathing, then the back cover starts. */}
      <main className="pb-16 md:pb-24">
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
