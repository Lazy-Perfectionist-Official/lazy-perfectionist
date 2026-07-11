# Lazy Perfectionist Portfolio - Figma Design Specification

## 🎨 Color System (ORYZO AI Theme)

### Primary Colors
```
Walnut Shadow (Background): #100904
Warm Cream (Text): #ffedd7
Bark Brown (Surface): #382416
Cork Border (Borders): #40372e
Driftwood (Muted Text): #6c5f51
Ember Accent (CTA): #dc5000
Pure Black (Icons): #000000
```

### Color Application Rules
- **Background**: Always `#100904` - never pure black
- **Text**: Always `#ffedd7` - never pure white
- **Buttons**: Use `#dc5000` sparingly - only for primary CTAs
- **Borders**: Use `#40372e` for hairline dividers
- **Secondary text**: Use `#6c5f51` for muted elements

---

## ✍️ Typography System

### Font Families
```
Display Font: Instrument Serif
Body Font: Inter
Fallback: System UI
```

### Type Scale
```
Display (Hero Title): 96px / Instrument Serif / Regular / Italic / Line-height 0.9
Heading (Section Titles): 60px / Inter / Medium / Uppercase / Line-height 1.0
Body (Paragraphs): 29px / Inter / Regular / Mixed-case / Line-height 1.26
Subheading (Labels): 18px / Inter / Medium / Uppercase / Line-height 1.0
Navigation (Links): 12px / Inter / Medium / Uppercase
Micro (Credits): 8px / Arial / Medium / Uppercase
```

### Typography Rules
- **All headings**: UPPERCASE weight 500
- **Body copy**: Mixed case weight 400
- **Hero title**: Italic for elegance
- **Navigation**: UPPERCASE 12px
- **Always maintain letter-spacing**: Normal (no negative tracking)

---

## 📐 Layout & Spacing System

### Viewport Guidelines
```
Hero Section: 100vh height
Content Sections: Min 80vh height
Container Width: Max 1400px
Side Padding: 24px mobile / 40px tablet / 64px desktop
```

### Spacing Scale
```
6px: Micro gaps
8px: Icon spacing
12px: Small elements
18px: Component gaps
24px: Section padding
41px: Large gaps
68px: Section spacing
204px: Hero vertical spacing
```

### Component Padding
```
Cards: 24px padding
Buttons: 14px vertical / 28px horizontal
Nav Container: 8px padding
Inputs: 4px vertical / 2px horizontal
```

---

## 🔘 Border Radius System

```
Cards: 12px radius
Buttons (Pill): 36px radius
Buttons (Ghost): 22.5px radius
Full Round: 9999px
Inputs: 0px (sharp edges)
```

---

## 🎯 Component Specifications

### 1. Loading Screen
**Dimensions**: Full screen (100vw × 100vh)
**Background**: `#100904`
**Elements**:
- Top-left label: "PORTFOLIO" / 12px / Uppercase / `#6c5f51`
- Center rotating words: 72px / Instrument Serif / `#ffedd7` / 80% opacity
- Bottom-right counter: 96px / Tabular nums / `#ffedd7`
- Bottom progress bar: 3px height / `#40372e` background / `#dc5000` fill

### 2. Hero Section
**Dimensions**: 100vh height
**Background**: HLS Video (dark overlay)
**Layout**:
- Navbar: Fixed top / 60px from top / Centered horizontally
- Main title: 96px / Instrument Serif / Italic / `#ffedd7`
- Tagline: "Collection '26" / 12px / Uppercase / `#6c5f51`
- Role text: 24px / Mixed-case / `#ffedd7`
- Description: 29px / Max width 448px / `#6c5f51`
- Buttons: 14px / 120px gap / 36px radius

**Navbar Details**:
- Container: 8px padding / 24px radius / Backdrop blur / `#382416` bg
- Logo: 36px circle / "LP" / 13px / `#100904` bg / `#dc5000` accent
- Links: 12px / Uppercase / `#6c5f51` → `#ffedd7` hover
- CTA: "Say hi ↗" / 12px / Uppercase

**Button Styles**:
- Primary: `#dc5000` bg / `#ffedd7` text / "Stream Music"
- Secondary: `#40372e` border / `#ffedd7` text / "Reach out..."

**Scroll Indicator**: Bottom 32px / "Scroll" / 12px / Uppercase / Animated line

### 3. Selected Works Section
**Dimensions**: Min 80vh height
**Spacing**: 96px top / 48px bottom
**Layout**: Max 1200px / Grid 12-column

**Header**:
- Label: "SELECTED WORK" / 12px / Uppercase / `#6c5f51`
- Divider: 8px × 1px / `#40372e`
- Title: "Featured Projects" / 60px / Uppercase / `#ffedd7`
- Description: 29px / Max width 512px / `#6c5f51`
- CTA: "View all work →" / 14px / Pill button / `#40372e` border

**Bento Grid**:
- 4 items / Responsive 12-column grid
- Aspect ratios: 16/9 (large) / 3/4 (small)
- Border: 1px / `#40372e`
- Radius: 24px
- Hover overlay: `#100904` / 70% opacity / Backdrop blur
- Halftone pattern: 4px dots / 20% opacity

### 4. Journal Section
**Dimensions**: Min 60vh height
**Spacing**: 64px top / 96px bottom
**Layout**: Max 768px / Centered

**Header**: Same style as Selected Works
**Entries**: 4 horizontal pills / 40px radius
- Icon: 64px square / "✦" symbol
- Title: 18px / Uppercase / `#ffedd7`
- Metadata: 14px / `#6c5f51` / "5 min read • Jan 15, 2024"
- Arrow link: Appears on hover

### 5. Explorations Section
**Dimensions**: 300vh height (pinned scrolling)
**Spacing**: 96px top / 96px bottom
**Layout**: 2 columns / 320px max width per column

**Header**: Same style as Selected Works
**Grid**: 2 columns / 12px gap
- Items: 6 total (3 per column)
- Aspect: Square (1/1) or Portrait (3/4)
- Hover: Lightbox overlay with details
- Parallax: Alternating y-movement ±50px

### 6. Stats Section
**Dimensions**: Min 60vh height
**Spacing**: 64px top / 64px bottom
**Layout**: Max 768px / 3-column grid

**Header**: Same style as Selected Works
**Stats**:
- Value: 72px / Inter / Uppercase / `#ffedd7` / Tabular nums
- Label: 16px / Uppercase / `#6c5f51`
- Gap: 32px between stats

### 7. Contact Section
**Dimensions**: Min 80vh height
**Background**: Inverted video / Dark overlay
**Layout**: Centered content

**Marquee**: 96px / Infinite scroll / "LET'S CREATE SOMETHING..."
**Content**:
- Title: 60px / Uppercase / "READY TO COLLABORATE?"
- Description: 29px / Max width 512px / `#6c5f51`
- Buttons: 16px / Two CTAs

**Footer**:
- Copyright: 14px / `#6c5f51` / "© 2026 LAZY PERFECTIONIST"
- Social links: 14px / Uppercase / 24px gap

---

## 🎭 Animation & Interaction Guidelines

### Loading States
- **Duration**: 2700ms total
- **Counter**: 000 → 100 (RAF-based)
- **Words**: Rotate every 900ms
- **Progress**: 3px bar / `#dc5000` fill

### Scroll Animations
- **Hero blur-in**: 800ms / 30px y-movement
- **Section fade**: 1000ms / 50px y-movement
- **Stagger**: 100ms delay between items
- **Parallax**: GSAP scrub / 1s smooth

### Hover Effects
- **Cards**: Scale 1.05 / Backdrop blur / 70% opacity
- **Links**: Color shift + translate-x
- **Buttons**: Scale 1.05 / Opacity change
- **Text**: Opacity fade

---

## 📱 Responsive Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Large Desktop: > 1400px
```

### Mobile Adaptations
- Font sizes: Scale down 0.75x
- Padding: Reduce to 16px
- Grid: Single column
- Buttons: Stack vertically
- Typography: Keep hierarchy

---

## 🎯 Design Principles

### Core Guidelines
- **Full-bleed layouts**: No max-width containers
- **Generous spacing**: 100vh section gaps
- **Warm darkness**: Never pure black/white
- **Typography hierarchy**: Uppercase labels, mixed-case body
- **Strategic accent**: Use `#dc5000` sparingly
- **Hairline borders**: 1px max, never thicker
- **No drop shadows**: Depth through surface stacking

### Don'ts
- ❌ Never use `#fff` or `#000`
- ❌ Never lowercase headings/labels
- ❌ Never thick borders (> 2px)
- ❌ Never sharp radius (< 12px)
- ❌ Never center-align body text
- ❌ Never multiple filled buttons per section

---

## 🚀 Figma Setup Instructions

### Step 1: Create Color Styles
1. Open Figma
2. Create new "Design System" file
3. Add local variables with exact hex codes
4. Name according to specification

### Step 2: Create Text Styles
1. Add all typography from scale
2. Use exact font sizes/weights
3. Set line-heights as specified
4. Apply letter-spacing: normal

### Step 3: Build Components
1. Start with Loading Screen (100vh frame)
2. Build Hero Section (96px title)
3. Create reusable button styles
4. Build section headers (consistent style)
5. Create card/grid components

### Step 4: Layout Framework
1. Create 1920×1080 desktop frames
2. Create 375×812 mobile frames
3. Add spacing grids
4. Set up component constraints

---

## 📦 Export Settings

### Images
- **Format**: PNG (transparent) / JPG (photos)
- **Scale**: @2x for Retina
- **Compression**: 80% quality

### Icons
- **Format**: SVG
- **Size**: 24×24px base
- **Color**: `#ffedd7`

### Assets
- **Logo**: SVG + PNG
- **Favicon**: 192×192, 512×512
- **Social**: 1200×630px (OG image)

---

## ✅ Quality Checklist

### Before Implementation
- [ ] All colors defined as Figma styles
- [ ] Typography scale complete
- [ ] Components built as symbols
- [ ] Responsive frames created
- [ ] Spacing system applied
- [ ] All interactions documented

### Before Handoff
- [ ] Screenshots captured for reference
- [ ] Export assets optimized
- [ ] Specifications documented
- [ ] Interactions defined
- [ ] Responsive behavior tested

---

This specification provides everything needed to recreate the entire portfolio in Figma. Use it as your blueprint for design changes, then share updated screenshots for implementation.
