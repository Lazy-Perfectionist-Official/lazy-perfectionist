'use client';

import { useEffect, useRef, useState } from 'react';

export interface HeroImageVariant {
  width: number;
  url: string;
}

interface SpotlightRevealProps {
  /** Base image candidates, ascending by width. */
  baseVariants: HeroImageVariant[];
  /** Reveal image candidates, ascending by width. */
  revealVariants: HeroImageVariant[];
  enabled?: boolean;
}

const SPOTLIGHT_R = 260;

/** Width used for the server-rendered background (matches the previous static asset). */
const DEFAULT_VARIANT_WIDTH = 2000;

/**
 * Pick the URL of the smallest variant that covers `targetWidth` device pixels,
 * falling back to the largest available. Superwide viewports upscale from the
 * native-resolution asset instead of a heavily enlarged smaller one.
 */
function pickVariantUrl(variants: HeroImageVariant[], targetWidth: number): string {
  const sorted = [...variants].sort((a, b) => a.width - b.width);
  const match = sorted.find((v) => v.width >= targetWidth);
  return (match ?? sorted[sorted.length - 1]).url;
}

function defaultVariantUrl(variants: HeroImageVariant[]): string {
  const match = variants.find((v) => v.width === DEFAULT_VARIANT_WIDTH);
  return match ? match.url : variants[variants.length - 1].url;
}

/**
 * Interactive cursor spotlight reveal.
 *
 * Two layers:
 *   - base layer (always visible)
 *   - reveal layer (hidden at rest, spotlight-shaped by a radial-gradient mask)
 *
 * The mask alpha channel controls visibility:
 *   - rgba(0,0,0,1) → opaque → that area of the reveal layer shows
 *   - rgba(0,0,0,0) → transparent → that area is hidden, base shows through
 *
 * At rest the mask is a zero-radius circle off-screen so the reveal layer is
 * fully hidden and the warm base image is what the user sees. On cursor move,
 * the mask becomes a radial spotlight at element-relative coordinates so the
 * cool reveal image shows through only under the cursor.
 */
export default function SpotlightReveal({ baseVariants, revealVariants, enabled = true }: SpotlightRevealProps) {
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | undefined>(undefined);
  const [baseImage, setBaseImage] = useState(() => defaultVariantUrl(baseVariants));
  const [revealImage, setRevealImage] = useState(() => defaultVariantUrl(revealVariants));

  // Upgrade (or downscale) the background to the variant that matches the
  // viewport width × device pixel ratio, e.g. the 2752px native asset on a
  // 3840px-wide display instead of an upscaled 2000px one.
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const update = () => {
      const targetWidth = Math.ceil(window.innerWidth * (window.devicePixelRatio || 1));
      setBaseImage(pickVariantUrl(baseVariants, targetWidth));
      setRevealImage(pickVariantUrl(revealVariants, targetWidth));
    };

    update();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [enabled, baseVariants, revealVariants]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // A zero-radius, off-screen mask → reveal layer fully hidden at rest.
    const HIDDEN_MASK = 'radial-gradient(circle 0px at -100px -100px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)';

    const applyMask = (x: number, y: number) => {
      const el = revealLayerRef.current;
      if (!el) return;
      const off = x < 0 || y < 0;
      const mask = off
        ? HIDDEN_MASK
        : `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)`;
      el.style.maskImage = mask;
      el.style.webkitMaskImage = mask;
    };

    // Initialize hidden so the base image is visible before first interaction.
    applyMask(-999, -999);

    const pointFromEvent = (clientX: number, clientY: number) => {
      const el = revealLayerRef.current;
      if (!el) return { x: -999, y: -999 };
      const rect = el.getBoundingClientRect();
      // If the pointer is outside the layer's box, treat as "off".
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return { x: -999, y: -999 };
      }
      // mask coordinates are relative to the element's own box origin.
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = pointFromEvent(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: -999, y: -999 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        targetRef.current = pointFromEvent(t.clientX, t.clientY);
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
      {/* Base image layer — always fully visible */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${baseImage})` }}
      />

      {/* Spotlight reveal layer — hidden at rest, spotlight-shaped by mask on hover */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${revealImage})`,
          maskImage:
            'radial-gradient(circle 0px at -100px -100px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
          WebkitMaskImage:
            'radial-gradient(circle 0px at -100px -100px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)',
        }}
      />
    </>
  );
}
