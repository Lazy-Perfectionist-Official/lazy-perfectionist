// Regenerates the favicon set from the Ko-fi profile mark.
//
// The smallest marks are the same face Ko-fi shows beside the shop: the
// profile upload, masked to a coin. Two treatments, for two jobs:
//
//   - favicon.ico (16/32/48) keeps Ko-fi's transparent corners, so the tab
//     looks exactly like the Ko-fi tab.
//   - The install marks — Apple touch (180) and the manifest's 192/512 —
//     sit the coin on the paper field with a hair of margin. iOS and
//     Android flatten transparency to black, and a full-bleed circle would
//     be clipped by their rounded-square mask; the paper ring is what
//     their mask actually cuts.
//
// The source is scripts/assets/icon-source.png, the 210×210 upload. Each
// target is resized straight from it with Lanczos — never upscaled to a
// master and then down again — and masked at its own size so the rim
// antialiases per raster.
//
// Run `npm run icons` after replacing the source, then commit.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "scripts/assets/icon-source.png");

const PAPER = "#f2e7d5";
const TOUCH_INSET = 0.04; // the paper ring inside the rounded-square mask
// Lossless, but a photo in a PNG defaults to ~350 KB at 512; effort 10 and
// adaptive filtering take the same pixels to ~95 KB.
const PNG = { compressionLevel: 9, adaptiveFiltering: true, effort: 10 };

const ICON_SIZES = [16, 32, 48]; // favicon.ico entries
const FILES = [
  { size: 180, file: "public/apple-touch-icon.png", inset: TOUCH_INSET },
  { size: 192, file: "public/icon-192x192.png", inset: TOUCH_INSET },
  { size: 512, file: "public/icon-512x512.png", inset: TOUCH_INSET },
];

const circle = (size, inset) => {
  const r = (size * (1 - 2 * inset)) / 2;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="#fff"/>
    </svg>`,
  );
};

// A null inset keeps clear corners (the favicon look); a number leaves that
// much margin and fills the rest with paper (the install look).
async function coin(size, inset) {
  const clear = await sharp(SOURCE)
    .resize(size, size, { kernel: "lanczos3" })
    .ensureAlpha()
    .composite([{ input: circle(size, inset ?? 0), blend: "dest-in" }])
    .png(PNG)
    .toBuffer();
  if (inset == null) return clear;
  return sharp({
    create: { width: size, height: size, channels: 4, background: PAPER },
  })
    .composite([{ input: clear }])
    .png(PNG)
    .toBuffer();
}

for (const { size, file, inset } of FILES) {
  const bytes = await coin(size, inset);
  await writeFile(path.join(ROOT, file), bytes);
  console.log(`wrote ${file} (${size}×${size}, ${bytes.length} bytes)`);
}

const entries = [];
for (const size of ICON_SIZES) entries.push({ size, png: await coin(size, null) });

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
