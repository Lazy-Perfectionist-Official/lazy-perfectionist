# Lazy Perfectionist

A modern Next.js website for Lazy Perfectionist - a bedroom instrumental rock project based in Hong Kong 🇭🇰. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎵 About

Lazy Perfectionist is a musical project featuring instrumental rock music created in a bedroom studio. The website showcases music releases, blog posts, and provides links to streaming platforms.

### Features

- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Music Integration**: Spotify API integration for track listings
- **Blog Integration**: Medium API integration for blog posts
- **Real-time Features**: Socket.IO for potential live interactions
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Performance**: Optimized images, lazy loading, and fast builds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lazy-perfectionist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (errors ignored during build) |
| `npm run db:push` | Push schema changes to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:reset` | Reset database |

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

### 📊 SEO Features Implemented

#### Metadata Management
- **Dynamic Meta Tags**: Page-specific titles, descriptions, and keywords
- **Open Graph Optimization**: Enhanced social media sharing on Facebook, Instagram
- **Twitter Cards**: Optimized Twitter sharing with rich media
- **Music Industry Tags**: Specialized meta tags for music discovery platforms

#### Structured Data (JSON-LD)
- **MusicGroup Schema**: Artist identity with genres, location, and social links
- **WebSite Schema**: Enhanced search results with action buttons
- **MusicSong Schema**: Individual track optimization for platform pages
- **Rich Results**: Enhanced search appearance with images and details

#### Technical SEO
- **Dynamic Sitemap**: Automatic sitemap.xml generation with proper priorities
- **Robots.txt**: Comprehensive crawling rules for different search engines
- **Canonical URLs**: Prevents duplicate content issues
- **Performance Optimization**: Fast loading with resource hints and preconnect

#### Music Industry SEO
- **Platform Integration**: Spotify, Apple Music, YouTube optimization
- **Local SEO**: Hong Kong geographic targeting
- **Social Media**: Cross-platform optimization and linking
- **Image SEO**: Optimized alt text and structured data

### 🎵 SEO for Musicians

#### Music Discovery
```html
<!-- Music-specific meta tags -->
<meta name="music:artist" content="Lazy Perfectionist">
<meta name="music:genre" content="Instrumental Progressive Rock">
<meta name="music:release_date" content="2025-10-17">
<meta name="music:title" content="Orbit">
```

#### Platform Optimization
- **Spotify**: Rich integration with album art and track metadata
- **YouTube**: Video schema and thumbnail optimization
- **Social Media**: Consistent branding across platforms
- **Streaming Links**: Optimized platform linking page

### 📈 SEO Performance

#### Search Engine Visibility
- **Rich Snippets**: Enhanced search results with structured data
- **Knowledge Panel**: Artist information panels in search results
- **Music Boxes**: Direct music playback in search results
- **Social Previews**: Optimized sharing cards

#### Local SEO
- **Geographic Targeting**: Hong Kong market focus
- **Local Business Schema**: Studio location information
- **Regional Keywords**: Hong Kong music scene optimization

### 🔧 SEO Configuration

#### SEO Component Usage
```typescript
import { generateSEOMetadata, generateStructuredData } from '@/components/SEO'

// Page metadata
export const metadata: Metadata = generateSEOMetadata({
  title: 'Page Title',
  description: 'Optimized description',
  keywords: ['keyword1', 'keyword2'],
  ogType: 'website',
})

// Structured data
const structuredData = generateStructuredData('MusicGroup', {
  name: 'Lazy Perfectionist',
  description: 'Artist description',
  genre: ['Progressive Rock', 'Instrumental'],
})
```

#### Monitoring & Analytics
- **Google Search Console**: Structured data and performance monitoring
- **Page Speed**: Core Web Vitals optimization
- **Mobile Testing**: Mobile-first indexing compliance
- **Accessibility**: WCAG compliance for better user experience

### 📚 SEO Documentation

- **[Comprehensive SEO Guide](docs/seo.md)** - Detailed implementation guide
- **[Technical SEO](docs/seo.md#-technical-seo)** - Sitemap, robots.txt, and optimization
- **[Music Industry SEO](docs/seo.md#-music-industry-seo)** - Music platform optimization
- **[Monitoring & Maintenance](docs/seo.md#-monitoring--analytics)** - Performance tracking

## 📚 Documentation

- **[Local Development Guide](docs/local_deploy.md)** - Detailed setup instructions
- **[AGENTS.md](AGENTS.md)** - AI development guidelines and code style
- **API Documentation** - Available endpoints and usage

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

## 📞 Contact

- **Website**: [lazy-perfectionist.com](https://lazy-perfectionist.com)
- **Spotify**: [Open Spotify](https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8)
- **Medium**: [@lazyperfectist](https://medium.com/@lazyperfectist)
- **YouTube**: [YouTube Channel](https://www.youtube.com/watch?v=Hw2a43RV1p0)

---

Built with ❤️ for Lazy Perfectionist 🎸