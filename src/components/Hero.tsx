import Image from "next/image";

import { LINKS } from "@/lib/site";

// The fold is the record's print, whole. Two plates carry it: the 3:4 poster
// for portrait folds, and a 16:9 plate — struck from the same photograph,
// halftone and type — for landscape ones. Each is laid on the page's own
// sheet at the largest size the fold allows, never cropped: as tall as the
// fold, or as wide as the screen where the screen is narrower than that. The
// plates' paper samples to the page's paper (--color-paper), so neither has
// an edge of its own: only the ink sits on the sheet.
//
// The print's foot lands on the fold, so the sheets below follow it directly
// and no paper margin ever sits under the print. On a portrait phone that
// leaves the print short of the header, with the paper gap above it invisible
// against the sheet; on a 16:9 screen the plate fills the fold's height.
//
// The box is sized in container units because the fold's own height decides
// the scale: 75cqh is the 3:4 print's width when its height is the fold's
// height, 177.78cqh is the 16:9 plate's, and 100cqw caps each on screens
// narrower than that. `hero-print` makes the section the size container for
// those units.
//
// The height subtracts the measured chrome: announcement bar + masthead are
// 166px at phone widths and 131px from md up, so `100svh` minus that is the
// remainder the fold has to fill.
export default function Hero() {
  return (
    <section
      className="hero-print relative flex h-[calc(100svh-166px)] items-end justify-center overflow-hidden md:h-[calc(100svh-131px)]"
      data-testid="hero-section"
    >
      <h1 className="sr-only" data-testid="hero-title">
        Lazy Perfectionist
      </h1>

      <a
        href={LINKS.spotifyLusg}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Listen to LUSG on Spotify"
        className="group relative block aspect-[3/4] w-[min(100cqw,75cqh)] outline-none landscape:aspect-video landscape:w-[min(100cqw,177.78cqh)] after:pointer-events-none after:absolute after:inset-1 after:border-2 after:border-ember after:opacity-0 after:content-[''] focus-visible:after:opacity-100"
        data-testid="hero-artwork"
      >
        {/* Portrait: the poster. Its box is the print's own 3:4, so cover is
            the whole picture at full size. `sizes` keeps the plate that is not
            being shown — the 16:9 one sits in the same anchor — from fetching
            more than a thumbnail. */}
        <Image
          src="/assets/img/lusg-poster.jpg"
          alt=""
          fill
          priority
          sizes="(orientation: landscape) 0px, 100vw"
          className="object-cover landscape:hidden"
        />

        {/* Landscape: the wide plate, a 16:9 strike of the same print. */}
        <Image
          src="/assets/img/lusg-poster-wide.jpg"
          alt=""
          fill
          priority
          sizes="(orientation: portrait) 0px, 100vw"
          className="hidden object-cover landscape:block"
        />

        {/* The print is the link, so it needs to say so: the same ember
            stamp as the bellyband, set on the print's foot. Its text starts
            the link's accessible name, so voice control can say what it
            sees. */}
        <span className="absolute bottom-6 left-6 inline-block bg-ember px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ember-ink md:bottom-8 md:left-10 md:text-xs">
          Listen to LUSG{" "}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </section>
  );
}
