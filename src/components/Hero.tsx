import Image from "next/image";

import { LINKS } from "@/lib/site";

// The fold is the record's print, full bleed: the 3:4 poster fills the first
// screen edge to edge and is cropped by the viewport, never letterboxed. The
// crop is composed so the name sits whole — the couplets and the ORIGINAL
// thumbnail belong to the print's own top margin and are what fall off a wide
// screen. The print itself is the listen link; the announcement bar remains
// the explicit one. The giant word lives in the image, so the page's h1 is
// carried for the document outline, not repeated.
//
// The height subtracts the measured chrome: announcement bar + masthead are
// 166px at phone widths and 131px from md up, so `100svh` minus that is the
// remainder the print has to fill to end exactly at the fold.
export default function Hero() {
  return (
    <section
      className="hero-print relative h-[calc(100svh-166px)] overflow-hidden md:h-[calc(100svh-131px)]"
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
        {/* Cover, not contain: the print runs to the screen edges. The 40%
            vertical anchor keeps the name whole with the figure below it —
            wide screens end above the wall band, squarer ones trim into it —
            so the fold reads as the print's crop, not a seam between two
            pictures. The horizontal anchor only matters when the viewport is
            taller than the print's 3:4 (tall phones): the cover then trims
            the sides, and the name has to survive the trim at both ends. 50%
            cut the last glyph; 100% kept the right margin but cut the first
            stem at 412x915, where the crop keeps only the print's rightmost
            1320 of 1800px. 90% leaves a margin on both sides of the word at
            360, 375, 390, 412 and 430 wide, and still keeps 45-60px of the
            print's own right margin. The image carries its own alt through
            the link label. */}
        <Image
          src="/assets/img/lusg-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[90%_40%]"
        />

        {/* The side trim cuts the print's couplets mid-word on tall phones;
            this is the print's own paper, shown only where that happens, so
            the fold starts on a clean margin instead of letter tails. */}
        <span aria-hidden="true" className="hero-crop-cover" />

        {/* The print is the link, so it needs to say so: the same ember
            stamp as the bellyband, set on the print's foot where the crop
            leaves paper. Its text starts the link's accessible name, so
            voice control can say what it sees. */}
        <span className="absolute bottom-6 left-6 inline-block bg-ember px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ember-ink md:bottom-8 md:left-10 md:text-xs">
          Listen to LUSG{" "}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </section>
  );
}
