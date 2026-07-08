<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# spotify

## Purpose
Spotify API integration endpoints for music data fetching, artist information, album details, and track metadata. Provides server-side API calls to Spotify Web API with proper authentication and caching.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | Spotify API functionality is in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `tracks/` | Track-specific data endpoints (see `src/app/api/spotify/tracks/AGENTS.md`) |
| `artist/` | Artist information endpoints (see `src/app/api/spotify/artist/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- **Spotify API integration** for music data
- **Server-side API calls** with authentication
- **Caching strategy** for rate limit optimization
- **Error handling** for API failures
- **Type-safe responses** with TypeScript

### API Architecture

#### Authentication
- **OAuth 2.0** client credentials flow
- **Access token** management and refresh
- **Secure credential** storage
- **Rate limit** handling and respect
- **Error recovery** for auth failures

#### Data Fetching
- **Artist information** retrieval
- **Album and track** data fetching
- **Audio features** analysis data
- **Playlist and** discography information
- **Search functionality** implementation

### Testing Requirements
- **Test API authentication** and token refresh
- **Verify rate limit** handling and compliance
- **Check error handling** for various failure scenarios
- **Validate response schemas** match expectations
- **Test caching strategy** effectiveness

### Common Patterns
- **Server-side API calls** for security
- **Proper error handling** with fallbacks
- **Response caching** for performance
- **Type-safe interfaces** for data structures
- **Retry logic** for transient failures

### Development Guidelines
- **Respect Spotify API** rate limits
- **Implement proper** error handling
- **Cache responses** appropriately
- **Handle authentication** securely
- **Monitor API usage** and quotas

## Spotify Integration

### API Endpoints
- **Artist endpoints** for profile and discography
- **Album endpoints** for release information
- **Track endpoints** for song details and audio features
- **Search endpoints** for content discovery
- **Playlist endpoints** for curated content

### Data Management
- **Response caching** for performance optimization
- **Database synchronization** for local storage
- **Incremental updates** for data freshness
- **Error handling** for API failures
- **Rate limit monitoring** and compliance

## Best Practices

### API Usage
- **Respect rate limits** to avoid blocking
- **Implement backoff** strategy for retries
- **Cache responses** to reduce API calls
- **Handle errors** gracefully with fallbacks
- **Monitor usage** for optimization opportunities

### Security Considerations
- **Secure credential** storage and management
- **Environment variables** for API keys
- **Token refresh** logic for authentication
- **Error messages** that don't expose credentials
- **Audit logging** for API access

## Error Handling

### Common Errors
- **401 Unauthorized** - Token refresh needed
- **429 Too Many Requests** - Rate limit exceeded
- **404 Not Found** - Resource doesn't exist
- **500 Server Error** - Spotify API issues
- **Network errors** - Connection problems

### Error Strategies
- **Token refresh** for authentication errors
- **Exponential backoff** for rate limiting
- **Graceful degradation** for API failures
- **Fallback content** when data unavailable
- **User-friendly error** messages

## Performance Optimization

### Caching Strategy
- **Response caching** with appropriate TTL
- **Database storage** for frequently accessed data
- **Incremental updates** for data freshness
- **Cache invalidation** for content changes
- **Performance monitoring** for optimization

### API Optimization
- **Batch requests** when possible
- **Field filtering** to reduce response size
- **Parallel requests** for independent data
- **Request deduplication** to reduce calls
- **Connection pooling** for efficiency

## Integration Points

### Database Integration
- **Artist data** synchronization
- **Album and track** information storage
- **Platform links** generation and storage
- **Sync history** tracking
- **Performance metrics** collection

### Component Integration
- **Music components** for data display
- **Blog components** for embedded content
- **API routes** for client data fetching
- **Server components** for data integration

## Troubleshooting

### Common Issues
- **Authentication failures**: Check token refresh logic and credentials
- **Rate limit errors**: Implement proper backoff strategy
- **Data inconsistencies**: Verify database sync and cache invalidation
- **Performance issues**: Review caching strategy and API call optimization
- **Missing data**: Check API availability and error handling

### Debugging Steps
1. **Verify Spotify API** credentials and authentication
2. **Check rate limit** status and backoff logic
3. **Review caching** strategy and effectiveness
4. **Test database** synchronization and data consistency
5. **Monitor performance** metrics and optimize accordingly

## Maintenance

### Regular Tasks
- **Monitor API usage** and rate limits
- **Update authentication** logic as needed
- **Review caching** strategy effectiveness
- **Check for Spotify API** changes and deprecations
- **Optimize performance** based on metrics

### API Updates
- **Test new endpoints** and features
- **Update response handling** for API changes
- **Review rate limits** and adjust accordingly
- **Update error handling** for new error cases
- **Document breaking changes** and migrations

## Future Enhancements

### Planned Features
- **Enhanced caching** for better performance
- **Real-time sync** for Spotify data updates
- **Advanced analytics** for user engagement
- **Playlist integration** for curated content
- **Enhanced search** functionality

### Technical Improvements
- **WebSocket integration** for real-time updates
- **Advanced error handling** and recovery
- **Performance optimization** for large datasets
- **Better rate limit** handling and prediction
- **Enhanced security** for API credentials

<!-- MANUAL: Spotify API specific notes and integration details -->