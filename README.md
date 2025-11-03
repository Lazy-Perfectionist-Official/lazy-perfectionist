# 🎸 Lazy Perfectionist

> A modern Next.js website for Lazy Perfectionist - a bedroom instrumental rock project based in Hong Kong 🇭🇰

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Lazy Perfectionist is a musical project featuring instrumental rock music created in a bedroom studio. The website showcases music releases, blog posts, and provides links to streaming platforms.

## ✨ Key Features

- **🎵 Music Integration**: Spotify API integration for track listings and streaming platform links
- **📝 Blog Integration**: Medium API integration for blog posts with automatic updates
- **📱 Responsive Design**: Mobile-first approach optimized for all devices
- **🔍 SEO Optimized**: Comprehensive SEO implementation with structured data and meta tags
- **⚡ Performance**: Optimized images, lazy loading, and fast builds
- **🎨 Modern UI**: Built with shadcn/ui components and Framer Motion animations

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd lazy-perfectionist

# Install dependencies
npm install

# Set up database
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

🌐 **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📑 Table of Contents

- [📁 Project Structure](#-project-structure)
- [🛠️ Available Scripts](#️-available-scripts)
- [🎨 Design System](#-design-system)
- [🔧 Configuration](#-configuration)
- [📱 Pages](#-pages)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📊 Performance](#-performance)
- [🔍 SEO Optimization](#-seo-optimization)
- [📚 Documentation](#-documentation)
- [🐛 Troubleshooting](#-troubleshooting)
- [📞 Contact](#-contact)

## 📁 Project Structure

```
lazy-perfectionist/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page with hero section
│   │   ├── music/page.tsx     # Music releases page
│   │   ├── blog/page.tsx      # Blog posts page
│   │   ├── store/page.tsx     # Store page (redirects to Ko-fi)
│   │   ├── platform-links/    # Music platform linking page
│   │   ├── layout.tsx         # Root layout with comprehensive SEO metadata
│   │   ├── sitemap.xml/       # Dynamic sitemap generation
│   │   ├── robots.txt/        # SEO robots configuration
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── SEO.tsx           # SEO metadata generation component
│   │   ├── Navigation.tsx    # Site navigation with Ko-fi integration
│   │   ├── Background.tsx    # Background effects and noise texture
│   │   ├── ui/               # shadcn/ui base components
│   │   ├── blog/             # Blog-related components
│   │   └── music/            # Music-related components
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.ts      # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   └── lib/                   # Utilities and configurations
│       ├── utils.ts           # Utility functions (cn helper)
│       ├── db.ts              # Database connection
│       ├── socket.ts          # Socket.IO setup
│       └── analytics.ts       # Analytics tracking utilities
├── public/
│   ├── assets/img/            # Static images
│   │   ├── logo.png          # Main logo with SEO optimization
│   │   ├── logo-handwritten.png # Logo variant for music pages
│   │   └── orbit-cover.jpg   # Album cover
│   ├── logo.svg              # Favicon
│   └── robots.txt            # SEO robots file
├── prisma/
│   └── schema.prisma         # Database schema
├── docs/                     # Documentation
│   ├── seo.md               # Comprehensive SEO implementation guide
│   ├── api_reference.md     # API documentation
│   ├── deployment.md        # Production deployment guide
│   ├── local_deploy.md      # Local development setup
│   ├── local-development.md # Development workflow
│   └── maintenance.md       # Maintenance and updates
├── server.ts                 # Custom Next.js server
├── next.config.ts           # Next.js configuration with image optimization
├── tailwind.config.ts       # Tailwind CSS configuration
├── components.json          # shadcn/ui configuration
└── AGENTS.md               # AI development guidelines
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint (errors ignored during build)
```

### Database
```bash
npm run db:push      # Push schema changes to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database
```

## 🎨 Design System

### Colors & Theme
- **Primary**: Orange/Amber gradient theme
- **Background**: Linktree-style gradient backgrounds
- **Text**: High contrast with readability focus
- **Responsive**: Mobile-first design with breakpoints

### Components
- Built with **shadcn/ui** component library
- **Framer Motion** for animations and transitions
- **Lucide React** for consistent icons
- **Tailwind CSS** for styling

### Typography
- **Geist Sans** and **Geist Mono** fonts from Google Fonts
- Responsive font sizes with proper hierarchy
- Optimized for readability across devices

## 🔧 Configuration

### Next.js Configuration
- Custom server with Socket.IO integration
- Image optimization with remote patterns
- TypeScript with relaxed strict mode
- ESLint errors ignored during builds

### Database
- **SQLite** for development simplicity
- **Prisma ORM** for type-safe database operations
- Auto-generated client for database queries

### Environment Variables
Create `.env.local` for local development:
```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=http://localhost:3000
# SPOTIFY_CLIENT_ID=your_spotify_client_id
# MEDIUM_API_KEY=your_medium_api_key
```

## 📱 Pages

### Home Page (`/`)
- Hero section with background image
- Featured YouTube video embed
- Music section with streaming links
- Blog section with latest posts
- Animated footer with social links

### Music Page (`/music`)
- Album artwork display
- Track listings from Spotify API
- Streaming platform links
- Responsive grid layout

### Blog Page (`/blog`)
- Medium post integration
- Article thumbnails and metadata
- Reading time and publication dates
- Tag-based categorization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on git push

### Docker
```bash
# Build image
docker build -t lazy-perfectionist .

# Run container
docker run -p 3000:3000 lazy-perfectionist
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the code style in `AGENTS.md`
- Use TypeScript for type safety
- Test responsive design on multiple devices
- Keep components reusable and modular

## 📊 Performance

### Optimization Features
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Font Optimization**: Google Fonts with display swap
- **Bundle Analysis**: Built-in webpack bundle analyzer

### Monitoring
- Development logs saved to `dev.log`
- Error tracking with proper error boundaries
- Performance metrics in production builds

## 🔍 SEO Optimization

This website includes comprehensive SEO optimization designed specifically for music artists and content creators.

### 🎯 Key SEO Features
- **🎵 Music Industry SEO**: Specialized meta tags for music discovery platforms
- **📊 Structured Data**: MusicGroup, WebSite, and MusicSong schemas for rich results
- **🗺️ Technical SEO**: Dynamic sitemap, robots.txt, and canonical URLs
- **📱 Social Media**: Optimized Open Graph and Twitter Card integration
- **🎬 Rich Media**: Video schema and thumbnail optimization
- **🌏 Local SEO**: Hong Kong geographic targeting

### 📚 Detailed SEO Documentation
- **[📖 Comprehensive SEO Guide](docs/seo.md)** - Complete implementation guide
- **[⚙️ Google SEO Setup](docs/google-seo-setup.md)** - Step-by-step Google optimization
- **[✅ SEO Setup Checklist](docs/GOOGLE_SEO_CHECKLIST.md)** - Quick deployment checklist
- **[🎵 SEO Examples](docs/seo-examples.md)** - Practical implementation examples

## 📚 Documentation

### 🚀 Getting Started
- **[📖 Local Development Guide](docs/local_deploy.md)** - Set up and run the project locally
- **[🛠️ Development Workflow](docs/local-development.md)** - Development best practices and workflow
- **[📋 Project Overview](docs/README.md)** - Complete documentation overview
- **[📝 Content Contributor Guide](docs/content-guide.md)** - Non-technical content management guide

### 🎨 Development & Features
- **[🔌 API Reference](docs/api_reference.md)** - API endpoints and integration details
- **[🤖 AI Development Guidelines](AGENTS.md)** - Code style guidelines and development conventions

### 🚀 Deployment & Operations
- **[🌐 Deployment Guide](docs/deployment.md)** - Various deployment options and configurations
- **[🔧 Maintenance Guide](docs/maintenance/)** - Ongoing maintenance tasks and procedures
  - **[📅 Daily Tasks](docs/maintenance/daily-tasks.md)** - Quick health checks
  - **[📆 Monthly Tasks](docs/maintenance/monthly-tasks.md)** - Comprehensive maintenance
  - **[🔒 Security & Updates](docs/maintenance/security-updates.md)** - Security procedures

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Build errors:**
- TypeScript errors are ignored during builds
- ESLint warnings don't prevent deployment
- Focus on functionality over strict typing

**Database issues:**
```bash
npm run db:reset
npm run db:generate
```

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Connect & Listen

### 🌐 Online
- **Website**: [lazy-perfectionist.com](https://lazy-perfectionist.com)

### 🎵 Streaming Platforms
- **Spotify**: [Open Spotify](https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8)
- **YouTube**: [YouTube Channel](https://www.youtube.com/watch?v=Hw2a43RV1p0)

### 📝 Social Media
- **Medium**: [@lazyperfectist](https://medium.com/@lazyperfectist)

---

<div align="center">

**🎸 Built with ❤️ for Lazy Perfectionist**

*A bedroom instrumental rock project from Hong Kong 🇭🇰*

[![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)](LICENSE)
[![Website](https://img.shields.io/badge/website-lazy--perfectionist.com-blue?style=flat-square)](https://lazy-perfectionist.com)

</div>