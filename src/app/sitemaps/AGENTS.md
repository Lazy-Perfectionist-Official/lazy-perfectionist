<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# sitemaps

## Purpose
Dynamic sitemap generation for SEO optimization, providing search engines with comprehensive site structure and content updates. Automatically updates as new content is added.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | Sitemap functionality is in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All sitemap functionality is handled by Next.js sitemap generation |

## For AI Agents

### Working In This Directory
- **Dynamic sitemap generation** for SEO
- **Automatic updates** as content changes
- **Search engine optimization** for better indexing
- **Content discovery** for search crawlers
- **XML sitemap format** compliance

### Sitemap Architecture

#### Generation Strategy
- **Next.js sitemap** generation from file structure
- **Dynamic content** inclusion from database
- **Priority assignment** based on content importance
- **Update frequency** specification for crawlers
- **Multi-language** support if applicable

#### Content Types
- **Static pages** from app directory structure
- **Dynamic routes** from database content
- **Blog posts** from Medium integration
- **Music pages** with release information
- **Platform links** and store pages

### Testing Requirements
- **Validate sitemap** XML format and syntax
- **Test sitemap accessibility** at `/sitemap.xml`
- **Verify all URLs** are included and accessible
- **Check update frequency** settings are appropriate
- **Test sitemap submission** to search engines

### Common Patterns
- **Automatic generation** based on file structure
- **Database queries** for dynamic content
- **Proper priority** assignment for pages
- **Update frequency** specification
- **Last modified** timestamps for freshness

### Development Guidelines
- **Keep sitemap updated** as content changes
- **Test sitemap accessibility** regularly
- **Monitor search engine** crawl behavior
- **Update priorities** based on content importance
- **Follow XML sitemap** standards and specifications

## SEO Implementation

### Sitemap Structure
- **XML format** compliance with sitemap.org standards
- **URL inclusion** for all important pages
- **Priority assignment** (0.1 to 1.0) for crawling
- **Change frequency** (daily, weekly, monthly) specification
- **Last modified** timestamps for freshness

### Content Prioritization
- **High priority** (0.8-1.0) for main pages
- **Medium priority** (0.5-0.7) for important content
- **Low priority** (0.1-0.4) for less critical pages
- **Dynamic adjustment** based on content updates
- **Regular review** for optimal crawling

## Dynamic Content

### Database Integration
- **Blog posts** from Medium API integration
- **Music releases** from Spotify API
- **Platform links** for music streaming
- **Store pages** and product information
- **Additional content** as site grows

### Update Strategy
- **Automatic updates** as content changes
- **Incremental regeneration** for performance
- **Cache invalidation** for fresh content
- **Error handling** for content failures
- **Fallback content** for unavailable data

## Best Practices

### Sitemap Optimization
- **Keep sitemap focused** on important content
- **Exclude unnecessary** URLs and parameters
- **Use proper priorities** for crawling efficiency
- **Specify realistic** update frequencies
- **Monitor search engine** crawl behavior

### Performance Considerations
- **Efficient generation** for fast loading
- **Caching strategy** for reduced server load
- **Incremental updates** for large sitemaps
- **Split large sitemaps** if needed
- **Monitor generation time** and optimize

## Integration Points

### Search Engine Submission
- **Google Search Console** sitemap submission
- **Bing Webmaster Tools** sitemap submission
- **Other search engines** as needed
- **Regular monitoring** of crawl status
- **Error tracking** for failed crawls

### Analytics Integration
- **Search traffic** monitoring from sitemap
- **Crawl rate** analysis by search engines
- **Index coverage** tracking
- **SEO performance** metrics
- **Content discovery** effectiveness

## Technical Implementation

### Generation Process
- **Next.js sitemap** generation from app structure
- **Dynamic route** inclusion from database
- **Priority calculation** based on content type
- **Last modified** timestamp extraction
- **XML formatting** for sitemap compliance

### Error Handling
- **Graceful degradation** for missing content
- **Error logging** for generation failures
- **Fallback content** for unavailable data
- **Validation** for XML format compliance
- **Retry logic** for transient failures

## Maintenance

### Regular Tasks
- **Monitor sitemap generation** for errors
- **Review search engine** crawl reports
- **Update priorities** based on content changes
- **Test sitemap accessibility** regularly
- **Optimize generation** performance

### Content Updates
- **Automatic inclusion** of new content
- **Priority adjustment** for important pages
- **Update frequency** modification as needed
- **Last modified** timestamp updates
- **Error correction** for failed URLs

## Troubleshooting

### Common Issues
- **Sitemap not generating**: Check Next.js configuration and file structure
- **Missing URLs**: Verify database queries and content inclusion
- **XML format errors**: Validate sitemap syntax and structure
- **Performance issues**: Optimize generation process and caching
- **Search engine errors**: Test sitemap accessibility and format

### Debugging Steps
1. **Test sitemap accessibility** at `/sitemap.xml`
2. **Validate XML format** with online tools
3. **Check database queries** for content inclusion
4. **Review generation logs** for error messages
5. **Test search engine submission** process

## Future Enhancements

### Planned Features
- **Video sitemaps** for music video content
- **Image sitemaps** for album artwork
- **News sitemaps** for blog content
- **Multi-language** sitemap support
- **Real-time updates** for dynamic content

### Technical Improvements
- **Enhanced caching** for better performance
- **Real-time updates** for new content
- **Better error handling** for failures
- **Advanced analytics** for crawl behavior
- **Split sitemaps** for large sites

## SEO Strategy

### Sitemap Benefits
- **Improved crawling** by search engines
- **Faster indexing** of new content
- **Better content discovery** for search engines
- **Priority signaling** for important pages
- **Freshness indication** for content updates

### Search Engine Optimization
- **Comprehensive coverage** of site content
- **Proper priority** assignment for crawling
- **Realistic update** frequency specification
- **Regular submission** to search engines
- **Monitoring of** crawl behavior and indexing

<!-- MANUAL: Sitemap generation specific notes and SEO implementation details -->