'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { value: 1, suffix: '', label: 'Debut Single Released' },
    { value: 1, suffix: '', label: 'Genre Fusion Project' },
    { value: 2024, suffix: '', label: 'Year Started' },
  ];

  // Animated counter hook
  const useCounter = (end: number, suffix: string) => {
    const spring = useSpring(0, { damping: 25, stiffness: 300 });
    const display = useTransform(spring, (latest) => {
      if (end >= 1000000) {
        return `${(latest / 1000000).toFixed(1)}${suffix}`;
      }
      return `${Math.floor(latest)}${suffix}`;
    });

    useEffect(() => {
      spring.set(end);
    }, [end, spring]);

    return display;
  };

  useEffect(() => {
    const ctx = gsap.context();

    // Register ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Parallax effect for the entire section
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -30, // Subtle parallax movement
        ease: 'power2.out',
      });
    }

    // Trigger counter animations when stats come into view
    statRefs.current.forEach((statRef, index) => {
      if (!statRef) return;

      gsap.from(statRef, {
        scrollTrigger: {
          trigger: statRef,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  // Format stat value for display
  const formatStatValue = (value: number, suffix: string) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}${suffix}`;
    }
    return `${value}${suffix}`;
  };

  return (
    <section ref={sectionRef} className="bg-oryzo-canvas py-16 md:py-24" data-testid="stats-section">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
          data-testid="stats-header"
        >
          <div className="flex items-center gap-8 mb-6">
            <div className="w-8 h-px bg-oryzo-border" />
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
              IMPACT
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight" data-testid="stats-title">
            THE JOURNEY BEGINS
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            A bedroom studio project from Hong Kong, currently building its first chapter.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" data-testid="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={(el) => { if (el) statRefs.current[index] = el; }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center"
              data-testid={`stat-item-${index}`}
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-5xl md:text-7xl font-oryzo-display text-oryzo-cream tabular-nums"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 + 0.3 }}
                >
                  {formatStatValue(stat.value, stat.suffix)}
                </motion.div>
              </motion.div>
              <motion.div
                className="text-sm md:text-base text-oryzo-muted uppercase tracking-wider font-oryzo-display"
                whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                transition={{ duration: 0.2 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Context with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 text-center"
        >
          <motion.p
            className="text-oryzo-body text-oryzo-muted max-w-2xl mx-auto font-oryzo-body"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            From a bedroom studio in Hong Kong to listeners around the world, every note tells a story of creative exploration and technical precision.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
