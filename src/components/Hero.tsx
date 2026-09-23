import Image from "next/image";

import { LINKS } from "@/lib/site";

// Plini pattern: centered poster stack — eyebrow, giant display word,
// accent subline, album art panel — with Intervals' discipline of a
// single filled CTA.
export default function Hero() {
  return (
    <section
      className="overflow-x-clip bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(220,80,0,0.07),transparent)]"
      data-testid="hero-section"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-16 text-center md:pb-24 md:pt-24">
        {/* Hero-only craft cue: the eyebrow is flanked by short hairline
            rules. Section eyebrows elsewhere stay plain. */}
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-8 bg-line/60" />
          <p className="eyebrow">The new single</p>
          <span aria-hidden="true" className="h-px w-8 bg-line/60" />
        </div>

        <h1
          className="mt-5 font-display text-[clamp(4.5rem,16vw,9.5rem)] italic leading-[0.95] text-cream"
          data-testid="hero-title"
        >
          LUSG
        </h1>

        <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.3em] text-ember md:text-xs">
          Out now
        </p>

        <div
          className="group relative mt-10 md:mt-14"
          data-testid="hero-artwork"
        >
          {/* A record lives behind the cover. On hover-capable pointers it
              slides out and spins; on touch or reduced-motion it stays
              hidden. Pure CSS — see the `reveal` variant in globals.css. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[6%] z-0 rounded-full transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] reveal:group-hover:translate-x-[52%]"
          >
            <div className="h-full w-full animate-vinyl rounded-full border border-cream/10 bg-[#050302] bg-[repeating-radial-gradient(circle,rgba(255,237,215,0.085)_0_1px,transparent_1px_5px)] [animation-play-state:paused] transition-shadow duration-[650ms] reveal:group-hover:[animation-play-state:running] reveal:group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
              <div className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[url('/assets/img/lusg-cover-400.webp')] bg-cover bg-center">
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas" />
              </div>
            </div>
          </div>

          <Image
            src="/assets/img/lusg-cover.jpg"
            alt="LUSG — single artwork"
            width={420}
            height={420}
            priority
            sizes="(min-width: 768px) 420px, 78vw"
            className="relative z-10 h-auto w-[min(420px,78vw)] rounded-sm border border-line shadow-2xl shadow-black/60"
          />
        </div>

        <div className="mt-12 flex items-center gap-6 md:mt-16">
          <a
            href={LINKS.spotifyLusg}
            target="_blank"
            rel="noopener noreferrer"
            className="ember-pill"
            data-testid="hero-cta-button"
          >
            Listen on Spotify
          </a>
        </div>

        <a
          href={LINKS.spotifyArtist}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted/70 transition-colors duration-200 hover:text-ember"
        >
          All streaming platforms
        </a>
      </div>
    </section>
  );
}
