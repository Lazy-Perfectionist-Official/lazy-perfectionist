<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# src

## Purpose
Application source code directory containing all frontend and backend logic for the Next.js application. This is the main development directory with components, pages, API routes, utilities, and configuration.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | All source files are organized in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router with pages, layouts, and API routes (see `src/app/AGENTS.md`) |
| `components/` | Reusable React components (see `src/components/AGENTS.md`) |
| `hooks/` | Custom React hooks (see `src/hooks/AGENTS.md`) |
| `lib/` | Utility functions and configurations (see `src/lib/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- This is the **main development directory** for the application
- Contains **all application code** except configuration files
- **Next.js App Router** structure with pages and API routes
- **React components** organized by feature and reusability
- **TypeScript** with strict mode and `@/*` path aliases

### Project Structure

#### App Router Architecture
- **File-based routing** with page.tsx files
- **Layouts** for shared UI and structure
- **API routes** in `app/api/` directory
- **Server and client components** separation
- **Shared styles** in globals.css

#### Component Organization
- **Reusable components** in components/ directory
- **Feature-specific components** in subdirectories
- **UI components** from shadcn/ui library
- **Shared components** for common functionality
- **Page-specific components** co-located with pages

### Testing Requirements
- **Test all components** in isolation and integration
- **Verify API routes** with proper error handling
- **Check responsive behavior** across different screen sizes
- **Validate TypeScript types** and prevent errors
- **Test all hooks** with various use cases

### Common Patterns
- **Use `@/*` imports** for internal modules
- **Server components** by default, client components when needed
- **Proper TypeScript typing** for all functions and components
- **Error boundaries** for graceful error handling
- **Loading states** for better user experience

### Development Guidelines
- **Follow Next.js conventions** for App Router
- **Use semantic HTML** for better accessibility
- **Implement proper SEO** with metadata and structured data
- **Optimize performance** with code splitting and lazy loading
- **Maintain consistency** across components and pages

## Dependencies

### Internal
- All application code resides within this directory
- Configuration files in root directory
- Static assets in `public/` directory
- Database schema in `prisma/` directory

### External
- **Next.js 15.x** - React framework with App Router
- **React 19.x** - UI library
- **TypeScript 5.x** - Type safety
- **Prisma** - Database ORM
- **Radix UI** - Component primitives via shadcn/ui

## Code Organization

### App Router Structure
```
app/
├── api/              # API routes
├── music/            # Music pages
├── blog/             # Blog pages
├── store/            # Store page
├── platform-links/   # Platform linking
├── layout.tsx        # Root layout
├── page.tsx          # Home page
└── globals.css       # Global styles
```

### Component Structure
```
components/
├── ui/               # shadcn/ui components
├── blog/             # Blog-related components
├── music/            # Music-related components
└── [Shared components]
```

## Development Practices

### TypeScript Usage
- **Strict mode** enabled but `noImplicitAny: false`
- **Type definitions** for all functions and components
- **Proper interface** definitions for props and data
- **Generic types** for reusable components
- **Type exports** for library-like modules

### React Patterns
- **Server components** by default for better performance
- **Client components** only when needed (state, effects, browser APIs)
- **Composition** over complex inheritance
- **Custom hooks** for reusable logic
- **Error boundaries** for graceful error handling

### Performance Optimization
- **Code splitting** with dynamic imports
- **Image optimization** with Next.js Image component
- **Lazy loading** for below-the-fold content
- **Memoization** for expensive computations
- **Server actions** for data mutations

## Best Practices

### Code Quality
- **Consistent formatting** across all files
- **Proper error handling** in all async operations
- **Type safety** without over-engineering
- **Clear naming** for files, variables, and functions
- **Comments** for complex logic only

### Component Design
- **Single responsibility** for each component
- **Reusable components** with proper props
- **Composition** over complex components
- **Proper prop types** and validation
- **Accessibility** considerations

### API Development
- **Proper HTTP methods** for different operations
- **Error handling** with appropriate status codes
- **Input validation** before processing
- **Type-safe responses** with proper interfaces
- **Rate limiting** considerations for production

## File Conventions

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: kebab-case (e.g., `date-utils.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useUserData.ts`)
- **API routes**: camelCase (e.g., `user-profile/route.ts`)
- **Types**: PascalCase interfaces/types

### File Organization
- **Co-locate** related files when possible
- **Group by feature** rather than type
- **Keep files focused** on single responsibilities
- **Use barrel exports** for cleaner imports
- **Separate concerns** (UI, logic, styles)

## Security Considerations

### API Security
- **Input validation** on all API routes
- **Output sanitization** to prevent XSS
- **Proper authentication** for protected routes
- **Rate limiting** for public endpoints
- **SQL injection prevention** via ORM

### Client Security
- **XSS prevention** with proper data handling
- **CSRF protection** for state-changing operations
- **Content Security Policy** headers
- **Secure cookie handling**
- **Environment variable protection**

## Troubleshooting

### Common Issues
- **Import errors**: Check path aliases and file extensions
- **Type errors**: Verify TypeScript configuration and types
- **Build failures**: Check for circular dependencies and syntax errors
- **Runtime errors**: Review error boundaries and async handling
- **Performance issues**: Profile and optimize critical paths

### Debugging Approaches
- **Use TypeScript** for compile-time error detection
- **React DevTools** for component debugging
- **Next.js dev server** for hot reload and error overlay
- **Browser DevTools** for network and console debugging
- **Logging** for server-side issues

<!-- MANUAL: Source code organization and development notes -->