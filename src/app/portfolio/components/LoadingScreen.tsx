'use client';

import { useState, useEffect, useRef } from 'react';

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
    <div className="fixed inset-0 z-[9999] bg-oryzo-canvas flex flex-col">
      {/* Top Label */}
      <div className="absolute top-8 left-8">
        <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em]">
          Portfolio
        </span>
      </div>

      {/* Center Rotating Words */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {words.map((word, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 ${
                index === wordIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <span className="text-4xl md:text-6xl lg:text-7xl font-display italic text-oryzo-cream/80">
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Counter */}
      <div className="absolute bottom-8 right-8">
        <div className="text-6xl md:text-8xl lg:text-9xl font-oryzo-display text-oryzo-cream tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-oryzo-border/50">
        <div
          className="h-full bg-oryzo-ember"
          style={{
            width: `${count}%`,
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(220, 80, 0, 0.35)',
          }}
        />
      </div>
    </div>
  );
}
