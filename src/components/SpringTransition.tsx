'use client';

import { useTransition, animated } from '@react-spring/web';
import { useState } from 'react';

interface SpringTransitionProps {
  items: any[];
  children: (item: any, index: number) => React.ReactNode;
  config?: {
    tension?: number;
    friction?: number;
    mass?: number;
  };
}

export function SpringTransition({ items, children, config }: SpringTransitionProps) {
  const [index, set] = useState(0);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -20px, 0)' },
    config: {
      tension: config?.tension || 220,
      friction: config?.friction || 24,
      mass: config?.mass || 1,
    },
    onRest: (_id, _args) => {
      // Auto-advance to next item when animation completes
      if (index < items.length - 1) {
        set((i) => (i + 1) % items.length);
      }
    },
  });

  return (
    <div className="relative">
      {transitions((style, i) => (
        <animated.div style={style}>
          {children(items[i], i)}
        </animated.div>
      ))}
    </div>
  );
}

// Hook for spring-based hover effects
export function useSpringHover(config = { tension: 300, friction: 10 }) {
  const [isHovered, setIsHovered] = useState(false);

  const spring = useTransition(isHovered, {
    from: { scale: 1 },
    to: { scale: isHovered ? 1.05 : 1 },
    config,
  });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return { spring, handleMouseEnter, handleMouseLeave };
}
