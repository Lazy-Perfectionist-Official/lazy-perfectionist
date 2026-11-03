import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Allow dev-server access from LAN / Tailscale origins. The MagicDNS
  // hostname is the one the browser actually sends as Origin through
  // `tailscale serve`, so it has to be listed by name — the tailnet IP
  // alone doesn't cover HMR's origin check.
  allowedDevOrigins: [
    "100.76.128.50",
    "192.168.2.217",
    "samuels-mac-mini.tail2bbd23.ts.net",
  ],

  reactStrictMode: true,

  // Node 25 ships webstorage by default: `localStorage` exists in the SSR
  // context but is non-functional without --localstorage-file, so the dev
  // indicator portal crashes prerender with "localStorage.getItem is not a
  // function". Disabling the indicator removes that code path entirely.
  devIndicators: false,

  async headers() {
    const headers = [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];

    if (isProduction) {
      // Immutable caching for static chunks is only safe in production
      // where URLs are content-hashed.
      headers.push({
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      });

      headers.push({
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      });
    }

    return headers;
  },

  compress: true,

  // Standalone output for the tailnet deployment flow (serve:prod).
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
