# Lazy Perfectionist - Visual Design Guide for Figma

## 📸 Current Design Screenshots

### 1. Hero Section
![Hero Section](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/cf1fdf27-9474-4b4d-accc-9b070cfe09b8/portfolio-hero.png)

**Key Elements to Recreate:**
- **Title**: "Lazy Perfectionist" / 96px / Instrument Serif / Italic
- **Colors**: Warm cream (#ffedd7) on dark walnut (#100904)
- **Layout**: Centered / 100vh height / Video background
- **Navbar**: Floating pill container / 36px radius

### 2. Selected Works Section
![Selected Works](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/cf1fdf27-9474-4b4d-accc-9b070cfe09b8/portfolio-works.png)

**Key Elements to Recreate:**
- **Bento Grid**: 4 projects / different sizes
- **Card Style**: 24px radius / 1px borders
- **Hover Effect**: Dark overlay / 70% opacity
- **Typography**: Uppercase labels / 60px titles

### 3. Journal Section
![Journal](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/cf1fdf27-9474-4b4d-accc-9b070cfe09b8/portfolio-journal.png)

**Key Elements to Recreate:**
- **Horizontal Pills**: 4 entries / 40px radius
- **Icon Style**: "✦" symbol / 64px squares
- **Typography**: Mixed-case titles / uppercase metadata

### 4. Contact/Footer
![Contact](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/cf1fdf27-9474-4b4d-accc-9b070cfe09b8/portfolio-contact.png)

**Key Elements to Recreate:**
- **Ember Button**: Primary CTA / #dc5000 background
- **Social Links**: Uppercase / 14px spacing
- **Marquee**: Infinite scroll text

---

## 🎨 Complete Color Palette (Copy These)

### Add to Figma → Local Variables → Colors
```
#100904 → bg-walnut-shadow (Background)
#ffedd7 → text-warm-cream (Primary Text)
#382416 → surface-bark-brown (Elevated Surface)
#40372e → border-cork (Borders & Dividers)
#6c5f51 → text-driftwood (Secondary Text)
#dc5000 → accent-ember (CTA & Highlights)
```

---

## ✍️ Typography System (Figma Text Styles)

### Create These Exact Text Styles in Figma:

**Display Styles:**
- `Display-Hero`: 96px / Instrument Serif / Regular / Italic
- `Heading-Section`: 60px / Inter / Medium / Uppercase / 0.9 lh
- `Heading-Component`: 24px / Inter / Medium / Uppercase

**Body Styles:**
- `Body-Primary`: 29px / Inter / Regular / Mixed-case / 1.26 lh
- `Body-Muted`: 29px / Inter / Regular / Mixed-case / 1.26 lh

**Micro Styles:**
- `Label-Section`: 18px / Inter / Medium / Uppercase
- `Label-Navigation`: 12px / Inter / Medium / Uppercase
- `Text-Button`: 14px / Inter / Medium / Uppercase

---

## 📐 Layout Framework (Figma Frames)

### Create These Frame Sizes:
```
Desktop Hero: 1920 × 1080px
Tablet Hero: 1024 × 768px
Mobile Hero: 375 × 812px
Desktop Section: 1920 × 800px
Mobile Section: 375 × 600px
```

### Grid Setup:
- **Desktop**: 12-column / 24px gutter / 40px margin
- **Tablet**: 8-column / 16px gutter / 32px margin
- **Mobile**: 4-column / 16px gutter / 24px margin

---

## 🔘 Component Library (Figma Components)

### 1. Button Styles (Create 3 Variants)

**Primary Button:**
- Width: Auto (min 140px)
- Height: 48px
- Radius: 36px
- Background: #dc5000
- Text: 14px / Uppercase / Medium
- Padding: 14px vertical / 28px horizontal

**Secondary Button:**
- Width: Auto (min 140px)
- Height: 48px
- Radius: 36px
- Background: Transparent
- Border: 2px / #40372e
- Text: 14px / Uppercase / Medium / #ffedd7

**Ghost Button:**
- Width: Auto
- Height: 36px
- Radius: 22.5px
- Background: Transparent
- Border: 1px / #ffedd7
- Text: 12px / Uppercase / Medium

### 2. Card Styles

**Project Card:**
- Aspect: 16:9 or 3:4
- Radius: 24px
- Border: 1px / #40372e
- Background: #382416
- Hover: Dark overlay / 70% opacity

**Journal Entry:**
- Width: Full
- Height: 80px
- Radius: 40px
- Background: #382416 / 30% opacity
- Hover: #382416 / 100% opacity

### 3. Navigation Components

**Floating Navbar:**
- Width: Auto (fit content)
- Height: 48px
- Radius: 24px
- Background: #382416 / Backdrop blur
- Border: 1px / White / 10% opacity
- Padding: 8px

**Logo Circle:**
- Width: 36px
- Height: 36px
- Radius: 50%
- Background: #dc5000 (accent) / #100904 (inner)
- Text: "LP" / 13px / Medium

### 4. Section Headers

**Standard Section Header:**
- Label: 12px / Uppercase / #6c5f51 / 8px spacing
- Divider: 8px × 1px / #40372e
- Title: 60px / Uppercase / #ffedd7
- Description: 29px / Max width 512px / #6c5f51

---

## 🎯 Step-by-Step Figma Recreation

### Phase 1: Setup (10 minutes)
1. **New Figma File** → "Lazy Perfectionist Portfolio"
2. **Add Color Variables** → Copy hex codes above
3. **Create Text Styles** → Use exact specifications
4. **Set Up Frames** → Desktop/Mobile sizes

### Phase 2: Build Components (20 minutes)
1. **Create Button Styles** → 3 variants
2. **Build Card Styles** → Project & Journal
3. **Make Navbar** → Floating pill design
4. **Add Section Headers** → Reusable component

### Phase 3: Layout Sections (30 minutes)
1. **Hero Section** → Import screenshot as reference
2. **Selected Works** → Bento grid layout
3. **Journal** → Horizontal pills
4. **Contact/Footer** → Button styles + links

### Phase 4: Refine (10 minutes)
1. **Check All Spacing** → Use spacing scale
2. **Verify Typography** → Match font sizes exactly
3. **Test Colors** → Ensure ORYZO palette
4. **Add Interactions** → Hover states

---

## 🎨 Design Changes Workflow

### When You Want to Make Changes:

**Step 1: Design in Figma**
- Open your Lazy Perfectionist Figma file
- Make the visual changes you want
- Take a screenshot of the updated design

**Step 2: Share with Me**
- Upload the screenshot
- Tell me what changed: "Update hero section to match this design"
- I'll analyze the changes (fonts, colors, spacing)

**Step 3: Implementation**
- I'll implement exactly what you designed
- Pixel-perfect matching
- Responsive behavior maintained

---

## 📋 Quick Reference Cheat Sheet

### Colors (One-Line Copy)
```
Bg: #100904 | Text: #ffedd7 | Surface: #382416 | Border: #40372e | Muted: #6c5f51 | Accent: #dc5000
```

### Typography Scale
```
96px (Hero) | 60px (Sections) | 29px (Body) | 18px (Labels) | 12px (Nav)
```

### Spacing Scale
```
8px (Micro) | 12px (Small) | 18px (Component) | 24px (Padding) | 48px (Large) | 96px (Section)
```

### Border Radius
```
36px (Pill buttons) | 24px (Cards) | 22.5px (Ghost buttons) | 12px (Inputs)
```

---

## ✅ Design Validation Checklist

Before sharing your Figma design with me:

### Visual Elements
- [ ] All colors use ORYZO palette (no pure black/white)
- [ ] Typography hierarchy maintained
- [ ] Spacing follows the scale
- [ ] Border radius matches specifications
- [ ] Components are reusable

### Technical Accuracy
- [ ] Font sizes are exact
- [ ] Line heights correct
- [ ] Colors are hex-accurate
- [ ] Measurements precise
- [ ] Responsive behavior defined

### Completeness
- [ ] All sections included
- [ ] Hover states defined
- [ ] Mobile versions created
- [ ] Assets ready to export
- [ ] Interactions documented

---

## 🚀 Ready to Start Designing!

1. **Copy the color codes** above into Figma
2. **Set up the text styles** with exact specifications
3. **Create component library** using the measurements
4. **Design your changes** in the established system
5. **Share screenshots** with me for implementation

This gives you complete creative control while ensuring technical perfection. The ORYZO design system provides sophistication, and these specifications ensure pixel-perfect implementation.

**Current Status**: ✅ Design system complete | ✅ Screenshots captured | ✅ Specifications documented

**Next Step**: Design your changes in Figma → Share screenshots → I'll implement them perfectly!