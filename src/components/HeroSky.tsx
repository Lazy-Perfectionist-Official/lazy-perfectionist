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
 * (clears both the artwork and the vinyl's slide path, page x < ~500),
 * its tail and dish rising into the lit horizon band while a whip
 * antenna still blinks ember; the moon answers from the upper right.
 * The far skyline stays deliberately quiet — low amplitude, hazy
 * value — so the wreck owns the left band.
 *
 * The whole scene is drawn as LINE ART: crest lines and machine
 * outlines in driftwood over faint washes, so the dusk light reads
 * as if it traces every edge instead of filling every mass. The
 * ember beacon is the one filled thing left — the living light.
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
            <stop offset="0.80" stopColor="#6e3012" />
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

          {/* Ember light pooling at the crash site — the beacon's
              answer on the ground. Gives the impact mound and debris
              a faint warm field to silhouette against (dark marks on
              #0a0605 alone sit below the grain's own modulation). */}
          <radialGradient id="scar-glow">
            <stop offset="0" stopColor="#dc5000" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#dc5000" stopOpacity="0.08" />
            <stop offset="1" stopColor="#dc5000" stopOpacity="0" />
          </radialGradient>

          {/* Far ridge wash — atmospheric haze, the way distant ranges
              photograph at dusk. Painted at low fill-opacity under the
              crest linework: it suggests mass without owning it, so
              the driftwood crest line does the drawing. */}
          <linearGradient
            id="far-ridge-fill"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={470}
            x2="0"
            y2={650}
          >
            <stop offset="0" stopColor="#452232" />
            <stop offset="1" stopColor="#331622" />
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
            cy={512}
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

        {/* Ridges in three depths, drawn as line art: driftwood crest
            strokes over faint washes, the way dusk light traces a
            range's edge instead of filling its mass. The far skyline
            keeps its quiet asymmetric massifs but as the faintest
            etched line (0.32) over a 15% haze wash; mid steps up
            (0.4 over 45%); the near ground carries the heaviest wash
            (0.5) so the wreck and its scars stay anchored. Short form
            accents run downhill from a few crests — etched shading,
            three strokes per depth at most. Tallest massif stands
            right of the artwork where the sky is open; the stretch
            behind the cover stays low so it never competes. */}
        <path
          d="M 0 548 C 45 536 80 512 120 500 C 135 510 150 534 165 546 C 185 558 200 558 215 554 C 245 542 265 508 300 494 C 315 508 335 540 355 552 C 375 560 395 520 420 510 C 432 518 442 528 455 530 C 472 522 488 508 505 503 C 525 512 550 542 575 556 C 605 544 630 512 660 498 C 675 516 688 538 702 548 C 718 558 738 520 760 508 C 772 516 785 536 800 546 C 825 551 845 526 870 512 C 885 518 905 544 925 552 C 945 549 968 506 1000 478 C 1015 500 1030 528 1045 540 C 1060 550 1075 522 1095 510 C 1115 519 1138 530 1162 534 C 1185 532 1205 504 1225 496 C 1240 508 1255 534 1270 546 C 1290 551 1315 514 1345 502 C 1365 508 1410 518 1440 522 L 1440 900 L 0 900 Z"
          fill="url(#far-ridge-fill)"
          fillOpacity={0.15}
        />
        <path
          d="M 0 548 C 45 536 80 512 120 500 C 135 510 150 534 165 546 C 185 558 200 558 215 554 C 245 542 265 508 300 494 C 315 508 335 540 355 552 C 375 560 395 520 420 510 C 432 518 442 528 455 530 C 472 522 488 508 505 503 C 525 512 550 542 575 556 C 605 544 630 512 660 498 C 675 516 688 538 702 548 C 718 558 738 520 760 508 C 772 516 785 536 800 546 C 825 551 845 526 870 512 C 885 518 905 544 925 552 C 945 549 968 506 1000 478 C 1015 500 1030 528 1045 540 C 1060 550 1075 522 1095 510 C 1115 519 1138 530 1162 534 C 1185 532 1205 504 1225 496 C 1240 508 1255 534 1270 546 C 1290 551 1315 514 1345 502 C 1365 508 1410 518 1440 522"
          fill="none"
          stroke="#e7b37b"
          strokeOpacity={0.32}
          strokeWidth={1.2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g stroke="#e7b37b" strokeWidth={1} fill="none" strokeLinecap="round">
          <path
            d="M 975 512 C 988 522 1002 534 1012 540"
            strokeOpacity={0.16}
          />
          <path
            d="M 1105 522 C 1118 528 1130 534 1140 536"
            strokeOpacity={0.16}
          />
          <path
            d="M 262 520 C 275 528 288 536 298 540"
            strokeOpacity={0.14}
          />
        </g>
        <path
          d="M 0 640 C 70 610 130 592 195 600 C 250 606 290 640 345 652 C 390 661 425 630 475 612 C 515 598 555 592 600 600 C 630 606 655 622 690 638 C 725 652 765 658 810 650 C 850 642 880 620 920 610 C 955 602 990 604 1030 616 C 1070 628 1105 650 1150 658 C 1195 665 1240 645 1285 626 C 1325 610 1370 606 1440 618 L 1440 900 L 0 900 Z"
          fill="#170d13"
          fillOpacity={0.45}
        />
        <path
          d="M 0 640 C 70 610 130 592 195 600 C 250 606 290 640 345 652 C 390 661 425 630 475 612 C 515 598 555 592 600 600 C 630 606 655 622 690 638 C 725 652 765 658 810 650 C 850 642 880 620 920 610 C 955 602 990 604 1030 616 C 1070 628 1105 650 1150 658 C 1195 665 1240 645 1285 626 C 1325 610 1370 606 1440 618"
          fill="none"
          stroke="#e7b37b"
          strokeOpacity={0.4}
          strokeWidth={1.6}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g stroke="#e7b37b" strokeWidth={1.2} fill="none" strokeLinecap="round">
          <path
            d="M 160 622 C 185 616 210 615 235 620"
            strokeOpacity={0.2}
          />
          <path
            d="M 1112 672 C 1138 666 1166 664 1192 668"
            strokeOpacity={0.2}
          />
        </g>

        <path
          d="M 0 705 C 180 690 340 714 520 700 C 700 687 880 712 1060 698 C 1180 689 1330 706 1440 696 L 1440 900 L 0 900 Z"
          fill="#0a0605"
          fillOpacity={0.5}
        />
        <path
          d="M 0 705 C 180 690 340 714 520 700 C 700 687 880 712 1060 698 C 1180 689 1330 706 1440 696"
          fill="none"
          stroke="#e7b37b"
          strokeOpacity={0.48}
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

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
            both the artwork and the vinyl's slide path. */}
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
            strokeOpacity={0.62}
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
            strokeOpacity={0.62}
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
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />
          <path
            d="M 136 -36 L 143 -45"
            strokeWidth={1.5}
            strokeOpacity={0.45}
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
            strokeWidth={1.1}
            strokeOpacity={0.5}
          >
            <rect x={0} y={0} width={10.5} height={13} />
            <rect x={12} y={0} width={10.5} height={13} />
            <rect x={24} y={0} width={10.5} height={13} />
            <path d="M 36 0 L 44 1 L 41 6 L 43 13 L 36 13 Z" />
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
            <circle cx={171} cy={-44} r={5.5} fill="#dc5000" opacity={0.2} />
            <circle cx={171} cy={-44} r={2.6} fill="#dc5000" opacity={0.7} />
          </g>
        </g>

        {/* Crash scars in world space, along the near ground, drawn as
            ink marks: an arc for the impact mound burying the nose, a
            gouge line trailing back up-slope, dirt spray, and debris
            ticks (the torn solar cell among them). The ember pool
            paints first so each dark mark cuts against light — without
            it the ink sits below the grain's own modulation on the
            near-black ground. */}
        <ellipse cx={268} cy={702} rx={62} ry={22} fill="url(#scar-glow)" />
        <g stroke="#060302" fill="none" strokeLinecap="round">
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
        </g>
        <g fill="#060302">
          <rect
            width={9}
            height={3.5}
            transform="translate(200 700) rotate(-16)"
            opacity={0.9}
          />
          <rect
            width={7}
            height={3}
            transform="translate(186 694) rotate(22)"
            opacity={0.85}
          />
          <rect
            width={11}
            height={6}
            transform="translate(158 702) rotate(9)"
            opacity={0.95}
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
