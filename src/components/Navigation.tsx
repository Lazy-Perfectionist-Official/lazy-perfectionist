'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Music', 'Blog'];

  return (
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
            {navItems.map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`transition-colors font-medium ${
                    currentPage === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-600'
                  }`}
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
            {navItems.map((item) => (
              <motion.div key={item} whileHover={{ x: 10 }}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`block py-2 font-medium transition-colors ${
                    currentPage === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-600'
                  }`}
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
  );
}