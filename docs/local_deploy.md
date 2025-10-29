# Local Development Deployment Guide

This guide will help you set up and run the Lazy Perfectionist website locally for development and testing.

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

## Initial Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd lazy-perfectionist
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
This project uses Prisma with SQLite database:

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

## Development Server

### Start Development Server
```bash
npm run dev
```

The development server will:
- Start on **http://localhost:3000**
- Use **nodemon** for automatic restarts on file changes
- Watch for changes in `server.ts` and `src/` directories
- Log output to both console and `dev.log` file

### Access Your Site
Open your browser and navigate to:
- **Main site**: http://localhost:3000
- **Music page**: http://localhost:3000/music
- **Blog page**: http://localhost:3000/blog

### Hot Reload Features
- **Auto-restart**: Server restarts automatically when you modify:
  - `server.ts`
  - Any files in `src/` directory (`.ts`, `.tsx`, `.js`, `.jsx`)
- **Fast Refresh**: React components update without full page reload
- **Asset Updates**: Images and static files update immediately

## Production Build

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

The production server will run on **http://localhost:3000** with optimized builds.

## Available Scripts

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

## Project Structure

```
lazy-perfectionist/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── page.tsx         # Home page
│   │   ├── music/page.tsx   # Music page
│   │   ├── blog/page.tsx    # Blog page
│   │   └── layout.tsx       # Root layout
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utilities and database
├── public/
│   └── assets/img/          # Static images (logo.png, orbit-cover.jpg)
├── prisma/
│   └── schema.prisma        # Database schema
├── server.ts                # Custom Next.js server with Socket.IO
└── docs/
    └── local_deploy.md      # This file
```

## Features

### Custom Server Setup
- **Socket.IO** integration for real-time features
- **Custom server** configuration in `server.ts`
- **Development logging** to `dev.log` file

### Static Assets
- Images served from `public/assets/img/`
- Logo: `/assets/img/logo.png`
- Orbit cover: `/assets/img/orbit-cover.jpg`

### Database
- **SQLite** database (`db/custom.db`)
- **Prisma ORM** for database operations
- Auto-generated client for type safety

## Troubleshooting

### Port Already in Use
If port 3000 is occupied:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port (modify server.ts)
```

### Database Issues
```bash
# Reset database
npm run db:reset

# Regenerate client
npm run db:generate
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
- TypeScript errors are ignored during builds (`ignoreBuildErrors: true`)
- ESLint errors are ignored during builds
- Focus on functionality, strict type checking is relaxed

## Development Tips

1. **Watch the console**: Development logs are displayed in real-time
2. **Check dev.log**: All output is also saved to `dev.log`
3. **Use browser dev tools**: Inspect elements and debug React components
4. **Test responsive design**: Use browser dev tools to test different screen sizes
5. **Database changes**: Remember to run `npm run db:push` after schema changes

## API Endpoints

The project includes API endpoints (if implemented):
- `/api/spotify` - Spotify data integration
- `/api/medium` - Medium blog integration

These endpoints are used by the music and blog pages to fetch dynamic content.

## Environment Variables

Create a `.env.local` file for environment-specific variables:
```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Deployment Notes

This project is configured for:
- **Vercel deployment** (see `vercel.json`)
- **Docker support** (see `.dockerignore`)
- **Production optimizations** in `next.config.ts`

For production deployment, ensure all environment variables are properly configured and you database is set up for your hosting platform.