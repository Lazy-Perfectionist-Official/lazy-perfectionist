/*
 * Twilight ridge behind the hero — the Intervals "backbg" pattern rebuilt
 * as pure vector. Palette-locked to the site tokens (canvas-plum sky,
 * ember/driftwood horizon, near-canvas ground), a fine film grain baked
 * into the artwork via a dual-polarity speckle tile (no page-wide
 * overlay — text and imagery stay crisp), and three whisper-quiet CSS
 * effects: staggered star twinkle, a breathing horizon glow, and a
 * shooting star every ~13s.
 * Effects are motion-safe-gated (static under reduced motion). No JS.
 *
 * Composition notes: the tree stands left-of-center so it clears both
 * the artwork and the vinyl's slide path (page x < ~500); the moon
 * answers from the upper right. Values tuned after vision review — the
 * first cut's horizon was too quiet to read as a landscape.
 */

type Star = { x: number; y: number; r: number; o: number; tw?: number };

// `tw` marks a twinkling star; its value seeds the delay/duration so the
// cycle never syncs up. Several kept inside the x 590–850 band where the
// mobile center-crop still shows sky, so touch visitors get twinkle too.
const STARS: Star[] = [
  // Left-band cluster — the right-of-center field alone left the sky
  // over the tree reading as empty at desktop widths.
  { x: 120, y: 320, r: 1.1, o: 0.55 },
  { x: 150, y: 140, r: 1.3, o: 0.6, tw: 8 },
  { x: 230, y: 64, r: 1.6, o: 0.68, tw: 9 },
  { x: 250, y: 330, r: 0.95, o: 0.5 },
  { x: 310, y: 228, r: 1.0, o: 0.52, tw: 10 },
  { x: 388, y: 96, r: 1.3, o: 0.6, tw: 0 },
  { x: 452, y: 210, r: 1.15, o: 0.56 },
  { x: 540, y: 72, r: 1.6, o: 0.7, tw: 1 },
  { x: 596, y: 168, r: 0.9, o: 0.46 },
  { x: 648, y: 300, r: 1.1, o: 0.54 },
  { x: 700, y: 84, r: 1.35, o: 0.62, tw: 2 },
  { x: 762, y: 236, r: 1.0, o: 0.48 },
  { x: 830, y: 120, r: 1.7, o: 0.68, tw: 3 },
  { x: 872, y: 338, r: 0.9, o: 0.38 },
  { x: 908, y: 188, r: 1.1, o: 0.52 },
  { x: 952, y: 84, r: 1.35, o: 0.62, tw: 4 },
  { x: 990, y: 262, r: 1.0, o: 0.48 },
  { x: 1024, y: 208, r: 1.1, o: 0.51 },
  { x: 1035, y: 352, r: 1.1, o: 0.54 },
  { x: 1082, y: 286, r: 1.5, o: 0.62, tw: 5 },
  { x: 1120, y: 180, r: 0.9, o: 0.46 },
  { x: 1172, y: 120, r: 1.6, o: 0.68, tw: 6 },
  { x: 1218, y: 320, r: 1.0, o: 0.48 },
  { x: 1268, y: 206, r: 1.25, o: 0.55, tw: 7 },
  { x: 1322, y: 96, r: 1.5, o: 0.6 },
  { x: 1368, y: 268, r: 1.0, o: 0.51 },
  { x: 410, y: 388, r: 1.2, o: 0.58 },
  { x: 1240, y: 400, r: 1.25, o: 0.55 },
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
          {/* Sky: canvas-plum into an ember-warm horizon. The horizon
              band rides ~55% down the viewBox so it stays on-screen
              below the 210px announcement+nav stack (a 900px-tall
              viewport only shows viewBox y ≲ 600). Stops below ~0.45
              stay dark — the title zone keeps its contrast. */}
          <linearGradient id="sky-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c070a" />
            <stop offset="0.38" stopColor="#150c13" />
            <stop offset="0.55" stopColor="#281419" />
            <stop offset="0.68" stopColor="#5a2513" />
            <stop offset="0.82" stopColor="#6e3012" />
          </linearGradient>

          {/* Horizon glow — ember core fading through driftwood (the
              dusty-rose trick, in our tokens). Wide enough to read as
              sky across the whole scene, brightest behind the artwork
              so the cover reads as backlit by dusk. */}
          <radialGradient id="horizon-glow">
            <stop offset="0" stopColor="#dc5000" stopOpacity="0.6" />
            <stop offset="0.3" stopColor="#dc5000" stopOpacity="0.3" />
            <stop offset="0.6" stopColor="#e7b37b" stopOpacity="0.16" />
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
            <stop offset="0" stopColor="#e7b37b" stopOpacity="0.3" />
            <stop offset="0.45" stopColor="#dc5000" stopOpacity="0.16" />
            <stop offset="1" stopColor="#dc5000" stopOpacity="0" />
          </radialGradient>

          {/* Far ridge fades toward its base — atmospheric haze lifting
              the crest line, the way distant ranges photograph at dusk. */}
          <linearGradient
            id="far-ridge-fill"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={445}
            x2="0"
            y2={650}
          >
            <stop offset="0" stopColor="#502b39" />
            <stop offset="1" stopColor="#3a1a27" />
          </linearGradient>

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
            cy={500}
            rx={860}
            ry={210}
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
            strip above each silhouette line. */}
        <ellipse
          cx={720}
          cy={515}
          rx={1050}
          ry={120}
          fill="url(#horizon-spill)"
        />
        <ellipse
          cx={640}
          cy={505}
          rx={330}
          ry={95}
          fill="url(#horizon-pool)"
        />

        {/* Ridges in three depths. The far skyline is drawn as an actual
            mountain range — sharp asymmetric peaks arrived-at and left
            steeply, long climbs into wide saddles, no repeating rhythm —
            because evenly-spaced rolling crests read as a stock vector
            wave, not a landscape. Tallest peak stands right of the
            artwork where the sky is open; the stretch behind the cover
            stays low so it never competes. Far ridge: hazy plum, crest
            lifted by haze (gradient fill). Mid: near-black plum, softer
            forms. Near ground: melts into the canvas. */}
        <path
          d="M 0 545 C 45 528 80 495 120 480 C 135 492 150 522 165 540 C 185 556 200 556 215 552 C 245 540 265 500 300 462 C 315 480 335 530 355 548 C 375 560 395 505 420 492 C 432 500 442 512 455 515 C 472 505 488 485 505 478 C 525 490 550 535 575 556 C 605 540 630 500 660 470 C 675 492 688 520 702 542 C 718 556 738 505 760 490 C 772 500 785 525 800 538 C 825 545 845 515 870 498 C 885 505 905 540 925 550 C 945 545 968 490 1000 452 C 1015 478 1030 515 1045 532 C 1060 545 1075 512 1095 498 C 1115 508 1138 522 1162 527 C 1185 525 1205 490 1225 480 C 1240 495 1255 525 1270 540 C 1290 545 1315 500 1345 488 C 1365 495 1410 508 1440 514 L 1440 900 L 0 900 Z"
          fill="url(#far-ridge-fill)"
        />
        <path
          d="M 0 640 C 70 610 130 592 195 600 C 250 606 290 640 345 652 C 390 661 425 630 475 612 C 515 598 555 592 600 600 C 630 606 655 622 690 638 C 725 652 765 658 810 650 C 850 642 880 620 920 610 C 955 602 990 604 1030 616 C 1070 628 1105 650 1150 658 C 1195 665 1240 645 1285 626 C 1325 610 1370 606 1440 618 L 1440 900 L 0 900 Z"
          fill="#170d13"
        />

        <path
          d="M 0 705 C 180 690 340 714 520 700 C 700 687 880 712 1060 698 C 1180 689 1330 706 1440 696 L 1440 900 L 0 900 Z"
          fill="#0a0605"
        />

        {/* The lone tree — hand-drawn tapered strokes, left of center so
            it clears both the artwork and the vinyl's slide path, and
            answers the moon across the diagonal. Crown starts below the
            "Out now" line; base plants on the near ground (~700). */}
        <g stroke="#060302" fill="none" strokeLinecap="round">
          <path
            d="M 355 706 C 357 650 351 592 356 538"
            strokeWidth={9}
          />
          <path
            d="M 356 538 C 358 505 354 472 361 432"
            strokeWidth={6}
          />
          <path
            d="M 356 536 C 384 512 412 500 442 486"
            strokeWidth={4.5}
          />
          <path
            d="M 442 486 C 456 480 467 471 476 459"
            strokeWidth={2.4}
          />
          <path d="M 355 486 C 328 471 306 469 283 454" strokeWidth={4} />
          <path d="M 283 454 C 271 448 263 439 257 428" strokeWidth={2} />
          <path
            d="M 360 434 C 376 418 396 412 416 400"
            strokeWidth={3.4}
          />
          <path
            d="M 416 400 C 428 394 437 385 443 374"
            strokeWidth={1.8}
          />
          <path d="M 360 434 C 346 417 327 411 309 398" strokeWidth={3} />
          <path d="M 309 398 C 298 392 291 383 287 372" strokeWidth={1.6} />
          <path
            d="M 361 432 C 363 416 360 402 365 387"
            strokeWidth={2.6}
          />
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
