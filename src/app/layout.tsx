import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-serif",
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
  themeColor: "#100904",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
