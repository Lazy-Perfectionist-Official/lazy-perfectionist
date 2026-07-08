<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# music

## Purpose
React components for music functionality, displaying platform buttons and streaming links. Provides interactive elements for music discovery and streaming across multiple platforms.

## Key Files

| File | Description |
|------|-------------|
| `PlatformButtons.tsx` | Multi-platform music streaming buttons with icons and links |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All music components are at root level |

## For AI Agents

### Working In This Directory
- **Music-specific components** for platform integration
- **Streaming platform buttons** for major services
- **Responsive design** for various devices
- **Icon integration** for platform identification
- **Link generation** for music streaming

### Component Architecture

#### PlatformButtons Component
- **Multi-platform links** for music streaming
- **Icon display** for platform identification
- **Responsive layout** for different screen sizes
- **Hover effects** for user feedback
- **Accessibility features** for keyboard navigation

### Testing Requirements
- **Test button functionality** for all platforms
- **Verify responsive behavior** across devices
- **Check icon rendering** for consistency
- **Validate link generation** for platforms
- **Test accessibility** with screen readers

### Common Patterns
- **Component composition** for flexible layouts
- **TypeScript interfaces** for type safety
- **Responsive utilities** for mobile design
- **Icon integration** with Lucide React
- **Accessibility** with ARIA attributes

### Development Guidelines
- **Keep components focused** on single responsibilities
- **Use proper TypeScript** for prop interfaces
- **Implement accessibility** features
- **Optimize performance** with memoization
- **Test thoroughly** across platforms

## Component Details

### PlatformButtons Component

#### Supported Platforms
- **Spotify** - Primary streaming platform
- **Apple Music** - iOS and macOS integration
- **YouTube Music** - Video and audio streaming
- **SoundCloud** - Independent artist platform
- **Bandcamp** - Direct artist support

#### Features
- **Icon display** for each platform
- **Platform-specific colors** and branding
- **Responsive layout** for different screen sizes
- **Hover effects** for user feedback
- **Click handling** for platform navigation

#### Props Interface
- **trackId**: Spotify track ID for link generation
- **platformLinks**: Array of available platforms
- **layout**: Button layout (horizontal, vertical, grid)
- **size**: Button size variants
- **className**: Additional CSS classes

## Design System

### Visual Elements
- **Platform-specific colors** for recognition
- **Consistent sizing** across platforms
- **Responsive grid** for button layouts
- **Hover effects** for interactivity
- **Loading states** for link generation

### Responsive Design
- **Mobile-first** approach for layout
- **Breakpoints** for tablet and desktop
- **Touch-friendly** button sizing
- **Flexible layouts** for different counts
- **Optimized spacing** for readability

## Integration Points

### Data Sources
- **Spotify API** for track information
- **Song.link API** for platform link generation
- **Platform link data** from database
- **Analytics integration** for click tracking

### Component Usage
- **Music page** for album and track display
- **Home page** for featured music
- **Platform pages** for linking functionality
- **Blog posts** for embedded music content

## Performance Optimization

### Component Performance
- **React.memo** for preventing unnecessary re-renders
- **Lazy loading** for below-the-fold content
- **Code splitting** for music-specific features
- **Optimized event handlers** to prevent memory leaks
- **Efficient state management** for platform data

### Link Generation
- **Caching strategy** for platform links
- **Optimized API calls** to Song.link
- **Fallback handling** for unavailable platforms
- **URL validation** and normalization
- **Error handling** for link failures

## Accessibility Standards

### ARIA Implementation
- **Proper button roles** for interactive elements
- **Labels** for platform identification
- **State announcements** for link generation
- **Keyboard navigation** support
- **Screen reader** compatibility

### Focus Management
- **Logical tab order** for button groups
- **Visible focus indicators** for keyboard users
- **Skip links** for main content access
- **Error focus** management for failures
- **Consistent focus** behavior across platforms

## Best Practices

### Component Design
- **Single responsibility** for platform display
- **Reusable patterns** for different layouts
- **Proper TypeScript** prop interfaces
- **Accessibility features** built-in
- **Performance optimized** rendering

### Styling Approach
- **Tailwind CSS** for component styling
- **Responsive utilities** for mobile design
- **Consistent spacing** and sizing
- **Hover effects** for interactivity
- **Platform-specific** branding elements

### Data Handling
- **Type-safe props** with TypeScript interfaces
- **Error handling** for missing platform data
- **Fallback content** for unavailable platforms
- **Loading states** for link generation
- **Validation** for platform URLs

## Troubleshooting

### Common Issues
- **Platform links not working**: Verify Song.link API integration
- **Icons not displaying**: Check Lucide React icon imports
- **Layout issues**: Review responsive breakpoints and utilities
- **Performance problems**: Profile component re-renders and optimization
- **Accessibility issues**: Test with screen readers and keyboard

### Debugging Steps
- **React DevTools** for component inspection
- **TypeScript errors** for prop type issues
- **Browser DevTools** for styling problems
- **Performance profiling** for optimization
- **Accessibility audits** for a11y issues

## Maintenance

### Regular Tasks
- **Update platform support** as services change
- **Test link generation** for all platforms
- **Review performance** metrics and optimization
- **Check accessibility** compliance regularly
- **Update icons** and branding as needed

### Platform Updates
- **Add new platforms** as they become relevant
- **Remove deprecated** platforms when necessary
- **Update platform branding** and icons
- **Test link functionality** after changes
- **Document platform-specific** requirements

## Future Enhancements

### Planned Features
- **Custom platform ordering** for user preferences
- **Platform filtering** by region availability
- **Analytics integration** for click tracking
- **Favorite platforms** for quick access
- **Platform-specific** features and integrations

### Technical Improvements
- **Enhanced caching** for better performance
- **Real-time updates** for platform availability
- **Better error handling** for link failures
- **Improved mobile experience** for platform selection
- **Advanced analytics** for user engagement

## Platform Integration Details

### Spotify Integration
- **Primary platform** for music data
- **Rich metadata** including audio features
- **Playlist creation** and sharing
- **Artist profiles** and discography
- **Real-time sync** with Spotify database

### Multi-Platform Strategy
- **Unified linking** via Song.link API
- **Fallback handling** for unavailable platforms
- **Regional availability** consideration
- **Platform-specific** features and limitations
- **Analytics integration** for user insights

<!-- MANUAL: Music component specific notes and platform integration details -->