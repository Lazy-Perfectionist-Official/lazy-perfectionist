'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const explorations = [
    { title: 'Sonic Textures', category: 'Sound Design', aspect: 'square' },
    { title: 'Visual Harmony', category: 'Art Direction', aspect: 'portrait' },
    { title: 'Rhythmic Patterns', category: 'Composition', aspect: 'square' },
    { title: 'Atmospheric Layers', category: 'Mixing', aspect: 'portrait' },
    { title: 'Dynamic Range', category: 'Mastering', aspect: 'square' },
    { title: 'Genre Fusion', category: 'Production', aspect: 'portrait' },
  ];

  useEffect(() => {
    const ctx = gsap.context();

    // Register ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Pin the section with enhanced settings
    if (contentRef.current) {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1, // Smoother pinning
      });
    }

    // Enhanced parallax effects for exploration items
    explorations.forEach((_, index) => {
      const element = document.querySelector(`.exploration-item-${index}`);
      if (!element) return;

      // Create multi-layered parallax
      gsap.to(element, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5, // Smoother scrubbing
        },
        y: index % 2 === 0 ? -80 : 80, // More dramatic parallax
        rotation: index % 2 === 0 ? 2 : -2, // Subtle rotation
        scale: 1.05, // Slight scale increase
        ease: 'power2.out',
      });

      // Add hover-triggered animations
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.08,
          rotation: index % 2 === 0 ? -3 : 3,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          rotation: index % 2 === 0 ? 2 : -2,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    // Staggered reveal animation for items
    gsap.from('.exploration-item-0, .exploration-item-1, .exploration-item-2, .exploration-item-3, .exploration-item-4, .exploration-item-5', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotation: 5,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  const handleItemClick = (index: number) => {
    // Animate the opening lightbox
    const lightbox = document.querySelector('[data-testid="explorations-lightbox"]');
    if (lightbox) {
      gsap.fromTo(lightbox,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
    setSelectedItem(selectedItem === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="min-h-[300vh] relative bg-bg py-24" data-testid="explorations-section">
      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Pinned Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24"
          viewport={{ once: true }}
          data-testid="explorations-header"
        >
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-5xl md:text-7xl font-display italic leading-tight" data-testid="explorations-title">
            Visual <span className="italic">playground</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-md mx-auto">
            Experimental visual explorations and creative exercises that push boundaries.
          </p>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 border border-stroke hover:border-text-primary hover:text-text-primary transition-all group"
            data-testid="explorations-dribbble-link"
          >
            <span>See on Dribbble</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Parallax Columns */}
        <div className="grid grid-cols-2 gap-12 md:gap-40">
          {/* Left Column */}
          <div className="space-y-12">
            {explorations.slice(0, 3).map((item, index) => (
              <div
                key={item.title}
                className={`exploration-item-${index} relative max-w-[320px] mx-auto ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
              >
                <div
                  className={`relative ${
                    item.aspect === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                  } rounded-2xl bg-surface border border-stroke overflow-hidden cursor-pointer group hover:shadow-2xl transition-all`}
                  onClick={() => handleItemClick(index)}
                  data-testid={`explorations-card-${index}`}
                >
                  {/* Placeholder for exploration content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stroke/10 to-surface/10 flex items-center justify-center">
                    <span className="text-6xl font-display italic text-muted/30">
                      {item.title[0]}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-bg/90 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-xs text-muted uppercase tracking-wider mb-2">
                        {item.category}
                      </div>
                      <h3 className="text-2xl font-display italic text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <div className="inline-block w-12 h-px bg-stroke" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {explorations.slice(3, 6).map((item, index) => (
              <div
                key={item.title}
                className={`exploration-item-${index + 3} relative max-w-[320px] mx-auto ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
              >
                <div
                  className={`relative ${
                    item.aspect === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                  } rounded-2xl bg-surface border border-stroke overflow-hidden cursor-pointer group hover:shadow-2xl transition-all`}
                  onClick={() => handleItemClick(index + 3)}
                  data-testid={`explorations-card-${index + 3}`}
                >
                  {/* Placeholder for exploration content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stroke/10 to-surface/10 flex items-center justify-center">
                    <span className="text-6xl font-display italic text-muted/30">
                      {item.title[0]}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-bg/90 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-xs text-muted uppercase tracking-wider mb-2">
                        {item.category}
                      </div>
                      <h3 className="text-2xl font-display italic text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <div className="inline-block w-12 h-px bg-stroke" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox */}
      {selectedItem !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedItem(null)}
          data-testid="explorations-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="max-w-4xl w-full max-h-[80vh] overflow-auto bg-surface rounded-2xl border border-stroke p-8 shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <motion.h3
                className="text-3xl font-display italic text-text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {explorations[selectedItem].title}
              </motion.h3>
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="text-muted hover:text-text-primary transition-colors text-2xl"
                data-testid="explorations-lightbox-close"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ×
              </motion.button>
            </div>
            <motion.div
              className="space-y-4 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p>
                <strong className="text-text-primary">Category:</strong> {explorations[selectedItem].category}
              </p>
              <p>
                <strong className="text-text-primary">Description:</strong> Creative exploration showcasing {explorations[selectedItem].category.toLowerCase()} techniques and experimental approaches.
              </p>
              <p>
                <strong className="text-text-primary">Tools:</strong> Various digital and analog tools combined to achieve unique visual and sonic results.
              </p>
              <p className="text-sm italic mt-6">
                This is an experimental exploration, not a commercial project.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
