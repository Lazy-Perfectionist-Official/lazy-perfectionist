<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# tracks

## Purpose
Spotify track data endpoint for fetching individual track information, audio features, and platform links. Provides detailed track metadata with caching and error handling.

## Key Files

| File | Description |
|------|-------------|
| `route.ts` | Track data API endpoint |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All track functionality is in the route file |

## For AI Agents

### Working In This Directory
- **Track data fetching** from Spotify API
- **Audio features** analysis and retrieval
- **Platform links** generation for tracks
- **Server-side caching** for performance
- **Error handling** for API failures

### Endpoint Specification

#### HTTP Method
- **GET** request with track ID parameter

#### Request Format
```
GET /api/spotify/tracks?trackId={spotify-track-id}
```

#### Response Format
```json
{
  "id": "track-id",
  "name": "Track Name",
  "artists": [{ "name": "Artist Name" }],
  "album": { "name": "Album Name", "images": [...] },
  "durationMs": 180000,
  "externalUrls": { "spotify": "https://open.spotify.com/track/..." },
  "audioFeatures": {
    "danceability": 0.7,
    "energy": 0.8,
    "valence": 0.6
  },
  "platformLinks": [...]
}
```

### Testing Requirements
- **Test track data** retrieval for various track IDs
- **Verify audio features** accuracy and completeness
- **Check response caching** effectiveness
- **Test error handling** for invalid track IDs
- **Validate platform links** generation

### Common Patterns
- **Spotify Web API** integration for track data
- **Response caching** with appropriate TTL
- **Error handling** with fallback content
- **Type-safe interfaces** for data structures
- **Platform link integration** for multi-platform access

### Development Guidelines
- **Cache responses** to reduce Spotify API calls
- **Handle errors** gracefully with fallbacks
- **Validate track IDs** before API calls
- **Monitor API usage** and rate limits
- **Optimize performance** based on metrics

## Track Data Structure

### Basic Information
- **Track ID** and Spotify URI
- **Track name** and artist information
- **Album details** and artwork
- **Duration** in milliseconds
- **External URLs** for Spotify links

### Audio Features
- **Danceability** - Suitability for dancing
- **Energy** - Intensity and activity
- **Valence** - Musical positiveness
- **Acousticness** - Acoustic probability
- **Instrumentalness** - Vocal presence
- **Tempo** - Beats per minute
- **Key** and **Mode** - Musical key

## Performance Optimization

### Caching Strategy
- **Server-side caching** with appropriate TTL
- **Database storage** for frequently accessed tracks
- **Cache invalidation** for track changes
- **Performance monitoring** for optimization
- **Storage optimization** for efficiency

### Response Optimization
- **Field filtering** to reduce response size
- **Response compression** for faster delivery
- **Batch processing** for multiple track IDs
- **Connection pooling** for efficiency
- **Selective audio features** inclusion

## Error Handling

### Common Errors
- **Invalid track ID** - Track doesn't exist
- **Rate limiting** - Too many API calls
- **Network errors** - Connection issues
- **Authentication failures** - Token issues
- **Parsing errors** - Invalid response format

### Error Strategies
- **Fallback to cached** data if available
- **Graceful degradation** for missing features
- **User-friendly error** messages
- **Retry logic** for transient failures
- **Logging and monitoring** for troubleshooting

## Integration Points

### Component Integration
- **Music components** for track display
- **Player components** for audio playback
- **Platform links** for streaming access
- **Analytics integration** for user behavior

### External Services
- **Spotify Web API** for track data
- **Song.link API** for platform links
- **Database storage** for caching
- **Analytics services** for tracking

## Troubleshooting

### Common Issues
- **Track data not loading**: Check Spotify API availability and authentication
- **Audio features missing**: Verify API response and caching
- **Slow response times**: Review caching strategy and API performance
- **Platform links failing**: Check Song.link API integration
- **Cache inconsistencies**: Validate cache invalidation logic

### Debugging Steps
1. **Test Spotify API** directly with track ID
2. **Verify authentication** token validity
3. **Check response caching** and effectiveness
4. **Review audio features** API response
5. **Monitor performance** metrics and optimize

## Maintenance

### Regular Tasks
- **Monitor Spotify API** usage and rate limits
- **Update authentication** tokens as needed
- **Review caching strategy** effectiveness
- **Check for Spotify API** changes and deprecations
- **Optimize performance** based on metrics

### Data Updates
- **Track information** updates from Spotify
- **Audio features** accuracy validation
- **Platform links** availability checking
- **Cache refresh** for stale data
- **Performance optimization** for common queries

## Future Enhancements

### Planned Features
- **Enhanced caching** for better performance
- **Real-time updates** for track changes
- **Advanced audio analysis** features
- **Batch processing** for multiple tracks
- **Enhanced error handling** and recovery

### Technical Improvements
- **WebSocket integration** for real-time updates
- **Machine learning** for audio feature prediction
- **Advanced analytics** for track popularity
- **Better performance** for high traffic
- **Enhanced security** for API credentials

## Audio Features Analysis

### Feature Categories
- **Mood features** (valence, energy)
- **Rhythm features** (tempo, danceability)
- **Instrumentation** (acousticness, instrumentalness)
- **Musical key** (key, mode)
- **Production** (loudness, speechiness)

### Use Cases
- **Recommendation engines** for similar tracks
- **Playlist generation** based on mood
- **Music analysis** for insights
- **User preferences** and personalization
- **Content discovery** and exploration

<!-- MANUAL: Track data specific notes and Spotify integration details -->