'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import Hls from 'hls.js';
import LoadingScreen from '@/app/components/portfolio/LoadingScreen';
import Hero from '@/app/components/portfolio/Hero';

// Dynamic imports for code splitting and performance
const SelectedWorks = dynamic(
  () => import('@/app/components/portfolio/SelectedWorks'),
  {
    loading: () => <div className="h-64 flex items-center justify-center text-oryzo-muted">Loading...</div>,
    ssr: false
  }
);

const Journal = dynamic(
  () => import('@/app/components/portfolio/Journal'),
  {
    loading: () => <div className="h-64 flex items-center justify-center text-oryzo-muted">Loading...</div>,
    ssr: false
  }
);

const Explorations = dynamic(
  () => import('@/app/components/portfolio/Explorations'),
  {
    loading: () => <div className="h-64 flex items-center justify-center text-oryzo-muted">Loading...</div>,
    ssr: false  // Important: No SSR for components with potential 3D/complex animations
  }
);

const Stats = dynamic(
  () => import('@/app/components/portfolio/Stats'),
  {
    loading: () => <div className="h-32 flex items-center justify-center text-oryzo-muted">Loading...</div>,
    ssr: true  // Light component, can SSR
  }
);

const Contact = dynamic(
  () => import('@/app/components/portfolio/Contact'),
  {
    loading: () => <div className="h-32 flex items-center justify-center text-oryzo-muted">Loading...</div>,
    ssr: true  // Light component, can SSR
  }
);

// Dynamic GSAP plugin loading for better performance
const loadScrollTrigger = () => {
  if (typeof window !== 'undefined' && !gsap.plugins.ScrollTrigger) {
    import('gsap/ScrollTrigger').then((module) => {
      gsap.registerPlugin(module.ScrollTrigger);
    });
  }
};

// Register GSAP plugins
if (typeof window !== 'undefined') {
  loadScrollTrigger();
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cleanup ScrollTrigger on unmount
    return () => {
      if (gsap.plugins.ScrollTrigger) {
        gsap.plugins.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-oryzo-canvas text-oryzo-cream">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Hero />
          <SelectedWorks />
          <Journal />
          <Explorations />
          <Stats />
          <Contact />
        </>
      )}
    </div>
  );
}