// Renders the share card: public/assets/img/og-card.png.
//
// The card is hand-set HTML (scripts/og-card.html) — Bodoni Moda wordmark,
// Courier Prime colophon, the ember bellyband — laid out at 1200×630 and
// shot at 2× for a 2400×1260 file, so the type stays crisp on retina feed
// previews. A copy change is a one-line edit in the HTML, not a design pass.
//
// The fonts come from Google Fonts inside the page; networkidle plus
// document.fonts.ready is what guarantees they are painted before the shot.
//
// Run it with `npm run og` after changing the card, then commit both.
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = path.join(ROOT, "scripts/og-card.html");
const OUT = path.join(ROOT, "public/assets/img/og-card.png");

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });
  await page.goto(`file://${PAGE}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: OUT });
  console.log(`wrote public/assets/img/og-card.png (2400×1260)`);
} finally {
  await browser.close();
}
