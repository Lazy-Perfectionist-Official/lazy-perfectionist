<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# lazy-perfectionist

## Purpose
A modern Next.js website for Lazy Perfectionist - a bedroom instrumental rock project based in Hong Kong 🇭🇰. The website showcases music releases, blog posts, and provides links to streaming platforms with comprehensive SEO optimization and real-time features.

## Key Files

| File | Description |
|------|-------------|
| `package.json` | Project dependencies and scripts for development, building, and database operations |
| `next.config.ts` | Next.js configuration with image optimization, TypeScript settings, and webpack customization |
| `tailwind.config.ts` | Tailwind CSS configuration for the design system |
| `tsconfig.json` | TypeScript configuration with `@/*` path aliases pointing to `./src/*` |
| `server.ts` | Custom Next.js server with Socket.IO integration for real-time features |
| `components.json` | shadcn/ui component library configuration |
| `AGENTS.md` | AI development guidelines and code style conventions |
| `README.md` | Comprehensive project documentation with setup instructions and feature overview |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `src/` | Application source code (see `src/AGENTS.md`) |
| `public/` | Static assets and public files (see `public/AGENTS.md`) |
| `docs/` | Project documentation (see `docs/AGENTS.md`) |
| `prisma/` | Database schema and migrations (see `prisma/AGENTS.md`) |
| `.github/` | GitHub workflows and configuration (see `.github/AGENTS.md`) |
| `changelogs/` | Project changelogs and version history |
| `examples/` | Example implementations and code samples |
| `assets/` | Project assets and resources |
| `db/` | Database-related files and scripts |
| `_layouts/` | Layout templates for documentation |
| `_pages/` | Page templates and configurations |
| `.omc/` | oh-my-claudecode operational artifacts (ignored from git) |

## For AI Agents

### Working In This Directory
- This is a Next.js 15 project with TypeScript and Tailwind CSS
- Uses shadcn/ui component library for consistent UI components
- Prisma ORM with SQLite database for development
- Custom server with Socket.IO for real-time features
- Always install dependencies after modifying `package.json`
- Use `npm run db:generate` after modifying Prisma schema
- Restart development server after environment variable changes

### Development Commands
```bash
# Development
npm run dev          # Start development server with nodemon and hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint (errors ignored during builds)

# Database operations
npm run db:push      # Push schema changes to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database
```

### Testing Requirements
- Test responsive design on multiple devices (mobile-first approach)
- Verify SEO metadata and structured data implementation
- Test Spotify API integration for music features
- Verify Medium API integration for blog functionality
- Check Socket.IO real-time features
- Ensure proper error handling for API failures

### UI/UX Verification Routing (docs/UI-UX-VERIFICATION-PROPOSAL.md)
Route each judgment to the evaluator that can actually make it:
- **Countable** (DOM facts, sizes, roles, tokens) → Playwright suites (`npm run test:pipeline`, `test:a11y`)
- **Visual design quality** (hierarchy, spacing, affordances) → `npm run test:judge` (advisory MLLM lane; report in `reports/judge/latest.md`; never a gate, never blocks a commit)
- **Taste** (does it look good / solve the problem) → human

Judge findings are leads, not verdicts: reproduce anything real as a deterministic test before fixing.

### Common Patterns
- **Path Aliases**: Use `@/*` imports (e.g., `@/components/ui/*`, `@/lib/utils`)
- **Component Structure**: shadcn/ui patterns for component organization
- **Styling**: Use `cn()` utility for Tailwind class merging
- **Validation**: Use Zod for schema validation
- **Database**: Use Prisma client for type-safe database operations
- **Error Handling**: Implement try-catch for async operations, especially API calls and database operations

### Code Style Guidelines
- **TypeScript**: Strict mode enabled but `noImplicitAny: false` for flexibility
- **Imports**: React → Next.js → Third-party → Local components/utils
- **Components**: PascalCase naming, separate files for major components
- **Utilities**: kebab-case for utility files
- **ESLint**: Relaxed rules, errors ignored during builds
- **Performance**: Focus on functionality over strict type enforcement

## Dependencies

### External
- **Next.js 15.x** - React framework with App Router
- **React 19.x** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS 4.x** - Styling framework
- **shadcn/ui** - Component library (Radix UI primitives)
- **Prisma 6.x** - Database ORM
- **Socket.IO** - Real-time communication
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching

### Internal
- Database operations via Prisma client
- Custom utilities in `src/lib/`
- Shared UI components in `src/components/ui/`
- Custom hooks in `src/hooks/`
- API routes in `src/app/api/`

## Project Structure Overview

This is a **Next.js App Router** project with the following key features:
- **🎵 Music Integration**: Spotify API for track listings and streaming platform links
- **📝 Blog Integration**: Medium API for automatic blog post updates
- **📱 Responsive Design**: Mobile-first approach optimized for all devices
- **🔍 SEO Optimized**: Comprehensive SEO with structured data, dynamic sitemaps, and meta tags
- **⚡ Performance**: Image optimization, lazy loading, and code splitting
- **🎨 Modern UI**: shadcn/ui components with Framer Motion animations
- **🔌 Real-time**: Socket.IO integration for live features

## Architecture Notes

### Next.js Configuration
- TypeScript build errors are ignored (`ignoreBuildErrors: true`)
- ESLint errors ignored during builds (`ignoreDuringBuilds: true`)
- Custom server with nodemon for development
- Image optimization configured for Spotify, Medium, and Ko-fi domains
- Webpack hot module replacement disabled in favor of nodemon

### Database Strategy
- SQLite for development simplicity
- Prisma ORM for type-safe database operations
- Auto-generated client for database queries
- Migration-based schema evolution

### Environment Variables
Create `.env.local` for local development with API keys and configuration.

## Build & Deployment
- **Development**: `npm run dev` with nodemon and hot reload
- **Production**: `npm run build` then `npm start`
- **Deployment**: Optimized for Vercel but supports Docker and manual deployment
- **Monitoring**: Development logs saved to `dev.log`

<!-- MANUAL: The following content was preserved from the original AGENTS.md -->

## Development Commands (Legacy Reference)

### Build & Development
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (build ignores errors)

## Database
- `npm run db:push` - Push schema to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run migrations
- `npm run db:reset` - Reset database

## Code Style Guidelines

### Imports & Structure
- Use `@/*` path aliases (configured in tsconfig.json)
- Components: `@/components/ui/*` for shadcn/ui, `@/components/*` for custom
- Utils: `@/lib/utils`, Hooks: `@/hooks/*`
- Import order: React → Next.js → Third-party → Local components/utils

### TypeScript & Formatting
- Strict mode enabled but `noImplicitAny: false`
- Use `cn()` utility for Tailwind class merging
- Follow shadcn/ui patterns for component structure
- ESLint rules are relaxed (many rules disabled)

### Naming Conventions
- Components: PascalCase
- Files: kebab-case for utilities, PascalCase for components
- Use Zod for validation/schemas
- Prisma for database operations

### Error Handling
- TypeScript errors ignored during builds (`ignoreBuildErrors: true`)
- ESLint errors ignored during builds
- Use try-catch for async operations, especially database calls