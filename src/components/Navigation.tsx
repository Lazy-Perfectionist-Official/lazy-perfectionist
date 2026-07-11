'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ExternalLink,
  ShoppingCart,
  Coffee,
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  [key: string]: any;
}

function MagneticButton({ children, className = '', href, onClick, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center with reduced range for subtlety
    const maxDistance = 8; // Maximum magnetic pull distance in pixels
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    mouseX.set(Math.max(-maxDistance, Math.min(maxDistance, deltaX * maxDistance * 2)));
    mouseY.set(Math.max(-maxDistance, Math.min(maxDistance, deltaY * maxDistance * 2)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const sharedProps = {
    ref,
    className: `${className} group`,
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    ...props
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...sharedProps}>
      {children}
    </motion.button>
  );
}

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ensure navItems is always consistent to prevent hydration issues
  const navItems = useMemo(() => ['Home', 'Music', 'Blog', 'Store'], []);

  return (
    <motion.nav
      key={`nav-${currentPage}`}
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
            {navItems && navItems.length > 0 ? (
              navItems.map((item) => (
                <MagneticButton
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`transition-colors font-medium ${
                    currentPage === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-600'
                  }`}
                >
                  {item}
                </MagneticButton>
              ))
            ) : (
              // Fallback navigation items
              ['Home', 'Music', 'Blog', 'Store'].map((item) => (
                <MagneticButton
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`transition-colors font-medium ${
                    currentPage === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-600'
                  }`}
                >
                  {item}
                </MagneticButton>
              ))
            )}
            <MagneticButton
              href="https://ko-fi.com/lazyperfectionist"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-medium"
            >
              <Coffee size={16} /> Support
            </MagneticButton>
            <MagneticButton
              href="https://linktr.ee/lazyperfectionist_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-blue-600 flex items-center gap-1 font-medium"
            >
              Links <ExternalLink size={14} />
            </MagneticButton>
          </div>

          <MagneticButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black/70 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MagneticButton>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="md:hidden overflow-hidden border-t border-black/20"
        >
          <div className="px-6 py-4 space-y-3">
            {navItems && navItems.length > 0 ? (
              navItems.map((item) => (
                <MagneticButton
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`block py-2 font-medium transition-colors ${
                    currentPage === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-600'
                  }`}
                >
                  {item}
                </MagneticButton>
              ))
            ) : (
              // Fallback navigation items
              ['Home', 'Music', 'Blog', 'Store'].map((item) => (
                <MagneticButton
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`block py-2 font-medium transition-colors ${
                    currentPage === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-600'
                  }`}
                >
                  {item}
                </MagneticButton>
              ))
            )}
            <MagneticButton
              href="https://ko-fi.com/lazyperfectionist"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 flex items-center gap-1 py-2 font-medium"
            >
              <Coffee size={16} /> Support
            </MagneticButton>
            <MagneticButton
              href="https://linktr.ee/lazyperfectionist_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-blue-600 flex items-center gap-1 py-2 font-medium"
            >
              Links <ExternalLink size={14} />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}