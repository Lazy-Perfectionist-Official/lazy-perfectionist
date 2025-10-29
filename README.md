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
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── globals.css        # Global styles
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.ts      # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   └── lib/                   # Utilities and configurations
│       ├── utils.ts           # Utility functions (cn helper)
│       ├── db.ts              # Database connection
│       └── socket.ts          # Socket.IO setup
├── public/
│   ├── assets/img/            # Static images
│   │   ├── logo.png          # Main logo
│   │   └── orbit-cover.jpg   # Album cover
│   ├── logo.svg              # Favicon
│   └── robots.txt            # SEO robots file
├── prisma/
│   └── schema.prisma         # Database schema
├── docs/                     # Documentation
│   └── local_deploy.md       # Local development guide
├── server.ts                 # Custom Next.js server
├── next.config.ts           # Next.js configuration
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

## 🔍 SEO

### Meta Tags
- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card optimization
- Structured data markup

### Technical SEO
- XML sitemap generation
- Robots.txt configuration
- Canonical URLs
- Proper heading hierarchy

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