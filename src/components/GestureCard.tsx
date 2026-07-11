'use client';

import { useGesture } from '@use-gesture/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

interface GestureCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  enableDrag?: boolean;
}

export default function GestureCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = '',
  enableDrag = true,
}: GestureCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for smooth animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform values for visual feedback
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);
  const scale = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const xVal = typeof latestX === 'number' ? latestX : 0;
      const yVal = typeof latestY === 'number' ? latestY : 0;
      const distance = Math.sqrt(xVal ** 2 + yVal ** 2);
      return 1 + Math.min(distance / 1000, 0.1);
    }
  );

  // Gesture handler
  const bind = useGesture({
    onDragStart: () => {
      setIsDragging(true);
    },
    onDrag: ({ offset: [dragX, dragY] }) => {
      if (enableDrag) {
        x.set(dragX);
        y.set(dragY);
      }
    },
    onDragEnd: ({ velocity: [vx], offset: [dragX] }) => {
      setIsDragging(false);

      // Handle swipe gestures
      if (Math.abs(vx) > 0.5) {
        if (vx > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (vx < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      // Reset position
      x.set(0);
      y.set(0);
    },
    onHover: ({ hovering }) => {
      if (!isDragging) {
        // Subtle hover effect
      }
    },
  });

  return (
    <motion.div
      {...bind()}
      className={`touch-none ${className}`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        scale,
        cursor: enableDrag ? 'grab' : 'default',
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.98,
        cursor: 'grabbing',
      }}
    >
      {children}
    </motion.div>
  );
}
