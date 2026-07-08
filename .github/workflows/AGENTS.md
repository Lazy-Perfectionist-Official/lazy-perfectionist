<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# workflows

## Purpose
GitHub Actions workflow configurations for continuous integration, deployment, and automation. Defines automated processes for testing, building, and deploying the Lazy Perfectionist website.

## Key Files

| File | Description |
|------|-------------|
| `deploy-docs.yml` | Workflow for automatic documentation deployment |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| *(none)* | All workflow files are at root level |

## For AI Agents

### Working In This Directory
- **GitHub Actions workflows** for CI/CD automation
- **YAML configuration** files for workflow definition
- **Event triggers** for automated processes
- **Job definitions** for build and deployment steps
- **Secret management** through GitHub Secrets

### Workflow Architecture

#### Workflow Triggers
- **Push events** to specific branches
- **Pull request** triggers for testing
- **Scheduled runs** for maintenance tasks
- **Manual dispatch** for on-demand workflows
- **Event-based triggers** for repository activities

#### Job Organization
- **Sequential job execution** for dependencies
- **Parallel job execution** for independent tasks
- **Job artifacts** for sharing data between jobs
- **Conditional execution** based on previous results
- **Retry logic** for failed jobs

### Testing Requirements
- **Test workflows** in GitHub Actions interface
- **Verify triggers** fire correctly on events
- **Check job dependencies** execute in proper order
- **Validate environment variables** are properly configured
- **Test deployment** workflows with staging environment

### Common Patterns
- **Step-based organization** for workflow clarity
- **Reusable actions** for common operations
- **Proper error handling** and failure notifications
- **Caching strategies** for faster execution
- **Security best practices** for secret management

### Development Guidelines
- **Keep workflows simple** and focused
- **Use appropriate triggers** for automation needs
- **Implement proper error handling** and notifications
- **Monitor workflow execution** time and costs
- **Document complex workflows** with comments

## Workflow Categories

### Deployment Workflows
- **Automatic deployment** to production on merge
- **Staging deployment** for pull request previews
- **Rollback capabilities** for failed deployments
- **Environment-specific** configurations
- **Deployment verification** with smoke tests

### Testing Workflows
- **Unit tests** execution on every push
- **Integration tests** for pull requests
- **End-to-end tests** before deployment
- **Performance tests** for critical paths
- **Security scans** for vulnerability detection

### Maintenance Workflows
- **Scheduled tasks** for database maintenance
- **Dependency updates** for security patches
- **Performance monitoring** and reporting
- **SEO checks** and optimization verification
- **Backup verification** and testing

## Configuration Details

### Deploy Docs Workflow (`deploy-docs.yml`)

#### Purpose
Automatically deploys documentation changes to ensure documentation stays current with code changes.

#### Features
- **Triggered on push** to documentation files
- **Build process** for documentation generation
- **Deployment target** configuration
- **Success/failure notifications**
- **Rollback capabilities** if needed

#### Deployment Process
1. **Trigger detection** for documentation changes
2. **Environment setup** with required dependencies
3. **Build process** for documentation generation
4. **Deployment to** target environment
5. **Verification** of successful deployment

## Best Practices

### Workflow Design
- **Single responsibility** per workflow
- **Modular steps** for maintainability
- **Proper error handling** and notifications
- **Efficient caching** for faster execution
- **Security considerations** for secrets

### Performance Optimization
- **Cache dependencies** between workflow runs
- **Parallel execution** for independent jobs
- **Optimal runner selection** for job requirements
- **Artifact management** for job dependencies
- **Cost monitoring** for workflow execution

### Security Considerations
- **Secret management** through GitHub Secrets
- **Principle of least privilege** for job permissions
- **Third-party action** security reviews
- **Dependency pinning** for reproducibility
- **Audit logging** for workflow changes

## Workflow Components

### Triggers
- **push** - Triggers on repository push events
- **pull_request** - Triggers on pull request activities
- **schedule** - Triggers on scheduled cron events
- **workflow_dispatch** - Manual trigger via GitHub UI
- **repository_dispatch** - Triggered via API calls

### Jobs
- **runs-on** - Runner environment specification
- **steps** - Sequential job operations
- **needs** - Job dependency definition
- **outputs** - Job result sharing
- **if** - Conditional execution

### Actions
- **checkout** - Repository code checkout
- **setup-node** - Node.js environment setup
- **cache** - Dependency caching
- **run** - Custom command execution
- **uses** - Third-party action usage

## Monitoring and Debugging

### Workflow Monitoring
- **Execution logs** for step-by-step analysis
- **Duration tracking** for performance optimization
- **Success/failure rates** for reliability
- **Cost monitoring** for workflow execution
- **Notification setup** for workflow status

### Debugging Approaches
- **Enable debug logging** for detailed information
- **Review workflow logs** in GitHub Actions interface
- **Test workflows** locally with act or similar tools
- **Check environment variables** and secrets
- **Validate YAML syntax** for formatting errors

## Common Workflow Patterns

### Build and Test
```yaml
name: Build and Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
```

### Deployment
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run deploy
      # Add deployment verification
```

### Scheduled Maintenance
```yaml
name: Maintenance
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
jobs:
  maintenance:
    runs-on: ubuntu-latest
    steps:
      - run: ./scripts/maintenance.sh
```

## Integration Points

### Vercel Integration
- **Automatic deployments** on merge to main
- **Preview deployments** for pull requests
- **Environment variable** management
- **Build optimization** for faster deployments
- **Rollback capabilities** for failed deployments

### Testing Services
- **Automated test execution** on every commit
- **Test result reporting** in pull requests
- **Coverage tracking** over time
- **Performance testing** for critical paths
- **Security scanning** for vulnerabilities

## Troubleshooting

### Common Issues
- **Workflow not triggering**: Check trigger conditions and branch names
- **Jobs failing**: Review step logs and error messages
- **Secret access**: Verify secret names and permissions
- **Timeout errors**: Increase timeout limits or optimize steps
- **Permission issues**: Check job permissions and repository settings

### Debugging Steps
1. **Check workflow logs** for error messages
2. **Validate YAML syntax** for formatting errors
3. **Verify trigger conditions** are being met
4. **Test secrets** are properly configured
5. **Review GitHub Actions** status page for outages

## Maintenance

### Regular Tasks
- **Review workflow performance** and optimization
- **Update third-party actions** to latest versions
- **Monitor execution costs** and optimize for efficiency
- **Review and rotate** secrets according to security policies
- **Update documentation** for workflow changes

### Workflow Updates
- **Test changes** in feature branches first
- **Document new features** and step changes
- **Monitor impact** on execution time and costs
- **Roll back problematic** changes quickly
- **Update related documentation** accordingly

## Security Best Practices

### Secret Management
- **Use GitHub Secrets** for sensitive data
- **Rotate secrets** regularly according to policies
- **Audit secret access** logs periodically
- **Limit secret scope** to specific workflows
- **Document secret purposes** and usage

### Access Control
- **Principle of least privilege** for job permissions
- **Review third-party actions** for security issues
- **Pin action versions** for reproducibility
- **Monitor workflow executions** for suspicious activity
- **Implement approval workflows** for sensitive operations

<!-- MANUAL: Workflow-specific notes and configurations -->