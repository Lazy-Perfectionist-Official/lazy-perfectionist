'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Finale() {
  return (
    <section className="relative bg-oryzo-canvas py-32 md:py-44 overflow-hidden" data-testid="finale-section">
      {/* Faint oversized backdrop word */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[24vw] leading-none font-display italic text-oryzo-cream/[0.04] whitespace-nowrap">
          LUSG
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8"
          data-testid="finale-eyebrow"
        >
          <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
            ONE LAST THING
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-6xl md:text-7xl font-display italic leading-[1.05] text-oryzo-cream mb-8"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          data-testid="finale-title"
        >
          Silence never really ends —
          <span className="block">it just changes song.</span>
        </motion.h2>

        <motion.p
          className="text-oryzo-muted max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          data-testid="finale-description"
        >
          Three singles in, still recording in a Hong Kong bedroom studio.
          Follow along — the next one is already taking shape.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Link
            href="https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-10 py-4 text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center gap-2 font-oryzo-display"
            data-testid="finale-stream-button"
          >
            STREAM &ldquo;LUSG&rdquo;
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/music"
            className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-10 py-4 text-sm text-oryzo-cream transition-colors inline-flex items-center gap-2 font-oryzo-display group"
            data-testid="finale-discography-link"
          >
            EXPLORE THE MUSIC
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
