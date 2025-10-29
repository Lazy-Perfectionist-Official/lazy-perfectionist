# AGENTS.md - Lazy Perfectionist Website

## Build Commands
- `bundle install` - Install Ruby dependencies
- `bundle exec jekyll serve` - Start local dev server (http://localhost:4000)
- `bundle exec jekyll build` - Build production site to _site/
- `bundle exec jekyll serve --livereload` - Start with live reload

## Content Management
- **Manual Editing** - Edit markdown files directly
- **Pages**: `pages/about.md`, `pages/ep.md`, `pages/blog.md`
- **Blog Posts**: `pages/blog/` directory
- **Home page**: `index.md`
- **Media**: Assets stored in `assets/img/`

## Code Style Guidelines
- **Language**: Jekyll (Ruby static site generator) with HTML/CSS/JS
- **Frontmatter**: YAML with title, date, categories arrays
- **CSS**: Inter font, professional dark theme (#0a0a0a bg, #0066cc accent), mobile-first
- **JavaScript**: Minimal, performance-focused, vanilla JS
- **Structure**: Follow Jekyll conventions (pages/, _layouts, _data)
- **Naming**: kebab-case for files, snake_case for YAML keys
- **Images**: /assets/img/ with descriptive names, optimize for web
- **Dependencies**: Minimal external libraries, focus on performance