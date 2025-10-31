'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import {
  Youtube,
  Music,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Play,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { motion, useInView, easeOut } from 'framer-motion';

// ---------------------------------------------------------------------
// Scroll → CSS variable: 0.5 → 1.0 (50% → 100% dark)
function useScrollOpacity() {
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scroll = window.scrollY;
      const opacity = Math.min(1.0, 0.5 + (scroll / 400) * 0.5); // 0.5 → 1.0
      document.documentElement.style.setProperty('--scroll-opacity', opacity.toFixed(3));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // Initial value
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

// ---------------------------------------------------------------------
// Main component
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: false, margin: '-100px' });
  const aboutInView = useInView(aboutRef, { once: true, margin: '-20%' });

  // Reduce motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll opacity (0.5 → 1.0)
  useScrollOpacity();

  // Lazy load YouTube
  useEffect(() => {
    if (!aboutRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );
    observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation variants (type-safe)
  const fadeIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: easeOut },
      };

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1, ease: easeOut },
      };

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/assets/img/logo.png" />
      </Head>

      <div className="min-h-screen linktree-gradient relative overflow-x-hidden">
        {/* Static background blobs */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-xl" />
        </div>

        {/* Multi-layered brilliant noise texture overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            // Base layer - larger seamless pattern
            backgroundImage: `url("/assets/img/noise.jpg")`,
            backgroundSize: '600px 600px',
            backgroundPosition: '0 0',
            backgroundRepeat: 'repeat',
            opacity: 0.15,
            mixBlendMode: 'soft-light',
            transform: 'scale(1.5)',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            // Secondary layer - finer detail with different blend mode
            backgroundImage: `url("/assets/img/noise.jpg")`,
            backgroundSize: '200px 200px',
            backgroundPosition: '100px 100px',
            backgroundRepeat: 'repeat',
            opacity: 0.12,
            mixBlendMode: 'overlay',
            transform: 'scale(1.2) rotate(1deg)',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            // Fine top layer - organic texture
            backgroundImage: `url("/assets/img/noise.jpg")`,
            backgroundSize: '100px 100px',
            backgroundPosition: '50px 25px',
            backgroundRepeat: 'repeat',
            opacity: 0.08,
            mixBlendMode: 'multiply',
            transform: 'scale(1.8) rotate(-0.5deg)',
          }}
        />

        {/* Navigation */}
        <motion.nav
          className="fixed top-4 left-4 right-4 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border-2 border-black rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between h-16 px-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/" className="flex items-center">
                  <span className="text-black font-bold text-xl font-dm-serif tracking-tight">
                    Lazy Perfectionist
                  </span>
                </Link>
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'Music', 'Blog'].map((item) => (
                  <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="text-black hover:text-blue-600 transition-colors font-medium"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href="https://linktr.ee/lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 hover:text-blue-600 flex items-center gap-1 font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Links <ExternalLink size={14} />
                </motion.a>
              </div>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-black/70 p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-black/20"
            >
              <div className="px-6 py-4 space-y-3">
                {['Home', 'Music', 'Blog'].map((item) => (
                  <motion.div key={item} whileHover={{ x: 10 }}>
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block text-black hover:text-blue-600 py-2 font-medium"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href="https://linktr.ee/lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 hover:text-blue-600 flex items-center gap-1 py-2 font-medium"
                  whileHover={{ x: 10 }}
                >
                  Links <ExternalLink size={14} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.nav>

        {/* HERO SECTION – logo.png + 50% → 100% dark */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center text-white pt-20 z-0"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src="/assets/img/logo.png"
              alt="Lazy Perfectionist"
              fill
              quality={85}
              className="object-cover object-center"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              priority={false}
            />
            {/* DARK OVERLAY: starts 50%, goes to 100% */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95"
              style={{ opacity: 'var(--scroll-opacity, 0.5)' }}
            />
          </div>

          <div className="text-center px-6 sm:px-8 lg:px-12 max-w-4xl relative z-20">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6"
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}
              {...fadeIn}
            >
              @ Lazy Perfectionist
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl mb-16 text-white/90"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}
              {...fadeUp}
            >
              Bedroom Instrumental Rock!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: easeOut }}
            >
              <a
                href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-button inline-flex items-center justify-center px-8 py-4 font-semibold relative overflow-hidden group shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  <Play className="mr-2" size={22} /> Stream "Orbit" Now
                </span>
              </a>

              <a
                href="https://medium.com/@lazyperfectist"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-button inline-flex items-center justify-center px-8 py-4 font-semibold relative overflow-hidden group shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen className="mr-2" size={22} /> Read on Medium
                </span>
              </a>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-6 text-white/80"
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: easeOut }}
            >
              <motion.span className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <Music className="w-4 h-4" /> Hong Kong
              </motion.span>
              <motion.span
                animate={!reduceMotion ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                •
              </motion.span>
              <motion.span className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <Zap className="w-4 h-4" /> Lazy Perfectionist
              </motion.span>
            </motion.div>
          </div>

          {!reduceMotion && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-white/60" />
            </motion.div>
          )}
        </section>

        {/* ABOUT SECTION */}
        <section
          ref={aboutRef}
          className="relative z-0 py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-transparent to-white/5"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-black shadow-2xl"
              initial={{ opacity: 0 }}
              animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold font-dm-serif">
                    The Art of Lazy Perfectionism
                  </h2>
                  <p className="text-base sm:text-lg text-black/90 leading-relaxed">
                    Lazy Perfectionist is an instrumental progressive rock/metal project that blends technical precision with emotional storytelling. From a Hong Kong bedroom, orchestral layers meet EDM-inspired synths and anime music influences.
                  </p>

                  <div className="space-y-3">
                    {[
                      { label: 'Artist', value: 'Sammy Lee' },
                      { label: 'Project', value: 'Lazy Perfectionist' },
                      { label: 'Location', value: 'Hong Kong' },
                      { label: 'Genre', value: 'Instrumental Progressive Rock' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-2 border-b border-black/20 last:border-0"
                      >
                        <span className="text-black/70 font-medium">{item.label}</span>
                        <span
                          className={`font-semibold ${
                            item.label === 'Genre' ? 'text-indigo-600' : 'text-black'
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-full aspect-video bg-black rounded-2xl overflow-hidden border-2 border-black shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showVideo ? (
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/videoseries?list=UUFTZk9p7Mkg4D0RAULveDLg"
                        title="Latest Lazy Perfectionist Videos"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-black/80 rounded-2xl">
                        <Youtube className="w-16 h-16 text-white/60" />
                      </div>
                    )}
                  </motion.div>

                  <p className="mt-3 text-sm text-black/60 font-medium text-center">
                    <Youtube className="inline-block w-4 h-4 mr-1" />
                    Latest from YouTube Channel
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Button hover CSS */}
      <style jsx>{`
        .linktree-button {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .linktree-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(34,197,94,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.2s ease;
        }
        .linktree-button:hover::before {
          transform: translateX(0);
        }
        .linktree-button:nth-of-type(2)::before {
          background: linear-gradient(to right, rgba(59,130,246,0.2), transparent);
        }
      `}</style>
    </>
  );
}