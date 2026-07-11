'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const animationRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  const words = ['Design', 'Create', 'Inspire'];
  const startTime = useRef(Date.now());
  const duration = 2700; // 2.7 seconds

  useEffect(() => {
    if (animationRef.current) return;
    animationRef.current = true;

    // Word cycling animation
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    // RAF counter animation
    const animateCounter = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const targetCount = Math.floor(progress * 100);

      setCount(targetCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateCounter);
      } else {
        // Animation complete
        clearInterval(wordInterval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    rafRef.current = requestAnimationFrame(animateCounter);

    return () => {
      clearInterval(wordInterval);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-oryzo-canvas flex flex-col"
      data-testid="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: count === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '30px 30px'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Top Label */}
      <motion.div
        className="absolute top-8 left-8"
        data-testid="loading-label"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em]">
          Portfolio
        </span>
      </motion.div>

      {/* Center Rotating Words */}
      <div className="flex-1 flex items-center justify-center" data-testid="loading-words-container">
        <div className="text-center relative h-32 md:h-40 lg:h-48">
          <AnimatePresence mode="wait">
            {words.map((word, index) => (
              index === wordIndex && (
                <motion.div
                  key={word}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  data-testid={`loading-word-${index}`}
                >
                  <motion.span
                    className="text-4xl md:text-6xl lg:text-7xl font-display italic text-oryzo-cream/80"
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(255, 255, 255, 0.3)',
                        '0 0 40px rgba(255, 255, 255, 0.6)',
                        '0 0 20px rgba(255, 255, 255, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {word}
                  </motion.span>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Right Counter */}
      <motion.div
        className="absolute bottom-8 right-8"
        data-testid="loading-counter"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      >
        <motion.div
          className="text-6xl md:text-8xl lg:text-9xl font-oryzo-display text-oryzo-cream tabular-nums"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {String(count).padStart(3, '0')}
        </motion.div>
      </motion.div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-oryzo-border/50" data-testid="loading-progress-container">
        <motion.div
          className="h-full bg-oryzo-ember"
          data-testid="loading-progress-bar"
          initial={{ width: '0%' }}
          animate={{
            width: `${count}%`,
            boxShadow: count > 0 ? '0 0 8px rgba(220, 80, 0, 0.35)' : 'none',
          }}
          transition={{
            duration: 0.1,
            ease: 'linear',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 right-8 w-2 h-2 rounded-full bg-oryzo-ember"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-8 w-2 h-2 rounded-full bg-oryzo-ember"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </motion.div>
  );
}
