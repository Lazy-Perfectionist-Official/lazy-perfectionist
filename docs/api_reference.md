# API Reference

This document describes the API endpoints available in the Lazy Perfectionist website.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Spotify API Integration

#### GET `/api/spotify`

Fetches music data from Spotify API for display on the music page.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "artists": [
        {
          "name": "string"
        }
      ],
      "album": {
        "name": "string",
        "images": [
          {
            "url": "string"
          }
        ],
        "release_date": "string"
      },
      "duration_ms": number,
      "external_urls": {
        "spotify": "string"
      },
      "preview_url": "string|null"
    }
  ]
}
```

**Usage in Components:**
```typescript
// Used in src/app/music/page.tsx
const response = await fetch('/api/spotify');
const data = await response.json();
setTracks(data.data || []);
```

### Medium API Integration

#### GET `/api/medium`

Fetches blog posts from Medium API for display on the blog page.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "subtitle": "string",
      "author": "string",
      "publishedDate": "string",
      "readTime": "string",
      "link": "string",
      "thumbnail": "string",
      "tags": ["string"]
    }
  ]
}
```

**Usage in Components:**
```typescript
// Used in src/app/blog/page.tsx
const response = await fetch('/api/medium');
const data = await response.json();
setPosts(data.data || []);
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `API_RATE_LIMIT` | Rate limit exceeded |
| `INVALID_REQUEST` | Invalid request parameters |
| `EXTERNAL_API_ERROR` | Third-party API error |
| `INTERNAL_ERROR` | Server internal error |

## Implementation Notes

### API Route Structure

API routes are located in `src/app/api/` directory following Next.js 13+ App Router convention:

```
src/app/api/
├── spotify/
│   └── route.ts    # Spotify API integration
└── medium/
    └── route.ts    # Medium API integration
```

### Environment Variables

API endpoints may require environment variables:

```env
# Spotify API
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

# Medium API
MEDIUM_API_KEY=your_api_key
MEDIUM_USERNAME=your_username
```

### Caching Strategy

- **Spotify Data**: Cached for 5 minutes to reduce API calls
- **Medium Data**: Cached for 10 minutes for blog content
- **Static Assets**: Handled by Next.js built-in caching

### Rate Limiting

- **Spotify**: Follows Spotify API rate limits
- **Medium**: Respects Medium API rate limits
- **Local**: No rate limiting for local development

## Development

### Creating New API Endpoints

1. Create directory in `src/app/api/endpoint-name/`
2. Add `route.ts` file with HTTP method handlers
3. Follow the response format consistency
4. Add error handling and validation
5. Update this documentation

Example:
```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your API logic here
    const data = { message: "Hello World" };
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        code: 'INTERNAL_ERROR'
      }
    }, { status: 500 });
  }
}
```

### Testing API Endpoints

```bash
# Test Spotify endpoint
curl http://localhost:3000/api/spotify

# Test Medium endpoint
curl http://localhost:3000/api/medium
```

## Security Considerations

- API keys are stored in environment variables
- CORS is configured for allowed origins
- Input validation on all endpoints
- Error messages don't expose sensitive information
- Rate limiting prevents abuse

## Monitoring

- API calls are logged to development console
- Errors are tracked with proper error boundaries
- Performance metrics available in production builds
- External API failures handled gracefully with fallbacks