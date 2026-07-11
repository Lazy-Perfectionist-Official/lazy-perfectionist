'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpringCounter } from '@/hooks/usePhysicsAnimations';

export default function StatsEnhanced() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const stats = [
    { value: 50, suffix: '+', label: 'Tracks Released' },
    { value: 1000000, suffix: 'M+', label: 'Streams Across Platforms' },
    { value: 4, suffix: 'yr', label: 'Creating Soundscapes' },
  ];

  useEffect(() => {
    const ctx = gsap.context();

    // Register ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Trigger animations when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);

      // Parallax effect for the entire section
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -30,
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
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

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
            BY THE NUMBERS
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            The reach and resonance of Lazy Perfectionist's musical journey.
          </p>
        </motion.div>

        {/* Stats Grid with React Spring Integration */}
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
                {/* React Spring animated number */}
                <SpringNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  shouldAnimate={shouldAnimate}
                  className="text-5xl md:text-7xl font-oryzo-display text-oryzo-cream tabular-nums"
                />
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

// React Spring animated number component
function SpringNumber({ value, suffix, shouldAnimate, className }: {
  value: number;
  suffix: string;
  shouldAnimate: boolean;
  className: string;
}) {
  const spring = useSpringCounter(shouldAnimate ? value : 0, {
    tension: 120,
    friction: 14
  });

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {spring.number.to((n: number) => {
        if (value >= 1000000) {
          return `${(n / 1000000).toFixed(1)}${suffix}`;
        }
        return `${Math.floor(n)}${suffix}`;
      })}
    </motion.div>
  );
}
