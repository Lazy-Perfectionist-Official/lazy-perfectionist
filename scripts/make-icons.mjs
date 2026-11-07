// Regenerates the favicon set as the print brand in miniature.
//
// The old icons were the pre-wipe site's (a garden photograph); the site
// since b810383 is the print, so its tab and install marks are the print
// too: paper field, ink Bodoni "LP", ember bellyband at the foot — the
// og-card collapsed to a glyph.
//
// The mark is set in the site's own Bodoni Moda (next/font self-hosts it
// under a hashed family name), so this script borrows a running dev server
// on 127.0.0.1:3000 — same convention as the e2e suite — injects the SVG,
// and screenshots it at each size, native pixels, scale 1. favicon.ico is
// assembled here as PNG entries (16/32/48); every browser in the support
// matrix reads them.
//
// Run it with `npm run icons` after changing the mark, then commit.
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DEV_URL = "http://127.0.0.1:3000/";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// The mark, on a 512 viewBox. Sizes in these units.
const INK = "#2a1810";
const PAPER = "#f2e7d5";
const EMBER = "#dc5000";
const BAND_TOP = 448; // ember bellyband: the foot 64/512 of the field
const CENTER_Y = 232; // optical center of the letter mass above the band

// Optical sizes, two tiers — judged on the true rasters, not the SVG:
// at 16px the P's counter collapses into a gray mass (a lone L is the
// only honest tab read), from 32px up the monogram holds its holes.
const MARK = { weight: 700, size: 240, track: -4, glyphs: "LP" };
const SMALL = { weight: 700, size: 300, track: 0, glyphs: "L" };
const glyphTier = (px) => (px <= 16 ? SMALL : MARK);

const ICON_SIZES = { 16: null, 32: null, 48: null }; // favicon.ico entries
const FILES = [
  { size: 180, file: "public/apple-touch-icon.png" },
  { size: 192, file: "public/icon-192x192.png" },
  { size: 512, file: "public/icon-512x512.png" },
];

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 640, height: 640 } });
  await page.goto(DEV_URL, { waitUntil: "networkidle" });

  // next/font renames the family; the CSS variable carries the real name.
  const family = await page.evaluate(async () => {
    const name = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-bodoni")
      .trim();
    // display:swap means the face may still be pending at networkidle —
    // load() resolves only when the real glyphs are available.
    await document.fonts.load(`700 100px ${name}`);
    return document.fonts.check(`700 100px ${name}`) ? name : null;
  });
  if (!family) throw new Error("Bodoni Moda never loaded — is the dev server up and healthy?");

  // Inject the mark for one tier at one raster size, then center the
  // glyphs on their ink extents in the same pass — getBBox beats guessed
  // metrics, and DOM nodes cannot round-trip evaluate.
  const mount = (tier, px) =>
    page.evaluate(
      ({ INK, PAPER, EMBER, family, tier, px, bandTop, centerY }) => {
        document.getElementById("lp-stage")?.remove();
        const host = document.createElement("div");
        host.id = "lp-stage";
        host.style.cssText = "position:fixed;top:0;left:0;z-index:2147483647;line-height:0;background:#f2e7d5;";
        host.innerHTML = `<svg id="lp-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${px}" height="${px}">
          <rect width="512" height="512" fill="${PAPER}"/>
          <text id="lp-mono" fill="${INK}" font-weight="${tier.weight}" font-size="${tier.size}" letter-spacing="${tier.track}"
                font-family="${family}" text-anchor="middle">${tier.glyphs}</text>
          <rect y="${bandTop}" width="512" height="${512 - bandTop}" fill="${EMBER}"/>
        </svg>`;
        document.body.appendChild(host);
        const text = document.getElementById("lp-mono");
        const box = text.getBBox();
        text.setAttribute("x", 256 - (box.x + box.width / 2));
        text.setAttribute("y", centerY - (box.y + box.height / 2));
      },
      { INK, PAPER, EMBER, family, tier, px, bandTop: BAND_TOP, centerY: CENTER_Y },
    ).then(() => page.locator("#lp-mark"));

  const render = async (px) => (await mount(glyphTier(px), px)).screenshot({ scale: "css" });

  for (const { size, file } of FILES) {
    const bytes = await render(size);
    await writeFile(path.join(ROOT, file), bytes);
    console.log(`wrote ${file} (${size}×${size}, ${bytes.length} bytes)`);
  }

  const entries = [];
  for (const size of Object.keys(ICON_SIZES)) entries.push({ size: Number(size), png: await render(Number(size)) });

  // ICO with PNG entries: 6-byte header, 16 bytes per directory entry, then
  // the images in the same order the entries point at them.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // 1 = icon directory
  header.writeUInt16LE(entries.length, 4);
  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;
  entries.forEach(({ size, png }, i) => {
    const entry = 16 * i;
    directory.writeUInt8(size, entry); // 0 would mean 256; ours stay under
    directory.writeUInt8(size, entry + 1);
    directory.writeUInt16LE(1, entry + 4); // color planes
    directory.writeUInt16LE(32, entry + 6); // bits per pixel
    directory.writeUInt32LE(png.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  const ico = Buffer.concat([header, directory, ...entries.map((e) => e.png)]);
  await writeFile(path.join(ROOT, "public/favicon.ico"), ico);
  console.log(`wrote public/favicon.ico (${entries.map((e) => e.size).join("/")} → ${ico.length} bytes)`);
} finally {
  await browser.close();
}
