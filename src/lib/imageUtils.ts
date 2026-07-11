/**
 * Image optimization utilities for responsive images and blur placeholders
 */

// Generate base64 blur placeholder for progressive image loading
export function generateBlurPlaceholder(width: number = 10, height: number = 10): string {
  // Create a simple blur placeholder using a tiny base64 image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Fill with a neutral gray that works well as blur placeholder
    ctx.fillStyle = 'rgba(128, 128, 128, 0.1)';
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL('image/png');
}

// Responsive image sizes generator
export function generateImageSizes(breakpoints: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]): string {
  return breakpoints.map(bp => `(max-width: ${bp}px) ${bp}px`).concat(['3840px']).join(', ');
}

// Calculate optimal image size based on container
export function calculateOptimalSize(containerWidth: number, dpr: number = 1): number {
  const baseSize = Math.ceil(containerWidth * dpr);
  // Round to nearest 100 for better caching
  return Math.ceil(baseSize / 100) * 100;
}

// Preload critical images
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Generate seamless CSS noise pattern from base64
export function generateNoisePattern(): string {
  // This will be replaced with actual optimized noise texture
  return 'url("/assets/img/noise.jpg")';
}