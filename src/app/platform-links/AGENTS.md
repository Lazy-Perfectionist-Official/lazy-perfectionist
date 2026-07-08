<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# platform-links

## Purpose
Music platform linking functionality, allowing users to access Lazy Perfectionist music across their preferred streaming services. Provides unified access to all major music platforms.

## Key Files

| File | Description |
|------|-------------|
| `page.tsx` | Platform linking page with music service options |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All platform linking functionality is in the page file |

## For AI Agents

### Working In This Directory
- **Platform linking page** for music services
- **Multi-platform access** for music streaming
- **Spotify integration** for track data
- **User-friendly interface** for platform selection
- **Mobile-optimized** experience

### Page Structure

#### Content Display
- **Platform selection** with clear options
- **Music information** and track details
- **Platform-specific** links and buttons
- **Responsive design** for all devices
- **Fast loading** for better UX

#### Interactive Features
- **Platform buttons** for direct access
- **Track information** display
- **Album artwork** integration
- **Mobile-friendly** touch targets
- **Fast redirect** to chosen platform

### Testing Requirements
- **Test all platform links** for functionality
- **Verify responsive behavior** across devices
- **Check mobile experience** for usability
- **Validate link generation** for platforms
- **Test accessibility** with screen readers

### Common Patterns
- **Server component** for optimal performance
- **Async data fetching** from Spotify API
- **Responsive design** with mobile-first approach
- **Error handling** for API failures
- **SEO optimization** for discoverability

### Development Guidelines
- **Keep interface simple** and focused
- **Optimize for mobile** user experience
- **Test all platform links** regularly
- **Handle API errors** gracefully
- **Maintain fast loading** performance

## Platform Integration

### Supported Platforms
- **Spotify** - Primary streaming platform
- **Apple Music** - iOS and macOS integration
- **YouTube Music** - Video and audio streaming
- **SoundCloud** - Independent artist platform
- **Bandcamp** - Direct artist support
- **Deezer** - International streaming service
- **Tidal** - High-quality audio streaming

### Link Generation
- **Song.link API** for unified platform links
- **Spotify track IDs** for data fetching
- **Fallback handling** for unavailable platforms
- **URL validation** and normalization
- **Analytics integration** for link tracking

## User Experience

### Interface Design
- **Clear platform identification** with icons and names
- **Consistent layout** for easy navigation
- **Touch-friendly buttons** for mobile users
- **Fast loading** to prevent abandonment
- **Error handling** with helpful messages

### Mobile Optimization
- **Large touch targets** for easy selection
- **Responsive layout** for small screens
- **Fast loading** for mobile networks
- **Clear visual hierarchy** for quick decisions
- **Accessible design** for all users

## Performance Optimization

### Loading Performance
- **Server-side rendering** for fast initial load
- **Image optimization** for album artwork
- **Minimal JavaScript** for fast interaction
- **Lazy loading** for below-the-fold content
- **Efficient API calls** with caching

### API Optimization
- **Spotify API caching** for reduced calls
- **Song.link API optimization** for performance
- **Error handling** with fallbacks
- **Rate limiting** consideration
- **Response time monitoring**

## SEO Implementation

### Metadata
- **Platform-specific** meta tags and descriptions
- **Music-related keywords** for discovery
- **Platform links** in structured data
- **Canonical URLs** for proper indexing
- **Social media optimization** for sharing

### Structured Data
- **MusicRecording schema** for track information
- **Platform links** in structured data
- **Artist information** for credibility
- **Album details** for context
- **Audio features** for rich results

## Best Practices

### User Interface
- **Simple and focused** design for clarity
- **Consistent branding** across platforms
- **Fast loading** for better engagement
- **Accessible design** for all users
- **Mobile-first** approach for design

### Platform Strategy
- **Multi-platform support** for accessibility
- **Regular testing** of all platform links
- **Fallback options** for unavailable platforms
- **User preference** consideration
- **Analytics monitoring** for platform usage

## Integration Points

### API Integration
- **Spotify Web API** for track information
- **Song.link API** for platform link generation
- **Internal analytics** for user behavior tracking
- **Error tracking** for monitoring failures

### Component Integration
- **Platform button components** from `src/components/music/`
- **UI components** from `src/components/ui/`
- **Shared components** for layout and navigation
- **Background components** for visual effects

## Troubleshooting

### Common Issues
- **Platform links not working**: Verify Song.link API integration
- **Missing platforms**: Check platform availability and API support
- **Slow loading**: Review API calls and caching strategy
- **Mobile issues**: Test responsive design and touch targets
- **API failures**: Handle Spotify and Song.link API errors

### Debugging Steps
1. **Test platform links** directly in browser
2. **Verify Song.link API** integration and responses
3. **Check Spotify API** credentials and rate limits
4. **Test mobile experience** on various devices
5. **Monitor analytics** for user behavior patterns

## Maintenance

### Regular Tasks
- **Test all platform links** for functionality
- **Monitor API usage** and rate limits
- **Update platform support** as services change
- **Review analytics** for platform usage
- **Optimize performance** based on metrics

### Platform Updates
- **Add new platforms** as they become relevant
- **Remove deprecated** platforms when necessary
- **Update platform branding** and icons
- **Test link functionality** after changes
- **Document platform-specific** requirements

## Future Enhancements

### Planned Features
- **User preferences** for favorite platforms
- **Platform availability** by region
- **Advanced analytics** for platform usage
- **QR code generation** for easy mobile access
- **Platform-specific** features and promotions

### Technical Improvements
- **Enhanced caching** for better performance
- **Real-time updates** for platform availability
- **Better error handling** for API failures
- **Improved mobile experience** for selection
- **Advanced analytics** for user insights

## Platform Strategy

### Multi-Platform Approach
- **Universal access** across all major services
- **User choice** for preferred platform
- **Regional availability** consideration
- **Platform-specific** features and limitations
- **Consistent experience** across platforms

### Analytics and Insights
- **Platform usage** tracking and analysis
- **User preference** monitoring
- **Conversion tracking** for platform engagement
- **Geographic distribution** of users
- **Performance metrics** for optimization

<!-- MANUAL: Platform linking specific notes and integration details -->