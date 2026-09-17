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

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream">
      <Hero />
      <main>
        <SelectedWorks />
        <Journal />
        <Stats />
        <Finale />
        <Contact />
      </main>
    </div>
  );
}
