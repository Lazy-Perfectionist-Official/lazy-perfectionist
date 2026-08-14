import type { NextConfig } from "next";

// Get environment-specific configuration
const isProduction = process.env.NODE_ENV === 'production';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lazyperfectionist.com';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow dev-server access from LAN / Tailscale origins (silences cross-origin warning)
  allowedDevOrigins: ['100.76.128.50', '192.168.2.217'],
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,

  // Note: metadataBase is configured in individual page metadata exports, not here

  // HTTP Headers for CDN caching and security
  async headers() {
    const headers = [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];

    // Add security headers for production
    if (isProduction) {
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      });
    }

    return headers;
  },

  // Resource redirects for optimized images
  async redirects() {
    return [
      {
        source: '/assets/img/logo.png',
        destination: '/assets/img/optimized/logo-800.avif',
        permanent: true,
      },
      {
        source: '/assets/img/noise.jpg',
        destination: '/assets/img/optimized/noise-tile-200.webp',
        permanent: true,
      },
    ];
  },

  // Performance optimizations
  compress: true,

  // Production output optimizations
  output: 'standalone',

  // Production-specific optimizations
  ...(isProduction && {
    // Production source maps for error tracking (disable for full optimization)
    productionBrowserSourceMaps: false,

    // Disable powered by header for security
    poweredByHeader: false,

    // React strict mode for production (better error detection)
    reactStrictMode: true,
  }),

  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['gsap', 'framer-motion', 'lucide-react', 'react-icons'],
    scrollRestoration: true,
  },

  // Bundle splitting
  modularizeImports: {
    'gsap': {
      transform: 'gsap/' + '{{member}}',
      skipDefaultInitialization: false,
    },
    'framer-motion': {
      transform: 'framer-motion/' + '{{member}}',
      skipDefaultInitialization: false,
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
      skipDefaultInitialization: false,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'z-cdn-media.chatglm.cn',
        port: '',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.song.link',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ko-fi.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ko-fi.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ko-fi.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }

    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Commons chunk for shared dependencies
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: -10,
              reuseExistingChunk: true,
              enforceSizeThreshold: 50000,
            },
            // React bundle
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|use-sync-external-hooks)[\\/]/,
              priority: -20,
              reuseExistingChunk: true,
              enforce: true,
            },
            // GSAP bundle
            gsap: {
              name: 'gsap',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](gsap)[\\/]/,
              priority: -15,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Framer Motion bundle
            framer: {
              name: 'framer-motion',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              priority: -15,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Three.js bundle
            three: {
              name: 'three',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: -15,
              reuseExistingChunk: true,
              enforce: true,
            },
            // UI libraries bundle
            ui: {
              name: 'ui-libs',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@radix-ui|cmdk|sonner|vaul)[\\/]/,
              priority: -25,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;