<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# health

## Purpose
Health check endpoint for monitoring system status, uptime tracking, and service availability. Provides a simple endpoint for monitoring services and load balancers.

## Key Files

| File | Description |
|------|-------------|
| `route.ts` | Health check API route handler |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All health functionality is in the route file |

## For AI Agents

### Working In This Directory
- **Health check endpoint** for system monitoring
- **Simple status response** for uptime checks
- **Service availability** monitoring
- **Load balancer** health checks
- **Minimal processing** for fast response times

### Endpoint Specification

#### HTTP Method
- **GET** request for health check

#### Response Format
```json
{
  "status": "healthy",
  "timestamp": "2025-07-08T12:00:00Z",
  "uptime": 1234567
}
```

#### Status Codes
- **200 OK** - System is healthy
- **503 Service Unavailable** - System is unhealthy

### Testing Requirements
- **Test endpoint accessibility** at `/api/health`
- **Verify response format** matches specification
- **Check response time** is under 100ms
- **Test monitoring service** integration
- **Validate error handling** for system failures

### Common Patterns
- **Fast response** with minimal processing
- **Caching headers** for reduced server load
- **Monitoring service** integration
- **Error handling** for graceful degradation
- **Logging** for health status tracking

### Development Guidelines
- **Keep endpoint lightweight** and fast
- **Return appropriate** HTTP status codes
- **Include relevant** health information
- **Handle errors** gracefully
- **Log health checks** for monitoring

## Implementation Details

### Health Checks
- **Database connectivity** verification
- **External API** availability checks
- **Server resources** monitoring
- **Critical services** status verification
- **Performance metrics** collection

### Response Information
- **Overall system** health status
- **Current timestamp** for freshness
- **System uptime** for monitoring
- **Service status** for dependencies
- **Performance metrics** for optimization

## Best Practices

### Endpoint Design
- **Keep responses** simple and lightweight
- **Return appropriate** HTTP status codes
- **Include caching** headers for efficiency
- **Handle errors** gracefully
- **Monitor response** times

### Monitoring Integration
- **Uptime monitoring** service integration
- **Load balancer** health checks
- **Alert configuration** for failures
- **Performance tracking** over time
- **Historical data** analysis

## Troubleshooting

### Common Issues
- **Endpoint not responding**: Check server configuration and routing
- **Slow response times**: Review processing logic and database queries
- **Incorrect status codes**: Validate health check logic
- **Monitoring integration issues**: Test external service configuration
- **High server load**: Optimize endpoint performance

### Debugging Steps
1. **Test endpoint** directly with curl or browser
2. **Check server logs** for error messages
3. **Verify database connectivity** and response times
4. **Test monitoring service** integration
5. **Review performance metrics** and optimization

## Maintenance

### Regular Tasks
- **Monitor endpoint response** times and availability
- **Review health check logic** for accuracy
- **Update monitoring service** configuration as needed
- **Test error handling** for system failures
- **Optimize performance** based on metrics

### Health Check Updates
- **Add new service** checks as needed
- **Remove deprecated** service checks
- **Update response format** for monitoring needs
- **Adjust thresholds** for health determination
- **Enhance error messages** for debugging

<!-- MANUAL: Health check specific notes and monitoring configuration -->