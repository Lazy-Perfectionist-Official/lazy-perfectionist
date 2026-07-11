# Production-Level Website Redesign - Implementation Plan

## Executive Summary

This plan provides detailed, executable steps for migrating the `/portfolio` ORYZO design system to root (`/`), implementing advanced animations, integrating open-source libraries, and optimizing for production deployment. The migration will transform the current portfolio design into the main website experience while maintaining all existing functionality.

**Current State Analysis:**
- Portfolio page (`/portfolio`) contains complete ORYZO design with cursor reveal, loading screen, artistic elements
- Root page (`/`) contains legacy design requiring replacement
- Dependencies: Next.js 15.3.8, React 19, GSAP 3.15.0, Framer Motion 12.23.2, Three.js 0.185.1, React Three Fiber 9.6.1
- ORYZO design tokens defined in `/Users/samuellee/projects/lazy-perfectionist/src/app/globals.css` (lines 452-520)

**Target State:**
- Root page (`/`) displays migrated portfolio design with enhancements
- `/portfolio` redirects to `/` for backward compatibility
- Advanced animations (GSAP, Framer Motion, React Three Fiber)
- Production-optimized build configuration
- Integrated open-source libraries for enhanced functionality
- Comprehensive testing from user perspective

**Estimated Timeline:** 12-16 hours of continuous execution across 7 phases (includes 20% buffer for debugging and testing setup)

---

## Phase 1: Foundation & Migration Setup (120 minutes)

### 1.1 Critical Path: Root Page Migration (75 minutes)

**Priority:** CRITICAL - Blocks all subsequent phases
**Dependencies:** None
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx` (current root)
- `/Users/samuellee/projects/lazy-perfectionist/src/app/portfolio/page.tsx` (source design)
- `/Users/samuellee/projects/lazy-perfectionist/src/app/portfolio/components/` (all components)

**Implementation Steps:**

1. **Backup Current Root Implementation**
   ```bash
   cp /Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx \
      /Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx.backup-$(date +%Y%m%d)
   ```

2. **Create Portfolio Components Directory at Root**
   ```bash
   mkdir -p /Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio
   ```

3. **Copy All Portfolio Components to Shared Location**
   ```bash
   cp -r /Users/samuellee/projects/lazy-perfectionist/src/app/portfolio/components/* \
      /Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/
   ```

4. **Update ALL Component Import Paths**

   **CRITICAL:** Update ALL relative imports in portfolio components to use absolute paths:

   - **Hero.tsx** (line 7): `import CursorReveal from './CursorReveal';` → `import CursorReveal from '@/app/components/portfolio/CursorReveal';`
   - **LoadingScreen.tsx**: Update any relative imports
   - **SelectedWorks.tsx**: Update any relative imports
   - **Journal.tsx**: Update any relative imports
   - **Explorations.tsx**: Update any relative imports
   - **Stats.tsx**: Update any relative imports
   - **Contact.tsx**: Update any relative imports
   - **CursorReveal.tsx**: Update any relative imports

   **Verification Command:**
   ```bash
   # Check for any remaining relative imports
   grep -r "from '\./" /Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/
   # Should return no results
   ```

5. **Add data-testid Attributes to All Components**
   - **Hero.tsx**: Add `data-testid="hero-section"`
   - **LoadingScreen.tsx**: Add `data-testid="loading-screen"` and `data-testid="loading-counter"`
   - **SelectedWorks.tsx**: Add `data-testid="selected-works"`
   - **Journal.tsx**: Add `data-testid="journal-section"`
   - **Explorations.tsx**: Add `data-testid="explorations-section"`
   - **Stats.tsx**: Add `data-testid="stats-section"`
   - **Contact.tsx**: Add `data-testid="contact-section"`
   - **CursorReveal.tsx**: Add `data-testid="cursor-reveal"`

6. **Create New Root Page with Portfolio Design**
   - Replace `/Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx` content
   - Use portfolio page structure but update metadata for root
   - Keep loading screen, hero, and all sections
   - Update navigation links to reference root instead of `/portfolio`

7. **Create Portfolio Redirect**
   - Create `/Users/samuellee/projects/lazy-perfectionist/src/app/portfolio/page.tsx`
   - Implement 301 permanent redirect to `/`
   ```typescript
   import { redirect } from 'next/navigation';
   export default function PortfolioRedirect() {
     redirect('/');
   }
   ```

**Success Criteria:**
- ✅ Root page loads with portfolio design
- ✅ All components render without errors
- ✅ Loading screen animates correctly (2.7s duration)
- ✅ Cursor reveal effect functions
- ✅ `/portfolio` redirects to `/` with 301 status
- ✅ No console errors on initial load

**Validation Commands:**
```bash
# Test root page loads
curl -I http://localhost:3000/

# Test redirect
curl -I http://localhost:3000/portfolio

# Check for console errors
npm run build
```

**Rollback Procedure:**
1. Restore backup: `cp src/app/page.tsx.backup-* src/app/page.tsx`
2. Remove shared components: `rm -rf src/app/components/portfolio`
3. Restart dev server

---

### 1.2 Routing & Navigation Update (30 minutes)

**Priority:** HIGH - Blocks user navigation
**Dependencies:** 1.1 Complete
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Hero.tsx` (lines 122-127)
- `/Users/samuellee/projects/lazy-perfectionist/src/components/Navigation.tsx`

**Implementation Steps:**

1. **Update Hero Navigation Links**
   - File: `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Hero.tsx:122-127`
   - Remove "Home" link (already at root)
   - Update all links to use root-relative paths

2. **Update Global Navigation Component**
   - File: `/Users/samuellee/projects/lazy-perfectionist/src/components/Navigation.tsx`
   - Ensure portfolio link points to root
   - Add active state styling for root page

3. **Verify All Internal Links**
   - Check `/music`, `/blog`, `/store`, `/platform-links` navigation
   - Ensure no broken links after migration

---

### 1.3 Performance Foundation: Code Splitting & SSR Configuration (15 minutes)

**Priority:** HIGH - Must be completed BEFORE animation implementation
**Dependencies:** 1.1 Complete
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx`
- `/Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx`

**Implementation Steps:**

1. **Lazy Load Heavy Components with SSR Control**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx
   import dynamic from 'next/dynamic';

   // CRITICAL: Three.js MUST be loaded with ssr: false
   const Explorations = dynamic(() => import('./components/portfolio/Explorations'), {
     loading: () => <div className="h-screen bg-oryzo-canvas" data-testid="explorations-loading" />,
     ssr: false,
   });

   const Contact = dynamic(() => import('./components/portfolio/Contact'), {
     loading: () => <div className="h-96 bg-oryzo-canvas" data-testid="contact-loading" />,
   });

   const Stats = dynamic(() => import('./components/portfolio/Stats'), {
     loading: () => <div className="h-64 bg-oryzo-canvas" data-testid="stats-loading" />,
   });
   ```

2. **Configure Three.js for Client-Side Only**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/ThreeDBackground.tsx
   'use client';

   import { Canvas } from '@react-three/fiber';
   import { Suspense } from 'react';

   export default function ThreeDBackground() {
     // Force client-side only rendering
     if (typeof window === 'undefined') {
       return null;
     }

     return (
       <div className="absolute inset-0 opacity-20" data-testid="three-d-background">
         <Canvas>
           <Suspense fallback={null}>
             <Scene />
           </Suspense>
         </Canvas>
       </div>
     );
   }
   ```

**Success Criteria:**
- ✅ No SSR-related hydration errors
- ✅ Three.js loads only on client
- ✅ Proper loading states display
- ✅ Initial bundle size reduced

**Validation:**
```bash
# Build and check for hydration errors
npm run build
npm run start
# Check browser console for hydration warnings
```

**Success Criteria:**
- ✅ All navigation links work correctly
- ✅ No broken internal links
- ✅ Active states display properly
- ✅ Mobile navigation functional

**Rollback Procedure:**
1. Revert Navigation.tsx to previous version
2. Restore Hero.tsx from backup

---

## Phase 2: Animation Enhancements (90 minutes)

### 2.1 GSAP Scroll Animations Enhancement (30 minutes)

**Priority:** HIGH - Core user experience
**Dependencies:** Phase 1 Complete
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/SelectedWorks.tsx`
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Explorations.tsx`
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Hero.tsx`

**Implementation Steps:**

1. **Install Additional GSAP Plugins**
   ```bash
   npm install --save gsap
   # Already installed, verify version
   npm ls gsap
   ```

2. **Enhance ScrollTrigger Performance**
   - File: `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Explorations.tsx:26-33`
   - Add ` anticipatePin: true` for smoother pinning
   - Implement `onUpdate` callback for performance monitoring
   - Add `end: '+=2000'` for longer scroll duration

3. **Add Parallax Refinements**
   - Enhance hero parallax (Hero.tsx:38-51)
   - Add horizontal parallax to SelectedWorks
   - Implement velocity-based scrolling effects

4. **Optimize GSAP Context Cleanup**
   - Ensure all ScrollTriggers properly cleaned up
   - Add `kill()` calls in useEffect return

**Technical Specifications:**
```typescript
// Enhanced ScrollTrigger configuration
ScrollTrigger.create({
  trigger: element,
  start: 'top bottom',
  end: 'bottom top',
  scrub: 1.5,
  anticipatePin: 1,
  onUpdate: (self) => {
    // Performance monitoring
    if (self.progress > 0.95) {
      // Preload next section
    }
  }
});
```

**Success Criteria:**
- ✅ Scroll animations trigger at correct positions
- ✅ 60fps smooth scrolling on target devices
- ✅ No memory leaks from GSAP instances
- ✅ Parallax effects feel natural and premium

**Validation:**
- Test on mobile device (iOS Safari, Chrome Mobile)
- Monitor Chrome DevTools Performance tab
- Check memory usage in long scrolling sessions

**Rollback Procedure:**
1. Revert ScrollTrigger configurations to basic settings
2. Remove performance monitoring callbacks

---

### 2.2 Framer Motion Page Transitions (45 minutes)

**Priority:** MEDIUM - Enhanced user experience  
**Dependencies:** Phase 1 Complete  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx`
- New: `/Users/samuellee/projects/lazy-perfectionist/src/app/components/PageTransition.tsx`

**Implementation Steps:**

1. **Create Page Transition Component**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/app/components/PageTransition.tsx
   'use client';
   
   import { motion, AnimatePresence } from 'framer-motion';
   import { usePathname } from 'next/navigation';
   
   const variants = {
     hidden: { opacity: 0, y: 20 },
     enter: { opacity: 1, y: 0 },
     exit: { opacity: 0, y: -20 },
   };
   
   export default function PageTransition({ children }: { children: React.ReactNode }) {
     const pathname = usePathname();
     return (
       <AnimatePresence mode="wait">
         <motion.div
           key={pathname}
           variants={variants}
           initial="hidden"
           animate="enter"
           exit="exit"
           transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
         >
           {children}
         </motion.div>
       </AnimatePresence>
     );
   }
   ```

2. **Integrate with Root Layout**
   - File: `/Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx`
   - Wrap children with PageTransition component
   - Ensure loading screen doesn't conflict

3. **Add Micro-Interactions**
   - Enhance button hover states with Framer Motion
   - Add subtle scale animations to interactive elements
   - Implement stagger animations for list items

**Technical Specifications:**
```typescript
// Button micro-interaction example
const buttonVariants = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

// Stagger animation for lists
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

**Success Criteria:**
- ✅ Page transitions smooth and natural
- ✅ No layout shifts during transitions
- ✅ 60fps animation performance
- ✅ Transitions don't interfere with loading screen

**Rollback Procedure:**
1. Remove PageTransition wrapper from layout.tsx
2. Delete PageTransition.tsx component

---

### 2.3 React Three Fiber 3D Elements (30 minutes)

**Priority:** LOW - Visual enhancement  
**Dependencies:** Phase 1 Complete, Three.js installed  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Hero.tsx`
- New: `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/ThreeDBackground.tsx`

**Implementation Steps:**

1. **Create 3D Background Component**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/ThreeDBackground.tsx
   'use client';
   
   import { Canvas } from '@react-three/fiber';
   import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
   import { Suspense } from 'react';
   
   function Scene() {
     return (
       <mesh>
         <sphereGeometry args={[1, 32, 32]} />
         <meshStandardMaterial color="#dc5000" wireframe />
       </mesh>
     );
   }
   
   export default function ThreeDBackground() {
     return (
       <div className="absolute inset-0 opacity-20">
         <Canvas>
           <PerspectiveCamera position={[0, 0, 5]} />
           <Suspense fallback={null}>
             <Scene />
           </Suspense>
           <OrbitControls enableZoom={false} />
         </Canvas>
       </div>
     );
   }
   ```

2. **Integrate with Hero Section**
   - Add 3D background behind cursor reveal
   - Ensure proper z-indexing
   - Optimize for performance (requestAnimationFrame)

**Technical Specifications:**
- Use `@react-three/fiber` for React integration
- Implement proper cleanup to prevent memory leaks
- Add error boundaries for WebGL failures
- Provide fallback for non-WebGL browsers

**Success Criteria:**
- ✅ 3D elements render without blocking main thread
- ✅ Fallback displays on unsupported browsers
- ✅ Performance impact <5% frame time
- ✅ Visual enhancement complements existing design

**Rollback Procedure:**
1. Remove ThreeDBackground from Hero component
2. Delete ThreeDBackground.tsx file

---

## Phase 3: Open Source Library Integration (60 minutes - OPTIONAL)

### 3.1 Animation Library Priority List

**Priority 1 (Essential):**
1. **Lenis** - Smooth scrolling experience (REPLACES Locomotive Scroll)
2. **React Spring** - Physics-based animations
3. **React UseGesture** - Enhanced gesture handling

**Priority 2 (Enhancement):**
4. **React Howler** - Audio visualization
5. **React Particles** - Particle effects
6. **Cursor.js** - Enhanced cursor effects

**Priority 3 (Performance):**
7. **React Window** - Virtual scrolling
8. **Web Vitals** - Performance monitoring
9. **Quicklink** - Intelligent prefetching

---

### 3.2 Lenis Smooth Scroll Integration (20 minutes)

**Priority:** HIGH - Enhanced scrolling experience
**Dependencies:** Phase 1 Complete
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/page.tsx` (new root)
- `/Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx`

**Rationale:** Locomotive Scroll is incompatible with Next.js 15 App Router. Lenis is the recommended alternative.

**Implementation Steps:**

1. **Install Lenis**
   ```bash
   npm install @studio-freight/lenis
   ```

2. **Create Smooth Scroll Wrapper**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/app/components/SmoothScroll.tsx
   'use client';

   import { useEffect, useRef } from 'react';
   import Lenis from '@studio-freight/lenis';

   export default function SmoothScroll({ children }: { children: React.ReactNode }) {
     const containerRef = useRef<HTMLDivElement>(null);
     const lenisRef = useRef<Lenis | null>(null);

     useEffect(() => {
       if (typeof window !== 'undefined') {
         lenisRef.current = new Lenis({
           duration: 1.2,
           easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
           orientation: 'vertical',
           gestureOrientation: 'vertical',
           smoothWheel: true,
         });

         function raf(time: number) {
           lenisRef.current?.raf(time);
           requestAnimationFrame(raf);
         }

         requestAnimationFrame(raf);
       }

       return () => {
         lenisRef.current?.destroy();
       };
     }, []);

     return (
       <div ref={containerRef} data-scroll-container>
         {children}
       </div>
     );
   }
   ```

3. **Integrate with Layout**
   - Wrap page content with SmoothScroll component
   - Update GSAP ScrollTrigger to work with Lenis
   - Add proper scroller proxy configuration

**Technical Specifications:**
```typescript
// GSAP + Lenis integration
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, 0, 0)
      : lenis.scroll;
  },
});
```

**Fallback Strategy:**
1. If Lenis integration fails, revert to native scroll
2. Remove SmoothScroll wrapper from layout
3. Uninstall @studio-freight/lenis
4. Continue with native browser scrolling

**Success Criteria:**
- ✅ Smooth scrolling feels premium
- ✅ GSAP animations still trigger correctly
- ✅ Mobile scrolling works properly
- ✅ No conflicts with existing scroll behavior
- ✅ No hydration errors

**Rollback Procedure:**
1. Remove SmoothScroll wrapper from layout
2. Uninstall @studio-freight/lenis
3. Continue with native browser scroll

---

### 3.3 React Spring Physics Animations (30 minutes)

**Priority:** MEDIUM - Enhanced micro-interactions  
**Dependencies:** Phase 1 Complete  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/SelectedWorks.tsx`
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Journal.tsx`

**Implementation Steps:**

1. **Install React Spring**
   ```bash
   npm install @react-spring/web
   ```

2. **Enhance Hover Animations**
   - Replace CSS hover states with React Spring
   - Add physics-based spring animations
   - Implement gesture-based interactions

3. **Technical Implementation**
   ```typescript
   import { useSpring, animated } from '@react-spring/web';
   
   const [spring, api] = useSpring(() => ({
     scale: 1,
     config: { tension: 300, friction: 10 },
   }));
   
   // Apply to interactive elements
   <animated.div style={{ transform: spring.scale.to(s => `scale(${s})`) }}>
     {content}
   </animated.div>
   ```

**Success Criteria:**
- ✅ Animations feel natural and physics-based
- ✅ No janky transitions
- ✅ Performance remains optimal
- ✅ Gesture interactions responsive

**Rollback Procedure:**
1. Revert to CSS hover states
2. Remove @react-spring/web dependency

---

### 3.4 React UseGesture Integration (30 minutes)

**Priority:** MEDIUM - Enhanced interaction handling  
**Dependencies:** Phase 1 Complete  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/CursorReveal.tsx`

**Implementation Steps:**

1. **Install React UseGesture**
   ```bash
   npm install @use-gesture/react
   ```

2. **Enhance Cursor Reveal with Gestures**
   ```typescript
   import { useMove } from '@use-gesture/react';
   
   const bind = useMove(({ xy: [x, y] }) => {
     setMousePosition({ x, y });
     setIsActive(true);
   });
   
   <div {...bind()} className="cursor-reveal-container">
     {content}
   </div>
   ```

3. **Add Pinch and Drag Support**
   - Implement pinch-to-zoom for image galleries
   - Add drag gestures for carousel navigation
   - Ensure proper touch event handling

**Success Criteria:**
- ✅ Gesture interactions work smoothly
- ✅ Touch devices fully supported
- ✅ No conflicts with existing scroll behavior
- ✅ Performance remains optimal

**Rollback Procedure:**
1. Revert to native mouse event handlers
2. Remove @use-gesture/react dependency

---

## Phase 4: Production Optimization (90 minutes)

### 4.1 Image Optimization Pipeline (45 minutes)

**Priority:** HIGH - Critical for performance
**Dependencies:** Phase 1 Complete
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/next.config.ts` (lines 10-64)
- `/Users/samuellee/projects/lazy-perfectionist/src/app/components/portfolio/Hero.tsx` (images)
- All portfolio components with images

**Implementation Steps:**

1. **Update Next.js Image Configuration**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/next.config.ts
   images: {
     formats: ['image/webp', 'image/avif'],
     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
     minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
   },
   ```

2. **Convert All Images to Next/Image**
   - Replace `<img>` tags with `<Image />` component
   - Add proper width/height props
   - Implement placeholder/blurred loading
   - Add priority for above-fold images

3. **Implement Progressive Loading**
   ```typescript
   <Image
     src="/assets/img/hero-background.jpg"
     alt="Hero background"
     width={1920}
     height={1080}
     placeholder="blur"
     blurDataURL="data:image/jpeg;base64,..."
     priority
   />
   ```

4. **Generate Image Blur Placeholders**
   ```bash
   npx image-trace-loader
   # Or use sharp for generating blur data URLs
   ```

**Technical Specifications:**
- Use WebP/AVIF formats with fallbacks
- Implement responsive images with srcset
- Lazy load below-fold images
- Add proper alt text for accessibility

**Success Criteria:**
- ✅ All images optimized (WebP/AVIF)
- ✅ LCP <1.5s for hero images
- ✅ No layout shifts from images
- ✅ Proper accessibility attributes

**Validation:**
```bash
# Test image optimization
npm run build
# Check .next/static/media for optimized images
# Run Lighthouse audit
```

**Rollback Procedure:**
1. Revert next.config.ts image settings
2. Replace Next/Image with standard img tags

---

### 4.2 Build Configuration Enhancement (45 minutes)

**Priority:** MEDIUM - Build optimization
**Dependencies:** Phase 1 Complete
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/next.config.ts`
- `/Users/samuellee/projects/lazy-perfectionist/package.json` (scripts)

**Implementation Steps:**

1. **Optimize Next.js Configuration**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/next.config.ts
   const nextConfig: NextConfig = {
     // Existing settings...

     // Production optimizations
     swcMinify: true,
     compiler: {
       removeConsole: process.env.NODE_ENV === 'production',
     },

     // Advanced optimization
     experimental: {
       optimizeCss: true,
       optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber'],
     },

     // Compression
     compress: true,

     // Performance
     productionBrowserSourceMaps: false,
   };
   ```

2. **Add Build Analysis Script**
   ```json
   // File: /Users/samuellee/projects/lazy-perfectionist/package.json
   {
     "scripts": {
       "analyze": "ANALYZE=true next build",
       "build:profile": "next build --profile"
     }
   }
   ```

3. **Enable SWC Minification**
   - Verify SWC minification enabled
   - Test terser fallback if needed
   - Optimize CSS extraction

**Success Criteria:**
- ✅ Build completes without errors
- ✅ Bundle size optimized
- ✅ Console logs removed in production
- ✅ Source maps disabled for production

**Rollback Procedure:**
1. Revert next.config.ts changes
2. Remove experimental features if causing issues

---

### 4.3 Build Configuration Enhancement (30 minutes)

**Priority:** MEDIUM - Build optimization  
**Dependencies:** Phase 1 Complete  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/next.config.ts`
- `/Users/samuellee/projects/lazy-perfectionist/package.json` (scripts)

**Implementation Steps:**

1. **Optimize Next.js Configuration**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/next.config.ts
   const nextConfig: NextConfig = {
     // Existing settings...
     
     // Production optimizations
     swcMinify: true,
     compiler: {
       removeConsole: process.env.NODE_ENV === 'production',
     },
     
     // Advanced optimization
     experimental: {
       optimizeCss: true,
       optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber'],
     },
     
     // Compression
     compress: true,
     
     // Performance
     productionBrowserSourceMaps: false,
   };
   ```

2. **Add Build Analysis Script**
   ```json
   // File: /Users/samuellee/projects/lazy-perfectionist/package.json
   {
     "scripts": {
       "analyze": "ANALYZE=true next build",
       "build:profile": "next build --profile"
     }
   }
   ```

3. **Enable SWC Minification**
   - Verify SWC minification enabled
   - Test terser fallback if needed
   - Optimize CSS extraction

**Success Criteria:**
- ✅ Build completes without errors
- ✅ Bundle size optimized
- ✅ Console logs removed in production
- ✅ Source maps disabled for production

**Rollback Procedure:**
1. Revert next.config.ts changes
2. Remove experimental features if causing issues

---

## Phase 5: Testing Strategy (180 minutes)

### 5.1 Testing Environment Setup (60 minutes)

**Priority:** HIGH - Quality assurance
**Dependencies:** Phase 1-4 Complete
**Files Affected:**
- New: `/Users/samuellee/projects/lazy-perfectionist/tests/user-flow/`
- New: `/Users/samuellee/projects/lazy-perfectionist/playwright.config.ts`

**Implementation Steps:**

1. **Install Playwright for E2E Testing**
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```

2. **Configure Playwright**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/playwright.config.ts
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './tests/user-flow',
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: 'html',
     use: {
       baseURL: 'http://localhost:3000',
       trace: 'on-first-retry',
     },
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] },
       },
       {
         name: 'firefox',
         use: { ...devices['Desktop Firefox'] },
       },
       {
         name: 'webkit',
         use: { ...devices['Desktop Safari'] },
       },
       {
         name: 'Mobile Chrome',
         use: { ...devices['Pixel 5'] },
       },
     ],
     webServer: {
       command: 'npm run dev',
       url: 'http://localhost:3000',
       reuseExistingServer: !process.env.CI,
     },
   });
   ```

3. **Verify Test Environment**
   ```bash
   # Test Playwright installation
   npx playwright test --help
   # Verify browsers installed
   npx playwright install --help
   ```

**Success Criteria:**
- ✅ Playwright installed successfully
- ✅ Configuration file created
- ✅ Test environment ready
- ✅ All required browsers installed

**Budget:** 60 minutes (includes installation, configuration, and verification)

---

### 5.2 User Flow Testing (60 minutes)

**Priority:** HIGH - Quality assurance
**Dependencies:** 5.1 Complete
**Files Affected:**
- New: `/Users/samuellee/projects/lazy-perfectionist/tests/user-flow/landing.spec.ts`
- New: `/Users/samuellee/projects/lazy-perfectionist/tests/user-flow/navigation.spec.ts`

**Implementation Steps:**

1. **Create Landing Page Tests**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/tests/user-flow/landing.spec.ts
   import { test, expect } from '@playwright/test';

   test.describe('Landing Page User Flow', () => {
     test('should display loading screen and complete', async ({ page }) => {
       await page.goto('/');

       // Loading screen visible
       await expect(page.locator('[data-testid="loading-screen"]')).toBeVisible();

       // Counter animates
       const counter = page.locator('[data-testid="loading-counter"]');
       await expect(counter).toHaveText(/\d{3}/);

       // Loading completes within 3 seconds
       await page.waitForTimeout(3000);
       await expect(page.locator('[data-testid="loading-screen"]')).not.toBeVisible();
     });

     test('should navigate through sections smoothly', async ({ page }) => {
       await page.goto('/');
       await page.waitForLoadState('networkidle');

       // Scroll to sections
       await page.mouse.wheel(0, 1000);
       await expect(page.locator('[data-testid="selected-works"]')).toBeVisible();

       await page.mouse.wheel(0, 1000);
       await expect(page.locator('[data-testid="journal-section"]')).toBeVisible();
     });

     test('should handle cursor reveal interaction', async ({ page }) => {
       await page.goto('/');
       await page.waitForLoadState('networkidle');

       const hero = page.locator('[data-testid="hero-section"]');
       await hero.hover();

       // Cursor reveal activates
       await expect(page.locator('[data-testid="cursor-reveal"]')).toBeVisible();
     });
   });
   ```

2. **Create Navigation Tests**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/tests/user-flow/navigation.spec.ts
   import { test, expect } from '@playwright/test';

   test.describe('Navigation User Flow', () => {
     test('should navigate to music page', async ({ page }) => {
       await page.goto('/');
       await page.waitForLoadState('networkidle');

       // Click music link
       await page.click('a[href="/music"]');
       await expect(page).toHaveURL('/music');
     });

     test('should navigate to blog page', async ({ page }) => {
       await page.goto('/');
       await page.waitForLoadState('networkidle');

       // Click blog link
       await page.click('a[href="/blog"]');
       await expect(page).toHaveURL('/blog');
     });
   });
   ```

3. **Run User Flow Tests**
   ```bash
   npx playwright test
   ```

**Success Criteria:**
- ✅ All user flows pass
- ✅ Loading experience smooth
- ✅ Navigation works correctly
- ✅ Interactive elements functional

**Rollback Procedure:**
1. Skip failing tests temporarily
2. Fix issues in subsequent iterations

---

### 5.3 Performance Testing (30 minutes)

**Priority:** HIGH - Production readiness
**Dependencies:** Phase 1-4 Complete
**Files Affected:**
- New: `/Users/samuellee/projects/lazy-perfectionist/.lighthouserc.js`
- Build output

**Implementation Steps:**

1. **Install Lighthouse CI**
   ```bash
   npm install --save-dev @lhci/cli
   ```

2. **Configure Lighthouse CI**
   ```javascript
   // File: /Users/samuellee/projects/lazy-perfectionist/.lighthouserc.js
   module.exports = {
     ci: {
       collect: {
         url: ['http://localhost:3000'],
         numberOfRuns: 3,
       },
       assert: {
         assertions: {
           'categories:performance': ['error', { minScore: 0.85 }],
           'categories:accessibility': ['error', { minScore: 0.98 }],
           'categories:best-practices': ['error', { minScore: 0.90 }],
           'categories:seo': ['error', { minScore: 0.95 }],
         },
       },
       upload: {
         target: 'temporary-public-storage',
       },
     },
   };
   ```

3. **Run Lighthouse Audit**
   ```bash
   npm run build
   npm run start
   npx lhci autorun
   ```

**Target Metrics (REALISTIC):**
- Performance: 85-90 (reduced from 95+)
- Accessibility: 98+
- Best Practices: 90+
- SEO: 95+
- LCP <1.5s
- FID <100ms
- CLS <0.1

**Success Criteria:**
- ✅ All Lighthouse scores meet realistic targets
- ✅ Core Web Vitals in "Good" range
- ✅ No critical performance issues

**Rollback Procedure:**
1. Optimize failing metrics
2. Re-run audits until passing

---

### 5.4 Cross-Browser & Accessibility Testing (30 minutes)

**Priority:** MEDIUM - Compatibility assurance
**Dependencies:** 5.1-5.3 Complete
**Files Affected:**
- All portfolio components
- `/Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx`

**Implementation Steps:**

1. **BrowserStack Testing**
   - Test on: Chrome, Safari, Firefox, Edge
   - Mobile: iOS Safari, Chrome Mobile
   - Verify all features work

2. **Accessibility Audit**
   ```bash
   npm install --save-dev @axe-core/playwright
   ```

   ```typescript
   import { test, expect } from '@playwright/test';
   import AxeBuilder from '@axe-core/playwright';

   test('should not have accessibility violations', async ({ page }) => {
     await page.goto('/');
     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
     expect(accessibilityScanResults.violations).toEqual([]);
   });
   ```

3. **Manual Testing Checklist**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast ratios
   - Touch target sizes
   - Focus indicators

**Success Criteria:**
- ✅ Works on all target browsers
- ✅ No accessibility violations
- ✅ Keyboard navigation functional
- ✅ Screen reader announcements correct

**Rollback Procedure:**
1. Fix individual accessibility issues
2. Test and verify fixes

---

## Phase 6: Deployment Preparation (60 minutes)

### 6.1 Environment Variable Setup (20 minutes)

**Priority:** CRITICAL - Production configuration  
**Dependencies:** All phases complete  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/.env.local`
- `/Users/samuellee/projects/lazy-perfectionist/.env.production`

**Implementation Steps:**

1. **Create Environment Configuration**
   ```bash
   # File: /Users/samuellee/projects/lazy-perfectionist/.env.production
   NEXT_PUBLIC_SITE_URL=https://lazyperfectionist.com
   NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
   NODE_ENV=production
   
   # Optional: CDN configuration
   NEXT_PUBLIC_CDN_URL=https://cdn.lazyperfectionist.com
   ```

2. **Validate Environment Variables**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/lib/env.ts
   const requiredEnvVars = [
     'NEXT_PUBLIC_SITE_URL',
   ];
   
   requiredEnvVars.forEach(varName => {
     if (!process.env[varName]) {
       throw new Error(`Missing: ${varName}`);
     }
   });
   ```

**Success Criteria:**
- ✅ All required env vars set
- ✅ No hardcoded secrets
- ✅ Production config validated

**Rollback Procedure:**
1. Use development env as fallback
2. Add missing variables

---

### 6.2 Service Worker & PWA Setup (20 minutes)

**Priority:** MEDIUM - Enhanced performance  
**Dependencies:** Phase 4 Complete  
**Files Affected:**
- `/Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx`
- New: `/Users/samuellee/projects/lazy-perfectionist/public/sw.js`

**Implementation Steps:**

1. **Register Service Worker**
   ```typescript
   // File: /Users/samuellee/projects/lazy-perfectionist/src/app/layout.tsx
   useEffect(() => {
     if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
       navigator.serviceWorker.register('/sw.js');
     }
   }, []);
   ```

2. **Create Service Worker**
   ```javascript
   // File: /Users/samuellee/projects/lazy-perfectionist/public/sw.js
   const CACHE_NAME = 'lazy-perfectionist-v1';
   const urlsToCache = [
     '/',
     '/music',
     '/blog',
     '/manifest.json',
   ];
   
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then(cache => cache.addAll(urlsToCache))
     );
   });
   
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request)
         .then(response => response || fetch(event.request))
     );
   });
   ```

**Success Criteria:**
- ✅ Service worker registers successfully
- ✅ Offline caching works
- ✅ Assets cached properly

**Rollback Procedure:**
1. Unregister service worker
2. Delete sw.js file

---

### 6.3 Production Build & Validation (20 minutes)

**Priority:** CRITICAL - Deployment readiness  
**Dependencies:** All previous phases  
**Files Affected:**
- Build output

**Implementation Steps:**

1. **Run Production Build**
   ```bash
   npm run build
   ```

2. **Validate Build Output**
   ```bash
   # Check for errors
   # Verify bundle sizes
   # Test production build locally
   npm run start
   ```

3. **Pre-Deployment Checklist**
   - ✅ Build completes without errors
   - ✅ All tests pass
   - ✅ Performance metrics meet targets
   - ✅ Environment variables configured
   - ✅ Backup plan documented

**Success Criteria:**
- ✅ Production build succeeds
- ✅ Local production test passes
- ✅ Ready for deployment

**Rollback Procedure:**
1. Fix build errors
2. Re-run build process

---

## Phase 7: Risk Mitigation & Rollback (Included throughout)

### 7.1 Critical Risk Identification

**Risk 1: Migration Breaking Existing Routes**
- **Mitigation:** Comprehensive redirect testing
- **Rollback:** Restore backup files immediately

**Risk 2: Animation Performance Degradation**
- **Mitigation:** Performance monitoring during implementation
- **Rollback:** Disable specific animations causing issues

**Risk 3: Bundle Size Bloat**
- **Mitigation:** Continuous bundle analysis
- **Rollback:** Remove non-essential libraries

**Risk 4: Cross-Browser Compatibility**
- **Mitigation:** Early testing on target browsers
- **Rollback:** Fallback to simpler implementations

---

### 7.2 Rollback Procedures

**Immediate Rollback (<5 minutes):**
```bash
# Restore root page
cp src/app/page.tsx.backup-* src/app/page.tsx

# Remove shared components
rm -rf src/app/components/portfolio

# Restart server
npm run dev
```

**Partial Rollback (<30 minutes):**
- Identify specific issue
- Revert affected components
- Test alternative solutions

**Complete Rollback (<1 hour):**
1. Restore from git commit before migration
2. Revert package.json changes
3. Clear .next cache
4. Reinstall dependencies

---

## Success Criteria Summary

### Functional Requirements
- ✅ Root page displays portfolio design
- ✅ All portfolio sections migrated and functional
- ✅ Animations smooth at 60fps
- ✅ Cursor reveal effect working
- ✅ Responsive design works on all devices
- ✅ Page transitions implemented
- ✅ Navigation works correctly

### Performance Requirements (REALISTIC TARGETS)
- ✅ Lighthouse Performance score: 85-90 (reduced from 95+)
- ✅ Lighthouse Accessibility: 98+
- ✅ Lighthouse Best Practices: 90+ (reduced from 95+)
- ✅ Core Web Vitals: All green
- ✅ First Contentful Paint <1.5s
- ✅ Time to Interactive <3s
- ✅ Cumulative Layout Shift <0.1

### Visual Requirements
- ✅ ORYZO design system consistently applied
- ✅ Warm amber color scheme (#e7b37b) used throughout
- ✅ Typography hierarchy maintained
- ✅ Artistic elements polished and refined
- ✅ Animations enhance user experience
- ✅ Visual effects are subtle and premium

### Technical Requirements
- ✅ Code follows best practices
- ✅ TypeScript strict mode enabled
- ✅ No console errors or warnings
- ✅ Proper error handling implemented
- ✅ SEO optimized
- ✅ Progressive Web App features enabled

---

## Implementation Order & Dependencies

```
Phase 1 (Foundation & Performance)
├── 1.1 Root Page Migration [CRITICAL PATH]
├── 1.2 Routing Updates [depends on 1.1]
└── 1.3 Code Splitting & SSR Configuration [depends on 1.1]

Phase 2 (Animations) [depends on Phase 1]
├── 2.1 GSAP Enhancements
├── 2.2 Page Transitions
└── 2.3 3D Elements

Phase 3 (Libraries - OPTIONAL) [depends on Phase 1]
├── 3.1 Lenis Smooth Scroll
├── 3.2 React Spring
└── 3.3 UseGesture

Phase 4 (Optimization) [depends on Phase 1-2]
├── 4.1 Image Optimization
└── 4.2 Build Configuration

Phase 5 (Testing) [depends on Phase 1-4]
├── 5.1 Testing Environment Setup
├── 5.2 User Flow Testing
├── 5.3 Performance Testing
└── 5.4 Cross-Browser Testing

Phase 6 (Deployment) [depends on All Previous]
├── 6.1 Environment Setup
├── 6.2 Service Worker
└── 6.3 Production Build
```

---

## Timeline Estimate (REVISED - 12-16 hours with 20% buffer)

- **Phase 1:** 120 minutes (Foundation & Performance) - +30 min for code splitting
- **Phase 2:** 90 minutes (Animations) - -30 min from original
- **Phase 3:** 60 minutes (Libraries - OPTIONAL) - -30 min from original, can skip if needed
- **Phase 4:** 90 minutes (Optimization) - -30 min from original
- **Phase 5:** 180 minutes (Testing) - +90 min for proper test setup and execution
- **Phase 6:** 60 minutes (Deployment)
- **Buffer:** 120 minutes (20% for debugging and unexpected issues)
- **Total:** ~12-16 hours

**Critical Path:** Phase 1.1 (Root Page Migration) → Phase 1.3 (Code Splitting) → Phase 2 (Animations) → Phase 4 (Optimization) → Phase 5 (Testing) → Phase 6 (Deployment)

**Scope Reduction Options (if time constrained):**
1. Skip Phase 3 (Library Integration) entirely - saves 60 minutes
2. Basic animations in Phase 2 - saves 30 minutes
3. Minimal testing in Phase 5 - saves 60 minutes
4. Defer Phase 6 (Service Worker) - saves 20 minutes

**Minimum Viable Timeline: ~8-10 hours** (with scope reductions)

---

## Validation Criteria for Each Phase

**Phase 1 Validation:**
- Root page loads with portfolio design
- All components render correctly
- Navigation works without errors

**Phase 2 Validation:**
- Animations run smoothly at 60fps
- No memory leaks from animation libraries
- Page transitions feel natural

**Phase 3 Validation:**
- Libraries integrate without conflicts
- Performance impact is minimal
- All features work as expected

**Phase 4 Validation:**
- Bundle size within acceptable limits
- Image optimization working
- Build completes successfully

**Phase 5 Validation:**
- All tests pass
- Performance metrics met
- Cross-browser compatibility verified

**Phase 6 Validation:**
- Production build succeeds
- Environment configured correctly
- Ready for deployment

---

## Post-Deployment Monitoring

**Immediate (First 24 Hours):**
- Monitor error rates
- Check performance metrics
- Verify user engagement

**Short-term (First Week):**
- Analyze user behavior
- Track Core Web Vitals
- Monitor bundle loading times

**Long-term (Ongoing):**
- Continuous performance monitoring
- Regular cross-browser testing
- User feedback collection

---

## Next Steps After Deployment

1. **Incremental Improvements**
   - A/B test animation variations
   - Optimize based on real user metrics
   - Add additional features based on usage

2. **Content Enhancement**
   - Add more portfolio items
   - Expand journal entries
   - Enhance explorations gallery

3. **Advanced Features**
   - Implement personalized experiences
   - Add advanced audio visualization
   - Create immersive 3D experiences

---

**Document Status:** ✅ REVISED - Ready for Implementation
**Last Updated:** 2026-07-12
**Version:** 2.0 (Critical Issues Addressed)

**Critical Revisions Made:**
- ✅ Replaced Locomotive Scroll with Lenis (Next.js 15 compatible)
- ✅ Added comprehensive testing setup (60 minutes for Playwright installation)
- ✅ Added data-testid attributes to all components in Phase 1.1
- ✅ Moved Code Splitting to Phase 1.3 (before animations)
- ✅ Updated performance targets to realistic 85-90 (not 95+)
- ✅ Updated timeline to 12-16 hours (includes 20% buffer)
- ✅ Made Phase 3 (Library Integration) optional
- ✅ Added complete import migration documentation for all components
- ✅ Added Three.js SSR strict configuration (`ssr: false`)
- ✅ Added fallback strategy for Lenis integration

**Implementation Authorization:** This plan provides detailed, executable steps for autonomous implementation with clear validation criteria and rollback procedures at each phase.
