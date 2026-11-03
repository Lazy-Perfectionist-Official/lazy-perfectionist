import Image from "next/image";

import HeroSky from "@/components/HeroSky";
import { LINKS } from "@/lib/site";

// Plini pattern: centered poster stack — label, giant display word, identity
// subline, album plate — with Intervals' discipline of a single filled CTA.
// The twilight ridge behind it is the sky the record lives under. The fold
// offers the action twice: the artwork is itself the listen link, and the
// button beneath it is the explicit one.
export default function Hero() {
  return (
    <section
      className="relative overflow-x-clip"
      data-testid="hero-section"
    >
      <HeroSky />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-16 text-center md:pb-32 md:pt-24">
        {/* Metadata, not news — the announcement bar already carries
            "out now", so the label names the release without repeating it. */}
        <p className="eyebrow">Single · 2026</p>

        <h1
          className="mt-5 font-display text-[clamp(7.5rem,16vw,9.5rem)] italic leading-[0.95] tracking-[-0.015em] text-cream"
          data-testid="hero-title"
        >
          LUSG
        </h1>

        {/* Two deliberate lines under 640px — the full identity at the
            11px caps floor would wrap mid-phrase on a phone. */}
        <p className="eyebrow mt-7 text-muted/70">
          <span className="block sm:inline">Bedroom instrumental rock</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Hong Kong</span>
        </p>

        <a
          href={LINKS.spotifyLusg}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-10 block md:mt-14"
          data-testid="hero-artwork"
        >
          {/* The artwork is the listen link: the vinyl reveal begs a
              click, and touch users get a real target here. A record
              lives behind the cover — on hover-capable pointers it
              slides out and spins; on touch or reduced-motion it stays
              hidden. Pure CSS — see the `reveal` variant in globals.css. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[6%] z-0 rounded-full transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] reveal:group-hover:translate-x-[52%]"
          >
            <div className="h-full w-full animate-vinyl rounded-full border border-cream/15 bg-[#050302] bg-[repeating-radial-gradient(circle,rgba(255,237,215,0.11)_0_1px,transparent_1px_5px)] [animation-play-state:paused] transition-shadow duration-[650ms] reveal:group-hover:[animation-play-state:running] reveal:group-hover:shadow-[-30px_18px_60px_rgba(0,0,0,0.65)]">
              <div className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[url('/assets/img/lusg-cover-400.webp')] bg-cover bg-center">
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canvas" />
              </div>
            </div>
          </div>

          {/* A sleeve, not a card: square corners, hairline frame, no
              drop shadow. The only shadow on the page is the vinyl's
              directional one, which exists to explain the reveal. */}
          <Image
            src="/assets/img/lusg-cover.jpg"
            alt="LUSG — single artwork"
            width={420}
            height={420}
            priority
            sizes="(min-width: 768px) 420px, 78vw"
            className="relative z-10 h-auto w-[min(420px,78vw)] border border-line transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] reveal:group-hover:scale-[1.015]"
          />
        </a>

        <a
          href={LINKS.spotifyLusg}
          target="_blank"
          rel="noopener noreferrer"
          className="ember-button group mt-10 md:mt-12"
          data-testid="hero-cta-button"
        >
          Listen on Spotify
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
          >
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
