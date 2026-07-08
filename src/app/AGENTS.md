<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# app

## Purpose
Next.js App Router directory containing all pages, layouts, API routes, and route-level configurations. Implements the file-based routing system with server and client components.

## Key Files

| File | Description |
|------|-------------|
| `layout.tsx` | Root layout with SEO metadata and global structure |
| `page.tsx` | Home page with hero section and featured content |
| `page.tsx.backup` | Backup of previous home page implementation |
| `HomePage.tsx` | Main home page component with rich content |
| `globals.css` | Global CSS styles and Tailwind imports |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `api/` | API routes for backend functionality (see `src/app/api/AGENTS.md`) |
| `music/` | Music-related pages and features (see `src/app/music/AGENTS.md`) |
| `blog/` | Blog and content pages (see `src/app/blog/AGENTS.md`) |
| `store/` | Store and commerce pages (see `src/app/store/AGENTS.md`) |
| `platform-links/` | Music platform linking functionality (see `src/app/platform-links/AGENTS.md`) |
| `sitemaps/` | Dynamic sitemap generation (see `src/app/sitemaps/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- **Next.js App Router** with file-based routing
- **Server components** by default for optimal performance
- **Client components** marked with `'use client'` directive
- **API routes** in `api/` subdirectory
- **Shared layouts** for consistent UI structure

### App Router Architecture

#### File-Based Routing
- **page.tsx** files create routes at their directory path
- **layout.tsx** files create UI wrappers for child routes
- **loading.tsx** files for loading states
- **error.tsx** files for error boundaries
- **not-found.tsx** files for 404 pages

#### Server vs Client Components
- **Server components** by default (better performance, SEO)
- **Client components** only when needed (state, effects, browser APIs)
- **Mixed patterns** with client components importing server components
- **Proper `'use client'` directive** for client components
- **Component composition** for optimal architecture

### Testing Requirements
- **Test all pages** render correctly with various data states
- **Verify responsive behavior** on different screen sizes
- **Check SEO metadata** renders properly
- **Test API routes** with various inputs and error conditions
- **Validate layouts** wrap child content correctly

### Common Patterns
- **Server components** for data fetching and static content
- **Client components** for interactive features
- **Proper error handling** with error boundaries
- **Loading states** for better UX
- **SEO optimization** with metadata and structured data

### Development Guidelines
- **Use semantic HTML** for better accessibility and SEO
- **Optimize images** with Next.js Image component
- **Implement proper error handling** for user-facing features
- **Loading states** for async operations
- **Responsive design** with mobile-first approach

## Dependencies

### Internal
- Uses components from `src/components/`
- Imports utilities from `src/lib/`
- Uses custom hooks from `src/hooks/`
- References database via Prisma client

### External
- **Next.js 15.x** - App Router and routing features
- **React 19.x** - Component library
- **Prisma** - Database access via `src/lib/db.ts`
- **Radix UI** - Component primitives

## Route Structure

### Public Pages
- **/** - Home page with hero and featured content
- **/music** - Music releases and streaming links
- **/blog** - Blog posts and articles
- **/store** - Store and merchandise (redirects to Ko-fi)
- **/platform-links** - Music platform linking

### API Routes
- **/api/health** - Health check endpoint
- **/api/spotify/** - Spotify integration endpoints
- **/api/medium** - Medium blog integration
- **/api/platform-links** - Platform link management
- **/api/analytics** - Analytics tracking

### Special Routes
- **/sitemap.xml** - Dynamic sitemap generation
- **/robots.txt** - SEO robots configuration
- **/api/** - API route handlers

## Page Components

### Home Page (`page.tsx`, `HomePage.tsx`)
- **Hero section** with background effects
- **Featured content** and call-to-action
- **Music section** with latest releases
- **Blog section** with recent posts
- **Responsive design** with mobile optimization

### Layout System (`layout.tsx`)
- **Root layout** with global structure
- **SEO metadata** and Open Graph tags
- **Navigation and footer** components
- **Global styles** and fonts
- **Error boundaries** for graceful degradation

## API Development

### Route Handlers
- **Route handlers** in `route.ts` files
- **HTTP methods** (GET, POST, PUT, DELETE)
- **Request validation** with Zod schemas
- **Error handling** with proper status codes
- **Type-safe responses** with TypeScript

### Best Practices
- **REST conventions** for API design
- **Proper HTTP methods** for different operations
- **Input validation** before processing
- **Error responses** with helpful messages
- **Rate limiting** considerations

## SEO Implementation

### Metadata
- **Dynamic metadata** based on route content
- **Open Graph tags** for social sharing
- **Twitter Card tags** for Twitter previews
- **Canonical URLs** for duplicate content
- **Structured data** for rich results

### Performance
- **Server-side rendering** for SEO-critical pages
- **Image optimization** with Next.js Image
- **Code splitting** for optimal loading
- **Font optimization** with next/font
- **Lazy loading** for below-the-fold content

## Styling

### Global Styles (`globals.css`)
- **Tailwind CSS** imports and configuration
- **Custom CSS variables** for theming
- **Global utility classes**
- **Responsive design** breakpoints
- **Animation and transition** styles

### Component Styling
- **Tailwind classes** for component styling
- **CSS modules** for scoped styles when needed
- **Responsive utilities** for mobile design
- **Dark mode support** if applicable
- **Animation libraries** (Framer Motion)

## Best Practices

### File Organization
- **Co-locate** related files with routes
- **Group by feature** rather than file type
- **Keep route files** focused on single purpose
- **Use descriptive filenames** for clarity
- **Separate concerns** (UI, logic, styles)

### Performance
- **Server components** by default
- **Code splitting** with dynamic imports
- **Image optimization** with Next.js Image
- **Lazy loading** for heavy components
- **Proper caching** strategies

### Accessibility
- **Semantic HTML** structure
- **ARIA attributes** where needed
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** for readability

## Troubleshooting

### Common Issues
- **Routes not working**: Check file structure and naming
- **Server component errors**: Verify no client-only APIs are used
- **Build failures**: Check for circular dependencies
- **SEO not rendering**: Verify metadata and structured data
- **Performance issues**: Profile and optimize critical routes

### Debugging Steps
1. **Check file structure** matches intended routes
2. **Verify component types** (server vs client)
3. **Review error boundaries** and error handling
4. **Test with Next.js dev server** for hot reload
5. **Validate HTML output** for proper rendering

<!-- MANUAL: App Router-specific notes and route configurations -->