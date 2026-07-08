<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# platform-links

## Purpose
Music platform link generation endpoint using Song.link API for unified access to streaming services. Provides multi-platform linking for tracks with analytics integration.

## Key Files

| File | Description |
|------|-------------|
| `route.ts` | Platform link generation endpoint |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All platform linking functionality is in the route file |

## For AI Agents

### Working In This Directory
- **Platform link generation** for music streaming
- **Song.link API integration** for unified links
- **Multi-platform support** for major streaming services
- **Analytics integration** for link tracking
- **Error handling** for unavailable platforms

### Endpoint Specification

#### HTTP Method
- **GET** request with Spotify track ID parameter

#### Request Format
```
GET /api/platform-links?trackId={spotify-track-id}
```

#### Response Format
```json
{
  "platforms": [
    {
      "name": "spotify",
      "url": "https://open.spotify.com/track/...",
      "available": true
    },
    {
      "name": "apple-music",
      "url": "https://music.apple.com/...",
      "available": true
    }
  ],
  "defaultUrl": "https://song.link/..."
}
```

### Testing Requirements
- **Test link generation** for various track IDs
- **Verify platform availability** detection
- **Check response format** consistency
- **Test error handling** for invalid track IDs
- **Validate analytics** integration

### Common Patterns
- **Song.link API** integration for platform data
- **Response caching** for performance optimization
- **Fallback handling** for unavailable platforms
- **Type-safe interfaces** for data structures
- **Analytics tracking** for user behavior

### Development Guidelines
- **Cache responses** to reduce Song.link API calls
- **Handle errors** gracefully with fallbacks
- **Track analytics** for platform popularity
- **Validate track IDs** before API calls
- **Monitor API usage** and rate limits

## Platform Integration

### Supported Platforms
- **Spotify** - Primary streaming platform
- **Apple Music** - iOS and macOS integration
- **YouTube Music** - Video and audio streaming
- **SoundCloud** - Independent artist platform
- **Deezer** - International streaming service
- **Tidal** - High-quality audio streaming
- **Amazon Music** - Alexa and Prime integration

### Link Generation
- **Song.link API** for unified platform links
- **Platform availability** detection by region
- **URL validation** and normalization
- **Fallback handling** for unavailable platforms
- **Analytics integration** for click tracking

## Best Practices

### API Usage
- **Cache responses** to reduce Song.link API calls
- **Respect rate limits** to avoid blocking
- **Handle errors** gracefully with fallbacks
- **Validate track IDs** before processing
- **Monitor performance** and optimize accordingly

### User Experience
- **Fast response times** for better UX
- **Accurate platform availability** information
- **Reliable link generation** for all platforms
- **Error handling** with helpful messages
- **Analytics tracking** for insights

## Performance Optimization

### Caching Strategy
- **Server-side caching** with appropriate TTL
- **Database storage** for frequently accessed tracks
- **Cache invalidation** for platform changes
- **Performance monitoring** for optimization
- **Storage optimization** for efficiency

### Response Optimization
- **Field filtering** to reduce response size
- **Response compression** for faster delivery
- **Batch processing** for multiple track IDs
- **Connection pooling** for efficiency
- **Error caching** to prevent repeated failures

## Error Handling

### Common Errors
- **Invalid track ID** - Track doesn't exist or incorrect format
- **Song.link API failures** - Service unavailable or rate limited
- **Network errors** - Connection issues
- **Platform unavailable** - Specific platform not accessible
- **Parsing errors** - Invalid response format

### Error Strategies
- **Fallback to direct Spotify link** if Song.link fails
- **Cache error responses** to prevent repeated failures
- **Graceful degradation** for missing platforms
- **User-friendly error** messages
- **Logging and monitoring** for troubleshooting

## Integration Points

### Component Integration
- **Platform buttons** component for link display
- **Music page** for platform linking
- **Platform links page** for multi-platform access
- **Analytics integration** for click tracking

### External Services
- **Song.link API** for platform link generation
- **Analytics services** for user behavior tracking
- **Database storage** for caching and history
- **Monitoring services** for performance tracking

## Troubleshooting

### Common Issues
- **Links not generating**: Check Song.link API availability and credentials
- **Platforms missing**: Verify platform availability by region
- **Slow response times**: Review caching strategy and API performance
- **Invalid links**: Validate track IDs and API responses
- **Analytics not tracking**: Check integration and error handling

### Debugging Steps
1. **Test Song.link API** directly with track IDs
2. **Verify track ID format** and validity
3. **Check response caching** and effectiveness
4. **Review error logs** for API issues
5. **Monitor performance** metrics and optimize

## Maintenance

### Regular Tasks
- **Monitor Song.link API** usage and performance
- **Update platform support** as services change
- **Review caching strategy** effectiveness
- **Check analytics integration** accuracy
- **Optimize performance** based on metrics

### Platform Updates
- **Add new platforms** as they become available
- **Remove deprecated** platforms when necessary
- **Update platform availability** by region
- **Test link functionality** after changes
- **Document platform-specific** requirements

## Future Enhancements

### Planned Features
- **Advanced caching** for better performance
- **Real-time updates** for platform availability
- **QR code generation** for easy mobile access
- **Platform-specific** features and promotions
- **Enhanced analytics** for user insights

### Technical Improvements
- **WebSocket integration** for real-time updates
- **Advanced error handling** and recovery
- **Performance optimization** for high traffic
- **Better rate limit** handling and prediction
- **Enhanced security** for API credentials

## Platform Strategy

### Multi-Platform Approach
- **Universal access** across all major services
- **User choice** for preferred platform
- **Regional availability** consideration
- **Platform-specific** features and limitations
- **Consistent experience** across platforms

### Analytics and Insights
- **Platform popularity** tracking and analysis
- **User preference** monitoring
- **Conversion tracking** for platform engagement
- **Geographic distribution** of platform usage
- **Performance metrics** for optimization

<!-- MANUAL: Platform links specific notes and Song.link integration details -->