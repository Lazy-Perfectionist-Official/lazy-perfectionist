'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Hls from 'hls.js';
import ContactForm from '@/components/ContactForm';
import NewsletterForm from '@/components/NewsletterForm';

// Magnetic Button Component
interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  [key: string]: any;
}

function MagneticButton({ href, children, className = '', target, rel, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center with reduced range for subtlety
    const maxDistance = 20; // Maximum magnetic pull distance in pixels
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    mouseX.set(Math.max(-maxDistance, Math.min(maxDistance, deltaX * maxDistance * 2)));
    mouseY.set(Math.max(-maxDistance, Math.min(maxDistance, deltaY * maxDistance * 2)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`${className} group`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // HLS Video Setup for Contact Section
    if (typeof window !== 'undefined' && videoRef.current) {
      const hls = new Hls();
      const hlsSource = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

      hls.loadSource(hlsSource);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.startLoad();
        setVideoReady(true);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS error:', data);
          setVideoReady(false);
          // Fallback to direct video source
          if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = hlsSource;
          }
        }
      });

      hlsRef.current = hls;
    }

    // GSAP context wraps all animations for proper cleanup
    const ctx = gsap.context(() => {
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
    });

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
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" data-testid="contact-section">
      {/* Inverted Video Background */}
      <div className="absolute inset-0 bg-oryzo-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-oryzo-canvas via-oryzo-canvas/80 to-oryzo-canvas/60 z-10" />
        <video
          ref={videoRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover invert transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          data-testid="contact-video"
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
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center" data-testid="contact-header">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight mb-8" data-testid="contact-title">
              READY TO COLLABORATE?
            </h2>

            <p className="text-oryzo-body text-oryzo-muted mb-10 max-w-2xl mx-auto font-oryzo-body">
              Open for commissions, collaborations, and interesting conversations about music, creativity, and pushing creative boundaries.
            </p>

            {/* Contact form */}
            <div className="max-w-2xl mx-auto text-left mb-10">
              <ContactForm />
            </div>

            {/* Newsletter signup */}
            <div className="max-w-xl mx-auto">
              <p className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display mb-4">
                Or join the mailing list
              </p>
              <NewsletterForm />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
              <MagneticButton
                href="https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-full border-2 border-oryzo-border bg-oryzo-canvas/80 backdrop-blur-sm text-oryzo-cream text-base px-8 py-4 overflow-hidden font-oryzo-display"
                data-testid="contact-spotify-button"
              >
                <span className="relative z-10">STREAM ON SPOTIFY</span>
                <span className="absolute inset-0 rounded-full bg-oryzo-ember opacity-0 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-8 left-0 right-0 z-20" data-testid="contact-footer">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-oryzo-muted">
            <div className="font-oryzo-body">© 2026 LAZY PERFECTIONIST. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/lazyperfectionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-oryzo-cream transition-colors font-oryzo-display"
                data-testid="contact-instagram-link"
              >
                INSTAGRAM
              </a>
              <a
                href="https://twitter.com/lazyperfectionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-oryzo-cream transition-colors font-oryzo-display"
                data-testid="contact-twitter-link"
              >
                TWITTER
              </a>
              <a
                href="https://youtube.com/@lazyperfectionist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-oryzo-cream transition-colors font-oryzo-display"
                data-testid="contact-youtube-link"
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
