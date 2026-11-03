/*
 * Twilight ridge behind the hero — the Intervals "backbg" pattern rebuilt
 * as pure vector. The sky's plum family is artwork-only (twilight zenith
 * complementing the ember horizon — never used in UI chrome). A fine film grain baked
 * into the artwork via a dual-polarity speckle tile (no page-wide
 * overlay — text and imagery stay crisp), and three whisper-quiet CSS
 * effects: staggered star twinkle, a breathing horizon glow, and a
 * shooting star every ~13s.
 * Effects are motion-safe-gated (static under reduced motion). No JS.
 *
 * Composition notes: a crashed satellite lies nose-down left-of-center
 * (clears the centered poster print, page x < ~370), its tail and dish
 * rising into the lit horizon band while a whip antenna still blinks
 * ember; the moon answers from the upper right.
 * The far skyline stays deliberately quiet — low amplitude, hazy
 * value — so the wreck owns the left band. Crests draw ANGULAR —
 * straight facets between sharp irregular peaks, rocky lobes on the
 * near ground (the reference's paper-cutout hand) — and the wreck
 * carries the scene's machined detail the way the reference's dead
 * tree carries its branches; the desert floor wears a dash field,
 * sparse at the crest, denser toward the viewer.
 *
 * The whole scene follows the backbg's own mechanism, in our dialect
 * — MASS & ETCH: land is flat value-stepped masses, darkest nearest,
 * each receding plane dusted toward the horizon light (atmospheric
 * depth as fill value, never rim light), and one driftwood line
 * etches every crest — the drawn hand on the silhouette edge. Chroma
 * is confined to a narrow horizon band of dusty clay; nothing paints
 * pure black (warm charcoals only) — save the ember beacon, the
 * machine's one saturated mark, the living light.
 */

type Star = { x: number; y: number; r: number; o: number; tw?: number };

// `tw` marks a twinkling star; its value seeds the delay/duration so the
// cycle never syncs up. Several kept inside the x 590–850 band where the
// mobile center-crop still shows sky, so touch visitors get twinkle too.
const STARS: Star[] = [
  // Left-band cluster — the right-of-center field alone left the sky
  // above the wreck reading as empty at desktop widths.
  { x: 120, y: 320, r: 1.1, o: 0.55 },
  { x: 150, y: 140, r: 1.3, o: 0.6, tw: 8 },
  { x: 230, y: 64, r: 1.9, o: 0.75, tw: 9 },
  { x: 250, y: 330, r: 0.95, o: 0.5 },
  { x: 310, y: 228, r: 1.0, o: 0.52, tw: 10 },
  { x: 388, y: 96, r: 1.3, o: 0.6, tw: 0 },
  { x: 452, y: 210, r: 1.15, o: 0.56 },
  { x: 540, y: 72, r: 1.9, o: 0.78, tw: 1 },
  { x: 596, y: 168, r: 0.9, o: 0.46 },
  { x: 648, y: 300, r: 1.1, o: 0.54 },
  { x: 700, y: 84, r: 1.35, o: 0.62, tw: 2 },
  { x: 762, y: 236, r: 1.0, o: 0.48 },
  { x: 830, y: 120, r: 2.0, o: 0.78, tw: 3 },
  { x: 872, y: 338, r: 0.9, o: 0.38 },
  { x: 908, y: 188, r: 1.1, o: 0.52 },
  { x: 952, y: 84, r: 1.35, o: 0.62, tw: 4 },
  { x: 990, y: 262, r: 1.0, o: 0.48 },
  { x: 1024, y: 208, r: 1.1, o: 0.51 },
  { x: 1035, y: 352, r: 1.1, o: 0.54 },
  { x: 1082, y: 286, r: 1.5, o: 0.62, tw: 5 },
  { x: 1120, y: 180, r: 0.9, o: 0.46 },
  { x: 1172, y: 120, r: 1.9, o: 0.75, tw: 6 },
  { x: 1218, y: 320, r: 1.0, o: 0.48 },
  { x: 1268, y: 206, r: 1.25, o: 0.55, tw: 7 },
  { x: 1322, y: 96, r: 1.5, o: 0.6 },
  { x: 1368, y: 268, r: 1.0, o: 0.51 },
  { x: 410, y: 388, r: 1.2, o: 0.58 },
  { x: 1240, y: 400, r: 1.25, o: 0.55 },
  // Low horizon dust — the backbg's stipple thickens toward the band.
  { x: 520, y: 448, r: 0.8, o: 0.32 },
  { x: 762, y: 462, r: 0.75, o: 0.3 },
  { x: 940, y: 430, r: 0.85, o: 0.34 },
  { x: 1305, y: 452, r: 0.8, o: 0.3 },
];

export default function HeroSky() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          {/* Sky: canvas-plum into a dusty-clay horizon — the backbg
              grade. A thin bright core hugs the far-crest line
              (offsets ~0.55–0.62; the band rides ~55% down the
              viewBox so it stays on-screen below the 210px
              announcement+nav stack — a 900px-tall viewport only
              shows viewBox y ≲ 600), a long cool tail above, and a
              steep drop below that the land masses hide. Stops above
              ~0.5 stay dark — the title zone keeps its contrast —
              and saturation lives only inside the narrow core. */}
          <linearGradient id="sky-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d070b" />
            <stop offset="0.30" stopColor="#150d14" />
            <stop offset="0.45" stopColor="#211219" />
            <stop offset="0.55" stopColor="#3a1d24" />
            <stop offset="0.60" stopColor="#6e3a26" />
            <stop offset="0.66" stopColor="#4d2818" />
            <stop offset="0.78" stopColor="#2a150e" />
            <stop offset="1" stopColor="#1a0e09" />
          </linearGradient>

          {/* Horizon glow — a dusty-clay core fading through driftwood
              (the backbg's dusty-rose trick, in our tokens): a narrow
              full-width band hugging the crest line, exponential
              falloff, no bloom — brightest behind the artwork so the
              cover reads as backlit by dusk. */}
          <radialGradient id="horizon-glow">
            <stop offset="0" stopColor="#c4703f" stopOpacity="0.5" />
            <stop offset="0.3" stopColor="#c4703f" stopOpacity="0.24" />
            <stop offset="0.6" stopColor="#e7b37b" stopOpacity="0.12" />
            <stop offset="1" stopColor="#e7b37b" stopOpacity="0" />
          </radialGradient>

          {/* Driftwood light spilling along the ridge line — gives the
              horizon a luminous band the silhouettes can cut against. */}
          <radialGradient id="horizon-spill">
            <stop offset="0" stopColor="#e7b37b" stopOpacity="0.2" />
            <stop offset="1" stopColor="#e7b37b" stopOpacity="0" />
          </radialGradient>

          {/* Light pooling off-center in a far valley — real dusk glows
              are irregular, and a single centered ellipse reads as a
              vector gradient rather than a sky. */}
          <radialGradient id="horizon-pool">
            <stop offset="0" stopColor="#e7b37b" stopOpacity="0.26" />
            <stop offset="0.45" stopColor="#c4703f" stopOpacity="0.14" />
            <stop offset="1" stopColor="#c4703f" stopOpacity="0" />
          </radialGradient>

          {/* Ember light pooling at the crash site — the beacon's
              answer on the ground. Concentrates the dusk gradient
              into a field the ink scars can cut against (dark lines
              on a flat ember floor sit near the grain's own
              modulation; the pool gives them contrast). */}
          <radialGradient id="scar-glow">
            <stop offset="0" stopColor="#dc5000" stopOpacity="0.24" />
            <stop offset="0.5" stopColor="#dc5000" stopOpacity="0.11" />
            <stop offset="1" stopColor="#dc5000" stopOpacity="0" />
          </radialGradient>

          {/* Soft halo so the moon sits in the sky, not on it. */}
          <radialGradient id="moon-halo">
            <stop offset="0" stopColor="#ffedd7" stopOpacity="0.14" />
            <stop offset="1" stopColor="#ffedd7" stopOpacity="0" />
          </radialGradient>

          {/* Crescent moon carved with a mask, so it stays a true
              crescent over whatever sky is behind it. */}
          <mask id="moon-cut">
            <circle cx="1078" cy="148" r="24" fill="#fff" />
            <circle cx="1088" cy="141" r="22" fill="#000" />
          </mask>

          {/* Shooting-star tail: bright head fading to nothing. */}
          <linearGradient
            id="shoot-tail"
            gradientUnits="userSpaceOnUse"
            x1={92}
            y1={30}
            x2={0}
            y2={0}
          >
            <stop offset="0" stopColor="#ffedd7" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffedd7" stopOpacity="0" />
          </linearGradient>

          {/* Fine film grain baked into the artwork (the actual
              Intervals pattern). Dual-polarity speckle — half the
              pixels lighten, half darken — so the tile modulates
              around zero instead of fogging the scene like an opaque
              gray noise veil. Generated by .omc/state/gen-grain.mjs;
              PNG keeps the speckles sharp (webp smoothing = blur). */}
          <pattern
            id="sky-grain"
            width={220}
            height={220}
            patternUnits="userSpaceOnUse"
          >
            <image
              href="/assets/img/grain-fine.png"
              width={220}
              height={220}
            />
          </pattern>

          {/* Bottom melts into the page canvas; top eases under the nav.
              The fade starts just below the near-ground crest so the
              horizon stays lit right up to where the page takes over. */}
          <linearGradient
            id="sky-fade-bottom"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={700}
            x2="0"
            y2={900}
          >
            <stop offset="0" stopColor="#100904" stopOpacity="0" />
            <stop offset="0.5" stopColor="#100904" stopOpacity="0.4" />
            <stop offset="1" stopColor="#100904" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id="sky-fade-top"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={0}
            x2="0"
            y2={80}
          >
            <stop offset="0" stopColor="#100904" stopOpacity="0.9" />
            <stop offset="1" stopColor="#100904" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width={1440} height={900} fill="url(#sky-band)" />

        <g
          className="motion-safe:animate-breathe"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <ellipse
            cx={720}
            cy={505}
            rx={860}
            ry={118}
            fill="url(#horizon-glow)"
          />
        </g>

        <circle cx={1078} cy={148} r={58} fill="url(#moon-halo)" />
        <circle
          cx={1078}
          cy={148}
          r={24}
          fill="#ffedd7"
          opacity={0.85}
          mask="url(#moon-cut)"
        />

        {STARS.map((s) =>
          s.tw === undefined ? (
            <circle
              key={`${s.x}-${s.y}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#ffedd7"
              opacity={s.o}
            />
          ) : (
            <g
              key={`${s.x}-${s.y}`}
              className="motion-safe:animate-twinkle"
              style={{
                animationDelay: `${s.tw * 1.15}s`,
                animationDuration: `${(4.6 + (s.tw % 4) * 0.55).toFixed(2)}s`,
              }}
            >
              <circle cx={s.x} cy={s.y} r={s.r} fill="#ffedd7" opacity={s.o} />
            </g>
          ),
        )}

        {/* Spill sits behind the ridges so its light shows in the sky
            strip above each mass edge — light bleeding over
            obstacles, per the reference. */}
        <ellipse
          cx={720}
          cy={500}
          rx={1050}
          ry={100}
          fill="url(#horizon-spill)"
        />
        <ellipse
          cx={640}
          cy={505}
          rx={330}
          ry={95}
          fill="url(#horizon-pool)"
        />

        {/* Ridges in three depths — the backbg mechanism: each plane
            a FLAT mass, value stepping darker toward the viewer (far
            #432c38 → mid #251824 → near #150e0c, atmospheric pickup
            as fill value, never rim light), and one driftwood line
            etches every crest edge — drawn angular: straight facet
            segments between sharp irregular peaks, scree ticks
            running down-slope, the near ground broken into rocky
            lobes. Tallest massif stands right of the
            artwork where the sky is open; the stretch behind the
            cover stays low so it never competes. */}
        {/* Far mass — flat hazy plum, the lightest land value, dusted
            toward the horizon light. Hard cut at the crest; the etch
            line rides its edge. */}
        <path
          d="M 0 548 L 55 524 L 90 534 L 128 502 L 158 544 L 200 556 L 248 514 L 292 494 L 326 540 L 368 552 L 415 506 L 452 532 L 505 502 L 548 544 L 592 518 L 638 498 L 686 542 L 732 556 L 778 514 L 826 548 L 868 512 L 922 550 L 968 510 L 1000 478 L 1042 538 L 1088 506 L 1136 534 L 1186 498 L 1236 544 L 1288 552 L 1342 504 L 1394 518 L 1440 522 L 1440 900 L 0 900 Z"
          fill="#432c38"
        />
        <path
          d="M 0 548 L 55 524 L 90 534 L 128 502 L 158 544 L 200 556 L 248 514 L 292 494 L 326 540 L 368 552 L 415 506 L 452 532 L 505 502 L 548 544 L 592 518 L 638 498 L 686 542 L 732 556 L 778 514 L 826 548 L 868 512 L 922 550 L 968 510 L 1000 478 L 1042 538 L 1088 506 L 1136 534 L 1186 498 L 1236 544 L 1288 552 L 1342 504 L 1394 518 L 1440 522"
          fill="none"
          stroke="#e7b37b"
          strokeOpacity={0.34}
          strokeWidth={1.3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g stroke="#e7b37b" strokeWidth={1.1} fill="none" strokeLinecap="round">
          <path d="M 1006 484 L 1016 498" strokeOpacity={0.16} />
          <path d="M 1190 502 L 1200 516" strokeOpacity={0.16} />
          <path d="M 296 498 L 306 512" strokeOpacity={0.14} />
        </g>
        {/* Mid mass — one step darker; swallows the far fill below its
            crest so depth reads as stacked value. */}
        <path
          d="M 0 640 L 62 612 L 124 598 L 188 612 L 246 644 L 298 656 L 348 646 L 402 628 L 468 608 L 536 600 L 598 616 L 652 640 L 706 656 L 762 648 L 826 612 L 894 604 L 958 616 L 1026 632 L 1088 652 L 1148 660 L 1206 638 L 1276 622 L 1352 610 L 1440 618 L 1440 900 L 0 900 Z"
          fill="#251824"
        />
        <path
          d="M 0 640 L 62 612 L 124 598 L 188 612 L 246 644 L 298 656 L 348 646 L 402 628 L 468 608 L 536 600 L 598 616 L 652 640 L 706 656 L 762 648 L 826 612 L 894 604 L 958 616 L 1026 632 L 1088 652 L 1148 660 L 1206 638 L 1276 622 L 1352 610 L 1440 618"
          fill="none"
          stroke="#e7b37b"
          strokeOpacity={0.40}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g stroke="#e7b37b" strokeWidth={1.2} fill="none" strokeLinecap="round">
          <path d="M 602 620 L 612 626" strokeOpacity={0.19} />
          <path d="M 898 608 L 910 610" strokeOpacity={0.19} />
        </g>

        {/* Near ground — darkest plane, nearest viewer. The wreck,
            scars, and drag streaks all live on this floor. */}
        <path
          d="M 0 705 L 62 696 L 128 710 L 196 700 L 262 714 L 336 702 L 408 694 L 482 708 L 556 698 L 628 712 L 700 702 L 772 714 L 848 700 L 922 690 L 1002 706 L 1082 712 L 1162 696 L 1244 708 L 1322 698 L 1440 696 L 1440 900 L 0 900 Z"
          fill="#150e0c"
        />
        <path
          d="M 0 705 L 62 696 L 128 710 L 196 700 L 262 714 L 336 702 L 408 694 L 482 708 L 556 698 L 628 712 L 700 702 L 772 714 L 848 700 L 922 690 L 1002 706 L 1082 712 L 1162 696 L 1244 708 L 1322 698 L 1440 696"
          fill="none"
          stroke="#e7b37b"
          strokeOpacity={0.48}
          strokeWidth={1.7}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Ground drag — the backbg's recession texture: faint
            horizontal driftwood streaks running with the near ground,
            as if the horizon light drags long across the flat. */}
        <g stroke="#e7b37b" strokeWidth={1.1} fill="none" strokeLinecap="round">
          <path d="M 90 742 L 360 738" strokeOpacity={0.14} />
          <path d="M 610 748 L 950 744" strokeOpacity={0.12} />
          <path d="M 1120 736 L 1360 740" strokeOpacity={0.13} />
        </g>

        {/* Desert floor detail — the backbg's dash field: short
            hand-placed marks across the near ground, sparse at the
            crest, denser toward the viewer (recession by density);
            driftwood stubble catching the dusk, a few ink chips where
            the pool lights the floor near the mound. */}
        <g fill="none" strokeLinecap="round">
          <g stroke="#e7b37b" strokeWidth={1.2}>
            <path d="M 430 716 L 444 718" strokeOpacity={0.1} />
            <path d="M 720 718 L 731 719" strokeOpacity={0.1} />
            <path d="M 1180 716 L 1195 718" strokeOpacity={0.1} />
            <path d="M 70 730 L 84 729" strokeOpacity={0.12} />
            <path d="M 395 733 L 409 734" strokeOpacity={0.12} />
            <path d="M 560 728 L 571 730" strokeOpacity={0.12} />
            <path d="M 985 731 L 998 732" strokeOpacity={0.12} />
            <path d="M 1080 735 L 1094 736" strokeOpacity={0.12} />
            <path d="M 1250 730 L 1263 731" strokeOpacity={0.12} />
            <path d="M 95 755 L 112 753" strokeOpacity={0.15} />
            <path d="M 210 760 L 226 759" strokeOpacity={0.15} />
            <path d="M 330 752 L 345 753" strokeOpacity={0.14} />
            <path d="M 470 762 L 486 760" strokeOpacity={0.15} />
            <path d="M 610 756 L 625 757" strokeOpacity={0.14} />
            <path d="M 760 768 L 777 766" strokeOpacity={0.16} />
            <path d="M 895 752 L 908 753" strokeOpacity={0.14} />
            <path d="M 1035 764 L 1051 762" strokeOpacity={0.16} />
            <path d="M 1160 758 L 1173 759" strokeOpacity={0.15} />
            <path d="M 1300 766 L 1316 764" strokeOpacity={0.16} />
            <path d="M 1385 754 L 1398 755" strokeOpacity={0.14} />
            <path d="M 160 784 L 178 782" strokeOpacity={0.18} />
            <path d="M 540 786 L 557 784" strokeOpacity={0.18} />
            <path d="M 900 788 L 915 787" strokeOpacity={0.17} />
            <path d="M 1240 786 L 1256 784" strokeOpacity={0.18} />
          </g>
          <g stroke="#120a06" strokeWidth={1.6} strokeOpacity={0.5}>
            <path d="M 200 724 L 212 725" />
            <path d="M 285 716 L 298 717" />
            <path d="M 312 722 L 322 723" />
          </g>
        </g>

        {/* The crashed satellite — a machine that fell out of this sky,
            drawn as line art: driftwood outlines and seam lines, as if
            the dusk light catches every edge of the wreck. Axis-aligned
            in its own frame (nose at the origin, hull along +x, dorsal
            gear at -y) and placed with one rotate(-55) so it augured in
            nose-down: fuselage with panel seams, flared engine bell,
            dish aimed along the hull toward the moon, a bent solar wing
            with the last cell torn off, and a whip antenna whose ember
            beacon still blinks (motion-safe; a steady ember point under
            reduced motion) — the only filled mark on the machine, the
            living light. Nose at (268,704) keeps the wreck clear of
            the centered poster print. */}
        <g
          transform="translate(268 704) rotate(-55)"
          stroke="#e7b37b"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* hull — crumpled nose tapering into a straight capsule,
              seams dividing it into machined sections */}
          <path
            d="M 0 0 C 4 -2 9 -8 14 -14 L 150 -14 L 150 14 L 14 14 C 9 8 4 2 0 0 Z"
            strokeWidth={2}
            strokeOpacity={0.68}
          />
          <path
            d="M 22 -12 C 26 -7 26 7 22 12"
            strokeWidth={1.2}
            strokeOpacity={0.32}
          />
          <path d="M 46 -13 L 46 13" strokeWidth={1.2} strokeOpacity={0.3} />
          <path d="M 80 -13 L 80 13" strokeWidth={1.2} strokeOpacity={0.3} />
          <path
            d="M 118 -13 L 118 13"
            strokeWidth={1.2}
            strokeOpacity={0.3}
          />
          {/* flared engine bell at the tail, inner lip line */}
          <path
            d="M 150 -12 L 168 -27 L 168 27 L 150 12 Z"
            strokeWidth={2}
            strokeOpacity={0.68}
          />
          <path
            d="M 160 -21 L 160 21"
            strokeWidth={1.2}
            strokeOpacity={0.32}
          />
          {/* dish on a stalk, feed strut + rivet */}
          <path
            d="M 122 -14 L 128 -28"
            strokeWidth={2.5}
            strokeOpacity={0.55}
          />
          <ellipse
            cx={130}
            cy={-30}
            rx={12}
            ry={4.5}
            transform="rotate(38 130 -30)"
            strokeWidth={1.9}
            strokeOpacity={0.6}
          />
          <path
            d="M 136 -36 L 143 -45"
            strokeWidth={1.5}
            strokeOpacity={0.52}
          />
          <circle
            cx={144}
            cy={-46.5}
            r={1.3}
            fill="#e7b37b"
            fillOpacity={0.5}
            stroke="none"
          />
          {/* solar wing — three cells and a torn fourth, all outline */}
          <path
            d="M 88 -14 L 82 -26"
            strokeWidth={3}
            strokeOpacity={0.55}
          />
          <g
            transform="translate(82 -26) rotate(-35)"
            strokeWidth={1.25}
            strokeOpacity={0.6}
          >
            <rect x={0} y={0} width={10.5} height={13} />
            <rect x={12} y={0} width={10.5} height={13} />
            <rect x={24} y={0} width={10.5} height={13} />
            <path d="M 36 0 L 44 1 L 41 6 L 43 13 L 36 13 Z" />
            <path d="M 0 6.5 L 34.5 6.5" strokeWidth={0.8} strokeOpacity={0.4} />
            <path d="M 5.25 0 L 5.25 13 M 15.75 0 L 15.75 13 M 26.25 0 L 26.25 13" strokeWidth={0.8} strokeOpacity={0.4} />
          </g>
          {/* sheared-off ventral mounting stub */}
          <path
            d="M 112 14 L 104 24 L 110 27 L 118 16 Z"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />
          {/* whip antenna + the beacon that still blinks. Brightness
              lives on the dot itself (a base-opacity-only dot caps the
              animated envelope below its own steady state); the faint
              halo gives the pulse something to breathe through even in
              a single static frame, and stays as a soft steady glow
              under reduced motion. */}
          <path
            d="M 158 -13 L 170 -40"
            strokeWidth={2}
            strokeOpacity={0.55}
          />
          <g className="motion-safe:animate-beacon" stroke="none">
            <circle cx={171} cy={-44} r={7} fill="#dc5000" opacity={0.24} />
            <circle cx={171} cy={-44} r={3.2} fill="#dc5000" opacity={0.8} />
          </g>

          {/* DETAIL PASS — the backbg's dead tree carries its scene's
              drawn detail; here the wreck is that subject. Machined
              density in the same driftwood line dialect, secondary
              hierarchy (0.3-0.45) under the primary outline. */}
          <path d="M 62 -13 L 62 13" strokeWidth={1.2} strokeOpacity={0.3} />
          <path d="M 100 -13 L 100 13" strokeWidth={1.2} strokeOpacity={0.3} />
          <rect x={84} y={-5} width={12} height={12} strokeWidth={1.1} strokeOpacity={0.38} />
          <path d="M 87 -2 L 87 4 M 90 -2 L 90 4 M 93 -2 L 93 4" strokeWidth={0.9} strokeOpacity={0.3} />
          <g stroke="none" fill="#e7b37b">
            <circle cx={30} cy={-10.5} r={0.8} fillOpacity={0.35} />
            <circle cx={54} cy={-10.5} r={0.8} fillOpacity={0.35} />
            <circle cx={72} cy={-10.5} r={0.8} fillOpacity={0.35} />
            <circle cx={106} cy={-10.5} r={0.8} fillOpacity={0.35} />
            <circle cx={138} cy={-10.5} r={0.8} fillOpacity={0.35} />
          </g>
          <ellipse cx={130} cy={-30} rx={7} ry={2.6} transform="rotate(38 130 -30)" strokeWidth={1} strokeOpacity={0.4} />
          <path d="M 127 -23 L 123 -15" strokeWidth={1.2} strokeOpacity={0.4} />
          <path d="M 164 -18 L 164 18" strokeWidth={1} strokeOpacity={0.3} />
          <path d="M 150 -8 L 161 -13 M 150 8 L 161 13" strokeWidth={1.1} strokeOpacity={0.4} />
          <path d="M 162 -20 L 166 -18 M 165 -28 L 169 -26" strokeWidth={1} strokeOpacity={0.35} />
          <path d="M 60 -14 C 54 -22 60 -29 70 -31 C 76 -32 80 -29 82 -26" strokeWidth={0.9} strokeOpacity={0.32} />
          <path d="M 132 14 L 138 22" strokeWidth={1.6} strokeOpacity={0.45} />
        </g>

        {/* Crash scars in world space, along the near ground — every
            mark a stroke, nothing filled: an arc for the impact mound
            burying the nose, a gouge line trailing back up-slope,
            dirt spray, and debris ticks (the torn solar cell among
            them) in the same ink dialect. The ember pool paints first
            so each dark line cuts against light — without it the ink
            sits below the grain's own modulation on the near-black
            ground. */}
        <ellipse cx={225} cy={702} rx={115} ry={30} fill="url(#scar-glow)" />
        <g stroke="#120a06" fill="none" strokeLinecap="round">
          <path
            d="M 232 710 Q 268 688 306 710"
            strokeWidth={2}
            strokeOpacity={0.75}
          />
          <path
            d="M 178 711 Q 222 702 264 707"
            strokeWidth={1.5}
            strokeOpacity={0.6}
          />
          <g strokeWidth={2.5} strokeOpacity={0.7}>
            <path d="M 244 692 L 228 678" />
            <path d="M 256 688 L 246 672" />
            <path d="M 266 690 L 262 674" />
          </g>
          <path d="M 200 701 L 209 698" strokeWidth={3.5} strokeOpacity={0.9} />
          <path d="M 186 695 L 192 698" strokeWidth={3} strokeOpacity={0.85} />
          <path d="M 158 705 L 169 707" strokeWidth={5.5} strokeOpacity={0.95} />
        </g>

        {/* Occasional meteor — visible ~0.7s of every 13s cycle, first
            pass ~2.5s after load. Travels behind the title. */}
        <g className="motion-safe:animate-shoot [animation-fill-mode:backwards] [animation-delay:2.5s]">
          <path
            d="M 0 0 L 92 30"
            stroke="url(#shoot-tail)"
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          <circle cx={92} cy={30} r={1.9} fill="#ffedd7" />
        </g>

        <rect width={1440} height={900} fill="url(#sky-grain)" opacity={0.22} />

        <rect
          x={0}
          y={700}
          width={1440}
          height={200}
          fill="url(#sky-fade-bottom)"
        />
        <rect x={0} y={0} width={1440} height={80} fill="url(#sky-fade-top)" />
      </svg>
    </div>
  );
}
