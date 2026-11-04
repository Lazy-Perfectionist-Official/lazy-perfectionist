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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lazyperfectionist.com"
  ),
  title: { default: title, template: "%s | Lazy Perfectionist" },
  description,
  alternates: { canonical: "/" },
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
        url: "/assets/img/lusg-cover.jpg",
        width: 1400,
        height: 1400,
        alt: "LUSG — single artwork",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
