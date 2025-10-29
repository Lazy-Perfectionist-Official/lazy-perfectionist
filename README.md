# Lazy Perfectionist Website

Instrumental progressive rock/metal from Hong Kong. Debut single "Orbit" out now.

## 🎵 About

Lazy Perfectionist is an instrumental progressive rock/metal project from Hong Kong. Our debut single "Orbit" represents a "sound walk" through human contradictions — perfectionism vs. laziness, Earth vs. cosmos.

## 🌐 Live Site

- **GitHub Pages**: https://lazy-perfectionist-official.github.io/lazy-perfectionist/

## 🛠️ Tech Stack

- **Static Site Generator**: Jekyll (Ruby)
- **Deployment**: GitHub Pages
- **Styling**: Custom CSS with system-ui font, dark theme
- **Animations**: GSAP + AOS (Animate On Scroll)
- **Content**: Manual markdown editing

## 🚀 Quick Start

### Prerequisites
- Ruby 3.1+
- Bundler
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lazy-Perfectionist-Official/lazy-perfectionist.git
   cd lazy-perfectionist
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start local server**
   ```bash
   bundle exec jekyll serve
   ```
   Visit http://localhost:4000

4. **Start with live reload**
   ```bash
   bundle exec jekyll serve --livereload
   ```

### Build for Production
```bash
bundle exec jekyll build
```
Built files will be in `_site/` directory.

## 📝 Content Management

### Manual Editing
Edit content directly in markdown files:
- **Pages**: `pages/about.md`, `pages/ep.md`, `pages/blog.md`
- **Blog Posts**: `pages/blog/` directory
- **Home page**: `index.md`
- **Configuration**: `_config.yml`

### Adding New Content
- **New Pages**: Create `.md` files in `pages/` directory
- **New Blog Posts**: Create `.md` files in `pages/blog/` directory
- **Images**: Add to `assets/img/` directory

## 📁 Project Structure

```
lazy-perfectionist/
├── _data/           # Site data (SEO, social links)
├── _layouts/        # Jekyll layouts
├── _config.yml      # Jekyll configuration
├── assets/          # CSS, JS, images
│   ├── css/         # Stylesheets
│   ├── img/         # Images
│   └── js/          # JavaScript
├── pages/           # Content pages
│   ├── about.md     # About page
│   ├── ep.md        # EP page
│   ├── blog.md      # Blog index
│   └── blog/        # Blog posts
│       └── orbit-journey.md
├── index.md         # Homepage
└── README.md        # This file
```

## 🎨 Design System

### Colors
- **Background**: #121212 (dark theme)
- **Text**: #ffffff
- **Accent**: Custom accent colors for CTAs

### Typography
- **Font**: system-ui (native system fonts)
- **Mobile-first**: Responsive design approach

### Animations
- **GSAP**: For complex animations
- **AOS**: For scroll-triggered animations
- **Parallax**: Hero section effects

## 🔧 Configuration

### Jekyll Configuration (`_config.yml`)
- Site metadata and SEO
- Social media links
- Build settings
- GitHub Pages optimization

### Jekyll Configuration (`_config.yml`)
- Site metadata and SEO
- Social media links
- Build settings
- GitHub Pages optimization

### GitHub Actions (`.github/workflows/pages.yml`)
- Automated Jekyll builds
- GitHub Pages deployment
- Triggered on main branch pushes

## 📱 Social Links

- **Instagram**: [@lazyperfectionist_official](https://instagram.com/lazyperfectionist_official)
- **TikTok**: [@lazyperfectionist_official](https://tiktok.com/@lazyperfectionist_official)
- **YouTube**: [Orbit - Official Video](https://youtube.com/watch?v=Hw2a43RV1p0)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **Documentation**: See `AGENTS.md` for development guidelines

## 🎵 Music

Listen to our debut single "Orbit" on all major streaming platforms.

---

Made with 💿 on GitHub Pages by Lazy Perfectionist