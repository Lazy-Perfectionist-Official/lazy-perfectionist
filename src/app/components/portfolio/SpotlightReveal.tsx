'use client';

import { useEffect, useRef } from 'react';

interface SpotlightRevealProps {
  baseImage: string;
  revealImage: string;
  enabled?: boolean;
}

const SPOTLIGHT_R = 260;

/**
 * Interactive cursor spotlight reveal.
 *
 * Uses a CSS radial-gradient mask that follows the cursor via direct DOM writes
 * through refs. No canvas, no toDataURL, no per-frame React state updates — just
 * a cheap style string update inside the requestAnimationFrame loop.
 */
export default function SpotlightReveal({ baseImage, revealImage, enabled = true }: SpotlightRevealProps) {
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const applyMask = (x: number, y: number) => {
      const el = revealLayerRef.current;
      if (!el) return;
      const off = x < 0 || y < 0;
      const mask = off
        ? 'none'
        : `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)`;
      el.style.maskImage = mask;
      el.style.webkitMaskImage = mask;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: -999, y: -999 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        targetRef.current = { x: t.clientX, y: t.clientY };
      }
    };

    const handleTouchEnd = () => {
      targetRef.current = { x: -999, y: -999 };
    };

    const animate = () => {
      const t = targetRef.current;
      const s = smoothRef.current;

      if (t.x < 0) {
        // Cursor off-screen — drop the mask
        s.x = -999;
        s.y = -999;
      } else if (s.x < 0) {
        // First entry — snap to cursor to avoid a long swipe across the screen
        s.x = t.x;
        s.y = t.y;
      } else {
        // Smooth follow
        s.x += (t.x - s.x) * 0.18;
        s.y += (t.y - s.y) * 0.18;
      }
      applyMask(s.x, s.y);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Base image layer */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${baseImage})` }}
      />

      {/* Spotlight reveal layer — mask follows cursor via CSS radial-gradient */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${revealImage})`,
          maskImage: 'none',
          WebkitMaskImage: 'none',
        }}
      />
    </>
  );
}
