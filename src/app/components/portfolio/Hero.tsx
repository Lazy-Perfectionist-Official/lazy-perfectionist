'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CursorReveal from '@/app/components/portfolio/CursorReveal';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showShadow, setShowShadow] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar'];

  useEffect(() => {
    // GSAP setup
    const ctx = gsap.context();

    // Register ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Navbar fade-in
    gsap.from(navbarRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power3.out',
      delay: 2.8,
    });

    // Note: CursorReveal component handles its own interactive effects
    // Parallax effects are now handled by the cursor masking system

    // Text content parallax - moves at different speed than background
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -50, // Text moves opposite direction
        opacity: 0.3, // Fades as user scrolls
        ease: 'power2.out',
      });
    }

    // Hero content animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 80%',
      },
    });

    // Name reveal animation
    tl.from('.name-reveal', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.1,
    });

    // Blur-in animations
    tl.from('.blur-in', {
      opacity: 0,
      filter: 'blur(10px)',
      y: 20,
      duration: 1,
      stagger: 0.1,
      delay: 0.3,
    });

    // Role cycling
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    // Scroll detection for navbar shadow
    const handleScroll = () => {
      setShowShadow(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(roleInterval);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Interactive Cursor Reveal Background with Brushstrokes */}
      <div className="absolute inset-0 overflow-hidden">
        <CursorReveal
          originalImage="/assets/img/hero-background.jpg"
          revealImage="/assets/img/hero-background-warm.JPG"
          enabled={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-oryzo-canvas" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-oryzo-canvas to-transparent" />
      </div>

      {/* Enhanced Navigation Bar with improved interactions */}
      <nav className="relative z-10 flex flex-row justify-between px-8 py-6 max-w-7xl mx-auto w-full" data-testid="hero-navigation">
        <motion.div
          className="text-3xl tracking-tight text-oryzo-cream"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          data-testid="nav-logo"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Lazy Perfectionist
        </motion.div>

        <div className="hidden md:flex items-center gap-8" data-testid="nav-links">
          {['Home', 'Music', 'Blog', 'Store', 'Connect'].map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            >
              <Link
                href={item === 'Home' ? '/' : item === 'Connect' ? '/platform-links' : `/${item.toLowerCase()}`}
                className={`text-sm ${item === 'Home' ? 'text-oryzo-cream' : 'text-oryzo-muted hover:text-oryzo-cream'} transition-colors`}
                data-testid={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link
            href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center shadow-lg"
            data-testid="nav-listen-now"
          >
            Listen Now
          </Link>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div
        ref={heroRef}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20"
        data-testid="hero-content"
      >
        {/* Eyebrow */}
        <div className="mb-8 blur-in" data-testid="hero-eyebrow">
          <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em]">
            COLLECTION '26
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise font-display italic text-oryzo-cream mb-6 name-reveal" data-testid="hero-title">
          Where <em className="not-italic text-oryzo-muted">silence</em> speaks{' '}
          <em className="not-italic text-oryzo-muted">through the sound.</em>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-oryzo-muted max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay" data-testid="hero-description">
          Instrumental progressive rock from a Hong Kong bedroom studio. Technical precision meets emotional storytelling
          without saying a word.
        </p>

        {/* CTA Button with magnetic effect */}
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ boxShadow: '0 0 30px rgba(220, 80, 0, 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-14 py-5 text-base text-oryzo-cream mt-12 transition-transform cursor-pointer animate-fade-rise-delay-2 inline-flex items-center justify-center relative z-10"
              data-testid="hero-cta-button"
            >
              Stream "Orbit" Now
            </Link>
            <motion.div
              className="absolute inset-0 rounded-full bg-oryzo-ember opacity-0"
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="relative z-10 mb-8"
        data-testid="scroll-indicator"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-center mb-2" data-testid="scroll-text">
          <motion.span
            className="text-xs text-oryzo-muted uppercase tracking-[0.2em]"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll
          </motion.span>
        </div>
        <div className="relative w-px h-10 bg-oryzo-border mx-auto" data-testid="scroll-line">
          <motion.div
            className="absolute inset-0 bg-oryzo-cream"
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
