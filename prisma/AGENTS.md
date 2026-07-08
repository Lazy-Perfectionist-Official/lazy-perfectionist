<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# prisma

## Purpose
Database schema management and migrations using Prisma ORM with SQLite for development. Contains the data models for music management, user authentication, and content management.

## Key Files

| File | Description |
|------|-------------|
| `schema.prisma` | Database schema definition with models for Users, Posts, Artists, Albums, Tracks, PlatformLinks, and SyncHistory |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All Prisma files are at the root level |

## For AI Agents

### Working In This Directory
- **Always run `npm run db:generate`** after modifying `schema.prisma`
- **Always run `npm run db:push`** after schema changes to sync with database
- Use **SQLite** for development (configured in `schema.prisma`)
- Models support **music management** with Spotify integration
- **Cascading deletes** are configured for related entities
- Use **cuid()** for primary keys by default

### Database Models

#### Core Models
- **User**: Basic user authentication and management
- **Post**: Content management for blog posts

#### Music Management Models
- **Artist**: Spotify artist information with sync tracking
- **Album**: Music albums with Spotify metadata
- **Track**: Individual tracks with audio features and platform links
- **PlatformLink**: Multi-platform streaming links for tracks
- **SyncHistory**: Audit trail for Spotify API synchronization

### Testing Requirements
- After schema changes: `npm run db:push` then `npm run db:generate`
- Test database relationships and cascading deletes
- Verify Spotify API sync functionality works with new schema
- Test database constraints and unique fields

### Common Patterns
- **Primary Keys**: Use `@id @default(cuid())` for all models
- **Timestamps**: Include `createdAt` and `updatedAt` with `@updatedAt` decorator
- **Relations**: Use proper foreign key relationships with `onDelete: Cascade`
- **Unique Constraints**: Add `@unique` for fields that should be unique (e.g., Spotify IDs)
- **Defaults**: Use appropriate defaults (booleans, integers, timestamps)

### Schema Modification Rules
- **Add fields**: Can be added safely without data loss
- **Remove fields**: Risk of data loss - consider migration strategy
- **Change relationships**: May require data migration
- **Modify indexes**: Can affect performance, test thoroughly
- **Always backup** database before major schema changes

## Dependencies

### Internal
- Database client used throughout `src/lib/db.ts`
- Models accessed via API routes in `src/app/api/`
- Sync operations in music-related components

### External
- **@prisma/client** - Generated database client
- **prisma** - CLI tool for migrations and client generation

## Database Operations

### Common Commands
```bash
# Generate client after schema changes
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Create and run migrations (production)
npm run db:migrate

# Reset database (development only)
npm run db:reset
```

### Migration Strategy
- **Development**: Use `db:push` for rapid prototyping
- **Production**: Use `db:migrate` for version-controlled schema changes
- **Reset**: Only use `db:reset` in development environments

## Music Management Schema

### Spotify Integration
- **Artist**: Spotify artist profiles with follower counts and popularity
- **Album**: Complete discography with release dates and artwork
- **Track**: Individual tracks with audio features and metadata
- **Platform Links**: Unified platform linking (Spotify, Apple Music, YouTube, etc.)

### Sync Tracking
- **SyncHistory**: Comprehensive audit trail of all Spotify API operations
- **Timestamps**: Track when data was last synced with Spotify
- **Status Tracking**: Monitor success/failure of sync operations

## Error Handling

### Common Issues
- **Foreign Key Violations**: Ensure parent records exist before creating children
- **Unique Constraints**: Handle duplicate Spotify ID errors gracefully
- **Migration Conflicts**: Resolve schema changes carefully to avoid data loss
- **Connection Issues**: Handle database connection errors in API routes

### Best Practices
- Always use try-catch blocks for database operations
- Validate data before database operations
- Handle duplicate entries for Spotify data
- Log sync operations for debugging

<!-- MANUAL: Database-specific notes and patterns below -->