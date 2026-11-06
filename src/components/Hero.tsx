import Image from "next/image";

import { LINKS } from "@/lib/site";

// The fold is the record's print, edge to edge. Two plates carry it: the 3:4
// poster for portrait screens, and a 16:9 strike of the same photograph,
// halftone and type for landscape ones. Each is laid on the page's own sheet
// and cropped by the fold — full-bleed, so the print touches the left and
// right edges of whatever screen it is read on and gives up its overflow
// rather than its edges. The plates' paper samples to the page's paper
// (--color-paper), so the print has no border of its own: only the ink
// changes where the fold cuts.
//
// The type sits inside the crop everywhere it is allowed to cut: the name's
// ink stays within x 18.9–83.3% of the 3:4 print, so the narrowest phone crop
// trims the figure, not the wordmark, and the wide plate holds it below 91.7%
// of its width — with `object-right`, a square-ish window crops the figure's
// left edge and keeps the name whole.
//
// The height subtracts the measured chrome: announcement bar + masthead are
// 166px at phone widths and 131px from md up, so `100svh` minus that is the
// remainder the fold has to fill.
export default function Hero() {
  return (
    <section
      className="relative h-[calc(100svh-166px)] overflow-hidden md:h-[calc(100svh-131px)]"
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
        className="group absolute inset-0 block outline-none after:pointer-events-none after:absolute after:inset-1 after:border-2 after:border-ember after:opacity-0 after:content-[''] focus-visible:after:opacity-100"
        data-testid="hero-artwork"
      >
        {/* Portrait: the poster, cropped by the fold's own aspect. `sizes`
            keeps the plate that is not being shown — the 16:9 one sits in the
            same anchor — from fetching more than a thumbnail. */}
        <Image
          src="/assets/img/lusg-poster.jpg"
          alt=""
          fill
          priority
          sizes="(orientation: landscape) 0px, 100vw"
          className="hero-plate object-cover landscape:hidden"
        />

        {/* Landscape: the wide plate. Anchored right so the crop takes the
            figure's edge, never the name. */}
        <Image
          src="/assets/img/lusg-poster-wide.jpg"
          alt=""
          fill
          priority
          sizes="(orientation: portrait) 0px, 100vw"
          className="hero-plate hidden object-cover object-right landscape:block"
        />

        {/* The print is the link, so it needs to say so: the same ember
            stamp as the bellyband, set on the print's foot and aligned with
            the measure below it. Its text starts the link's accessible name,
            so voice control can say what it sees. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 md:bottom-8">
          <div className="mx-auto flex max-w-[90rem] px-6 md:px-10">
            <span className="inline-block bg-ember px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ember-ink md:text-xs">
              Listen to LUSG{" "}
              <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>

        {/* The impression settling under the platen: a paper wash lifts off
            the print once, on load, and the plate gives up a 2% enlarge as it
            lands. Decorative and never a click target. Deliberately above the
            stamp (the fold arrives whole) and below the focus ring, which is
            the anchor's ::after. */}
        <span
          aria-hidden="true"
          data-testid="hero-wash"
          className="hero-wash pointer-events-none absolute inset-0"
        />
      </a>
    </section>
  );
}
