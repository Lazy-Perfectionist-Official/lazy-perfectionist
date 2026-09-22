'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const releases = [
  {
    year: '2025',
    title: 'Orbit',
    description: 'The debut single — a first orbit around a sound still taking shape.',
    href: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8',
  },
  {
    year: '2026',
    title: 'Cyclothymia',
    description: 'Loud and quiet learning to live inside the same song.',
    href: 'https://open.spotify.com/track/5gQpSHmOlmQTrz2H1iznYV',
  },
  {
    year: '2026',
    title: 'LUSG',
    description: 'The latest single — orchestral layers meeting modern synths.',
    href: 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU',
  },
];

export default function Stats() {
  return (
    <section className="bg-oryzo-canvas py-16 md:py-24" data-testid="stats-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 md:mb-16"
          data-testid="stats-header"
        >
          <div className="mb-6">
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
              THE JOURNEY SO FAR
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-display italic leading-tight text-oryzo-cream"
            data-testid="stats-title"
          >
            Three singles, one bedroom studio.
          </h2>
        </motion.div>

        {/* Release timeline */}
        <div className="border-t border-oryzo-border">
          {releases.map((release, index) => (
            <motion.a
              key={release.title}
              href={release.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="group grid grid-cols-[3.5rem_1fr_auto] md:grid-cols-[5rem_1fr_auto] items-baseline gap-4 md:gap-8 py-6 md:py-8 border-b border-oryzo-border"
              data-testid={`stat-item-${index}`}
            >
              <span className="text-sm text-oryzo-muted tabular-nums font-medium">
                {release.year}
              </span>
              <div>
                <h3 className="text-2xl md:text-4xl font-display italic text-oryzo-cream group-hover:text-oryzo-ember transition-colors duration-300">
                  {release.title}
                </h3>
                <p className="text-sm md:text-base text-oryzo-muted mt-2 max-w-xl">
                  {release.description}
                </p>
              </div>
              <span
                aria-hidden
                className="text-oryzo-muted group-hover:text-oryzo-cream group-hover:translate-x-1 transition-all duration-300 font-medium text-xs md:text-sm"
              >
                LISTEN →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
