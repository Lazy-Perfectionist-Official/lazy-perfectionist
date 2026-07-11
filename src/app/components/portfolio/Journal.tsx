'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface JournalEntry {
  title: string;
  image: string;
  readTime: string;
  date: string;
}

export default function Journal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const journals: JournalEntry[] = [
    {
      title: 'Creating Orbit: The Journey',
      image: '/assets/img/orbit-cover.jpg',
      readTime: '5 min',
      date: 'Jan 15, 2024',
    },
    {
      title: 'Bedroom Production Techniques',
      image: '/assets/img/logo.png',
      readTime: '8 min',
      date: 'Dec 28, 2023',
    },
    {
      title: 'Progressive Rock Influences',
      image: '/assets/img/logo.png',
      readTime: '6 min',
      date: 'Dec 15, 2023',
    },
    {
      title: 'Hong Kong Music Scene',
      image: '/assets/img/logo.png',
      readTime: '4 min',
      date: 'Nov 22, 2023',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-oryzo-canvas py-16 md:py-24" data-testid="journal-section">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
          data-testid="journal-header"
        >
          <div className="flex items-center gap-8 mb-6">
            <div className="w-8 h-px bg-oryzo-border" />
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
              RECENT
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight">
            RECENT THOUGHTS
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            Behind the scenes of Lazy Perfectionist's musical journey and creative process.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 border border-oryzo-border hover:border-oryzo-cream hover:text-oryzo-cream transition-all group font-oryzo-display"
            >
              VIEW ALL
              <motion.span
                className="group-hover:translate-x-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {journals.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{
                y: -4,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.1,
                backgroundColor: { duration: 0.2 },
                borderColor: { duration: 0.2 },
                y: { type: "spring", stiffness: 300, damping: 25 }
              }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex items-center gap-6 p-4 bg-oryzo-surface/30 border border-oryzo-border rounded-[40px] sm:rounded-full cursor-pointer group"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-oryzo-border/20 to-oryzo-surface/20 flex items-center justify-center text-oryzo-muted"
                whileHover={{
                  scale: 1.15,
                  rotate: 15
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <motion.span
                  className="text-2xl"
                  whileHover={{
                    rotate: -15
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  ✦
                </motion.span>
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.h3
                  className="text-base md:text-lg font-oryzo-display text-oryzo-cream mb-1"
                  whileHover={{
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {entry.title.toUpperCase()}
                </motion.h3>
                <div className="flex items-center gap-4 text-sm text-oryzo-muted font-oryzo-body">
                  <motion.span
                    whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {entry.readTime} READ
                  </motion.span>
                  <span>•</span>
                  <motion.span
                    whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {entry.date}
                  </motion.span>
                </div>
              </div>

              <motion.div
                whileHover={{
                  x: 5,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <Link
                  href="/blog"
                  className="text-oryzo-muted hover:text-oryzo-cream transition-colors"
                >
                  →
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
