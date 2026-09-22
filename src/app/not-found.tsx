'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream relative">
      <Background />
      <Navigation />

      <main>
      <section
        className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-16 overflow-hidden"
        data-testid="not-found-page"
      >
        {/* Giant backdrop numeral */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-[42vw] md:text-[26vw] font-display italic text-oryzo-cream/[0.04] leading-none select-none pointer-events-none"
        >
          404
        </span>

        <div className="relative text-center max-w-2xl">
          <motion.span
            className="block text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Lost Track
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl font-medium uppercase tracking-[0.2em] text-oryzo-cream leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            Not found.
          </motion.h1>

          <motion.p
            className="text-oryzo-body text-oryzo-muted leading-relaxed mb-12 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            This page never made the final mix — but the music did.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <Link
              href="/"
              className="liquid-glass rounded-full px-8 py-4 font-medium text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center justify-center"
              data-testid="not-found-home"
            >
              BACK TO HOME
            </Link>
            <Link
              href="/music"
              className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-8 py-4 font-medium text-sm text-oryzo-cream transition-colors inline-flex items-center justify-center"
              data-testid="not-found-music"
            >
              LISTEN INSTEAD
            </Link>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  )
}
