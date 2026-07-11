#!/usr/bin/env node

/**
 * Performance Testing Script
 * Tests various performance aspects of the application
 * Run: node scripts/test-performance.js
 */

const https = require('https');
const http = require('http');
const { performance } = require('perf_hooks');

const TARGET_URL = 'http://localhost:3000';
const TEST_TIMEOUT = 30000;

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function measureHTTPResponse(url) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const end = performance.now();
        resolve({
          url,
          status: res.statusCode,
 headers: res.headers,
          size: data.length,
          time: end - start,
          success: res.statusCode >= 200 && res.statusCode < 400,
        });
      });
    });

    req.on('error', (err) => {
      const end = performance.now();
      resolve({
        url,
        status: 0,
        size: 0,
        time: end - start,
        success: false,
        error: err.message,
      });
    });

    req.setTimeout(TEST_TIMEOUT);
  });
}

async function testPerformance() {
  log('\n🚀 Starting Performance Tests...\n', 'cyan');

  const routes = [
    '/',
    '/blog',
    '/music',
    '/store',
    '/portfolio',
  ];

  const results = [];

  log('📊 Testing route performance:', 'blue');
  log('─'.repeat(60), 'reset');

  for (const route of routes) {
    const url = `${TARGET_URL}${route}`;
    log(`  Testing ${route}...`, 'yellow');

    const result = await measureHTTPResponse(url);
    results.push(result);

    const status = result.success ? 'green' : 'red';
    const time = result.time.toFixed(0);
    const size = (result.size / 1024).toFixed(1);

    log(
      `    ${result.status} | ${time.padStart(4)}ms | ${size.padStart(7)}KB`,
      status
    );
  }

  log('\n📈 Performance Summary:', 'cyan');
  log('─'.repeat(60), 'reset');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const avgTime = successful.reduce((a, r) => a + r.time, 0) / successful.length;
  const maxSize = Math.max(...successful.map(r => r.size));

  log(`  ✅ Successful: ${successful.length}/${results.length}`, 'green');
  log(`  ❌ Failed: ${failed.length}`, failed.length > 0 ? 'red' : 'green');
  log(`  ⏱️  Avg Response Time: ${avgTime.toFixed(0)}ms`, 'blue');
  log(`  📦 Max Response Size: ${(maxSize / 1024).toFixed(1)}KB`, 'blue');

  // Performance checks
  log('\n🎯 Performance Thresholds:', 'cyan');
  log('─'.repeat(60), 'reset');

  const fastResponses = successful.filter(r => r.time < 1000);
  const smallResponses = successful.filter(r => r.size < 100 * 1024);

  log(
    `  ⚡ Fast Responses (<1s): ${fastResponses.length}/${successful.length}`,
    fastResponses.length === successful.length ? 'green' : 'yellow'
  );
  log(
    `  📦 Small Pages (<100KB): ${smallResponses.length}/${successful.length}`,
    smallResponses.length === successful.length ? 'green' : 'yellow'
  );

  if (failed.length > 0) {
    log('\n❌ Failed Routes:', 'red');
    log('─'.repeat(60), 'reset');
    failed.forEach(r => {
      log(`  ${r.url}: ${r.error || 'Unknown error'}`, 'red');
    });
  }

  log('\n✅ Performance testing complete!\n', 'green');
}

// Run tests
testPerformance().catch(err => {
  log(`\n❌ Error: ${err.message}\n`, 'red');
  process.exit(1);
});
