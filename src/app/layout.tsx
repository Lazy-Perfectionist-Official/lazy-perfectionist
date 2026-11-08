import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Courier_Prime, Inter } from "next/font/google";

import { SHARE_CARD } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// The hero print is set in Bodoni 72 and American Typewriter; the site
// borrows their web equivalents so the page and the poster share a voice.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const courier = Courier_Prime({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
});

const title = "Lazy Perfectionist — Instrumental Rock/Metal | Hong Kong";
const description =
  "Lazy Perfectionist is an instrumental rock/metal project from Hong Kong. The new single LUSG is out now — alongside Cyclothymia and Orbit — on all streaming platforms.";

// The canonical host comes from the deploy environment (see SITE_URL in
// site.ts): a real domain when one is set, Vercel's own production host
// otherwise. The parked lazyperfectionist.com is never substituted, so a
// canonical tag always names an address the site actually answers on.
export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: { default: title, template: "%s | Lazy Perfectionist" },
  description,
  alternates: SITE_URL ? { canonical: "/" } : undefined,
  keywords: [
    "Lazy Perfectionist",
    "instrumental rock",
    "instrumental metal",
    "Hong Kong music",
    "progressive rock",
    "LUSG",
    "Cyclothymia",
    "Orbit",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Lazy Perfectionist",
    title,
    description,
    url: SITE_URL ? new URL("/", SITE_URL).toString() : undefined,
    images: [SHARE_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SHARE_CARD.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2e7d5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bodoni.variable} ${courier.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
