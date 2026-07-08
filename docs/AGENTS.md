<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2025-07-08 -->

# docs

## Purpose
Comprehensive project documentation covering development, deployment, SEO optimization, API reference, and maintenance procedures. Organized by user role (developers, content contributors, DevOps) and task type.

## Key Files

| File | Description |
|------|-------------|
| `README.md` | Documentation overview with navigation by role and task |
| `api_reference.md` | Complete API documentation for all endpoints |
| `seo.md` | Comprehensive SEO implementation guide for music artists |
| `deployment.md` | Various deployment options and configurations |
| `local_deploy.md` | Local development setup guide |
| `content-guide.md` | Non-technical content management guide |
| `maintenance.md` | Ongoing maintenance procedures |
| `google-seo-setup.md` | Step-by-step Google search optimization |
| `GOOGLE_SEO_CHECKLIST.md` | Quick checklist for Google SEO deployment |
| `seo-examples.md` | Practical SEO implementation examples |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `maintenance/` | Maintenance procedures and schedules (see `maintenance/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- This directory contains **user-facing documentation**, not code
- Documentation is organized by **role** (developers, content contributors, DevOps)
- Use **Markdown format** with proper heading hierarchy
- Include **code examples** with syntax highlighting
- Maintain **consistent formatting** across all documentation files
- Update **README.md** when adding new documentation files

### Documentation Structure

#### Getting Started Guides
- **Local Development**: Environment setup and running the project
- **Content Guide**: Non-technical content management
- **Development Workflow**: Best practices and conventions

#### Development References
- **API Reference**: All API endpoints and integration details
- **SEO Implementation**: Comprehensive search optimization guide
- **SEO Examples**: Practical implementation samples

#### Deployment & Operations
- **Google SEO Setup**: Step-by-step search engine optimization
- **Deployment Guide**: Production deployment options
- **Maintenance Procedures**: Regular maintenance tasks and schedules

### Testing Requirements
- **Test all code examples** before including in documentation
- **Verify all links** work correctly (internal and external)
- **Check deployment instructions** by following them literally
- **Validate SEO guidelines** against current best practices
- **Review maintenance procedures** for accuracy

### Common Patterns
- **Role-Based Navigation**: Each section targets specific user roles
- **Quick Start**: Begin with setup instructions before advanced topics
- **Code Examples**: Include practical, tested code samples
- **Troubleshooting**: Add common issues and solutions
- **Cross-References**: Link to related documentation files

### Writing Guidelines
- Use **clear, concise language** appropriate for the target audience
- Include **step-by-step instructions** for complex procedures
- Add **visual aids** (tables, lists, code blocks) for clarity
- Maintain **consistent formatting** (headings, spacing, emphasis)
- Update **documentation** alongside code changes

## Dependencies

### Internal
- References code in `src/` directories for API documentation
- Links to `../README.md` for project overview
- References `../AGENTS.md` for development guidelines

### External
- **Next.js Documentation** (https://nextjs.org/docs)
- **React Documentation** (https://react.dev/)
- **Prisma Documentation** (https://www.prisma.io/docs)
- **SEO Best Practices**: Google Search Central, Schema.org

## Documentation Categories

### 👨‍💻 For Developers
1. **Local Setup**: `local_deploy.md`
2. **Development Workflow**: `local-development.md`
3. **API Reference**: `api_reference.md`
4. **Code Guidelines**: `../AGENTS.md`
5. **SEO Implementation**: `seo.md`, `seo-examples.md`

### ✍️ For Content Contributors
1. **Content Management**: `content-guide.md`
2. **Platform Integration**: Spotify and Medium workflows
3. **Publishing**: Content publishing procedures

### 🚀 For DevOps
1. **Deployment**: `deployment.md`
2. **Google SEO**: `google-seo-setup.md`, `GOOGLE_SEO_CHECKLIST.md`
3. **Maintenance**: `maintenance.md` and `maintenance/` subdirectory
4. **Security**: Security procedures and updates

## Navigation Structure

### Quick Links by Role
- **New Developers**: README.md → local_deploy.md → local-development.md → AGENTS.md
- **Content Contributors**: content-guide.md → platform-specific guides
- **Deployment**: google-seo-setup.md → GOOGLE_SEO_CHECKLIST.md → deployment.md
- **Maintenance**: maintenance.md → maintenance/daily-tasks.md → maintenance/monthly-tasks.md

## Documentation Maintenance

### Update Schedule
- **As needed**: Update when features are added or changed
- **Quarterly**: Review all documentation for accuracy
- **Monthly**: Check for broken links and outdated information
- **Before Releases**: Ensure documentation matches current functionality

### Review Process
1. **Test all code examples** for accuracy
2. **Verify all external links** are still valid
3. **Check cross-references** between documents
4. **Update version numbers** and compatibility information
5. **Review troubleshooting sections** for common issues

## SEO Documentation Focus

This project has **extensive SEO documentation** for music artist websites:
- **Music Industry SEO**: Specialized meta tags and structured data
- **Platform Integration**: Spotify, Medium, and streaming platform optimization
- **Local SEO**: Hong Kong geographic targeting
- **Performance**: Image optimization and lazy loading
- **Structured Data**: MusicGroup, MusicSong, and WebSite schemas

## Contributing Guidelines

### Adding New Documentation
1. Create new `.md` files following existing structure
2. Update `README.md` to include new documentation
3. Follow formatting conventions (headings, code blocks, links)
4. Test all instructions and code examples
5. Cross-reference related documentation

### Documentation Standards
- Use **proper Markdown syntax** throughout
- Include **table of contents** for longer documents
- Add **navigation links** between related sections
- Provide **concrete examples** for abstract concepts
- Include **troubleshooting sections** for common issues

<!-- MANUAL: Documentation-specific notes and additional guidelines -->