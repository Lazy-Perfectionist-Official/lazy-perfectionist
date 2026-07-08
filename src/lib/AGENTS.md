<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# lib

## Purpose
Utility functions, helper modules, and core configurations that support application functionality. Contains shared logic used across components, pages, and API routes.

## Key Files

| File | Description |
|------|-------------|
| `utils.ts` | Core utility functions including the `cn()` class name merger |
| `db.ts` | Prisma database client configuration and connection |
| `spotify.ts` | Spotify API integration and data management |
| `analytics.ts` | Analytics tracking and event management |
| `platform-links.ts` | Music platform link generation and management |
| `socket.ts` | Socket.IO configuration for real-time features |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All utility files are at root level |

## For AI Agents

### Working In This Directory
- **Core utilities** and helper functions
- **Third-party integrations** and API clients
- **Database connections** and data access
- **Shared business logic** across the application
- **Type-safe** utilities with proper TypeScript

### Utility Categories

#### Core Utilities (`utils.ts`)
- **cn() function** for Tailwind class merging
- **Helper functions** for common operations
- **Type utilities** for data transformation
- **Validation helpers** for data checking
- **Formatting utilities** for display

#### Database Utilities (`db.ts`)
- **Prisma client** configuration
- **Database connection** management
- **Query helpers** for common operations
- **Transaction management** for complex operations
- **Error handling** for database failures

#### API Integrations
- **Spotify API** (`spotify.ts`) for music data
- **Analytics** (`analytics.ts`) for tracking
- **Platform links** (`platform-links.ts`) for music services
- **Socket.IO** (`socket.ts`) for real-time features

### Testing Requirements
- **Test utilities** with various input types
- **Verify API integrations** handle errors properly
- **Check database operations** for correctness
- **Validate type safety** with TypeScript
- **Test error handling** for edge cases

### Common Patterns
- **Pure functions** for predictable behavior
- **Proper error handling** with try-catch blocks
- **TypeScript types** for all functions
- **Memoization** for expensive operations
- **Singleton patterns** for connections

### Development Guidelines
- **Keep functions pure** when possible
- **Use proper TypeScript** for type safety
- **Handle errors** gracefully with fallbacks
- **Document complex logic** with comments
- **Test thoroughly** with unit tests

## Utility Library

### Core Utilities (`utils.ts`)

#### cn() Function
- **Purpose**: Merge Tailwind CSS classes with proper precedence
- **Usage**: `cn("base-class", condition && "conditional-class")`
- **Features**: Handles conflicts, deduplication, and conditional classes
- **Dependencies**: clsx and tailwind-merge libraries

#### Helper Functions
- **String manipulation** utilities
- **Array operations** and transformations
- **Object utilities** for data manipulation
- **Type guards** for type narrowing
- **Formatting functions** for display

### Database Utilities (`db.ts`)

#### Prisma Client
- **Singleton pattern** for database connection
- **Type-safe queries** with generated types
- **Connection management** for serverless environments
- **Error handling** for database operations
- **Transaction support** for complex operations

#### Usage Pattern
```typescript
import { db } from '@/lib/db'
const users = await db.user.findMany()
```

### API Integration Utilities

#### Spotify API (`spotify.ts`)
- **Artist data** retrieval and management
- **Album and track** information fetching
- **Audio features** analysis data
- **Playlist operations** for music management
- **Rate limiting** for API quota management

#### Analytics (`analytics.ts`)
- **Event tracking** for user actions
- **Page view tracking** for analytics
- **Custom event** management
- **Privacy compliance** for data collection
- **Performance monitoring** for optimization

#### Platform Links (`platform-links.ts`)
- **Song link generation** for music platforms
- **Multi-platform** support (Spotify, Apple Music, etc.)
- **URL validation** and normalization
- **Fallback handling** for unavailable platforms
- **Analytics integration** for link tracking

#### Socket.IO (`socket.ts`)
- **Real-time communication** setup
- **Event handling** for live updates
- **Room management** for targeted messaging
- **Connection management** for stability
- **Error handling** for disconnections

## Best Practices

### Code Organization
- **Logical grouping** of related utilities
- **Single responsibility** per function/module
- **Consistent naming** conventions
- **Proper TypeScript** types and interfaces
- **Clear documentation** for complex functions

### Performance Optimization
- **Memoization** for expensive computations
- **Caching strategies** for API calls
- **Lazy loading** for heavy utilities
- **Code splitting** when appropriate
- **Debouncing/throttling** for frequent operations

### Error Handling
- **Graceful degradation** for failures
- **Proper error types** for error handling
- **Fallback values** for error states
- **Logging** for debugging and monitoring
- **User-friendly** error messages

## TypeScript Usage

### Type Safety
- **Proper interfaces** for data structures
- **Generic functions** for reusability
- **Type guards** for type narrowing
- **Enum definitions** for constants
- **Union types** for flexible APIs

### Type Definitions
- **API response types** for external integrations
- **Database model types** from Prisma
- **Component prop types** for UI components
- **Utility function types** for helpers
- **Error types** for error handling

## Integration Points

### Component Integration
- **Imported by components** in `src/components/`
- **Used by pages** in `src/app/`
- **Consumed by API routes** in `src/app/api/`
- **Shared across features** for consistency

### External Service Integration
- **Spotify API** for music data
- **Analytics services** for tracking
- **Socket.IO server** for real-time features
- **Database** via Prisma ORM
- **Payment processors** for commerce

## Security Considerations

### API Security
- **Environment variables** for sensitive data
- **API key management** for external services
- **Rate limiting** for API quotas
- **Input validation** for security
- **HTTPS only** for production APIs

### Data Security
- **SQL injection prevention** via ORM
- **XSS prevention** with proper data handling
- **CSRF protection** for state-changing operations
- **Data validation** before processing
- **Secure headers** for HTTP requests

## Testing Strategies

### Unit Testing
- **Test pure functions** with various inputs
- **Mock API calls** for external services
- **Test error handling** for edge cases
- **Validate TypeScript types** prevent errors
- **Test performance** for expensive operations

### Integration Testing
- **Test API integrations** with real services
- **Verify database operations** work correctly
- **Test error flows** for external failures
- **Check transaction handling** for complex operations
- **Validate type safety** across integration points

## Troubleshooting

### Common Issues
- **Import errors**: Check path aliases and file extensions
- **Type errors**: Verify TypeScript types and interfaces
- **API failures**: Check credentials and rate limits
- **Database errors**: Verify connection and schema
- **Performance issues**: Profile and optimize operations

### Debugging Approaches
- **Console logging** for utility behavior
- **TypeScript errors** for type issues
- **API testing** with external services
- **Database queries** for data operations
- **Performance profiling** for optimization

## Maintenance

### Regular Tasks
- **Update dependencies** for security and features
- **Monitor API quotas** and rate limits
- **Optimize performance** for heavy operations
- **Document new utilities** and functions
- **Test thoroughly** after changes

### Documentation
- **Function documentation** for complex logic
- **Usage examples** for common patterns
- **Type documentation** for TypeScript types
- **Integration guides** for external services
- **Troubleshooting guides** for common issues

<!-- MANUAL: Utility-specific notes and implementation details -->