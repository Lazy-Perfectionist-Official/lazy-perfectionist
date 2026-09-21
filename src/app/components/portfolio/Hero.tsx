'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import SpotlightReveal from '@/app/components/portfolio/SpotlightReveal';

// Hero background candidates (module scope → stable identity across re-renders).
// 2752px is the native source width; 3840px is a pre-upscaled (lanczos3 +
// unsharp) rendition served to superwide displays so the browser never has to
// stretch the native asset.
const HERO_VARIANT_WIDTHS = [800, 1200, 1600, 2000, 2752, 3840];
const HERO_BASE_VARIANTS = HERO_VARIANT_WIDTHS.map((width) => ({
  width,
  url: `/assets/img/optimized/hero-background-${width}.avif`,
}));
const HERO_REVEAL_VARIANTS = HERO_VARIANT_WIDTHS.map((width) => ({
  width,
  url: `/assets/img/optimized/hero-background-warm-${width}.avif`,
}));

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [showShadow, setShowShadow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [content, setContent] = useState<{
    hero_eyebrow: string;
    hero_title_line1: string;
    hero_title_line2: string;
    hero_description: string;
  }>({
    hero_eyebrow: 'Latest Single — LUSG',
    hero_title_line1: 'Where silence speaks',
    hero_title_line2: 'through the sound.',
    hero_description:
      'Instrumental progressive rock from a Hong Kong bedroom studio. Technical precision meets emotional storytelling without saying a word.',
  });
  const navbarRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const navItems = ['Home', 'Music', 'Blog', 'Store', 'Connect'];

  const navHref = (item: string) =>
    item === 'Home' ? '/' : item === 'Connect' ? '/platform-links' : `/${item.toLowerCase()}`;

  useEffect(() => {
    let cancelled = false;
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d.success) return;
        setContent((prev) => ({
          hero_eyebrow: d.data.hero_eyebrow ?? prev.hero_eyebrow,
          hero_title_line1: d.data.hero_title_line1 ?? prev.hero_title_line1,
          hero_title_line2: d.data.hero_title_line2 ?? prev.hero_title_line2,
          hero_description: d.data.hero_description ?? prev.hero_description,
        }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Register ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // GSAP context wraps all animations for proper cleanup on unmount
    const ctx = gsap.context(() => {
      // Navbar fade-in - only if element exists
      if (navbarRef.current) {
        gsap.from(navbarRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Parallax effects are handled by the cursor masking system (SpotlightReveal)

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
    });

    // Scroll detection for navbar shadow
    const handleScroll = () => {
      setShowShadow(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Interactive Spotlight Reveal Background */}
      <div className="absolute inset-0 overflow-hidden">
        <SpotlightReveal
          baseVariants={HERO_BASE_VARIANTS}
          revealVariants={HERO_REVEAL_VARIANTS}
          enabled={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-oryzo-canvas z-40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-oryzo-canvas to-transparent z-40" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 flex flex-row justify-between items-center px-6 md:px-8 py-6 max-w-7xl mx-auto w-full" data-testid="hero-navigation">
        <motion.div
          className="text-2xl md:text-3xl tracking-tight text-oryzo-cream"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          data-testid="nav-logo"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Lazy Perfectionist
        </motion.div>

        <div className="hidden md:flex items-center gap-8" data-testid="nav-links">
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              // framer-motion makes gesture wrappers focusable (tabindex="0"),
              // which puts an anonymous div in the tab order ahead of the real
              // link. Keep the gesture, drop the extra tab stop.
              tabIndex={-1}
            >
              <Link
                href={navHref(item)}
                className={`text-sm ${item === 'Home' ? 'text-oryzo-cream' : 'text-oryzo-muted hover:text-oryzo-cream'} transition-colors`}
                data-testid={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            tabIndex={-1}
          >
            <Link
              href="https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center shadow-lg"
              data-testid="nav-listen-now"
            >
              Listen Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden liquid-glass rounded-full p-3 text-oryzo-cream"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          data-testid="nav-mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="relative z-50 md:hidden px-6 pb-6"
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="liquid-glass rounded-3xl p-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={navHref(item)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base ${item === 'Home' ? 'text-oryzo-cream' : 'text-oryzo-muted'} hover:text-oryzo-cream transition-colors py-2`}
                  data-testid={`nav-mobile-link-${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              ))}
              <Link
                href="https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="liquid-glass rounded-full px-6 py-3 text-sm text-oryzo-cream text-center mt-2"
              >
                Listen Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div
        ref={heroRef}
        className="relative z-50 flex-1 flex flex-col items-center justify-center text-center px-6 py-20"
        data-testid="hero-content"
      >
        {/* Eyebrow */}
        <div className="mb-8 hero-anim hero-fade" style={{ animationDelay: '0.7s' }} data-testid="hero-eyebrow">
          <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em]">
            {content.hero_eyebrow}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal font-display italic text-oryzo-cream mb-6" data-testid="hero-title">
          <span className="hero-anim hero-reveal block" style={{ animationDelay: '0.25s' }}>
            {content.hero_title_line1}
          </span>
          <span className="hero-anim hero-reveal block" style={{ animationDelay: '0.42s' }}>
            {content.hero_title_line2}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-oryzo-muted max-w-2xl mt-8 leading-relaxed hero-anim hero-fade" style={{ animationDelay: '0.85s' }} data-testid="hero-description">
          {content.hero_description}
        </p>

        {/* CTA Button with magnetic effect */}
        <div className="hero-anim hero-fade" style={{ animationDelay: '1s' }}>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // Same as the nav wrappers above: whileTap would otherwise inject
            // tabindex="0" and create a tab stop on this anonymous div.
            tabIndex={-1}
          >
            <motion.div
              className="relative inline-block"
              whileHover={{ boxShadow: '0 0 30px rgba(220, 80, 0, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-14 py-5 text-base text-oryzo-cream mt-12 transition-transform cursor-pointer inline-flex items-center justify-center relative z-10"
                data-testid="hero-cta-button"
              >
                Stream "LUSG" Now
              </Link>
              <motion.div
                className="absolute inset-0 rounded-full bg-oryzo-ember opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="relative z-50 mb-8"
        data-testid="scroll-indicator"
        animate={prefersReducedMotion ? undefined : {
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
            animate={prefersReducedMotion ? undefined : {
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
            animate={prefersReducedMotion ? undefined : {
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
