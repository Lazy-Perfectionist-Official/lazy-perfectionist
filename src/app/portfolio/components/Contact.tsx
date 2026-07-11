'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Hls from 'hls.js';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const ctx = gsap.context();

    // HLS Video Setup for Contact Section
    if (typeof window !== 'undefined' && videoRef.current) {
      const hls = new Hls();
      const hlsSource = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

      hls.loadSource(hlsSource);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.startLoad();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS error:', data);
          // Fallback to direct video source
          if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = hlsSource;
          }
        }
      });

      hlsRef.current = hls;
    }

    // Marquee Animation
    if (marqueeRef.current) {
      const marqueeText = marqueeRef.current;

      // Create seamless marquee effect
      gsap.to(marqueeText, {
        x: '-50%',
        ease: 'none',
        duration: 20,
        repeat: -1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  const marqueeContent = "LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER — LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER — ";

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Inverted Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-oryzo-canvas via-oryzo-canvas/80 to-oryzo-canvas/60 z-10" />
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover invert"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      <div className="relative z-20 w-full">
        {/* Marquee Text */}
        <div className="overflow-hidden whitespace-nowrap mb-16">
          <div
            ref={marqueeRef}
            className="inline-block text-6xl md:text-8xl lg:text-9xl font-oryzo-display text-oryzo-cream/20"
          >
            {marqueeContent}
            {marqueeContent}
          </div>
        </div>

        {/* Contact Content */}
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight mb-8">
              READY TO COLLABORATE?
            </h2>

            <p className="text-oryzo-body text-oryzo-muted mb-12 max-w-2xl mx-auto font-oryzo-body">
              Open for commissions, collaborations, and interesting conversations about music, creativity, and pushing creative boundaries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:hello@lazyperfectionist.com"
                className="group relative rounded-full bg-oryzo-ember text-oryzo-canvas text-base px-8 py-4 overflow-hidden hover:scale-105 transition-transform font-oryzo-display"
              >
                <span className="relative z-10">GET IN TOUCH</span>
                <div className="absolute inset-0 bg-oryzo-canvas opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="https://open.spotify.com/artist/6RQ7kwJQj3Ph9RlzF6V5bO"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full border-2 border-oryzo-border bg-oryzo-canvas/80 backdrop-blur-sm text-oryzo-cream text-base px-8 py-4 overflow-hidden hover:scale-105 transition-transform font-oryzo-display"
              >
                <span className="relative z-10">STREAM ON SPOTIFY</span>
                <span className="absolute inset-0 rounded-full bg-oryzo-ember opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-oryzo-muted">
            <div className="font-oryzo-body">© 2026 LAZY PERFECTIONIST. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/lazyperfectionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-oryzo-cream transition-colors font-oryzo-display"
              >
                INSTAGRAM
              </a>
              <a
                href="https://twitter.com/lazyperfectionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-oryzo-cream transition-colors font-oryzo-display"
              >
                TWITTER
              </a>
              <a
                href="https://youtube.com/@lazyperfectionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-oryzo-cream transition-colors font-oryzo-display"
              >
                YOUTUBE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
