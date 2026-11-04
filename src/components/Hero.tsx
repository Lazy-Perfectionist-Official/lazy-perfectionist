import Image from "next/image";

import { LINKS } from "@/lib/site";

// The fold is the record's print, full bleed: the 3:4 poster fills the first
// screen edge to edge and is cropped by the viewport, never letterboxed. The
// crop is composed so the name sits whole — the couplets and the ORIGINAL
// thumbnail belong to the print's own top margin and are what fall off a wide
// screen. The print itself is the listen link; the announcement bar and the
// header's Spotify entry remain the explicit ones. The giant word lives in
// the image, so the page's h1 is carried for the document outline, not
// repeated.
//
// The height subtracts the measured chrome: announcement bar + masthead are
// 166px at phone widths and 131px from md up, so `100svh` minus that is the
// remainder the print has to fill to end exactly at the fold.
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
        aria-label="Lazy Perfectionist — listen to LUSG on Spotify"
        className="group absolute inset-0 block outline-none after:pointer-events-none after:absolute after:inset-1 after:border-2 after:border-ember after:opacity-0 after:content-[''] focus-visible:after:opacity-100"
        data-testid="hero-artwork"
      >
        {/* Cover, not contain: the print runs to the screen edges. The 40%
            vertical anchor keeps the name whole with the figure below it —
            wide screens end above the wall band, squarer ones trim into it —
            so the fold reads as the print's crop, not a seam between two
            pictures. The image carries its own alt through the link label. */}
        <Image
          src="/assets/img/lusg-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </a>
    </section>
  );
}
