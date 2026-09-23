/*
 * Twilight ridge behind the hero — the Intervals "backbg" pattern rebuilt
 * as pure vector. Palette-locked to the site tokens (canvas-plum sky,
 * ember/driftwood horizon, near-canvas ground), film grain baked in via
 * the shared noise tile, and three whisper-quiet CSS effects: staggered
 * star twinkle, a breathing horizon glow, and a shooting star every ~13s.
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

          {/* Grain baked into the artwork (the actual Intervals pattern)
              via the same noise tile the page-wide whisper uses. */}
          <pattern
            id="sky-grain"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <image
              href="/assets/img/noise-tile.webp"
              width={200}
              height={200}
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

        {/* Ridges in three depths. Tuned after vision review kept reading
            the lower half as one dark wash: crests are tall enough that
            each tier owns ~90px of screen, and the value gaps are wide —
            far ridge hazy warm plum (atmospheric perspective, backlit),
            mid near-black plum, near-ground melting into the canvas. */}
        <path
          d="M 0 520 C 130 472 260 534 400 506 C 540 478 660 532 800 504 C 940 478 1060 538 1200 510 C 1300 492 1380 530 1440 518 L 1440 900 L 0 900 Z"
          fill="#46222e"
        />
        <path
          d="M 0 604 C 160 560 320 618 470 590 C 620 562 760 616 910 592 C 1060 568 1180 622 1320 596 C 1370 586 1410 600 1440 592 L 1440 900 L 0 900 Z"
          fill="#170d13"
        />

        <path
          d="M 0 700 C 200 688 380 704 560 696 C 760 688 940 706 1140 698 C 1260 693 1360 700 1440 694 L 1440 900 L 0 900 Z"
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

        <rect width={1440} height={900} fill="url(#sky-grain)" opacity={0.06} />

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
