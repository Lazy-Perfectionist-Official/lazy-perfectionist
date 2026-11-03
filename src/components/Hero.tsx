import Image from "next/image";

import HeroSky from "@/components/HeroSky";
import { LINKS } from "@/lib/site";

// The fold is the record's print: a 3:4 letterpress poster — the couplets
// set in the paper, the release word cut by the figure, CMYK halftone and
// plate misregistration left intact — laid on the twilight ground like a
// sleeve against a wall. The print itself is the listen link; the quiet
// caption beneath is the explicit one. The giant word lives in the image,
// so the page's h1 is carried for the document outline, not repeated.
export default function Hero() {
  return (
    <section
      className="relative overflow-x-clip"
      data-testid="hero-section"
    >
      <HeroSky />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-10 md:pb-28 md:pt-14">
        <h1 className="sr-only" data-testid="hero-title">
          Lazy Perfectionist
        </h1>

        <a
          href={LINKS.spotifyLusg}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-[min(88vw,42rem)]"
          data-testid="hero-artwork"
        >
          {/* A print, not a card: square corners and a hairline frame. No
              lift on hover — paper pinned to a wall doesn't levitate; the
              frame warms a step instead. */}
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt="Lazy Perfectionist — a vintage halftone poster: the band name in giant rust serif, a figure rising through the letters into the paper"
            width={1200}
            height={1600}
            priority
            sizes="(min-width: 768px) 42rem, 88vw"
            className="h-auto w-full border border-line/80 transition-colors duration-500 group-hover:border-cream/40"
          />
        </a>

        <a
          href={LINKS.spotifyLusg}
          target="_blank"
          rel="noopener noreferrer"
          className="quiet-link mt-8"
          data-testid="hero-cta-button"
        >
          Listen on Spotify{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
