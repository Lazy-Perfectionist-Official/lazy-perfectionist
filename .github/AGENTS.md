<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# .github

## Purpose
GitHub platform configuration and automation. Contains workflows for CI/CD, issue templates, and other GitHub-specific settings.

## Key Files

| File | Description |
|------|-------------|
| *(none at root level)* | All files are in subdirectories |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `workflows/` | GitHub Actions workflows for automation (see `.github/workflows/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- This directory contains **GitHub-specific configuration**
- **Workflows** define automated processes for CI/CD
- **Issue templates** provide structured issue reporting
- **Platform settings** configure repository behavior
- Changes here affect **GitHub Actions and repository operations**

### GitHub Actions Integration
- **Automated workflows** for testing, building, and deployment
- **CI/CD pipelines** for continuous integration and deployment
- **Scheduled jobs** for maintenance and monitoring
- **Event triggers** for pull requests, pushes, and other events

### Workflow Configuration
- **YAML format** for workflow definitions
- **Environment variables** for sensitive data
- **Job dependencies** and parallel execution
- **Secret management** through GitHub Secrets

### Testing Requirements
- **Test workflows** in GitHub Actions interface before relying on them
- **Verify environment variables** are properly configured
- **Check job permissions** and access rights
- **Monitor workflow runs** for failures and issues
- **Validate deployment targets** and configurations

### Common Patterns
- **YAML structure**: Follow GitHub Actions syntax and conventions
- **Job naming**: Use descriptive job names for clarity
- **Step organization**: Group related steps logically
- **Error handling**: Proper failure detection and notification
- **Security**: Never commit secrets, use GitHub Secrets

## Dependencies

### Internal
- Triggers on **push events** to main and feature branches
- Deploys to **Vercel** or other platforms defined in workflows
- Tests code from `src/` directories
- Uses environment variables configured in repository settings

### External
- **GitHub Actions** - Workflow automation platform
- **Vercel** - Deployment target (if configured)
- **Testing services** - Code quality and testing tools
- **Notification services** - Slack, Discord, etc. (if configured)

## Workflow Categories

### Continuous Integration
- **Run tests** on every pull request
- **Code quality checks** with ESLint and other linters
- **Build verification** for production readiness
- **Security scanning** for vulnerabilities

### Continuous Deployment
- **Automatic deployment** to production on merge
- **Preview deployments** for pull requests
- **Rollback capabilities** for failed deployments
- **Environment-specific configurations**

### Maintenance Workflows
- **Scheduled tasks** for database maintenance
- **SEO monitoring** and reporting
- **Performance checks** and optimization
- **Security updates** and dependency management

## Best Practices

### Workflow Design
- **Keep workflows simple** and focused on single purposes
- **Use appropriate triggers** (push, pull_request, schedule)
- **Implement proper error handling** and notifications
- **Cache dependencies** for faster execution
- **Monitor workflow duration** and optimize for cost

### Security Considerations
- **Never commit secrets** to workflow files
- **Use GitHub Secrets** for sensitive data
- **Principle of least privilege** for job permissions
- **Review third-party actions** for security issues
- **Rotate secrets regularly** and monitor usage

### Monitoring and Debugging
- **Enable workflow logs** for debugging
- **Set up notifications** for failed runs
- **Monitor workflow costs** and execution time
- **Review workflow performance** regularly
- **Document troubleshooting steps**

## Configuration Files

### Common GitHub Files
- **workflows/** - GitHub Actions automation
- **issue_templates/** - Structured issue reporting
- **pull_request_template.md** - PR guidelines
- **CODEOWNERS** - Code review assignment
- **dependabot.yml** - Automated dependency updates

## Troubleshooting

### Common Issues
- **Workflow failures**: Check logs and validate syntax
- **Permission errors**: Verify job permissions and repository settings
- **Secret access**: Ensure secrets are properly configured
- **Deployment issues**: Check target platform configuration
- **Timeout problems**: Optimize workflow or increase timeout limits

### Debugging Steps
1. **Check workflow logs** in GitHub Actions interface
2. **Validate YAML syntax** for formatting errors
3. **Verify environment variables** and secrets
4. **Test locally** when possible
5. **Enable debug logging** for detailed troubleshooting

## Maintenance

### Regular Tasks
- **Review workflow performance** and optimize for cost
- **Update third-party actions** to latest versions
- **Rotate secrets** according to security policies
- **Monitor workflow runs** for patterns and issues
- **Update documentation** for workflow changes

### Security Updates
- **Review and update** third-party action versions
- **Monitor security advisories** for dependencies
- **Update base images** for Docker-based workflows
- **Review access permissions** regularly
- **Audit secrets usage** and access patterns

<!-- MANUAL: GitHub-specific notes and workflow configurations -->