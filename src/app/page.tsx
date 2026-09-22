'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/app/components/portfolio/Hero';
import SelectedWorks from '@/app/components/portfolio/SelectedWorks';
import Journal from '@/app/components/portfolio/Journal';
import Stats from '@/app/components/portfolio/Stats';
import Finale from '@/app/components/portfolio/Finale';
import Contact from '@/app/components/portfolio/Contact';
import LoadingScreen from '@/app/components/portfolio/LoadingScreen';
import { generateStructuredData } from '@/components/SEO';

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream">
      {/* Entity declaration for crawlers and AI agents. sameAs is the key
          signal tying all external profiles to this one artist entity —
          it is what lets a model know the Spotify page, the Instagram,
          and this site describe the same "Lazy Perfectionist". */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('MusicGroup', {
          name: 'Lazy Perfectionist',
          url: 'https://lazyperfectionist.com',
          description:
            'Hong Kong-based instrumental progressive rock project creating bedroom rock that blends technical precision with emotional storytelling. Latest single "LUSG", following "Cyclothymia" and the debut "Orbit".',
          genre: ['Instrumental Rock', 'Progressive Rock'],
          foundingLocation: {
            '@type': 'Place',
            name: 'Hong Kong',
          },
          founder: {
            '@type': 'Person',
            name: 'Sammy Lee',
            jobTitle: 'Musician, Producer',
          },
          sameAs: [
            'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
            'https://instagram.com/lazyperfectionist',
            'https://twitter.com/lazyperfectionist',
            'https://youtube.com/@lazyperfectionist',
            'https://medium.com/@lazyperfectist',
            'https://ko-fi.com/lazyperfectionist',
          ],
        })}
      />
      {/* Once-per-session intro overlay. Renders nothing on the server and
          never gates the content below — it paints over it briefly. */}
      <LoadingScreen />
      <main>
        {/* Hero is main content too — keeping it inside the landmark is what
            axe's "region" rule expects (nav + hero copy were outside main). */}
        <Hero />
        <SelectedWorks />
        <Journal />
        <Stats />
        <Finale />
        <Contact />
      </main>
    </div>
  );
}
