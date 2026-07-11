# Environment Setup Guide

This guide provides comprehensive instructions for setting up the Lazy Perfectionist website environment across different platforms and deployment scenarios.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Production Environment Configuration](#production-environment-configuration)
3. [Platform-Specific Setup](#platform-specific-setup)
4. [Environment Variables Reference](#environment-variables-reference)
5. [Security Best Practices](#security-best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites

- Node.js 18+ installed
- Git installed
- PostgreSQL (optional, for production-like development)

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd lazy-perfectionist
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Required Variables**

   Edit `.env.local` and configure:
   ```env
   NODE_ENV=development
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```

   Copy the output to `NEXTAUTH_SECRET` in `.env.local`

6. **Set Up Database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push database schema
   npx prisma db push

   # (Optional) Seed database
   npx prisma db seed
   ```

7. **Start Development Server**
   ```bash
   npm run dev
   ```

### Optional API Setup

#### Spotify API (Optional)

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Copy `Client ID` and `Client Secret` to `.env.local`:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_ARTIST_ID=your_artist_id
   ```
4. Add redirect URI: `http://localhost:3000/api/auth/callback/spotify`

#### Song.link API (Optional)

1. Get API key from [Song.link](https://api.song.link/)
2. Add to `.env.local`:
   ```env
   SONGLINK_API_KEY=your_api_key
   ```

---

## Production Environment Configuration

### Production Environment Variables

Create `.env.production` for production builds:

```env
# Node Environment
NODE_ENV=production

# Database (PostgreSQL recommended)
DATABASE_URL="postgresql://user:password@host:port/database"

# Site URLs
NEXT_PUBLIC_BASE_URL=https://lazyperfectionist.com
NEXT_PUBLIC_SITE_URL=https://lazyperfectionist.com

# NextAuth
NEXTAUTH_URL=https://lazyperfectionist.com
NEXTAUTH_SECRET=your_production_secret_here

# Spotify (Production credentials)
SPOTIFY_CLIENT_ID=your_production_client_id
SPOTIFY_CLIENT_SECRET=your_production_client_secret
SPOTIFY_ARTIST_ID=your_artist_id

# Optional
SONGLINK_API_KEY=your_songlink_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Production Database Setup

#### Option 1: Vercel Postgres (Recommended for Vercel)

```bash
# Install Vercel Postgres
npm install @vercel/postgres

# Link to Vercel project
vercel link

# Create Postgres database
vercel postgres create

# Follow prompts to get DATABASE_URL
# Add to Vercel environment variables
```

#### Option 2: Supabase

```bash
# Create Supabase project at https://supabase.com
# Get connection string from project settings

# Update .env.production
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"

# Run migrations
npx prisma migrate deploy
npx prisma generate
```

#### Option 3: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# Create PostgreSQL database
railway add postgresql

# Get DATABASE_URL from Railway dashboard
```

---

## Platform-Specific Setup

### Vercel Deployment

#### Automatic Deployment

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository

2. **Configure Environment Variables**

   In Vercel Dashboard > Settings > Environment Variables:
   ```
   DATABASE_URL (from Vercel Postgres or external)
   NEXTAUTH_SECRET (generate with openssl)
   NEXTAUTH_URL=https://your-domain.com
   SPOTIFY_CLIENT_ID
   SPOTIFY_CLIENT_SECRET
   SPOTIFY_ARTIST_ID
   ```

3. **Deploy**
   ```bash
   # Push to main branch for automatic deployment
   git push origin main

   # Or deploy manually
   vercel --prod
   ```

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Docker Deployment

#### Dockerfile Setup

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
      - SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=lazy_perfectionist
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Build and Run

```bash
# Build image
docker build -t lazy-perfectionist .

# Run with Docker Compose
docker-compose up -d

# Run standalone
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  lazy-perfectionist
```

### VPS/Server Deployment

#### Prerequisites

- Ubuntu 20.04+ or similar
- Node.js 18+
- Nginx
- PM2

#### Setup Steps

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd lazy-perfectionist
   npm install --production
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Set Up PM2**
   ```bash
   # Install PM2
   sudo npm install -g pm2

   # Create ecosystem.config.js
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'lazy-perfectionist',
       script: 'node',
       args: 'server.js',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   EOF

   # Start application
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `production` | Yes |
| `DATABASE_URL` | Database connection string | `postgresql://...` | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | `openssl rand -base64 32` | Yes |
| `NEXTAUTH_URL` | NextAuth URL | `https://domain.com` | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | `https://domain.com` | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL for metadata | `https://domain.com` | Yes |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SPOTIFY_CLIENT_ID` | Spotify API client ID | `abc123...` |
| `SPOTIFY_CLIENT_SECRET` | Spotify API secret | `xyz789...` |
| `SPOTIFY_ARTIST_ID` | Spotify artist ID | `artist_id` |
| `SONGLINK_API_KEY` | Song.link API key | `key_123...` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | `https://...` |
| `ENABLE_ANALYTICS` | Enable analytics features | `true` |
| `ENABLE_COMMENTS` | Enable comments feature | `false` |

---

## Security Best Practices

### Secret Management

1. **Never Commit Secrets**
   ```bash
   # Add to .gitignore
   .env.local
   .env.production
   .env.development
   *.key
   ```

2. **Generate Secure Secrets**
   ```bash
   # NextAuth Secret
   openssl rand -base64 32

   # Generic secret
   openssl rand -hex 32
   ```

3. **Use Different Secrets per Environment**
   - Development secrets ≠ Production secrets
   - Rotate secrets regularly

4. **Secret Management Services**
   - **Vercel**: Built-in environment variables
   - **AWS**: AWS Secrets Manager
   - **GitHub**: GitHub Secrets (for CI/CD)

### Environment-Specific Security

#### Development
- Use local `.env.local` file
- Test with non-production credentials
- Enable verbose logging

#### Production
- Use platform-specific secret management
- Enable minimal logging
- Rotate API keys regularly
- Monitor for unauthorized access

### API Security

1. **Rotate API Keys**
   ```bash
   # Schedule regular key rotation
   # Update environment variables
   # Restart application
   ```

2. **Monitor Usage**
   - Check API usage metrics
   - Set up alerts for unusual activity
   - Review access logs

3. **Secure Endpoints**
   - Use rate limiting
   - Implement CORS properly
   - Validate all inputs

---

## Troubleshooting

### Common Issues

#### Database Connection Issues

**Problem**: `Error: Cannot connect to database`

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Ensure network connectivity
4. Run `npx prisma generate` after schema changes

#### Environment Variables Not Loading

**Problem**: `undefined` for environment variables

**Solutions**:
1. Ensure `.env.local` exists in root directory
2. Restart development server after changes
3. Check variable names match exactly
4. Verify no typos in variable names

#### Build Failures in Production

**Problem**: Build fails with missing environment variables

**Solutions**:
1. Ensure all required variables are set
2. Check platform-specific environment configuration
3. Verify variable names are correct (case-sensitive)
4. Check for trailing spaces in values

#### NextAuth Issues

**Problem**: Authentication fails

**Solutions**:
1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Ensure callback URLs are configured
4. Clear browser cookies and retry

### Debug Mode

Enable debug mode for troubleshooting:

```env
# .env.local
DEBUG=true
LOG_LEVEL=debug
```

### Health Check

Test your setup:

```bash
# Check database connection
npx prisma db push

# Test build locally
npm run build

# Test production build
npm run start

# Run health checks
curl http://localhost:3000/api/health
```

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Database Setup](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)

---

**Last Updated**: 2026-07-12
**Version**: 1.0.0
