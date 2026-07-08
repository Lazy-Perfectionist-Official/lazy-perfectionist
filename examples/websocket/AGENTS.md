<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# websocket

## Purpose
WebSocket implementation examples demonstrating real-time communication patterns using Socket.IO. Shows server setup, client connections, and event handling patterns.

## Key Files

| File | Description |
|------|-------------|
| `page.tsx` | WebSocket client implementation example with real-time features |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All WebSocket examples are at root level |

## For AI Agents

### Working In This Directory
- **Reference implementation** for WebSocket patterns
- **Socket.IO integration** example with Next.js
- **Real-time communication** demonstration
- **Client-server** event handling patterns
- **Production-ready** code examples

### WebSocket Architecture

#### Socket.IO Integration
- **Server setup** with Socket.IO configuration
- **Client connection** with event listeners
- **Event handling** for real-time messages
- **Room management** for targeted communication
- **Error handling** for connection issues

#### Real-time Features
- **Live updates** for data changes
- **User presence** indicators
- **Notifications** for important events
- **Collaborative features** for multi-user interaction
- **Status synchronization** across clients

### Testing Requirements
- **Test WebSocket connections** establish properly
- **Verify event handling** works correctly
- **Check reconnection** logic for dropped connections
- **Test room management** for user grouping
- **Validate error handling** for connection failures

### Common Patterns
- **Event-driven architecture** for real-time updates
- **Graceful degradation** when WebSocket unavailable
- **Fallback mechanisms** for older browsers
- **Proper cleanup** for disconnections
- **Error recovery** for connection issues

### Development Guidelines
- **Test thoroughly** with various network conditions
- **Handle edge cases** for connection failures
- **Implement proper** authentication for sensitive features
- **Monitor performance** for connection overhead
- **Document event schemas** for client-server communication

## Implementation Details

### Server Configuration
- **Socket.IO server** setup with Next.js custom server
- **CORS configuration** for cross-origin requests
- **Authentication middleware** for secure connections
- **Event validation** for incoming messages
- **Rate limiting** for connection management

### Client Implementation
- **Socket.IO client** initialization
- **Event listeners** for server messages
- **Emit functions** for client-to-server communication
- **Connection status** monitoring
- **Reconnection logic** for network issues

## Best Practices

### Security Considerations
- **Authentication** for WebSocket connections
- **Authorization** for sensitive events
- **Input validation** for all messages
- **Rate limiting** for event emissions
- **Secure transmission** for sensitive data

### Performance Optimization
- **Connection pooling** for multiple clients
- **Event batching** for frequent updates
- **Message compression** for large payloads
- **Selective updates** to reduce bandwidth
- **Connection management** for scalability

### Error Handling
- **Connection failures** with fallback mechanisms
- **Event errors** with proper logging
- **Network issues** with reconnection logic
- **Client disconnections** with graceful handling
- **Server errors** with user feedback

## Event Patterns

### Common Event Types
- **Connection events** (connect, disconnect, error)
- **Data updates** (create, update, delete notifications)
- **User presence** (join, leave, status changes)
- **System events** (maintenance, shutdown, alerts)
- **Custom events** (application-specific features)

### Event Naming Conventions
- **Descriptive names** for event purposes
- **Namespace prefixes** for event categories
- **Consistent casing** (camelCase for events)
- **Version suffixes** for event evolution
- **Documentation** for event schemas

## Integration Points

### Next.js Integration
- **Custom server** setup with Socket.IO
- **API routes** for WebSocket initialization
- **Client components** with WebSocket hooks
- **Server actions** for event validation
- **Middleware** for authentication

### Database Integration
- **Real-time data** synchronization
- **Change tracking** for database events
- **Query invalidation** for cache updates
- **Transaction support** for data consistency
- **Performance monitoring** for database load

## Testing Strategies

### Unit Testing
- **Event handlers** with mock sockets
- **Connection logic** with simulated clients
- **Error handling** with failure scenarios
- **Event validation** with various inputs
- **Reconnection logic** with network simulation

### Integration Testing
- **Real WebSocket connections** between client and server
- **Multiple clients** for room testing
- **Network conditions** for reliability testing
- **Authentication flows** for security testing
- **Performance testing** for load conditions

## Troubleshooting

### Common Issues
- **Connection failures**: Check server configuration and CORS settings
- **Event not received**: Verify event names and listener registration
- **Performance issues**: Monitor event frequency and payload sizes
- **Authentication problems**: Validate token generation and validation
- **Memory leaks**: Check for proper cleanup and event listener management

### Debugging Approaches
- **Socket.IO admin UI** for connection monitoring
- **Event logging** for message tracking
- **Network inspection** for WebSocket frames
- **Client debugging** for connection issues
- **Server logging** for event handling

## Usage Examples

### Basic Connection
```typescript
// Client connection
const socket = io('http://localhost:3000')
socket.on('connect', () => console.log('Connected'))
socket.on('event', (data) => console.log('Received:', data))
```

### Event Emission
```typescript
// Emit event to server
socket.emit('user-action', { type: 'click', target: 'button' })

// Server event handling
io.on('connection', (socket) => {
  socket.on('user-action', (data) => {
    // Handle user action
  })
})
```

### Room Management
```typescript
// Join room
socket.emit('join-room', { roomId: 'music-room-1' })

// Send to room
io.to('music-room-1').emit('room-update', updateData)
```

## Performance Monitoring

### Metrics to Track
- **Connection count** and frequency
- **Event rates** per connection
- **Message sizes** and bandwidth usage
- **Error rates** and types
- **Memory usage** per connection

### Optimization Strategies
- **Event batching** for high-frequency updates
- **Message compression** for large payloads
- **Connection pooling** for server resources
- **Selective broadcasting** for targeted updates
- **Load balancing** for horizontal scaling

## Security Best Practices

### Authentication
- **Token-based authentication** for connections
- **Authorization checks** for room access
- **Session validation** for persistent connections
- **Rate limiting** for event emissions
- **Input sanitization** for all messages

### Data Protection
- **Encryption** for sensitive messages
- **Validation** for all incoming data
- **Sanitization** for user-generated content
- **Logging** for security monitoring
- **Audit trails** for sensitive operations

<!-- MANUAL: WebSocket implementation notes and specific patterns -->