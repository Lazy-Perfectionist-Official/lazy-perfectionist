#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes production bundle sizes and generates report
 * Run: node scripts/analyze-bundle.js
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = './.next/standalone';
const ANALYSIS_DIR = './.next/analyze';

function analyzeBundleSize(dir, prefix = '') {
  let totalSize = 0;
  const files = [];

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(prefix, item.name);

    if (item.isDirectory()) {
      const { size, files: subFiles } = analyzeBundleSize(fullPath, relativePath);
      totalSize += size;
      files.push(...subFiles);
    } else if (item.isFile()) {
      const stats = fs.statSync(fullPath);
      const size = stats.size;
      totalSize += size;
      files.push({
        path: relativePath,
        size: size,
        sizeKB: (size / 1024).toFixed(2),
      });
    }
  }

  return { totalSize, files };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBuild() {
  console.log('🔍 Analyzing production bundle...\n');

  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Analyze main bundles
  const staticDir = path.join(BUILD_DIR, '_next', 'static');

  if (fs.existsSync(staticDir)) {
    console.log('📦 Static Assets:');
    console.log('─'.repeat(60));

    const { totalSize, files } = analyzeBundleSize(staticDir);

    // Sort by size
    files.sort((a, b) => b.size - a.size);

    // Display top 20 largest files
    console.log(`\n📊 Top 20 Largest Files:`);
    console.log('─'.repeat(60));
    files.slice(0, 20).forEach((file) => {
      const bar = '█'.repeat(Math.min(Math.floor(file.size / 1024), 50));
      console.log(
        `${file.sizeKB.padStart(8)} KB ${bar.padEnd(52)} ${file.path}`
      );
    });

    console.log('\n📈 Total Bundle Size:');
    console.log('─'.repeat(60));
    console.log(`Total: ${formatBytes(totalSize)}`);
    console.log(`Files: ${files.length}`);

    // Analyze by type
    const jsFiles = files.filter(f => f.path.endsWith('.js'));
    const cssFiles = files.filter(f => f.path.endsWith('.css'));
    const imageFiles = files.filter(f =>
      /\.(jpg|jpeg|png|webp|avif|svg|gif)$/i.test(f.path)
    );

    console.log('\n📋 Breakdown by Type:');
    console.log('─'.repeat(60));
    console.log(`JavaScript: ${formatBytes(jsFiles.reduce((a, f) => a + f.size, 0))} (${jsFiles.length} files)`);
    console.log(`CSS:        ${formatBytes(cssFiles.reduce((a, f) => a + f.size, 0))} (${cssFiles.length} files)`);
    console.log(`Images:     ${formatBytes(imageFiles.reduce((a, f) => a + f.size, 0))} (${imageFiles.length} files)`);

    // Check for optimization issues
    console.log('\n⚠️  Optimization Checks:');
    console.log('─'.repeat(60));

    const largeFiles = files.filter(f => f.size > 200 * 1024); // > 200KB
    if (largeFiles.length > 0) {
      console.log(`\n❌ ${largeFiles.length} files over 200KB:`);
      largeFiles.forEach(f => {
        console.log(`   ${formatBytes(f.size)} - ${f.path}`);
      });
    } else {
      console.log('✅ All files under 200KB');
    }

    const uncompressedJs = jsFiles.filter(f => !f.path.includes('.min.') && f.size > 50 * 1024);
    if (uncompressedJs.length > 0) {
      console.log(`\n⚠️  ${uncompressedJs.length} potential unminified JS files over 50KB`);
    } else {
      console.log('✅ All JS files appear minified');
    }
  } else {
    console.log('⚠️  Static directory not found in build output');
  }

  console.log('\n✅ Analysis complete!');
}

// Run analysis
analyzeBuild();
