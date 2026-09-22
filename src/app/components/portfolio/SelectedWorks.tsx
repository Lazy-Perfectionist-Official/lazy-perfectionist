'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// LUSG cover art variants (self-hosted hi-res; Spotify CDN caps at 640px).
const LUSG_SRCSET = [
  '/assets/img/optimized/lusg-cover-400.avif 400w',
  '/assets/img/optimized/lusg-cover-800.avif 800w',
  '/assets/img/optimized/lusg-cover-1200.avif 1200w',
  '/assets/img/optimized/lusg-cover-1400.avif 1400w',
].join(', ');

// Card spans the max-w-[1200px] container minus px-6/px-10/lg:px-16 gutters.
const LUSG_SIZES = '(min-width: 1200px) 1072px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)';

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="bg-oryzo-canvas py-12 md:py-16" data-testid="selected-works-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
          data-testid="selected-works-header"
        >
          <div className="mb-6">
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
              LATEST RELEASE
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-[0.2em] leading-tight" data-testid="selected-works-title">
            LATEST WORK
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            Debut single — an instrumental progressive rock sound walk experiment.
          </p>
        </motion.div>

        {/* Featured Release */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          data-testid="featured-release-card"
        >
          <Link
            href="https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-[16/9] md:aspect-[21/9] rounded-3xl border border-oryzo-border overflow-hidden group cursor-pointer"
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-bark-brown via-oryzo-canvas to-oryzo-canvas"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {/* LUSG cover art */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/assets/img/optimized/lusg-cover-1200.avif"
                  srcSet={LUSG_SRCSET}
                  sizes={LUSG_SIZES}
                  alt="LUSG — Lazy Perfectionist"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-oryzo-canvas via-oryzo-canvas/30 to-transparent" />
            </motion.div>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-oryzo-ember uppercase tracking-[0.3em] font-medium">
                      Single
                    </span>
                    <span className="text-xs text-oryzo-muted">2026</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display italic text-oryzo-cream mb-2">
                    LUSG
                  </h3>
                  <p className="text-sm md:text-base text-oryzo-muted max-w-xl">
                    Instrumental progressive rock — orchestral layers meeting modern synths.
                  </p>
                </div>
                <div className="liquid-glass rounded-full px-6 py-3 text-sm text-oryzo-cream inline-flex items-center gap-2 group-hover:scale-[1.03] transition-transform">
                  Stream Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Link to full discography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-8 text-center"
        >
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 border border-oryzo-border hover:border-oryzo-cream hover:text-oryzo-cream transition-all group font-medium"
            data-testid="selected-works-view-all"
          >
            VIEW ALL MUSIC
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
