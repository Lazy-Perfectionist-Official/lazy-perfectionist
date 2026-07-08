<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# components

## Purpose
Reusable React components organized by feature and functionality. Contains UI components, feature-specific components, and shared components used throughout the application.

## Key Files

| File | Description |
|------|-------------|
| `SEO.tsx` | SEO metadata generation component with structured data |
| `Navigation.tsx` | Site navigation with menu and Ko-fi integration |
| `Background.tsx` | Background effects and noise texture components |
| `ArtistTimeline.tsx` | Timeline component for artist milestones and events |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `ui/` | shadcn/ui base components (see `src/components/ui/AGENTS.md`) |
| `blog/` | Blog-related components (see `src/components/blog/AGENTS.md`) |
| `music/` | Music-related components (see `src/components/music/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- **Reusable components** for consistent UI and functionality
- **Feature-based organization** for logical grouping
- **shadcn/ui components** for consistent design system
- **Server and client components** properly marked
- **TypeScript props** for type safety

### Component Architecture

#### Component Types
- **UI components** in `ui/` directory (shadcn/ui)
- **Feature components** organized by domain (blog, music, etc.)
- **Shared components** for cross-cutting concerns
- **Layout components** for page structure
- **Utility components** for common functionality

#### Server vs Client Components
- **Server components** by default for better performance
- **Client components** marked with `'use client'` directive
- **Interactive components** requiring client-side rendering
- **Form components** with user input handling
- **Animation components** using browser APIs

### Testing Requirements
- **Test components** in isolation and integration
- **Verify responsive behavior** across screen sizes
- **Check accessibility** with screen readers
- **Test error states** and loading conditions
- **Validate props** and component contracts

### Common Patterns
- **Composition over inheritance** for component design
- **Proper TypeScript interfaces** for component props
- **Consistent naming conventions** for clarity
- **Reusable patterns** across similar components
- **Proper error boundaries** for error handling

### Development Guidelines
- **Keep components focused** on single responsibilities
- **Use proper TypeScript** for type safety
- **Implement accessibility** features (ARIA, keyboard navigation)
- **Optimize performance** with memoization when needed
- **Maintain consistent styling** with design system

## Component Categories

### Shared Components

#### SEO Component (`SEO.tsx`)
- **Dynamic metadata** generation for pages
- **Structured data** for rich search results
- **Open Graph tags** for social sharing
- **Twitter Card tags** for Twitter previews
- **Canonical URLs** for duplicate content prevention

#### Navigation Component (`Navigation.tsx`)
- **Site navigation** with menu items
- **Ko-fi integration** for support button
- **Mobile-responsive** menu design
- **Active state** management
- **Accessibility** features for keyboard navigation

#### Background Component (`Background.tsx`)
- **Noise texture** overlay effects
- **Gradient backgrounds** for visual appeal
- **Performance optimized** rendering
- **Responsive behavior** across devices
- **CSS-based animations** for smooth effects

### Feature Components

#### Blog Components (`blog/`)
- **Blog post cards** with thumbnails and metadata
- **Blog listing** components with filters
- **Article content** rendering with markdown
- **Reading time** estimation
- **Tag and category** management

#### Music Components (`music/`)
- **Music player** integration with Spotify
- **Album artwork** display components
- **Track listings** with metadata
- **Platform link** buttons and cards
- **Artist information** components

#### UI Components (`ui/`)
- **Button components** with various styles
- **Form components** (inputs, selects, checkboxes)
- **Modal and dialog** components
- **Navigation components** (menus, tabs, breadcrumbs)
- **Data display** components (tables, cards, lists)

## Dependencies

### Internal
- Used by pages in `src/app/`
- Imports utilities from `src/lib/`
- Uses custom hooks from `src/hooks/`
- References types and interfaces from project

### External
- **React 19.x** - Component library
- **Radix UI** - Component primitives via shadcn/ui
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling framework

## Component Design Patterns

### Props Interface Design
- **TypeScript interfaces** for component props
- **Optional props** with proper defaults
- **Props validation** with TypeScript types
- **Children props** for flexible composition
- **Event handlers** with proper typing

### State Management
- **Local component state** for UI-specific state
- **Global state** via Zustand when needed
- **Server state** via TanStack Query for API data
- **URL state** for routing and filters
- **Form state** with React Hook Form

### Styling Approach
- **Tailwind CSS** classes for styling
- **cn() utility** for conditional classes
- **CSS modules** for complex component styles
- **Responsive utilities** for mobile design
- **Animation libraries** for motion design

## Best Practices

### Component Design
- **Single responsibility** principle
- **Reusable and composable** design
- **Proper TypeScript** typing
- **Accessibility** considerations
- **Performance optimization**

### Code Organization
- **Logical grouping** by feature
- **Consistent naming** conventions
- **Barrel exports** for cleaner imports
- **Component-specific** styles when needed
- **Clear separation** of concerns

### Performance
- **Memoization** for expensive computations
- **Code splitting** with dynamic imports
- **Lazy loading** for heavy components
- **Virtual scrolling** for long lists
- **Optimized re-renders** with proper dependency arrays

## Accessibility

### ARIA Attributes
- **Proper roles** for semantic meaning
- **Labels** for interactive elements
- **State announcements** for dynamic content
- **Keyboard navigation** support
- **Screen reader** compatibility

### Focus Management
- **Tab order** logical and predictable
- **Focus indicators** visible and clear
- **Skip links** for main content
- **Modal focus** trapping and restoration
- **Error focus** management for forms

## Testing Strategies

### Component Testing
- **Unit tests** for component logic
- **Integration tests** for component interactions
- **Visual regression tests** for UI consistency
- **Accessibility tests** with automated tools
- **Performance tests** for rendering speed

### Test Coverage
- **Props validation** and edge cases
- **Error states** and loading conditions
- **User interactions** and event handling
- **Responsive behavior** across breakpoints
- **Accessibility features** and keyboard navigation

## Troubleshooting

### Common Issues
- **Props not passing**: Check TypeScript interfaces and prop drilling
- **State not updating**: Verify dependency arrays in hooks
- **Styles not applying**: Check Tailwind classes and CSS imports
- **Performance issues**: Profile and optimize re-renders
- **Accessibility problems**: Test with screen readers and keyboard

### Debugging Approaches
- **React DevTools** for component inspection
- **TypeScript errors** for prop issues
- **Browser DevTools** for styling problems
- **Performance profiling** for optimization
- **Accessibility audits** for a11y issues

<!-- MANUAL: Component-specific notes and design patterns -->