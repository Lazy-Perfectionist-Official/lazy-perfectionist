<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# examples

## Purpose
Example implementations, code samples, and reference implementations for various features and integrations. Demonstrates best practices and common patterns used in the project.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | All examples are in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `websocket/` | WebSocket implementation examples (see `examples/websocket/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- Contains **reference implementations** and code examples
- Demonstrates **best practices** for common patterns
- Provides **working samples** that can be copied and adapted
- **Test all examples** before relying on them
- **Keep examples updated** with project changes

### Example Categories

#### Integration Examples
- **API integrations** (Spotify, Medium, etc.)
- **Third-party services** (Ko-fi, analytics, etc.)
- **Database operations** with Prisma
- **Authentication** and authorization patterns

#### Feature Examples
- **Component implementations** and patterns
- **API route examples** and structures
- **State management** approaches
- **Data fetching** and caching strategies

#### Utility Examples
- **Helper functions** and utilities
- **Configuration setups** and patterns
- **Testing approaches** and examples
- **Deployment configurations**

### Testing Requirements
- **Test all examples** for functionality and accuracy
- **Verify imports** and dependencies are correct
- **Check for outdated patterns** that no longer work
- **Validate code quality** and security practices
- **Test in isolation** from main application

### Common Patterns
- **Working code** that can be run independently
- **Clear documentation** explaining the example
- **Usage instructions** and prerequisites
- **Comments** explaining key concepts
- **Related documentation** links

### Example Guidelines
- **Keep examples simple** and focused on single concepts
- **Use realistic scenarios** that match actual use cases
- **Include error handling** and edge cases
- **Document prerequisites** and setup requirements
- **Maintain compatibility** with current project version

## Dependencies

### Internal
- Uses patterns from `src/` directories
- References components and utilities from main codebase
- Follows conventions established in project

### External
- **Third-party APIs** - Integration examples with external services
- **Documentation** - References to official documentation
- **Sample data** - Test data for examples

## Example Structure

### Recommended Format
```
examples/
├── websocket/              # WebSocket implementation
│   ├── README.md          # Setup and usage
│   ├── server.ts          # Server example
│   └── client.ts          # Client example
├── spotify-integration/   # Spotify API examples
├── medium-api/           # Medium API examples
└── authentication/       # Auth patterns
```

### File Organization
- **Group by feature** or technology
- **Include README** explaining the example
- **Provide setup instructions** when needed
- **Keep examples independent** and runnable
- **Document dependencies** clearly

## Best Practices

### Code Quality
- **Follow project conventions** and patterns
- **Include proper error handling**
- **Use TypeScript** with proper typing
- **Add comments** for complex logic
- **Test thoroughly** before including

### Documentation
- **Explain the purpose** of the example
- **Document prerequisites** and dependencies
- **Provide usage instructions**
- **Include expected outputs** or results
- **Link to related documentation**

### Maintenance
- **Keep examples updated** with project changes
- **Test examples** after major version changes
- **Remove outdated examples** promptly
- **Add new examples** for common use cases
- **Review for security** issues regularly

## Usage Guidelines

### For Learning
- **Start with simple examples** before complex ones
- **Read documentation** before running examples
- **Experiment with modifications** to understand behavior
- **Check related examples** for different approaches
- **Refer to main codebase** for production implementations

### For Implementation
- **Use examples as reference** for patterns
- **Adapt to specific requirements** rather than copying
- **Test thoroughly** in production environment
- **Consider edge cases** not covered in examples
- **Follow project conventions** when integrating

## Troubleshooting

### Common Issues
- **Dependencies missing**: Install required packages first
- **Configuration errors**: Check environment variables and settings
- **API key issues**: Verify credentials and permissions
- **Version conflicts**: Ensure compatibility with main project
- **Network issues**: Check API availability and rate limits

### Debugging Steps
1. **Review error messages** and stack traces carefully
2. **Check configuration** and environment setup
3. **Verify API keys** and credentials
4. **Test in isolation** from main application
5. **Consult documentation** for troubleshooting tips

## Maintenance

### Regular Tasks
- **Review examples** for accuracy and relevance
- **Update outdated examples** to current standards
- **Test examples** after dependency updates
- **Add new examples** for common patterns
- **Remove examples** that are no longer relevant

### Security Considerations
- **Never include real API keys** in examples
- **Use placeholder credentials** with clear documentation
- **Follow security best practices** in all examples
- **Review for potential vulnerabilities** regularly
- **Document security considerations** clearly

<!-- MANUAL: Example-specific notes and additional guidelines -->