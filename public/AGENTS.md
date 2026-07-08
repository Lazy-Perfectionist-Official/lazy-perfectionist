<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# public

## Purpose
Static assets and public files served directly by Next.js. Contains images, favicons, robots.txt, and other static resources that don't require processing.

## Key Files

| File | Description |
|------|-------------|
| `robots.txt` | SEO robots configuration for search engine crawlers |
| `favicon.svg` | Main favicon for the website |
| `favicon.ico` | Legacy favicon format for older browsers |
| `apple-touch-icon.png` | iOS home screen icon |
| `icon-512x512.png` | Large icon for PWA and high-DPI displays |
| `logo.svg` | Main logo with high resolution for various uses |
| `google9673dc612612f873.html` | Google Search Console verification file |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `assets/` | Additional static assets (see `public/assets/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- This directory contains **static files** served directly by Next.js
- Files are accessible from the **root URL path** (e.g., `/logo.svg`)
- **No processing or optimization** is applied to files in this directory
- For optimized images, use Next.js `Image` component from `public/` sources
- **Update robots.txt** when adding new routes or sections
- **Maintain icon consistency** across different formats and sizes

### SEO Files

#### robots.txt
- Configured for **SEO optimization** specific to music artist websites
- **Allow all crawlers** for maximum discoverability
- **Sitemap reference** to dynamic sitemap generation
- **Crawl-delay** settings for respectful crawling

#### Google Verification
- `google9673dc612612f873.html` verifies site ownership with Google Search Console
- Required for **Google SEO features** and search performance monitoring
- Should **never be removed or modified** without updating Google Search Console

### Icon Management

#### Favicons and Icons
- **favicon.svg** - Modern SVG format with best quality and scalability
- **favicon.ico** - Legacy format for older browser compatibility
- **apple-touch-icon.png** - iOS devices and home screen bookmarks
- **icon-512x512.png** - Progressive Web App (PWA) and high-DPI displays
- **Maintain visual consistency** across all icon formats

#### Logo Files
- **logo.svg** - High-resolution main logo for headers and branding
- Used throughout the site for **brand identity**
- Ensure **proper SVG optimization** for file size and rendering

### Testing Requirements
- **Test all icons** render correctly in different browsers and devices
- **Verify robots.txt** accessibility at `/robots.txt`
- **Check Google verification** file is accessible and correct
- **Test image loading** performance for large files
- **Validate SEO files** with relevant tools

### Common Patterns
- **File naming**: Use lowercase, hyphenated names for consistency
- **Image optimization**: Use appropriate formats (WebP for photos, SVG for graphics)
- **File size**: Keep files as small as possible without quality loss
- **Accessibility**: Include alt text considerations for images
- **SEO**: Maintain proper robots.txt and sitemap references

### File Management Guidelines
- **Add new favicons** when updating branding
- **Keep old formats** for backward compatibility
- **Optimize large images** before adding to this directory
- **Update robots.txt** when adding new URL patterns
- **Never modify Google verification file** without proper setup

## Dependencies

### Internal
- Images referenced by components in `src/components/`
- Favicon linked in `src/app/layout.tsx`
- Robots.txt referenced by search engines

### External
- **Google Search Console** - Site verification and SEO monitoring
- **Web browsers** - Favicon and icon rendering
- **Search engines** - robots.txt parsing and compliance

## File Organization

### Recommended Structure
```
public/
├── robots.txt                    # SEO configuration
├── favicon.svg                   # Modern favicon
├── favicon.ico                   # Legacy favicon
├── apple-touch-icon.png         # iOS icon
├── icon-512x512.png             # PWA icon
├── logo.svg                     # Main logo
├── google*.html                  # Verification files
└── assets/                      # Additional assets
    └── img/                     # Static images
```

## Best Practices

### Performance
- **Compress images** before adding to this directory
- **Use appropriate formats** (WebP for photos, SVG for graphics)
- **Consider file sizes** for mobile performance
- **Lazy load** large images when possible

### SEO
- **Keep robots.txt updated** with current site structure
- **Maintain sitemap reference** in robots.txt
- **Don't block important resources** from crawlers
- **Monitor crawl activity** via Google Search Console

### Branding
- **Maintain visual consistency** across all icon formats
- **Update all icon files** when rebranding
- **Test icons** on different devices and browsers
- **Keep high-resolution versions** for quality

## Maintenance

### Regular Tasks
- **Check robots.txt** accuracy when adding new routes
- **Test favicons** after site updates
- **Verify Google verification** file is accessible
- **Optimize large images** that may affect performance
- **Update branding** across all icon files when needed

### Troubleshooting
- **Favicon not showing**: Clear browser cache and check file paths
- **SEO issues**: Verify robots.txt is accessible and properly formatted
- **Slow loading**: Check file sizes of large images
- **Broken icons**: Test with different browsers and devices

<!-- MANUAL: Static asset management notes and additional guidelines -->