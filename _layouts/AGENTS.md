<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# _layouts

## Purpose
HTML layout templates for documentation and content presentation. Provides consistent styling and structure for various types of content pages.

## Key Files

| File | Description |
|------|-------------|
| `base.html` | Base HTML template with common structure and styling |
| `changelog.html` | Layout template for changelog entries and release notes |
| `docs.html` | Layout template for documentation pages and guides |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All layout templates are at root level |

## For AI Agents

### Working In This Directory
- Contains **HTML templates** for consistent page layouts
- **Shared structure** across different content types
- **CSS styling** embedded in templates
- **Reusable components** and design patterns
- **Maintain consistency** when modifying templates

### Template Structure

#### Common Elements
- **HTML5 doctype** and meta tags
- **Responsive viewport** configuration
- **Shared CSS styling** and design system
- **Consistent navigation** and header/footer
- **Content placeholder** regions for dynamic content

#### Template Variations
- **base.html** - Foundation template with core structure
- **changelog.html** - Optimized for release notes and updates
- **docs.html** - Enhanced for documentation and guides

### Testing Requirements
- **Test responsiveness** across different screen sizes
- **Verify consistent styling** across template variations
- **Check browser compatibility** for CSS and HTML features
- **Validate HTML structure** and accessibility
- **Test with different content lengths** and types

### Common Patterns
- **Semantic HTML** with proper heading hierarchy
- **CSS Grid/Flexbox** for responsive layouts
- **Mobile-first** responsive design approach
- **Consistent spacing** and typography scales
- **Accessible markup** with proper ARIA attributes

### Template Guidelines
- **Maintain consistency** across all template variations
- **Use semantic HTML** for better accessibility and SEO
- **Include responsive meta tags** for mobile optimization
- **Test with actual content** to ensure proper rendering
- **Document customization points** clearly

## Dependencies

### Internal
- Used by documentation in `docs/` directory
- Applied to changelog content in `changelogs/`
- May reference assets in `public/` and `assets/`
- Follows project design system conventions

### External
- **HTML5** - Modern HTML standards and best practices
- **CSS3** - Styling and layout features
- **Responsive design** - Mobile-first approach principles
- **Accessibility** - WCAG guidelines and standards

## Design System

### Typography
- **Consistent font families** across all templates
- **Proper heading hierarchy** (h1-h6)
- **Readable line heights** and spacing
- **Responsive font sizes** for different screens

### Color Scheme
- **Brand colors** for primary elements
- **Neutral colors** for text and backgrounds
- **Semantic colors** for alerts and highlights
- **High contrast** for accessibility

### Layout Patterns
- **Container-based** layouts with proper spacing
- **Grid systems** for structured content
- **Flexbox** for flexible components
- **Responsive breakpoints** for mobile optimization

## Template Features

### Base Template (base.html)
- **HTML5 structure** with proper doctype and meta tags
- **Viewport configuration** for responsive design
- **Core CSS styling** and design system
- **Placeholder regions** for content customization
- **Common header/footer** structure

### Changelog Template (changelog.html)
- **Optimized for release notes** and updates
- **Date-based organization** support
- **Version highlighting** and formatting
- **Change categorization** structure
- **Navigation elements** for historical entries

### Documentation Template (docs.html)
- **Enhanced readability** for long-form content
- **Code block styling** with syntax highlighting support
- **Table of contents** structure
- **Navigation elements** for related docs
- **Print-friendly** styling considerations

## Best Practices

### Accessibility
- **Use semantic HTML** elements appropriately
- **Include proper ARIA attributes** where needed
- **Ensure keyboard navigation** works correctly
- **Provide sufficient color contrast** for readability
- **Test with screen readers** for compatibility

### Performance
- **Minimize CSS** in template files
- **Use efficient selectors** and avoid deep nesting
- **Optimize images** and assets referenced in templates
- **Consider critical CSS** for above-the-fold content
- **Test rendering performance** on various devices

### Maintainability
- **Document customization points** clearly
- **Use consistent naming** conventions
- **Comment complex sections** of HTML/CSS
- **Maintain separation** between structure and styling
- **Test modifications** across all template variations

## Customization Guidelines

### Modifying Templates
- **Maintain backward compatibility** when possible
- **Test changes** across all content types using the template
- **Document new features** and customization options
- **Consider mobile impact** of layout changes
- **Update related documentation** as needed

### Adding New Templates
- **Follow existing patterns** and conventions
- **Include proper meta tags** and responsive configuration
- **Test with various content types** and lengths
- **Document the purpose** and use cases
- **Update this AGENTS.md** with new template information

## Troubleshooting

### Common Issues
- **Styling inconsistencies**: Check CSS specificity and inheritance
- **Responsive problems**: Verify viewport meta tag and media queries
- **Browser compatibility**: Test across different browsers and versions
- **Content overflow**: Ensure proper container sizing and overflow handling
- **Accessibility issues**: Validate with accessibility tools

### Debugging Steps
1. **Inspect HTML structure** for proper semantic markup
2. **Check CSS specificity** and inheritance
3. **Test in different browsers** and devices
4. **Validate HTML** and CSS with online tools
5. **Review template inheritance** and overrides

## Maintenance

### Regular Tasks
- **Review templates** for consistency and improvements
- **Test new browser versions** for compatibility
- **Update CSS** for performance and maintainability
- **Check accessibility** with automated tools
- **Document new features** and changes

### Updates and Improvements
- **Keep templates updated** with modern HTML/CSS practices
- **Improve accessibility** based on WCAG guidelines
- **Enhance responsive design** for new devices
- **Optimize performance** with cleaner CSS and HTML
- **Add new templates** for content types as needed

<!-- MANUAL: Template-specific notes and customization guidelines -->