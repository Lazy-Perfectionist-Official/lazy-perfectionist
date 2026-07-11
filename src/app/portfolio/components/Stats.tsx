'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '50+', label: 'Tracks Released' },
    { value: '1M+', label: 'Streams Across Platforms' },
    { value: '4yr', label: 'Creating Soundscapes' },
  ];

  return (
    <section ref={sectionRef} className="bg-oryzo-canvas py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <div className="flex items-center gap-8 mb-6">
            <div className="w-8 h-px bg-oryzo-border" />
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
              IMPACT
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight">
            BY THE NUMBERS
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            The reach and resonance of Lazy Perfectionist's musical journey.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center"
            >
              <div className="mb-4">
                <div className="text-5xl md:text-7xl font-oryzo-display text-oryzo-cream tabular-nums">
                  {stat.value}
                </div>
              </div>
              <div className="text-sm md:text-base text-oryzo-muted uppercase tracking-wider font-oryzo-display">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 text-center"
        >
          <p className="text-oryzo-body text-oryzo-muted max-w-2xl mx-auto font-oryzo-body">
            From a bedroom studio in Hong Kong to listeners around the world, every note tells a story of creative exploration and technical precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
