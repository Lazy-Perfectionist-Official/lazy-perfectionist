<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# img

## Purpose
Image assets for branding, UI elements, and content throughout the Lazy Perfectionist website. Contains optimized images for logos, album artwork, and visual effects.

## Key Files

| File | Description |
|------|-------------|
| `logo.png` | Main logo for general use and branding |
| `logo-handwritten.png` | Handwritten logo variant for music pages |
| `orbit-cover.jpg` | Album cover artwork for "Orbit" release |
| `noise.jpg` | Noise texture for background effects |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All images are at root level |

## For AI Agents

### Working In This Directory
- **Optimized images** for web performance
- **Brand assets** requiring consistent usage
- **Large file sizes** should be further optimized if used frequently
- **High-quality originals** should be preserved
- **Alternative formats** (WebP) should be considered for better compression

### Image Specifications

#### Logo Images
- **logo.png** (584KB) - Standard logo for general use
- **logo-handwritten.png** (1.4MB) - Artistic variant for music-related pages
- **High resolution** for crisp display on retina displays
- **PNG format** for transparency support
- **Large file sizes** suggest need for optimization

#### Content Images
- **orbit-cover.jpg** (11MB) - Album artwork for "Orbit" release
- **Very large file** should be optimized or converted to WebP
- **High quality** suitable for close viewing
- **JPEG format** appropriate for photography

#### Effect Images
- **noise.jpg** (11MB) - Background noise texture
- **Extremely large** for a simple texture effect
- **Should be optimized** or replaced with CSS/Canvas solution
- **JPEG format** suitable for texture patterns

### Testing Requirements
- **Test image loading** performance on different network speeds
- **Verify responsive behavior** on various screen sizes
- **Check image quality** remains acceptable after optimization
- **Test color accuracy** across different displays
- **Verify accessibility** with proper alt text in components

### Common Patterns
- **Use Next.js Image component** for automatic optimization
- **Provide responsive versions** for different screen sizes
- **Consider WebP format** for better compression ratios
- **Lazy load** large images below the fold
- **Use CSS effects** where possible instead of large image files

### Optimization Guidelines
- **Compress images** to reduce file sizes significantly
- **Convert to WebP** where browser support allows
- **Create responsive versions** for different device sizes
- **Use CSS patterns** for repetitive textures like noise
- **Implement progressive loading** for large images

## Usage Guidelines

### Logo Usage
- **logo.png** for general branding and headers
- **logo-handwritten.png** for music pages and artistic contexts
- **Maintain aspect ratios** when scaling logos
- **Use appropriate sizes** for different contexts (header, footer, etc.)
- **Consider SVG format** for future logo implementations

### Album Artwork Usage
- **orbit-cover.jpg** primarily for music pages
- **Use Next.js Image component** for automatic optimization
- **Provide responsive versions** for mobile devices
- **Consider creating thumbnails** for gallery views
- **Maintain artist intent** when cropping or resizing

### Background Effects
- **noise.jpg** currently used for background texture
- **Consider CSS-based noise** for better performance
- **Use very subtle opacity** for texture overlay
- **Ensure text readability** over textured backgrounds
- **Test color contrast** for accessibility

## Performance Optimization

### Current Issues
- **Extremely large file sizes** (11MB for single images)
- **Slow loading** on mobile networks
- **Unnecessary quality** for web display purposes
- **Better alternatives** exist for most use cases

### Optimization Strategies
- **Convert to WebP** for 50-80% size reduction
- **Resize to actual display dimensions** needed
- **Use CSS gradients/patterns** for noise effects
- **Implement lazy loading** for below-the-fold images
- **Consider CDN delivery** for faster loading

### Recommended Actions
1. **Optimize orbit-cover.jpg** to under 500KB
2. **Replace noise.jpg** with CSS noise generator
3. **Convert logos to WebP** with PNG fallback
4. **Create responsive versions** for mobile devices
5. **Implement progressive loading** for large images

## Image Quality Standards

### Display Requirements
- **Retina display support** with 2x resolution
- **Color accuracy** for brand consistency
- **Proper aspect ratios** for different contexts
- **Crisp edges** for logos and text
- **Appropriate compression** for web use

### File Size Targets
- **Logos**: Under 100KB (ideally under 50KB)
- **Album art**: Under 500KB for full size, under 100KB for thumbnails
- **Background effects**: Under 50KB, preferably CSS-based
- **UI elements**: Under 20KB per element
- **Photography**: Under 1MB for full size, under 200KB for web display

## Best Practices

### Image Selection
- **Choose appropriate format** for content type (JPEG for photos, PNG for graphics)
- **Consider modern formats** like WebP for better compression
- **Optimize for web** rather than print quality
- **Provide multiple sizes** for responsive design
- **Test on actual devices** for quality assessment

### Implementation
- **Use Next.js Image component** for automatic optimization
- **Provide proper alt text** for accessibility
- **Implement lazy loading** for performance
- **Use responsive images** with srcset
- **Consider critical CSS** for above-the-fold images

## Maintenance

### Regular Tasks
- **Monitor file sizes** and optimize as needed
- **Update branding assets** when design changes
- **Add new album artwork** as music is released
- **Remove unused images** to reduce clutter
- **Test image performance** regularly

### Optimization Schedule
- **Quarterly review** of all image assets
- **Pre-deployment optimization** for new images
- **Performance monitoring** for slow-loading images
- **Browser support check** for modern formats
- **Accessibility audit** for alt text and descriptions

## Troubleshooting

### Common Issues
- **Slow loading**: Images are too large or not optimized
- **Poor quality**: Over-compression or wrong format selection
- **Display issues**: Incorrect dimensions or aspect ratios
- **Color problems**: Color space or profile issues
- **Accessibility**: Missing or inadequate alt text

### Solutions
- **Optimize file sizes** with proper compression
- **Use appropriate formats** for content type
- **Provide responsive versions** for different screens
- **Test color accuracy** across displays
- **Add descriptive alt text** for all images

## Integration Points

### Component Usage
- **Logos** used by Navigation component and layouts
- **Album art** used by music components and pages
- **Background effects** used by Background component
- **All images** should use Next.js Image component

### Page Integration
- **Home page** uses logo and background effects
- **Music pages** use album artwork and handwritten logo
- **Blog pages** may use logos and branding elements
- **Store page** uses logo and promotional images

<!-- MANUAL: Image optimization notes and usage guidelines -->