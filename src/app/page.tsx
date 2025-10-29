'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Youtube,
  Music,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Play,
  Menu,
  X,
} from 'lucide-react';
import { motion, useScroll, useInView, useTransform } from 'framer-motion';

// ---------------------------------------------------------------------
// YouTube ID extraction
const getYouTubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const youtubeId = getYouTubeId('https://www.youtube.com/watch?v=Hw2a43RV1p0');

// ---------------------------------------------------------------------
// Main component
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // SINGLE scroll hook
  const { scrollY } = useScroll();

  // Gradient overlay: starts half-dark → gets darker on scroll
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.6, 0.9]);

  // -----------------------------------------------------------------
  // Reduce-motion detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // -----------------------------------------------------------------
  // YouTube lazy load
  const ytRef = useRef<HTMLDivElement>(null);
  const ytInView = useInView(ytRef, { once: true, margin: '-150px' });

  return (
    <div className="min-h-screen linktree-gradient">
      {/* -----------------------------------------------------------------
          Static subtle background gradients */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full" />
      </div>

      {/* -----------------------------------------------------------------
          Navigation */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto linktree-button backdrop-blur-md z-50 border border-black/20 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <span className="linktree-text font-semibold text-lg font-dm-serif">
            Lazy Perfectionist
          </span>

          <div className="hidden md:flex items-baseline space-x-8">
            <Link href="/" className="linktree-text hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/music" className="linktree-text/80 hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors">
              Music
            </Link>
            <Link href="/blog" className="linktree-text/80 hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors">
              Blog
            </Link>
            <a
              href="https://linktr.ee/lazyperfectionist_official"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-text/80 hover:opacity-80 px-3 py-2 text-sm font-medium transition-colors"
            >
              Links
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden linktree-text/80 p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden -mx-4 sm:-mx-6 lg:-mx-8 linktree-button backdrop-blur-md border-t border-black/20 rounded-b-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-1">
              <Link href="/" className="linktree-text block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="/music" className="linktree-text/80 hover:opacity-80 block px-3 py-2 text-base font-medium">
                Music
              </Link>
              <Link href="/blog" className="linktree-text/80 hover:opacity-80 block px-3 py-2 text-base font-medium">
                Blog
              </Link>
              <a
                href="https://linktr.ee/lazyperfectionist_official"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-text/80 hover:opacity-80 block px-3 py-2 text-base font-medium"
              >
                Links
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* -----------------------------------------------------------------
          HERO – Image centered, gradient darkens on scroll */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image – centered, full coverage */}
        <div className="absolute inset-0">
          <img
            src="/assets/img/logo.png"
            alt="Lazy Perfectionist"
            className="w-full h-full object-cover object-center"
            style={{ transform: 'translateZ(0)' }}
            loading="eager"
          />
        </div>

        {/* Gradient Overlay – starts half-dark, gets darker */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/95 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            @Lazy Perfectionist
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Bedroom Instrumental Rock!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            <motion.a
              href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center justify-center px-8 py-4 font-semibold transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="mr-2" size={20} />
              Stream "Orbit" Now!
            </motion.a>

            <motion.a
              href="https://medium.com/@lazyperfectist"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center justify-center px-8 py-4 font-semibold transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen className="mr-2" size={20} />
              Read on Medium
            </motion.a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-6 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="flex items-center gap-2">Hong Kong</span>
            <span>•</span>
            <span>@Lazy Perfectionist</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {!reduceMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        )}
      </section>

      {/* -----------------------------------------------------------------
          YouTube Section */}
      <section ref={ytRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-black/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={ytInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={reduceMotion ? {} : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Youtube className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-bold linktree-header-text">
                Featured Video
              </h2>
            </motion.div>
            <p className="text-xl linktree-header-text/80">
              Watch my latest video
            </p>
          </motion.div>

          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={ytInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-300/20 z-10 pointer-events-none" />
            {ytInView && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Lazy Perfectionist - Featured Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={ytInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center justify-center px-6 py-3 font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Youtube className="mr-2" size={20} />
              Watch on YouTube
            </motion.a>

            <motion.a
              href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center justify-center px-6 py-3 font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Music className="mr-2" size={20} />
              Stream Music
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          Footer */}
      <footer className="relative bg-black/90 backdrop-blur-xl border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-amber-500/20" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Lazy Perfectionist
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bedroom Instrumental Rock from Hong Kong. Creating music that
                moves the soul.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  Home
                </Link>
                <Link href="/music" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  Music
                </Link>
                <Link href="/blog" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  Blog
                </Link>
                <a
                  href="https://linktr.ee/lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  All Links
                </a>
              </div>
            </motion.div>

            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Connect
              </h4>
              <div className="space-y-2">
                <a
                  href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  Spotify
                </a>
                <a
                  href="https://medium.com/@lazyperfectist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Medium
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Hw2a43RV1p0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  YouTube
                </a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 mb-8" />

          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Lazy Perfectionist Team. All rights reserved.
            </div>

            <motion.div className="flex items-center space-x-6" whileHover={{ scale: 1.05 }}>
              <a
                href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Spotify"
              >
                <Music className="w-5 h-5" />
              </a>
              <a
                href="https://medium.com/@lazyperfectist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Medium"
              >
                <BookOpen className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=Hw2a43RV1p0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {!reduceMotion && (
            <>
              <motion.div
                className="absolute bottom-10 left-10 text-orange-500/20"
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Music className="w-8 h-8" />
              </motion.div>

              <motion.div
                className="absolute top-10 right-10 text-amber-500/20"
                animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Music className="w-6 h-6" />
              </motion.div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}