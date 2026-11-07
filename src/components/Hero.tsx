import Image from "next/image";

import { ANNOUNCEMENT } from "@/lib/site";

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
// The height subtracts the chrome above it — the announcement bar and the
// masthead — so `100svh` minus that is the remainder the fold has to fill.
// The chrome is measured rather than assumed: the masthead grows a row when
// its nav wraps, which is a property of the width and the nav's contents,
// not a number that stays true. The values in the class are the no-script
// fallback (166px on a phone, 131px from md up).
// The fold's only script: it reads the pointer and hands the position to CSS
// as two custom properties, which the lens is drawn at. (The names still say
// lantern — the light itself was taken out again; only the glass remains.)
// CSS cannot see a cursor, so this is the one place the site takes a few
// lines of it — no framework, no state, no listeners on touch or under
// reduced motion, and it stops its own frame loop when the glass has caught
// up. The fold's box is re-read whenever the pointer or the page moves, so
// scrolling carries the lens with the print instead of leaving it at the
// height it was lit at. Without it the fold is the print and the breeze.
const LANTERN = `
(function () {
  var hero = document.querySelector('[data-lantern]');
  if (!hero) return;
  // The fold takes what the chrome leaves. Measured, not assumed: the
  // masthead is a row taller whenever its nav wraps, and that depends on
  // the width and on how many items the nav holds. The value is published
  // as a root variable from a style element of our own — writing a style
  // attribute onto markup React hydrates reads as a mismatch.
  var ruler = document.createElement('style');
  (document.head || document.documentElement).appendChild(ruler);
  function fold() {
    var top = hero.getBoundingClientRect().top + (window.scrollY || 0);
    ruler.textContent = ':root{--chrome-h:' + top.toFixed(1) + 'px}';
  }
  fold();
  addEventListener('resize', fold);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fold);
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var tx = 50, ty = 45, cx = 50, cy = 45, k = 0, ax = 0, ay = 0, frame = 0;
  var px = -1, py = -1;
  function step() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    // The glass trails the pointer, so how far behind it is IS the pointer's
    // speed: the drop stretches along the travel and rounds off again at rest.
    var gx = tx - cx, gy = ty - cy;
    var gap = Math.sqrt(gx * gx + gy * gy);
    k += (Math.min(1, gap / 9) - k) * 0.2;
    if (gap > 0.05) {
      ax += (gx / gap - ax) * 0.25;
      ay += (gy / gap - ay) * 0.25;
    }
    // The glass stretches along the travel and thins across it; the plate
    // inside the glass gets the exact inverse, so only the circle deforms.
    var sx = 1 + 0.08 * k, sy = 1 - 0.06 * k;
    hero.style.setProperty('--lantern-x', cx.toFixed(2) + '%');
    hero.style.setProperty('--lantern-y', cy.toFixed(2) + '%');
    hero.style.setProperty('--lens-k', k.toFixed(3));
    hero.style.setProperty('--lens-angle', (Math.atan2(ay, ax) * 57.2958).toFixed(1) + 'deg');
    hero.style.setProperty('--lens-isx', (1 / sx).toFixed(4));
    hero.style.setProperty('--lens-isy', (1 / sy).toFixed(4));
    frame = gap > 0.1 || k > 0.01 ? requestAnimationFrame(step) : 0;
  }
  // Aim at the last known screen point. The fold's box is measured here, not
  // once: scrolling slides the fold under a pointer that has not moved, and
  // the lens has to slide with it.
  function aim() {
    if (px < 0) return;
    var box = hero.getBoundingClientRect();
    var inside = px >= box.left && px < box.right && py >= box.top && py < box.bottom;
    hero.classList.toggle('lantern-lit', inside);
    if (!inside) return;
    tx = ((px - box.left) / box.width) * 100;
    ty = ((py - box.top) / box.height) * 100;
    if (!frame) frame = requestAnimationFrame(step);
  }
  hero.addEventListener('pointermove', function (event) {
    px = event.clientX;
    py = event.clientY;
    aim();
  }, { passive: true });
  hero.addEventListener('pointerleave', function () {
    hero.classList.remove('lantern-lit');
  });
  addEventListener('scroll', aim, { passive: true });
})();
`;

export default function Hero() {
  return (
    <section
      className="relative h-[calc(100svh-var(--chrome-h,166px))] overflow-hidden md:h-[calc(100svh-var(--chrome-h,131px))]"
      data-testid="hero-section"
      data-lantern=""
    >
      <h1 className="sr-only" data-testid="hero-title">
        Lazy Perfectionist
      </h1>

      <a
        href={ANNOUNCEMENT.href}
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
          data-plate=""
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
          data-plate=""
          className="hero-plate hidden object-cover object-right landscape:block"
        />

        {/* The breeze: the print does not sit perfectly still — the classic
            sliced-flag effect made seamless. Two harmonics, the billow and
            the shimmer, each three copies of the plate masked to a soft bump
            a third of a wavelength apart and swaying a third of a cycle
            behind the last, so a ripple travels across the fold left to
            right at full strength everywhere — the wind enters at the
            leading edge and the free edge moves most. Only transforms
            animate (the compositor's work, no repaints) and every copy
            shares the plate's src and sizes, so the wind costs no bytes.
            The span's own mask fades the bands out before the fold's top
            and bottom edges, so a moving band can never open a seam
            against the sheet. */}
        <span
          aria-hidden="true"
          className="hero-wave pointer-events-none absolute inset-0 landscape:hidden"
        >
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-wave-band hero-billow object-cover"
          />
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-wave-band hero-billow hero-billow-b object-cover"
          />
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-wave-band hero-billow hero-billow-c object-cover"
          />
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-wave-band hero-shimmer object-cover"
          />
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-wave-band hero-shimmer hero-shimmer-b object-cover"
          />
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-wave-band hero-shimmer hero-shimmer-c object-cover"
          />
        </span>

        <span
          aria-hidden="true"
          className="hero-wave pointer-events-none absolute inset-0 hidden landscape:block"
        >
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-wave-band hero-billow object-cover object-right"
          />
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-wave-band hero-billow hero-billow-b object-cover object-right"
          />
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-wave-band hero-billow hero-billow-c object-cover object-right"
          />
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-wave-band hero-shimmer object-cover object-right"
          />
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-wave-band hero-shimmer hero-shimmer-b object-cover object-right"
          />
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-wave-band hero-shimmer hero-shimmer-c object-cover object-right"
          />
        </span>

        {/* The lens: the same plate again, a few percent larger and turned a
            hair, masked to a feathered circle at the pointer. Magnifying a
            copy rather than filtering the plate keeps the LCP image untouched
            — the distortion is a second, invisible-until-lit layer. It shares
            the plate's src and sizes, so it costs no extra bytes.

            The span is the glass and the image is what sits under it: the
            glass takes the pointer's deformation (the circle stretches along
            the travel), and the image counter-transforms by the same amount,
            so only the shape of the lens breathes — the print inside it is
            never smeared into a second impression. */}
        <span
          aria-hidden="true"
          className="hero-lens pointer-events-none absolute inset-0 landscape:hidden"
        >
          <Image
            src="/assets/img/lusg-poster.jpg"
            alt=""
            fill
            sizes="(orientation: landscape) 0px, 100vw"
            className="hero-lens-plate object-cover"
          />
        </span>

        <span
          aria-hidden="true"
          className="hero-lens pointer-events-none absolute inset-0 hidden landscape:block"
        >
          <Image
            src="/assets/img/lusg-poster-wide.jpg"
            alt=""
            fill
            sizes="(orientation: portrait) 0px, 100vw"
            className="hero-lens-plate object-cover object-right"
          />
        </span>

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

      <script dangerouslySetInnerHTML={{ __html: LANTERN }} />
    </section>
  );
}
