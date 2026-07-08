<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# assets

## Purpose
Project assets and resources including images, graphics, and media files used throughout the application. Contains visual elements that support branding and user experience.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | All assets are in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `img/` | Image assets and graphics (see `assets/img/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- Contains **static assets** used throughout the application
- **Image optimization** is important for performance
- **Consistent branding** across all assets
- **Proper file organization** by asset type
- **Web-ready formats** with appropriate compression

### Asset Management

#### Image Assets
- **Optimized formats** (WebP, JPEG, PNG with proper compression)
- **Responsive versions** for different screen sizes
- **Consistent styling** and visual quality
- **Brand consistency** in colors and design
- **Accessibility** considerations with alt text

#### File Organization
- **Logical grouping** by asset type and purpose
- **Descriptive naming** conventions for easy reference
- **Version control** for asset updates
- **Size optimization** without quality loss
- **Backup strategy** for original high-quality files

### Testing Requirements
- **Test image loading** performance across different networks
- **Verify responsive behavior** on various screen sizes
- **Check visual consistency** across different browsers
- **Validate accessibility** with proper alt text and descriptions
- **Test asset delivery** through CDN or hosting

### Common Patterns
- **WebP format** for photographs and complex images
- **SVG format** for logos and simple graphics
- **Progressive JPEG** for large photographs
- **Responsive images** with srcset for different screen sizes
- **Lazy loading** for below-the-fold images

### Asset Guidelines
- **Optimize file sizes** while maintaining quality
- **Use appropriate formats** for different image types
- **Maintain consistent branding** across all assets
- **Document asset usage** and permissions
- **Regular audits** for unused or outdated assets

## Dependencies

### Internal
- Referenced by components in `src/components/`
- Used in pages throughout `src/app/`
- Linked in documentation and templates
- May be processed by build tools for optimization

### External
- **Image hosting** - CDN or static file hosting
- **Image optimization** - Build tools and services
- **Asset delivery** - Content delivery networks
- **Design tools** - Photoshop, Illustrator, etc.

## Asset Types

### Images
- **Photographs** - Album art, artist photos, event images
- **Graphics** - Logos, icons, decorative elements
- **Screenshots** - Documentation and tutorial images
- **Banners** - Header images and promotional graphics

### Media Files
- **Video files** - Promotional content and music videos
- **Audio files** - Music samples and previews
- **Animations** - GIF or video animations

### Design Assets
- **Brand assets** - Logos, color schemes, typography
- **UI elements** - Icons, buttons, backgrounds
- **Print materials** - Ready for print graphics

## Best Practices

### Image Optimization
- **Compress images** to reduce file size without quality loss
- **Use appropriate formats** (WebP for photos, SVG for graphics)
- **Implement lazy loading** for improved initial load time
- **Provide responsive versions** for different screen sizes
- **Consider using CDNs** for faster asset delivery

### Brand Consistency
- **Maintain visual consistency** across all assets
- **Use brand colors** and typography correctly
- **Ensure proper logo usage** and sizing
- **Keep high-quality versions** of important assets
- **Document brand guidelines** and usage rules

### Accessibility
- **Provide descriptive alt text** for all images
- **Consider color contrast** for visual elements
- **Ensure text alternatives** for important visual information
- **Test with screen readers** for compatibility
- **Provide captions** for video and audio content

## File Organization

### Recommended Structure
```
assets/
├── img/
│   ├── logo/              # Logo variants and branding
│   ├── album-art/         # Music release artwork
│   ├── artist/            # Artist photos and graphics
│   ├── ui/                # UI elements and icons
│   └── promotional/       # Marketing and promotional images
├── video/                 # Video content
├── audio/                 # Audio files
└── design/                # Source design files
```

### Naming Conventions
- **Descriptive names** that indicate content and purpose
- **Lowercase with hyphens** for web compatibility
- **Version indicators** when multiple versions exist
- **Size indicators** for responsive versions
- **Consistent patterns** across similar assets

## Performance Optimization

### Image Techniques
- **Lossy compression** for photographs (JPEG, WebP)
- **Lossless compression** for graphics (PNG, SVG)
- **Responsive images** with srcset attributes
- **Lazy loading** for below-the-fold content
- **Progressive loading** for large images

### Delivery Optimization
- **CDN usage** for faster asset delivery
- **Caching strategies** for improved performance
- **Format selection** based on browser support
- **Size optimization** for mobile networks
- **Preloading** for critical assets

## Legal Considerations

### Asset Rights
- **Document ownership** and usage rights for all assets
- **Obtain proper licenses** for third-party assets
- **Credit creators** when required by licenses
- **Maintain records** of asset permissions
- **Respect copyright** and intellectual property

### Privacy and Consent
- **Ensure proper consent** for photos of people
- **Follow privacy guidelines** for personal content
- **Document model releases** when applicable
- **Consider privacy implications** of location data
- **Follow relevant laws** and regulations

## Maintenance

### Regular Tasks
- **Audit assets** for unused or outdated files
- **Optimize file sizes** for better performance
- **Update branding assets** when design changes
- **Check for broken links** to missing assets
- **Document new assets** and their usage

### Asset Updates
- **Keep assets updated** with current branding
- **Replace low-quality versions** with better ones
- **Add new assets** as features expand
- **Remove obsolete assets** to reduce clutter
- **Organize assets** for easy discovery and use

## Troubleshooting

### Common Issues
- **Slow loading**: Optimize file sizes and implement lazy loading
- **Broken images**: Check file paths and server configuration
- **Quality issues**: Verify compression settings and source quality
- **Responsive problems**: Test different screen sizes and devices
- **Browser compatibility**: Ensure format support across browsers

### Debugging Steps
1. **Check file paths** and server accessibility
2. **Verify file formats** are supported by target browsers
3. **Test image optimization** settings and quality
4. **Review responsive configuration** and srcset attributes
5. **Monitor network requests** for asset loading issues

<!-- MANUAL: Asset-specific notes and management guidelines -->