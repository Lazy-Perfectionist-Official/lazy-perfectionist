import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Text({
  weight: ["400"],               // regular
  style: ["normal", "italic"],   // both normal & italic
  subsets: ["latin"],
  variable: "--font-dm-serif",   // CSS variable name
  display: "swap",               // prevents FOIT
});

export const metadata: Metadata = {
  title: "Lazy Perfectionist - Official Site",
  description: "Website for Lazy Perfectionist, a Progressive Rock Instrumental Project/Band by Sammy.",
  keywords: ["Lazy Perfectionist", "Progressive Rock", "Instrumental Music", "Sammy", "Musician", "Orbit", "Band"],
  authors: [{ name: "Lazy Perfectionist Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Lazy Perfectionist",
    description: "AI-powered development with modern React stack",
    url: "https://Lazy-Perfectionist.vercel.app",
    siteName: "Lazy Perfectionist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lazy Perfectionist",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
