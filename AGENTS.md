# AGENTS.md - Lazy Perfectionist Website

## Build Commands
- `bundle install` - Install Ruby dependencies
- `bundle exec jekyll serve` - Start local dev server (http://localhost:4000)
- `bundle exec jekyll build` - Build production site to _site/
- `bundle exec jekyll serve --livereload` - Start with live reload

## CMS (Content Management)
- **Static CMS** - GitHub Pages compatible CMS at `/admin/`
- **Configuration**: `static/cms/config.yml`
- **OAuth Setup**: See `GITHUB_OAUTH_SETUP.md`
- **Collections**: Pages (About, EP), Blog Posts
- **Media**: Assets stored in `assets/img/`

## Code Style Guidelines
- **Language**: Jekyll (Ruby static site generator) with HTML/CSS/JS
- **Frontmatter**: YAML with title, date, categories arrays
- **CSS**: system-ui font, dark theme (#121212 bg, #fff text), mobile-first
- **JavaScript**: GSAP for animations, AOS for scroll effects via CDN
- **Structure**: Follow Jekyll conventions (_posts, _layouts, _data)
- **Naming**: kebab-case for files, snake_case for YAML keys
- **Images**: /assets/img/ with descriptive names, optimize for web
- **Dependencies**: Use CDN for external libraries, include via script tags