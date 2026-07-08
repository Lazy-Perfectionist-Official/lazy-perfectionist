<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# api

## Purpose
API route handlers providing backend functionality for the Lazy Perfectionist website. Includes Spotify integration, Medium blog fetching, platform link management, analytics tracking, and health monitoring.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | All API routes are organized in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `health/` | Health check endpoint for monitoring (see `src/app/api/health/AGENTS.md`) |
| `spotify/` | Spotify API integration endpoints (see `src/app/api/spotify/AGENTS.md`) |
| `medium/` | Medium blog integration endpoint |
| `platform-links/` | Music platform link generation |
| `analytics/` | Analytics tracking endpoints (see `src/app/api/analytics/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- **API route handlers** for backend functionality
- **Next.js App Router** API route structure
- **REST endpoints** for external integrations
- **Server-side logic** for data fetching and processing
- **Type-safe responses** with proper TypeScript

### API Architecture

#### Route Structure
- **File-based routing** with `route.ts` files
- **HTTP methods** (GET, POST, PUT, DELETE) handled by exported functions
- **Request validation** with Zod schemas
- **Error handling** with appropriate status codes
- **Response formatting** with consistent structure

#### Integration Types
- **Spotify API** for music data and platform links
- **Medium API** for blog content fetching
- **Analytics services** for user tracking
- **Health monitoring** for uptime checks
- **Platform link generation** for music services

### Testing Requirements
- **Test all endpoints** with various request types
- **Verify error handling** for invalid inputs
- **Check rate limiting** for external API calls
- **Validate response schemas** match expectations
- **Test authentication** if implemented

### Common Patterns
- **Proper HTTP methods** for different operations
- **Input validation** before processing
- **Error responses** with helpful messages
- **Consistent response format** across endpoints
- **Proper status codes** for different scenarios

### Development Guidelines
- **Keep route handlers focused** on single purposes
- **Use TypeScript** for type safety
- **Handle errors** gracefully with proper status codes
- **Implement rate limiting** for external API calls
- **Cache responses** when appropriate

## API Categories

### Music Integration (`spotify/`)
- **Artist information** fetching and caching
- **Album and track** data retrieval
- **Platform link** generation for music services
- **Real-time sync** with Spotify database
- **Error handling** for API failures

### Blog Integration (`medium`)
- **Blog post fetching** from Medium API
- **Content caching** for performance
- **Image processing** for thumbnails
- **Metadata extraction** for SEO
- **Error handling** for API failures

### Analytics (`analytics/`)
- **Event tracking** for user actions
- **Page view monitoring** for analytics
- **Click tracking** for internal links
- **Performance metrics** collection
- **Privacy compliance** for data collection

### Platform Links (`platform-links/`)
- **Multi-platform link** generation
- **Song.link API** integration
- **Fallback handling** for unavailable platforms
- **Analytics integration** for link tracking
- **URL validation** and normalization

### Health Monitoring (`health/`)
- **System health checks** for monitoring
- **Database connectivity** verification
- **External API status** checking
- **Performance metrics** reporting
- **Uptime monitoring** integration

## Best Practices

### API Design
- **REST conventions** for endpoint design
- **Proper HTTP methods** for operations
- **Consistent response format** across endpoints
- **Appropriate status codes** for responses
- **Clear error messages** for debugging

### Error Handling
- **Try-catch blocks** for async operations
- **Proper status codes** for different error types
- **Error logging** for debugging
- **User-friendly messages** for client display
- **Fallback responses** for API failures

### Performance
- **Response caching** for expensive operations
- **Rate limiting** for external API calls
- **Connection pooling** for database queries
- **Lazy loading** for large datasets
- **Compression** for response payloads

## Security Considerations

### Input Validation
- **Schema validation** with Zod for all inputs
- **SQL injection prevention** via ORM
- **XSS prevention** with proper sanitization
- **CSRF protection** for state-changing operations
- **Rate limiting** for abuse prevention

### Data Protection
- **API key management** for external services
- **Environment variables** for sensitive data
- **HTTPS only** for production endpoints
- **Data encryption** for sensitive information
- **Privacy compliance** for user data

## Response Patterns

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Validation Error
```json
{
  "success": false,
  "error": "Validation failed",
  "validationErrors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

## Integration Points

### Database Integration
- **Prisma client** for database operations
- **Query optimization** for performance
- **Transaction support** for complex operations
- **Error handling** for database failures
- **Connection management** for serverless

### External API Integration
- **Spotify Web API** for music data
- **Medium API** for blog content
- **Song.link API** for platform links
- **Analytics services** for tracking
- **Rate limiting** for API quota management

### Client Integration
- **Called by React components** via fetch/axios
- **Used by server components** for data fetching
- **Integrated with TanStack Query** for caching
- **Error handling** for user feedback
- **Loading states** for async operations

## Troubleshooting

### Common Issues
- **Endpoint not found**: Check file structure and naming
- **Method not allowed**: Verify exported functions (GET, POST, etc.)
- **CORS errors**: Check API route configuration
- **Timeout errors**: Review external API calls and caching
- **Type errors**: Verify TypeScript interfaces and schemas

### Debugging Approaches
- **Test endpoints** with tools like curl or Postman
- **Check Next.js dev server** logs for errors
- **Validate request/response** schemas
- **Review external API** documentation
- **Monitor rate limits** and quotas

## Monitoring

### Key Metrics
- **Response times** for performance monitoring
- **Error rates** for reliability tracking
- **Request volumes** for capacity planning
- **External API call** success rates
- **Cache hit rates** for optimization

### Logging Strategy
- **Request logging** for debugging
- **Error logging** for troubleshooting
- **Performance logging** for optimization
- **External API logging** for integration monitoring
- **Security logging** for audit trails

## Maintenance

### Regular Tasks
- **Monitor endpoint performance** and usage
- **Update external API integrations** as needed
- **Review error logs** for common issues
- **Optimize slow endpoints** for better performance
- **Update documentation** for API changes

### Update Procedures
- **Test changes** in development environment
- **Monitor external API** for breaking changes
- **Update dependencies** for security patches
- **Review rate limits** and quotas
- **Test backwards compatibility** for API changes

<!-- MANUAL: API-specific notes and endpoint documentation -->