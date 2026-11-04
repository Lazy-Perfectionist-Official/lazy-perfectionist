import AnnouncementBar from "@/components/AnnouncementBar";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Releases from "@/components/Releases";
import Shop from "@/components/Shop";

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

      <main>
        <Hero />
        <Releases />
        <Shop />
        <Connect />
      </main>

      <Footer />
    </>
  );
}
