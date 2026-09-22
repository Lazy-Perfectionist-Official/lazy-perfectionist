'use client';

import { useGesture } from '@use-gesture/react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface GestureNavProps {
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    href: string;
  }>;
  onItemClick?: (item: any) => void;
}

export default function MobileGestureNav({ items, onItemClick }: GestureNavProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);
  const scale = useTransform(x, [-100, 0, 100], [0.9, 1, 0.9]);

  const bind = useGesture({
    onDrag: ({ offset: [dragX], direction: [dx], velocity: [vx] }) => {
      x.set(dragX);
      setIsDragging(true);

      // Swipe detection with threshold
      if (Math.abs(vx) > 0.5 && Math.abs(dragX) > 50) {
        if (dx > 0 && currentIndex > 0) {
          setCurrentIndex((i) => i - 1);
        } else if (dx < 0 && currentIndex < items.length - 1) {
          setCurrentIndex((i) => i + 1);
        }
        x.set(0); // Reset position
      }
    },
    onDragEnd: () => {
      setIsDragging(false);
      x.set(0); // Always reset position
    },
  });

  const currentItem = items[currentIndex];

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(currentItem);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Enter' || e.key === ' ') handleItemClick();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto select-none">
      <motion.div
        {...bind()}
        className="relative min-h-[300px] touch-none"
        style={{
          rotateY,
          scale,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        animate={{
          x: isDragging ? x : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="bg-oryzo-surface rounded-2xl p-8 shadow-2xl border border-oryzo-border"
          >
            <div className="text-center">
              {currentItem.icon && (
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {currentItem.icon}
                </motion.div>
              )}

              <h3 className="text-2xl font-display italic text-oryzo-cream mb-3">
                {currentItem.label}
              </h3>

              <motion.a
                href={currentItem.href}
                onClick={handleItemClick}
                className="inline-block mt-4 px-6 py-3 bg-oryzo-ember text-oryzo-cream rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Go to {currentItem.label}
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation indicators */}
      <div className="flex justify-between items-center mt-6 px-4">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-oryzo-surface border border-oryzo-border disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ←
        </motion.button>

        <div className="flex gap-2">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-oryzo-ember' : 'bg-oryzo-muted'
              }`}
              animate={{
                scale: index === currentIndex ? 1.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          className="p-3 rounded-full bg-oryzo-surface border border-oryzo-border disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          →
        </motion.button>
      </div>

      {/* Swipe hint */}
      <motion.div
        className="text-center mt-6 text-oryzo-muted text-sm"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Swipe or use arrow keys to navigate
      </motion.div>
    </div>
  );
}
