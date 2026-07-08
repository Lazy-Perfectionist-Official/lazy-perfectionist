<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# analytics

## Purpose
Analytics tracking endpoints for monitoring user behavior, page views, click events, and engagement metrics. Provides server-side tracking with privacy compliance and performance optimization.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | Analytics functionality is in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `click/` | Click event tracking endpoint (see `src/app/api/analytics/click/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- **Analytics tracking** for user behavior
- **Server-side processing** for privacy compliance
- **Event aggregation** and reporting
- **Performance monitoring** for optimization
- **Privacy compliance** with data protection regulations

### Analytics Architecture

#### Event Types
- **Page views** for traffic monitoring
- **Click events** for interaction tracking
- **Custom events** for specific actions
- **Performance metrics** for optimization
- **Error tracking** for monitoring

#### Data Processing
- **Event validation** and sanitization
- **Data aggregation** and summarization
- **Privacy filtering** for compliance
- **Storage optimization** for efficiency
- **Real-time processing** when possible

### Testing Requirements
- **Test event tracking** accuracy and completeness
- **Verify privacy compliance** with regulations
- **Check performance** under high load
- **Validate data integrity** and accuracy
- **Test error handling** for malformed events

### Common Patterns
- **Async event processing** for performance
- **Batch processing** for efficiency
- **Privacy-first** data handling
- **Error recovery** with logging
- **Performance optimization** for scale

### Development Guidelines
- **Privacy compliance** first approach
- **Performance optimization** for high traffic
- **Error handling** with graceful degradation
- **Data validation** and sanitization
- **Monitoring and alerting** for issues

## Privacy and Compliance

### Data Protection
- **GDPR compliance** for EU users
- **CCPA compliance** for California users
- **Data minimization** principles
- **User consent** management
- **Right to deletion** implementation

### Privacy Features
- **IP address anonymization**
- **User agent** filtering
- **Sensitive data** exclusion
- **Consent management** integration
- **Data retention** policies

## Event Tracking

### Page Views
- **URL tracking** with query parameters
- **Referrer information** for traffic sources
- **User agent** parsing for device info
- **Geographic data** (optional, with consent)
- **Performance metrics** for monitoring

### Click Events
- **Element identification** for interaction tracking
- **URL tracking** for link clicks
- **Button clicks** for conversion tracking
- **Form interactions** for engagement
- **Custom events** for specific actions

### Performance Metrics
- **Page load times** for optimization
- **API response times** for monitoring
- **Resource loading** for performance
- **User interaction** latency tracking
- **Error rates** for stability monitoring

## Best Practices

### Event Design
- **Meaningful event names** for clarity
- **Consistent properties** across events
- **Proper data types** for values
- **Relevant metadata** for context
- **Future-proof schema** design

### Performance Optimization
- **Async processing** to avoid blocking
- **Batch processing** for efficiency
- **Database optimization** for storage
- **Caching strategies** for common queries
- **Load balancing** for high traffic

### Data Quality
- **Validation rules** for event properties
- **Sanitization** for security and privacy
- **Deduplication** for accurate metrics
- **Data cleaning** for analysis
- **Quality monitoring** for issues

## Integration Points

### Client Integration
- **JavaScript tracking** code injection
- **Event listeners** for user interactions
- **Performance API** integration
- **Error boundary** integration
- **Custom event** tracking

### Server Integration
- **API route** processing
- **Database storage** and optimization
- **External service** integration (Google Analytics, etc.)
- **Monitoring and alerting** setup
- **Data export** functionality

## Troubleshooting

### Common Issues
- **Events not recording**: Check client-side tracking code
- **High server load**: Review processing efficiency and batching
- **Data inconsistencies**: Validate event schemas and processing
- **Privacy compliance issues**: Review data filtering and consent
- **Performance problems**: Monitor processing times and optimization

### Debugging Steps
1. **Test event tracking** with browser DevTools
2. **Review server logs** for processing errors
3. **Validate event schemas** and data types
4. **Check privacy settings** and compliance
5. **Monitor performance** metrics and optimize

## Maintenance

### Regular Tasks
- **Monitor event volume** and processing performance
- **Review privacy compliance** with regulations
- **Update tracking code** as needed
- **Optimize database** queries and storage
- **Review analytics** reports for insights

### Data Management
- **Implement data retention** policies
- **Archive old data** for long-term storage
- **Clean up invalid** events and data
- **Optimize storage** for efficiency
- **Monitor storage costs** and usage

## Future Enhancements

### Planned Features
- **Real-time analytics** dashboard
- **Advanced segmentation** for user analysis
- **Custom report** generation
- **A/B testing** integration
- **Predictive analytics** for insights

### Technical Improvements
- **Enhanced privacy** features and compliance
- **Better performance** for high traffic
- **Advanced error handling** and recovery
- **Machine learning** for anomaly detection
- **Real-time monitoring** and alerting

## Analytics Strategy

### Data Collection
- **Privacy-first** approach with consent
- **Relevant metrics** for business insights
- **Performance monitoring** for optimization
- **User behavior** analysis for UX improvement
- **Conversion tracking** for business goals

### Analysis and Reporting
- **Regular reporting** for stakeholders
- **Trend analysis** for insights
- **Performance monitoring** for optimization
- **User behavior** analysis for improvements
- **ROI measurement** for initiatives

<!-- MANUAL: Analytics specific notes and implementation details -->