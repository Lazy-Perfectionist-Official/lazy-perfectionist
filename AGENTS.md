# Development Commands

## Build & Development
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