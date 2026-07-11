#!/usr/bin/env node

/**
 * Image optimization script
 * Converts large images to WebP/AVIF formats with responsive sizes
 * Run: node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_CONFIG = {
  // Current large images that need optimization
  'noise.jpg': {
    createTiles: [100, 200], // Create seamless tiles
    formats: ['webp', 'avif'],
  },
  'logo.png': {
    sizes: [200, 400, 600, 800], // Responsive sizes
    formats: ['webp', 'avif'],
    quality: 85,
  },
  'logo-handwritten.png': {
    sizes: [300, 600, 900],
    formats: ['webp', 'avif'],
    quality: 85,
  },
  'orbit-cover.jpg': {
    sizes: [400, 800, 1200, 1600, 2000],
    formats: ['webp', 'avif'],
    quality: 85,
  },
};

const SOURCE_DIR = './assets/img';
const OUTPUT_DIR = './public/assets/img/optimized';

async function createSeamlessTile(inputPath, tileSize) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Create a seamless tile by extracting center portion
    const tileX = Math.floor((metadata.width - tileSize) / 2);
    const tileY = Math.floor((metadata.height - tileSize) / 2);

    await image
      .extract({ left: tileX, top: tileY, width: tileSize, height: tileSize })
      .resize(tileSize, tileSize, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(path.join(OUTPUT_DIR, `noise-tile-${tileSize}.webp`));

    console.log(`✓ Created seamless tile: ${tileSize}px`);
  } catch (error) {
    console.error(`✗ Error creating ${tileSize}px tile:`, error.message);
  }
}

async function generateResponsiveImages(inputPath, basename, config) {
  for (const size of config.sizes) {
    for (const format of config.formats) {
      try {
        const outputPath = path.join(OUTPUT_DIR, `${basename}-${size}.${format}`);
        const image = sharp(inputPath).resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

        if (format === 'webp') {
          await image.webp({ quality: config.quality }).toFile(outputPath);
        } else if (format === 'avif') {
          await image.avif({ quality: config.quality }).toFile(outputPath);
        }

        console.log(`✓ Generated: ${basename}-${size}.${format}`);
      } catch (error) {
        console.error(`✗ Error generating ${basename}-${size}.${format}:`, error.message);
      }
    }
  }
}

async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Process each image
  for (const [filename, config] of Object.entries(IMAGE_CONFIG)) {
    const inputPath = path.join(SOURCE_DIR, filename);
    const basename = path.basename(filename, path.extname(filename));

    if (!fs.existsSync(inputPath)) {
      console.log(`⊘ File not found: ${filename}`);
      continue;
    }

    console.log(`\n📸 Processing: ${filename}`);

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
    console.log(`  Original size: ${originalSize} MB`);

    // Create seamless tiles for noise
    if (config.createTiles) {
      for (const tileSize of config.createTiles) {
        await createSeamlessTile(inputPath, tileSize);
      }
    }

    // Generate responsive sizes
    if (config.sizes) {
      await generateResponsiveImages(inputPath, basename, config);
    }

    console.log(`✓ Completed: ${filename}`);
  }

  console.log('\n✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
}

// Run if called directly
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };