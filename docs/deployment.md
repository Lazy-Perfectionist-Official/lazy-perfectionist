# Deployment Guide

This guide covers various deployment options for the Lazy Perfectionist website.

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment experience for Next.js applications.

#### Prerequisites
- Vercel account
- Connected Git repository

#### Steps

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Root Directory**
   ```bash
   cd lazy-perfectionist
   vercel
   ```

4. **Configure Environment Variables**
   ```bash
   vercel env add SPOTIFY_CLIENT_ID
   vercel env add SPOTIFY_CLIENT_SECRET
   vercel env add MEDIUM_API_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Automatic Deployment
Connect your repository to Vercel dashboard for automatic deployments on git push.

### 2. Docker Deployment

#### Building the Image
```bash
# Build Docker image
docker build -t lazy-perfectionist .

# Tag for registry
docker tag lazy-perfectionist your-username/lazy-perfectionist:latest
```

#### Running the Container
```bash
# Development
docker run -p 3000:3000 lazy-perfectionist

# Production with environment variables
docker run -p 3000:3000 \
  -e SPOTIFY_CLIENT_ID=your_client_id \
  -e SPOTIFY_CLIENT_SECRET=your_client_secret \
  -e NODE_ENV=production \
  lazy-perfectionist
```

#### Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
      - SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

### 3. Traditional VPS/Server

#### Prerequisites
- Node.js 18+
- PM2 (Process Manager)
- Nginx (optional, for reverse proxy)

#### Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd lazy-perfectionist
   ```

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Set Up PM2**
   ```bash
   # Install PM2 globally
   npm install -g pm2

   # Create PM2 config file
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'lazy-perfectionist',
       script: 'npm',
       args: 'start',
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

5. **Configure Nginx (Optional)**
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

### 4. Netlify

#### Static Export Setup

1. **Update next.config.ts**
   ```typescript
   const nextConfig: NextConfig = {
     // ... existing config
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };
   ```

2. **Build and Export**
   ```bash
   npm run build
   ```

3. **Deploy to Netlify**
   - Upload the `out` directory to Netlify
   - Configure redirects for API routes if needed

## Environment Variables

### Required Variables

```env
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Medium API
MEDIUM_API_KEY=your_medium_api_key
MEDIUM_USERNAME=lazyperfectist

# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Custom domains
NEXT_PUBLIC_DOMAIN=your-domain.com

# Feature flags
ENABLE_ANALYTICS=true
ENABLE_COMMENTS=false
```

## Database Setup

### Production Database

For production, consider upgrading from SQLite:

#### PostgreSQL (Recommended)
1. **Update Prisma Schema**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Set Database URL**
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

#### Database Providers
- **Vercel Postgres**: Managed PostgreSQL
- **Supabase**: PostgreSQL with real-time features
- **PlanetScale**: MySQL-compatible serverless database
- **Railway**: Simple PostgreSQL hosting

## Performance Optimization

### Build Optimizations

1. **Bundle Analysis**
   ```bash
   npm run build
   npx @next/bundle-analyzer
   ```

2. **Image Optimization**
   - Use Next.js Image component
   - Configure remote domains in `next.config.ts`
   - Enable AVIF format support

3. **Code Splitting**
   - Dynamic imports for large components
   - Route-based code splitting (automatic)

### Caching Strategy

1. **Browser Caching**
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     async headers() {
       return [
         {
           source: '/assets/:path*',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable'
             }
           ]
         }
       ];
     }
   };
   ```

2. **CDN Configuration**
   - Configure CDN for static assets
   - Enable gzip compression
   - Set up edge caching

## Monitoring and Analytics

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure Sentry**
   ```typescript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs';

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
   });
   ```

### Performance Monitoring

1. **Web Vitals**
   ```typescript
   // pages/_app.tsx
   export function reportWebVitals(metric: NextWebVitalsMetric) {
     // Send to analytics service
   }
   ```

2. **Analytics Setup**
   - Google Analytics 4
   - Vercel Analytics
   - Custom analytics solution

## Security Considerations

### HTTPS/SSL
- Always use HTTPS in production
- Configure SSL certificates
- Set up HSTS headers

### Security Headers
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### Environment Security
- Never commit `.env.local` files
- Use secret management services
- Rotate API keys regularly
- Monitor for unauthorized access

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Runtime Errors**
   - Check environment variables
   - Verify database connection
   - Review server logs

3. **Performance Issues**
   - Analyze bundle size
   - Check image optimization
   - Monitor API response times

### Debugging Tools

```bash
# Build analysis
npm run build
npx @next/bundle-analyzer

# Performance testing
npm install -g lighthouse
lighthouse https://your-domain.com

# Health check
curl https://your-domain.com/api/health
```

## Maintenance

### Regular Tasks

1. **Updates**
   ```bash
   # Check for outdated packages
   npm outdated
   
   # Update dependencies
   npm update
   ```

2. **Backups**
   - Regular database backups
   - Asset backups
   - Configuration backups

3. **Monitoring**
   - Uptime monitoring
   - Performance metrics
   - Error tracking

### Scaling Considerations

- Load balancing for high traffic
- Database read replicas
- CDN for global distribution
- Serverless functions for API routes

## Support

For deployment issues:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review platform-specific documentation
3. Check the troubleshooting section above
4. Contact hosting provider support if needed