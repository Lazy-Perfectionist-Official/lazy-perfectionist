# Portfolio Landing Page Implementation Plan

## Overview
Build a comprehensive dark portfolio landing page at `/portfolio` with cinematic design, GSAP animations, HLS video background, and multiple interactive sections.

## Technical Specifications

### Stack
- **Framework**: Next.js 15.3.8 (existing)
- **Styling**: Tailwind CSS 4 (existing)
- **Animations**: GSAP + Framer Motion
- **Video**: hls.js for HLS streaming
- **Routing**: React Router for /portfolio route
- **TypeScript**: Full type safety

### Dependencies to Install
```json
{
  "gsap": "^3.12.5",
  "hls.js": "^1.5.17",
  "react-router-dom": "^6.26.0"
}
```

## File Structure
```
src/app/portfolio/
├── page.tsx                    # Main portfolio page
├── layout.tsx                  # Portfolio-specific layout
├── components/
│   ├── LoadingScreen.tsx       # Counter loading animation
│   ├── Hero.tsx                # Video background + navbar + hero content
│   ├── SelectedWorks.tsx       # Bento grid projects
│   ├── Journal.tsx             # Journal entries
│   ├── Explorations.tsx         # Parallax gallery
│   ├── Stats.tsx               # Stats section
│   └── Contact.tsx             # Footer with marquee
└── styles.css                  # Portfolio-specific styles
```

## CSS System Setup

### Global CSS Variables (globals.css)
```css
:root {
  /* Portfolio Colors */
  --portfolio-bg: 0 0% 4%;
  --portfolio-surface: 0 0% 8%;
  --portfolio-text: 0 0% 96%;
  --portfolio-muted: 0 0% 53%;
  --portfolio-stroke: 0 0% 12%;
  --portfolio-accent: 0 0% 96%;
}

/* Portfolio-specific animations */
@keyframes scroll-down {
  0%, 100% { transform: translateY(-100%); }
  50% { transform: translateY(200%); }
}

@keyframes role-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-scroll-down {
  animation: scroll-down 1.5s ease-in-out infinite;
}

.animate-role-fade-in {
  animation: role-fade-in 0.4s ease-out;
}

.accent-gradient {
  background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%);
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'portfolio-bg': 'hsl(var(--portfolio-bg))',
        'portfolio-surface': 'hsl(var(--portfolio-surface))',
        'portfolio-text': 'hsl(var(--portfolio-text))',
        'portfolio-muted': 'hsl(var(--portfolio-muted))',
        'portfolio-stroke': 'hsl(var(--portfolio-stroke))',
      },
      fontFamily: {
        'portfolio-body': ['Inter', 'sans-serif'],
        'portfolio-display': ['Instrument Serif', 'serif'],
      }
    }
  }
}
```

## Implementation Order

### Phase 1: Setup & Dependencies (15 min)
1. Install dependencies (GSAP, hls.js, react-router-dom)
2. Update Tailwind config with portfolio colors
3. Add CSS animations to globals.css
4. Create portfolio route structure

### Phase 2: Core Components (60 min)
1. **LoadingScreen Component**
   - RAF counter 000→100 over 2700ms
   - Rotating words ["Design", "Create", "Inspire"]
   - Progress bar with accent gradient
   - Auto-dismiss after completion

2. **Hero Section**
   - HLS video integration with hls.js
   - Floating navbar with scroll detection
   - GSAP text reveal animations
   - Role cycling animation
   - CTA buttons with gradient effects

3. **Selected Works**
   - Framer Motion entrance animations
   - Bento grid layout (7/5/5/7 column spans)
   - Project cards with hover effects
   - Halftone overlays
   - Lightbox functionality

4. **Journal Section**
   - Horizontal pill layout
   - 4 journal entries with metadata
   - Hover interactions

5. **Explorations (Parallax)**
   - GSAP ScrollTrigger for pinning
   - 2-column parallax gallery
   - 6 items with rotation effects
   - Lightbox implementation

6. **Stats Section**
   - 3-column responsive grid
   - Animated counters

7. **Contact/Footer**
   - Inverted HLS video background
   - GSAP marquee animation
   - Social links with pulsing dot

### Phase 3: Refinement (30 min)
1. Performance optimization
2. Mobile responsiveness
3. Accessibility compliance
4. Cross-browser testing
5. Animation smoothness adjustments

## Component Specifications

### LoadingScreen
```typescript
interface LoadingScreenProps {
  onComplete: () => void;
}

State: count (0-100)
Timer: RAF over 2700ms
Animations:
- Top label: y:-20→0, opacity 0→1
- Words: AnimatePresence, y:20→0→-20, 900ms cycle
- Counter: Tabular display, 000→100
- Progress bar: scaleX(0→1)
```

### Hero Section
```typescript
Features:
- HLS video source: https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8
- Navbar scroll detection (scrollY > 100 adds shadow)
- GSAP timeline: blur-in (0.3s delay), name-reveal (0.1s delay)
- Role cycling: 2s interval, 4 roles
```

### Selected Works
```typescript
Projects: [
  { title: "Automotive Motion", span: 7 },
  { title: "Urban Architecture", span: 5 },
  { title: "Human Perspective", span: 5 },
  { title: "Brand Identity", span: 7 }
]

Features:
- Framer Motion whileInView
- Aspect ratio cards
- Group hover scale effects
- Gradient border animations
```

### Parallax Explorations
```typescript
GSAP ScrollTrigger:
- Main content pinned
- 6 items with parallax y-movement
- Column layouts with rotations
- Lightbox on click
```

## Success Criteria
1. ✅ All sections render correctly
2. ✅ HLS video plays smoothly
3. ✅ GSAP animations trigger properly
4. ✅ Loading screen completes in 2.7s
5. ✅ Mobile responsive (320px+)
6. ✅ All hover states functional
7. ✅ No console errors
8. ✅ Performance: 90+ Lighthouse score

## Estimated Timeline
- Setup: 15 minutes
- Core Implementation: 60 minutes
- Refinement: 30 minutes
- **Total: 105 minutes (1 hour 45 minutes)**

## Key Challenges & Solutions
1. **HLS Integration**: Use hls.js with fallback to native HLS
2. **GSAP + Next.js**: Client-side only components, proper cleanup
3. **Performance**: Lazy loading, code splitting, RAF for smooth animations
4. **Mobile**: Responsive breakpoints, touch-friendly interactions
5. **Dark Theme**: CSS custom properties with HSL values