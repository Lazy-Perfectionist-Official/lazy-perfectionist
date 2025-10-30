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
  Sparkles,
  Zap,
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
    <div className="min-h-screen linktree-gradient relative">
      {/* -----------------------------------------------------------------
          Background gradient (base layer) */}
      <div className="fixed inset-0 -z-20 pointer-events-none" />

      {/* -----------------------------------------------------------------
          Noise texture overlay - OVER the gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("/assets/img/noise.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          mixBlendMode: 'overlay',
        }}
      />

      {/* -----------------------------------------------------------------
          Enhanced animated background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-white/10 to-transparent rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {!reduceMotion && (
          <motion.div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        )}
      </div>

      {/* -----------------------------------------------------------------
          Navigation */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto linktree-button backdrop-blur-md z-50 border border-black/20 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <span className="linktree-text font-semibold text-lg font-dm-serif">
            ✨ Lazy Perfectionist
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

          {/* Mobile menu button – instant tap */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden linktree-text/80 p-2 touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu – smooth height animation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden linktree-button backdrop-blur-md border-t border-black/20 rounded-b-2xl overflow-hidden"
          style={{ overflow: 'hidden' }}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-1">
            <Link href="/" className="linktree-text block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors">
              Home
            </Link>
            <Link href="/music" className="linktree-text/80 block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors">
              Music
            </Link>
            <Link href="/blog" className="linktree-text/80 block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors">
              Blog
            </Link>
            <a
              href="https://linktr.ee/lazyperfectionist_official"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-text/80 block px-3 py-2 text-base font-medium rounded-md hover:bg-black/10 transition-colors flex items-center gap-1"
            >
              Links <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </nav>

      {/* -----------------------------------------------------------------
          HERO – Image centered, gradient darkens on scroll */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/img/logo.png"
            alt="Lazy Perfectionist"
            className="w-full h-full object-cover object-center"
            style={{ transform: 'translateZ(0)' }}
            loading="eager"
          />
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/95 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Enhanced title with sophisticated animations */}
          <motion.div className="relative mb-6">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                @Lazy Perfectionist
              </motion.span>
            </motion.h1>

            {/* Glow effect behind title */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-3xl rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.6 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
              style={{ transform: 'translateZ(-1)' }}
            />
          </motion.div>

          {/* Enhanced subtitle with staggered word animation */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            {['Bedroom', 'Instrumental', 'Rock!'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mx-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.1, color: '#fbbf24' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Enhanced CTA buttons with staggered entrance */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          >
            <motion.a
              href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center justify-center px-8 py-4 font-semibold relative overflow-hidden group shadow-lg"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: '0 20px 25px -5px rgba(34, 197, 94, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative z-10 flex items-center"
                whileHover={{ x: 5 }}
              >
                <Play className="mr-2" size={20} />
                Stream "Orbit" Now!
              </motion.div>
            </motion.a>

            <motion.a
              href="https://medium.com/@lazyperfectist"
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button inline-flex items-center justify-center px-8 py-4 font-semibold relative overflow-hidden group shadow-lg"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative z-10 flex items-center"
                whileHover={{ x: 5 }}
              >
                <BookOpen className="mr-2" size={20} />
                Read on Medium
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Enhanced location info with icons */}
          <motion.div
            className="flex items-center justify-center gap-6 text-white/80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: '#fbbf24' }}
            >
              <Music className="w-4 h-4" />
              Hong Kong
            </motion.span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              •
            </motion.span>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: '#fbbf24' }}
            >
              <Zap className="w-4 h-4" />
              Lazy Perfectionist
            </motion.span>
          </motion.div>
        </div>

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
      <section ref={ytRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={ytInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={reduceMotion ? {} : { scale: [1, 1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold linktree-header-text">
                Videos
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
          ABOUT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold linktree-header-text">
              About Lazy Perfectionist
            </h2>
          </motion.div>

          <motion.div
            className="linktree-button backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-black/20"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-3 text-lg linktree-text"
              >
                <p><strong>Artist:</strong> Sammy</p>
                <p><strong>Project:</strong> Lazy Perfectionist</p>
                <p><strong>Location:</strong> Hong Kong</p>
                <p><strong>Genre:</strong> Instrumental Progressive</p>
              </motion.div>

              <motion.p
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg linktree-text/90 leading-relaxed"
              >
                Lazy Perfectionist is an instrumental progressive rock/metal project
                blending technical precision, emotional storytelling, orchestral layers,
                EDM-inspired synths, and anime music influences.
              </motion.p>
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center text-lg linktree-text/80 mb-10 italic"
            >
              The debut single <strong>Orbit</strong> (released October 17, 2025) anchors a
              four-track EP — a “sound walk” exploring human contradictions.
            </motion.p>

            <div className="space-y-8 mb-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold linktree-header-text-blue mb-4">
                  Core Philosophy
                </h3>
                <ul className="list-disc list-inside space-y-1 text-linktree-text/90">
                  <li>Flaws are the heartbeat of art</li>
                  <li>Instrumental music is a universal story</li>
                  <li>Commit when it captures intent</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-medium linktree-header-text-blue mb-2">
                  What Makes It Different
                </h4>
                <p className="linktree-text/90">
                  Self-taught Hong Kong business student blending solfa instinct,
                  orchestral arrangements, and raw duality into unique “Sounds”.
                  Bedroom DIY ethos — from AirPods mixing to pro studio recordings.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold linktree-header-text-blue mb-6">
                Connect
              </h3>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <a
                  href="https://instagram.com/lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 linktree-text/80 hover:linktree-text transition-colors"
                >
                  Instagram: @lazyperfectionist_official
                </a>
                <a
                  href="https://tiktok.com/@lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 linktree-text/80 hover:linktree-text transition-colors"
                >
                  TikTok: @lazyperfectionist_official
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Hw2a43RV1p0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 linktree-text/80 hover:linktree-text transition-colors"
                >
                  YouTube: Orbit (Official Video)
                </a>
              </div>
            </motion.div>
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