<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# artist

## Purpose
Spotify artist data endpoint for fetching artist profiles, discographies, popularity metrics, and related artist information. Provides comprehensive artist information with caching and error handling.

## Key Files

| File | Description |
|------|-------------|
| `route.ts` | Artist data API endpoint |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All artist functionality is in the route file |

## For AI Agents

### Working In This Directory
- **Artist data fetching** from Spotify API
- **Discography information** retrieval
- **Artist popularity** and follower metrics
- **Related artists** discovery
- **Server-side caching** for performance

### Endpoint Specification

#### HTTP Method
- **GET** request with artist ID parameter

#### Request Format
```
GET /api/spotify/artist?artistId={spotify-artist-id}
```

#### Response Format
```json
{
  "id": "artist-id",
  "name": "Artist Name",
  "followers": { "total": 10000 },
  "popularity": 75,
  "genres": ["rock", "indie"],
  "images": [...],
  "albums": [...],
  "relatedArtists": [...]
}
```

### Testing Requirements
- **Test artist data** retrieval for various artist IDs
- **Verify discography** completeness and accuracy
- **Check response caching** effectiveness
- **Test error handling** for invalid artist IDs
- **Validate related artists** relevance

### Common Patterns
- **Spotify Web API** integration for artist data
- **Response caching** with appropriate TTL
- **Error handling** with fallback content
- **Type-safe interfaces** for data structures
- **Database synchronization** for local storage

### Development Guidelines
- **Cache responses** to reduce Spotify API calls
- **Handle errors** gracefully with fallbacks
- **Validate artist IDs** before API calls
- **Monitor API usage** and rate limits
- **Optimize performance** based on metrics

## Artist Data Structure

### Basic Information
- **Artist ID** and Spotify URI
- **Artist name** and profile information
- **Followers count** and popularity metrics
- **Genres** and musical categories
- **Profile images** and artwork

### Discography
- **Albums** and releases
- **Singles** and EPs
- **Appears on** compilations
- **Release dates** and chronology
- **Album artwork** and metadata

### Related Content
- **Related artists** for discovery
- **Top tracks** for preview
- **Artist playlists** and curations
- **Concerts and events** (if available)
- **Biographical information**

## Performance Optimization

### Caching Strategy
- **Server-side caching** with appropriate TTL
- **Database storage** for frequently accessed artists
- **Cache invalidation** for artist changes
- **Performance monitoring** for optimization
- **Storage optimization** for efficiency

### Response Optimization
- **Field filtering** to reduce response size
- **Response compression** for faster delivery
- **Batch processing** for multiple artist IDs
- **Connection pooling** for efficiency
- **Selective data** inclusion based on needs

## Error Handling

### Common Errors
- **Invalid artist ID** - Artist doesn't exist
- **Rate limiting** - Too many API calls
- **Network errors** - Connection issues
- **Authentication failures** - Token issues
- **Parsing errors** - Invalid response format

### Error Strategies
- **Fallback to cached** data if available
- **Graceful degradation** for missing information
- **User-friendly error** messages
- **Retry logic** for transient failures
- **Logging and monitoring** for troubleshooting

## Integration Points

### Component Integration
- **Artist profile** components for display
- **Music pages** for discography
- **Navigation components** for related artists
- **Search functionality** for discovery

### Database Integration
- **Artist data** synchronization
- **Album and track** information storage
- **Related artists** relationships
- **Sync history** tracking
- **Performance metrics** collection

## Troubleshooting

### Common Issues
- **Artist data not loading**: Check Spotify API availability and authentication
- **Discography incomplete**: Verify API response and data parsing
- **Slow response times**: Review caching strategy and API performance
- **Related artists inaccurate**: Check Spotify API relevance algorithm
- **Cache inconsistencies**: Validate cache invalidation logic

### Debugging Steps
1. **Test Spotify API** directly with artist ID
2. **Verify authentication** token validity
3. **Check response caching** and effectiveness
4. **Review artist data** structure and completeness
5. **Monitor performance** metrics and optimize

## Maintenance

### Regular Tasks
- **Monitor Spotify API** usage and rate limits
- **Update authentication** tokens as needed
- **Review caching strategy** effectiveness
- **Check for Spotify API** changes and deprecations
- **Optimize performance** based on metrics

### Data Updates
- **Artist information** updates from Spotify
- **Discography updates** for new releases
- **Popularity metrics** refresh
- **Related artists** accuracy validation
- **Cache refresh** for stale data

## Future Enhancements

### Planned Features
- **Enhanced caching** for better performance
- **Real-time updates** for artist changes
- **Advanced analytics** for artist popularity
- **Concert and event** integration
- **Social media** integration

### Technical Improvements
- **WebSocket integration** for real-time updates
- **Machine learning** for artist recommendations
- **Advanced analytics** for artist insights
- **Better performance** for high traffic
- **Enhanced security** for API credentials

## Artist Strategy

### Data Management
- **Comprehensive profiles** for featured artists
- **Regular updates** for artist changes
- **Discography maintenance** for completeness
- **Related artists** for discovery
- **Performance tracking** for popularity

### User Experience
- **Rich artist profiles** for engagement
- **Complete discographies** for exploration
- **Related artists** for discovery
- **Visual presentation** with images and artwork
- **Fast loading** for better UX

## Analytics and Insights

### Artist Metrics
- **Popularity trends** over time
- **Follower growth** tracking
- **Genre analysis** and categorization
- **Related artist** relevance
- **User engagement** with artist content

### Performance Metrics
- **API usage** and optimization
- **Cache effectiveness** monitoring
- **Response time** tracking
- **Error rate** monitoring
- **User engagement** with artist pages

<!-- MANUAL: Artist data specific notes and Spotify integration details -->