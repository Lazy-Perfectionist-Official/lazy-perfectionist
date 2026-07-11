'use client';

import { useSpring, useTransition, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';

// Physics-based scroll progress
export function useScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on element visibility
      const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return scrollProgress;
}

// Spring-based number counter
export function useSpringCounter(target: number, config = { tension: 120, friction: 14 }) {
  const [spring, setSpring] = useSpring(() => ({
    number: 0,
    config,
  }));

  useEffect(() => {
    setSpring.start({ number: target });
  }, [target, setSpring]);

  return spring;
}

// Physics-based morphing animation
export function usePhysicsMorph(trigger: boolean, config = { tension: 180, friction: 12 }) {
  const [morph, setMorph] = useSpring(() => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    config,
  }));

  useEffect(() => {
    if (trigger) {
      setMorph.start({
        scale: 1.1,
        rotate: 5,
        opacity: 0.9,
      });
    } else {
      setMorph.start({
        scale: 1,
        rotate: 0,
        opacity: 1,
      });
    }
  }, [trigger, setMorph]);

  return morph;
}

// Stagger spring animation for lists
export function useStaggerSpring(items: any[], delay = 50) {
  const transitions = useTransition(items, {
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    enter: (item) => async (next) => {
      await next({ opacity: 1, transform: 'translate3d(0, 0px, 0)' });
    },
    leave: { opacity: 0, transform: 'translate3d(0, -20px, 0)' },
    delay: delay,
    config: { tension: 220, friction: 24 },
  });

  return transitions;
}

// Physics-based parallax effect
export function useParallaxSpring(intensity = 0.5) {
  const [parallax, setParallax] = useSpring(() => ({
    y: 0,
    rotate: 0,
    config: { tension: 120, friction: 20 },
  }));

  const handleScroll = (scrollY: number) => {
    setParallax.start({
      y: scrollY * intensity,
      rotate: scrollY * intensity * 0.01,
    });
  };

  return { parallax, handleScroll };
}

// Magnetic button effect with physics
export function useMagneticEffect(strength = 0.3) {
  const [magnetic, setMagnetic] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 150, friction: 15 },
  }));

  const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setMagnetic.start({
      x: deltaX,
      y: deltaY,
    });
  };

  const handleMouseLeave = () => {
    setMagnetic.start({ x: 0, y: 0 });
  };

  return { magnetic, handleMouseMove, handleMouseLeave };
}
