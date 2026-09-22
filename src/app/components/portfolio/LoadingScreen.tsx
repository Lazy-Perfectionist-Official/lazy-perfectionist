'use client';

import { useEffect, useRef, useState } from 'react';

// Intro overlay — one cinematic beat per browser session, never a gate:
// content always paints beneath (LCP-safe), the server renders nothing,
// and useEffect decides show/skip so there is no hydration flash.
const WORDS = ['Create', 'Lazy Perfectionist'];
const LABEL = 'EST. 2025 — HONG KONG';
const SESSION_KEY = 'lp-intro-shown';
const MIN_DURATION_MS = 900;
const MAX_DURATION_MS = 1600;
const EXIT_FADE_MS = 380;

type Phase = 'hidden' | 'active' | 'leaving' | 'gone';

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('hidden');
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    const session = (() => {
      try {
        return sessionStorage.getItem(SESSION_KEY);
      } catch {
        return 'blocked';
      }
    })();

    // Reduced-motion visitors (and repeat visits) skip the choreography.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (session || reducedMotion) {
      if (!session) {
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {}
      }
      return;
    }

    setPhase('active');
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}

    const start = performance.now();
    // Shared mutable timeline state — the rAF loop and the readiness
    // callback close over the same bindings (React state would be stale
    // inside the loop).
    let duration = MIN_DURATION_MS;
    let settled = false;

    // Readiness: fonts loaded + one rAF settle (the hero background is pure
    // CSS, so there is no <img> to await), raced against the max duration so
    // a slow font load can never stretch the beat. The visible duration is
    // then clamped: fast loads still get the full 900ms, slow ones get cut
    // off at 1600ms.
    Promise.race([
      document.fonts.ready.then(
        () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
      ),
      new Promise<void>((resolve) => setTimeout(resolve, MAX_DURATION_MS)),
    ]).then(() => {
      const readiness = performance.now() - start;
      duration = Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, readiness));
      settled = true;
    });

    let raf = 0;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      if (finishedRef.current) return;
      const elapsed = now - start;
      const raw = elapsed / duration;
      if (raw >= 1 && settled) {
        setProgress(1);
        setPhase('leaving');
        finishedRef.current = true;
        fadeTimer = setTimeout(() => setPhase('gone'), EXIT_FADE_MS);
        return;
      }
      // Until readiness is measured, creep the bar but hold short of
      // complete so the counter never hits 100 on a provisional timeline.
      setProgress(Math.min(raw, settled ? 1 : 0.9));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      finishedRef.current = true;
      cancelAnimationFrame(raf);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, []);

  if (phase === 'hidden' || phase === 'gone') return null;

  const activeWord = Math.min(WORDS.length - 1, Math.floor(progress * WORDS.length));
  const counter = String(Math.floor(progress * 100)).padStart(3, '0');

  return (
    <div
      aria-hidden="true"
      data-testid="loading-screen"
      className={`fixed inset-0 z-[100] bg-oryzo-canvas flex items-center justify-center ${
        phase === 'leaving' ? 'opacity-0 pointer-events-none transition-opacity duration-[380ms]' : ''
      }`}
    >
      <div className="text-center px-6">
        <p
          data-testid="loading-label"
          className="text-xs uppercase tracking-[0.3em] text-oryzo-muted font-medium mb-10"
        >
          {LABEL}
        </p>
        <div className="relative h-[calc(clamp(2.5rem,8vw,4.5rem)*1.2)] w-full max-w-4xl mx-auto">
          {WORDS.map((word, index) => (
            <span
              key={word}
              data-testid={`loading-word-${index}`}
              className={`absolute inset-0 flex items-center justify-center font-display italic text-oryzo-cream/80 text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.2] transition-opacity duration-300 ${
                index === activeWord ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div
        data-testid="loading-counter"
        className="absolute bottom-8 right-8 font-display italic tabular-nums text-oryzo-cream/40 text-[clamp(3.5rem,10vw,6rem)] leading-none"
      >
        {counter}
      </div>

      <div
        data-testid="loading-progress-container"
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-oryzo-border"
      >
        <div
          data-testid="loading-progress-bar"
          className="h-full bg-oryzo-ember"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
