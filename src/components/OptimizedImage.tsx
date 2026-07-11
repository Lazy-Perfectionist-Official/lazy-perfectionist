'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getOptimizedImagePath, generateSrcSet } from '@/lib/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  style?: React.CSSProperties;
}

/**
 * Optimized image component that uses pre-generated responsive images
 * with WebP/AVIF formats and automatic blur placeholders
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 85,
  className = '',
  sizes = '100vw',
  style,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Extract image info from src path
  const getImageInfo = (imageSrc: string) => {
    // Handle optimized images
    if (imageSrc.includes('/assets/img/optimized/')) {
      const match = imageSrc.match(/(\w+)-(\d+)\.(webp|avif)/);
      if (match) {
        const [, basename, sizeStr] = match;
        const size = parseInt(sizeStr);
        return {
          basename,
          currentSize: size,
          isOptimized: true,
        };
      }
    }

    // Handle original images
    const basename = imageSrc.split('/').pop()?.split('.')[0];
    if (basename) {
      // Map to available optimized sizes
      const sizeMap: Record<string, number[]> = {
        'logo': [200, 400, 600, 800],
        'logo-handwritten': [300, 600, 900],
        'orbit-cover': [400, 800, 1200, 1600, 2000],
      };

      const sizes = sizeMap[basename] || [800];
      const maxSize = Math.max(...sizes);

      return {
        basename,
        currentSize: maxSize,
        availableSizes: sizes,
        isOptimized: false,
      };
    }

    return null;
  };

  const imageInfo = getImageInfo(src);

  if (!imageInfo) {
    // Fallback to regular Next.js Image
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        className={className}
        sizes={sizes}
        style={style}
        onLoad={() => setIsLoading(false)}
      />
    );
  }

  const { basename, currentSize, isOptimized } = imageInfo;

  // Use optimized AVIF format for best compression
  const optimizedSrc = isOptimized
    ? src
    : getOptimizedImagePath(basename, currentSize, 'avif');

  // Generate blur placeholder (simple gray)
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

  return (
    <>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        className={className}
        sizes={sizes}
        style={style}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && !priority && (
        <div
          className="animate-pulse bg-gray-800/20"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
      )}
    </>
  );
}
