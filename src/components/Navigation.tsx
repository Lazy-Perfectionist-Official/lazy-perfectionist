'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(() => ['Home', 'Music', 'Blog', 'Store'], []);
  const navHref = (item: string) => (item === 'Home' ? '/' : `/${item.toLowerCase()}`);

  return (
    <motion.nav
      key={`nav-${currentPage}`}
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="bg-oryzo-canvas/80 backdrop-blur-xl border-b border-oryzo-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 md:px-8">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl tracking-tight text-oryzo-cream" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Lazy Perfectionist
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href={navHref(item)}
                  className={`text-sm transition-colors ${
                    currentPage === item.toLowerCase() ? 'text-oryzo-cream' : 'text-oryzo-muted hover:text-oryzo-cream'
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                href="https://linktr.ee/lazyperfectionist_official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-oryzo-muted hover:text-oryzo-cream transition-colors inline-flex items-center gap-1"
              >
                Connect <ExternalLink size={12} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden liquid-glass rounded-full p-2.5 text-oryzo-cream"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden px-6 pb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="liquid-glass rounded-3xl p-6 flex flex-col gap-4 mt-2">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={navHref(item)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base py-2 transition-colors ${
                      currentPage === item.toLowerCase() ? 'text-oryzo-cream' : 'text-oryzo-muted hover:text-oryzo-cream'
                    }`}
                  >
                    {item}
                  </Link>
                ))}
                <Link
                  href="https://linktr.ee/lazyperfectionist_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base py-2 text-oryzo-muted hover:text-oryzo-cream transition-colors inline-flex items-center gap-2"
                >
                  Connect <ExternalLink size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
