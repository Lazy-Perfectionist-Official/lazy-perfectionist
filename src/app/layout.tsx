import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Courier_Prime, Inter } from "next/font/google";

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

const title = "Lazy Perfectionist — Bedroom Instrumental Rock | Hong Kong";
const description =
  "Lazy Perfectionist is a bedroom instrumental rock project from Hong Kong. The new single LUSG is out now — alongside Cyclothymia and Orbit — on all streaming platforms.";

// The site has no domain of its own yet (lazyperfectionist.com is parked and
// for sale), so the canonical host comes from the deploy environment. Until
// NEXT_PUBLIC_SITE_URL is set, no canonical or sitemap URL is emitted rather
// than pointing crawlers at somebody else's sales page; the share card still
// works because its image path is site-relative.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: title, template: "%s | Lazy Perfectionist" },
  description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  keywords: [
    "Lazy Perfectionist",
    "instrumental rock",
    "bedroom rock",
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
    images: [
      {
        url: "/assets/img/og-card.png",
        width: 1200,
        height: 630,
        alt: "Lazy Perfectionist — bedroom instrumental rock from Hong Kong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/img/og-card.png"],
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
