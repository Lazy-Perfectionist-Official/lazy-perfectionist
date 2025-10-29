'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Youtube, 
  Music, 
  BookOpen, 
  ExternalLink, 
  ChevronDown,
  Play,
  Menu,
  X
} from 'lucide-react';

// YouTube video ID extraction
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const youtubeId = getYouTubeId('https://www.youtube.com/watch?v=Hw2a43RV1p0');

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  
  // Smoother parallax effects
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textScale = useTransform(scrollY, [0, 150], [1, 0.9]);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen linktree-gradient">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 linktree-button backdrop-blur-md z-50 border border-black/20 rounded-2xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-40">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="linktree-text font-semibold text-lg">Lazy Perfectionist</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
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
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="linktree-text/80 hover:opacity-80 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden linktree-button backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Full screen background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/img/logo.png"
            alt="Lazy Perfectionist"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ scale: textScale }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            @Lazy Perfectionist
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Bedroom Instrumental Rock! Debut Single coming soon!
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
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
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <span className="flex items-center gap-2">
              🇭🇰 Hong Kong
            </span>
            <span>•</span>
            <span>@Lazy Perfectionist</span>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </motion.section>

      {/* YouTube Video Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black/10"
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Youtube className="w-8 h-8 text-red-500" />
              <h2 className="text-4xl md:text-5xl font-bold linktree-header-text">Featured Video</h2>
            </motion.div>
            <p className="text-xl linktree-header-text/80">Watch my latest music video and performance</p>
          </motion.div>
          
          <motion.div 
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-300/20 z-10 pointer-events-none" />
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Lazy Perfectionist - Featured Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
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
      </motion.section>

      {/* Music Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Music className="w-12 h-12 linktree-text mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold linktree-header-text mb-4">Latest Music</h2>
            <p className="text-xl linktree-header-text/80">Listen to "Orbit" - my debut single</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/90 rounded-3xl p-8 backdrop-blur-sm shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400/20 to-amber-300/20 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Music className="w-16 h-16 linktree-text mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-semibold linktree-text mb-2">Orbit</h3>
                <p className="linktree-text/70 mb-6">Debut single now available on all platforms</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linktree-button inline-flex items-center justify-center px-6 py-3 font-semibold transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="mr-2" size={16} />
                    Listen on Spotify
                  </motion.a>
                  <Link
                    href="/music"
                    className="linktree-button inline-flex items-center justify-center px-6 py-3 font-semibold transition-all"
                  >
                    <Music className="mr-2" size={16} />
                    More Music
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <BookOpen className="w-12 h-12 linktree-text mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold linktree-header-text mb-4">Stories & Thoughts</h2>
            <p className="text-xl linktree-header-text/80">Read my latest posts on Medium</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                className="bg-white/90 rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="aspect-video rounded-xl bg-gradient-to-br from-orange-400/20 to-amber-300/20 mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <BookOpen className="w-12 h-12 linktree-text" />
                </motion.div>
                <h3 className="text-xl font-semibold linktree-text mb-2">Latest Story {i}</h3>
                <p className="linktree-text/70 mb-4">Discover insights about music, creativity, and the journey...</p>
                <div className="flex gap-3">
                  <motion.a
                    href="https://medium.com/@lazyperfectist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linktree-text font-medium inline-flex items-center hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Read on Medium <ExternalLink className="ml-1" size={14} />
                  </motion.a>
                  <Link
                    href="/blog"
                    className="linktree-text/70 hover:text-linktree-text font-medium inline-flex items-center"
                  >
                    View All
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://medium.com/@lazyperfectist"
                target="_blank"
                rel="noopener noreferrer"
                className="linktree-button inline-flex items-center justify-center px-8 py-3 font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Stories
              </motion.a>
              <Link
                href="/blog"
                className="linktree-button inline-flex items-center justify-center px-8 py-3 font-semibold transition-all"
              >
                <BookOpen className="mr-2" size={20} />
                Browse Blog
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="relative bg-black/90 backdrop-blur-xl border-t border-white/10 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-amber-500/20"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand section */}
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Lazy Perfectionist</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bedroom Instrumental Rock from Hong Kong 🇭🇰. Creating music that moves the soul.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
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

            {/* Connect */}
            <motion.div 
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
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

          {/* Divider */}
          <div className="border-t border-white/10 mb-8"></div>

          {/* Bottom section */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Lazy Perfectionist Team. All rights reserved.
            </div>
            
            <motion.div 
              className="flex items-center space-x-6"
              whileHover={{ scale: 1.05 }}
            >
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

          {/* Floating music note decoration */}
          <motion.div
            className="absolute bottom-10 left-10 text-orange-500/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Music className="w-8 h-8" />
          </motion.div>

          <motion.div
            className="absolute top-10 right-10 text-amber-500/20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Music className="w-6 h-6" />
          </motion.div>
        </div>
      </footer>
    </div>
  )
}