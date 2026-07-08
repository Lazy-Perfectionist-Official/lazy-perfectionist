<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# music

## Purpose
Music-related pages and functionality for the Lazy Perfectionist website. Displays music releases, album information, track listings, and streaming platform links.

## Key Files

| File | Description |
|------|-------------|
| `page.tsx` | Main music page with releases and platform links |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All music functionality is in the page file |

## For AI Agents

### Working In This Directory
- **Music page** showcasing releases and streaming options
- **Spotify integration** for track listings and metadata
- **Platform link generation** for multi-platform streaming
- **Album artwork display** with responsive images
- **SEO optimization** for music discovery

### Page Structure

#### Content Sections
- **Hero section** with artist branding
- **Album artwork** display with high-quality images
- **Track listings** from Spotify API integration
- **Platform link buttons** for major streaming services
- **Additional releases** and discography section

#### Interactive Features
- **Platform link buttons** redirecting to streaming services
- **Responsive design** for mobile and desktop viewing
- **Album artwork** with proper aspect ratios
- **Loading states** for async Spotify data
- **Error handling** for API failures

### Testing Requirements
- **Test page rendering** with and without Spotify data
- **Verify responsive behavior** across different screen sizes
- **Test platform link functionality** for all services
- **Check SEO metadata** renders properly
- **Validate error handling** for API failures

### Common Patterns
- **Server component** by default for optimal performance
- **Async data fetching** from Spotify API
- **Error boundaries** for graceful error handling
- **Loading states** for better user experience
- **SEO-friendly** markup and metadata

### Development Guidelines
- **Use server components** for data fetching
- **Implement proper error handling** for API failures
- **Optimize images** with Next.js Image component
- **Maintain SEO** with proper metadata and structured data
- **Test responsive design** across devices

## Spotify Integration

### Data Fetching
- **Artist information** from Spotify API
- **Album and track** data for releases
- **Audio features** for track information
- **Platform links** generation via Song.link
- **Caching strategy** for performance optimization

### Error Handling
- **API rate limits** with proper retry logic
- **Fallback content** when Spotify is unavailable
- **User-friendly error messages** for failures
- **Graceful degradation** for missing data
- **Logging** for troubleshooting API issues

## SEO Implementation

### Metadata
- **Music industry specific** meta tags
- **Album artwork** Open Graph images
- **Structured data** for MusicGroup and MusicRecording
- **Canonical URLs** for proper indexing
- **Social media** optimization for sharing

### Structured Data
- **MusicGroup schema** for artist information
- **MusicRecording schema** for tracks
- **Album details** with release information
- **Platform links** for streaming services
- **Audio features** for rich results

## Platform Linking

### Supported Platforms
- **Spotify** - Primary streaming platform
- **Apple Music** - iOS and macOS integration
- **YouTube Music** - Video and audio streaming
- **SoundCloud** - Independent artist platform
- **Bandcamp** - Direct artist support platform

### Link Generation
- **Song.link API** for unified platform links
- **Fallback handling** for unavailable platforms
- **URL validation** and normalization
- **Analytics integration** for link tracking
- **Deep linking** for mobile app integration

## Design System

### Visual Elements
- **Album artwork** with proper aspect ratios
- **Platform icons** for service identification
- **Responsive grid** for track listings
- **Hover effects** for interactive elements
- **Consistent spacing** and typography

### Responsive Design
- **Mobile-first** approach for layout
- **Breakpoints** for tablet and desktop
- **Touch-friendly** button sizing
- **Readable text** sizes on all devices
- **Optimized images** for different screen sizes

## Performance Optimization

### Image Optimization
- **Next.js Image component** for automatic optimization
- **Responsive images** with srcset generation
- **Lazy loading** for below-the-fold content
- **WebP format** with fallbacks
- **Appropriate sizing** for display dimensions

### Data Optimization
- **Spotify API caching** for reduced calls
- **Incremental static regeneration** for content updates
- **Proper data fetching** strategies
- **Optimized re-renders** for React components
- **Bundle size optimization** for dependencies

## Best Practices

### Content Management
- **Keep album information** up to date
- **Add new releases** as they become available
- **Maintain consistent** metadata across platforms
- **Update platform links** when services change
- **Monitor Spotify API** for rate limits

### User Experience
- **Clear call-to-action** for streaming platforms
- **Fast loading** for mobile users
- **Accessible navigation** to music content
- **Consistent branding** across music pages
- **Proper error feedback** for failures

## Integration Points

### API Integration
- **Spotify Web API** for music data
- **Song.link API** for platform links
- **Internal analytics** for user tracking
- **Error tracking** for monitoring

### Component Integration
- **Music components** from `src/components/music/`
- **UI components** from `src/components/ui/`
- **Shared components** for navigation and layout
- **Background components** for visual effects

## Troubleshooting

### Common Issues
- **Spotify API failures**: Check API credentials and rate limits
- **Platform links not working**: Verify Song.link integration
- **Images not loading**: Check Next.js Image configuration
- **Page slow to load**: Review API calls and caching strategy
- **SEO not rendering**: Validate metadata and structured data

### Debugging Steps
1. **Check Spotify API** credentials and rate limits
2. **Verify Song.link** API integration
3. **Test image optimization** settings
4. **Review caching** strategy effectiveness
5. **Validate SEO** markup with testing tools

## Maintenance

### Regular Tasks
- **Update album information** when new releases drop
- **Monitor Spotify API** usage and rate limits
- **Test platform links** for functionality
- **Review SEO performance** in search results
- **Update structured data** as needed

### Content Updates
- **Add new releases** to music page
- **Update album artwork** with high-quality images
- **Refresh platform links** for new services
- **Maintain consistent** metadata across platforms
- **Monitor performance** and user engagement

## Future Enhancements

### Planned Features
- **Music player** integration with Spotify embeds
- **Lyrics display** for track information
- **Tour dates** and live performances
- **Merchandise integration** with store
- **Fan community** features and engagement

### Technical Improvements
- **Enhanced caching** for better performance
- **Real-time updates** for new releases
- **Improved analytics** for user engagement
- **Better mobile experience** for music streaming
- **Enhanced SEO** for music discovery

<!-- MANUAL: Music page specific notes and implementation details -->