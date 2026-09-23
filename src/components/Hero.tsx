import Image from "next/image";

import { LINKS } from "@/lib/site";

// Plini pattern: centered poster stack — eyebrow, giant display word,
// accent subline, album art panel — with Intervals' discipline of a
// single filled CTA.
export default function Hero() {
  return (
    <section
      className="bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(220,80,0,0.07),transparent)]"
      data-testid="hero-section"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-16 text-center md:pb-24 md:pt-24">
        <p className="eyebrow">The new single</p>

        <h1
          className="mt-5 font-display text-[clamp(4.5rem,16vw,9.5rem)] italic leading-[0.95] text-cream"
          data-testid="hero-title"
        >
          LUSG
        </h1>

        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.3em] text-ember md:text-xs">
          Out now
        </p>

        <div
          className="mt-12 md:mt-16"
          data-testid="hero-artwork"
        >
          <Image
            src="/assets/img/lusg-cover.jpg"
            alt="LUSG — single artwork"
            width={420}
            height={420}
            priority
            sizes="(min-width: 768px) 420px, 78vw"
            className="h-auto w-[min(420px,78vw)] rounded-sm border border-line shadow-2xl shadow-black/60"
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

        <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted/70">
          All streaming platforms
        </p>
      </div>
    </section>
  );
}
