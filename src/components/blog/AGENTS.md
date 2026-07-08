<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# blog

## Purpose
React components for blog functionality, displaying Medium articles with cards, sorting options, and loading states. Provides a polished user interface for blog content presentation.

## Key Files

| File | Description |
|------|-------------|
| `BlogCard.tsx` | Individual blog post card component with thumbnail and metadata |
| `BlogLoadingSkeleton.tsx` | Loading skeleton for async blog content loading |
| `BlogSortSelect.tsx` | Sorting interface for blog posts by various criteria |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All blog components are at root level |

## For AI Agents

### Working In This Directory
- **Blog-specific components** for Medium article display
- **Reusable components** for blog functionality
- **Responsive design** for various screen sizes
- **Loading states** for better user experience
- **Sorting and filtering** capabilities

### Component Architecture

#### BlogCard Component
- **Article display** with thumbnail and metadata
- **Responsive design** for mobile and desktop
- **Click functionality** to navigate to Medium
- **SEO-friendly** markup and structure
- **Loading and error states** handling

#### BlogLoadingSkeleton Component
- **Placeholder UI** during content loading
- **Matching layout** to actual blog cards
- **Animated elements** for visual feedback
- **Accessibility considerations** for screen readers
- **Performance optimization** with minimal re-renders

#### BlogSortSelect Component
- **Sorting options** for blog posts
- **User-friendly** select interface
- **State management** for sort preferences
- **Responsive design** for all devices
- **Accessibility** features for keyboard navigation

### Testing Requirements
- **Test card rendering** with various article data
- **Verify responsive behavior** across screen sizes
- **Check loading states** display properly
- **Test sorting functionality** with different options
- **Validate accessibility** with screen readers

### Common Patterns
- **Component composition** for complex UIs
- **Prop-based customization** for flexibility
- **Responsive utilities** for mobile design
- **TypeScript interfaces** for type safety
- **Error boundaries** for graceful error handling

### Development Guidelines
- **Keep components focused** on single responsibilities
- **Use proper TypeScript** for type safety
- **Implement accessibility** features
- **Optimize performance** with memoization
- **Test thoroughly** across browsers

## Component Details

### BlogCard Component

#### Props Interface
- **article**: Medium article data object
- **priority**: Image loading priority
- **className**: Additional CSS classes for styling

#### Features
- **Thumbnail display** with Next.js Image optimization
- **Article metadata** (title, date, reading time)
- **Category tags** and topic display
- **Hover effects** for user feedback
- **Click handling** for article navigation

#### Styling
- **Card layout** with consistent spacing
- **Responsive images** with proper aspect ratios
- **Typography hierarchy** for readability
- **Mobile-optimized** touch targets
- **Hover animations** for interactivity

### BlogLoadingSkeleton Component

#### Features
- **Animated placeholders** matching card layout
- **Shimmer effects** for loading indication
- **Screen reader support** for accessibility
- **Performance optimized** with CSS animations
- **Configurable count** for number of skeletons

#### Accessibility
- **ARIA attributes** for loading state
- **Screen reader announcements**
- **Keyboard navigation** support
- **High contrast** for visibility
- **Proper semantic** markup

### BlogSortSelect Component

#### Sorting Options
- **Latest first** (most recent publications)
- **Oldest first** (chronological order)
- **Reading time** (shortest to longest)
- **Category** (grouped by topics)

#### Features
- **Select dropdown** with shadcn/ui components
- **State management** for user preferences
- **URL parameters** for shareable links
- **Responsive design** for mobile devices
- **Accessibility** with proper labels

## Best Practices

### Component Design
- **Single responsibility** principle per component
- **Reusable and composable** design
- **Proper TypeScript** prop interfaces
- **Accessibility features** built-in
- **Performance optimized** rendering

### Styling Approach
- **Tailwind CSS** for component styling
- **Responsive utilities** for mobile design
- **Consistent spacing** and typography
- **Hover effects** for interactivity
- **Loading states** for better UX

### Data Handling
- **Type-safe props** with TypeScript interfaces
- **Error handling** for missing data
- **Fallback content** for missing images
- **Loading states** for async operations
- **Optimization** for performance

## Integration Points

### Page Integration
- **Used by blog page** in `src/app/blog/`
- **Integrated with** Medium API data
- **Responsive design** for all screen sizes
- **SEO optimization** with proper markup

### Component Dependencies
- **UI components** from `src/components/ui/`
- **Utilities** from `src/lib/`
- **Types** from project interfaces
- **Shared hooks** from `src/hooks/`

## Performance Optimization

### Rendering Optimization
- **React.memo** for expensive components
- **Code splitting** with dynamic imports
- **Lazy loading** for below-the-fold content
- **Optimized re-renders** with proper dependencies
- **Bundle size optimization** for dependencies

### Image Optimization
- **Next.js Image component** for thumbnails
- **Responsive images** with srcset generation
- **Lazy loading** for improved performance
- **WebP format** with fallbacks
- **Proper sizing** for display dimensions

## Accessibility Standards

### ARIA Implementation
- **Proper roles** for semantic meaning
- **Labels** for interactive elements
- **State announcements** for dynamic content
- **Keyboard navigation** support
- **Screen reader** compatibility

### Focus Management
- **Logical tab order** for interactive elements
- **Visible focus indicators** for keyboard users
- **Skip links** for main content access
- **Modal focus** management when applicable
- **Error focus** management for forms

## Troubleshooting

### Common Issues
- **Props not passing**: Check TypeScript interfaces and prop drilling
- **Images not loading**: Verify Next.js Image configuration
- **Styling inconsistent**: Review Tailwind classes and CSS imports
- **Performance issues**: Profile component re-renders and optimization
- **Accessibility problems**: Test with screen readers and keyboard

### Debugging Steps
- **React DevTools** for component inspection
- **TypeScript errors** for prop type issues
- **Browser DevTools** for styling problems
- **Performance profiling** for optimization
- **Accessibility audits** for a11y issues

## Maintenance

### Regular Tasks
- **Update components** as Medium API changes
- **Test responsive behavior** on new devices
- **Review accessibility** with automated tools
- **Optimize performance** for slow components
- **Update documentation** for component changes

### Component Updates
- **Test changes** in isolation before integration
- **Maintain backward compatibility** when possible
- **Update prop types** for new features
- **Test accessibility** after modifications
- **Document new props** and functionality

## Future Enhancements

### Planned Features
- **Enhanced filtering** by categories and tags
- **Search functionality** within blog posts
- **Infinite scroll** for post loading
- **Bookmarking** functionality for users
- **Social sharing** buttons integration

### Technical Improvements
- **Better caching** for improved performance
- **Real-time updates** for new posts
- **Enhanced analytics** for user engagement
- **Improved mobile experience** for reading
- **Better error handling** for API failures

<!-- MANUAL: Blog component specific notes and implementation details -->