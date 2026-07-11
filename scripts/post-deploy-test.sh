#!/bin/bash

# ============================================
# Post-Deployment Testing Script
# ============================================
# This script runs comprehensive tests after deployment
# to verify the application is working correctly in production.

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_URL="${SITE_URL:-http://localhost:3000}"
TIMEOUT=30
MAX_RETRIES=3

# Counter for results
PASS=0
FAIL=0
WARN=0

# Helper functions
check_pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}⚠ WARN${NC}: $1"
    ((WARN++))
}

info() {
    echo -e "${BLUE}ℹ INFO${NC}: $1"
}

# Function to wait for site to be available
wait_for_site() {
    local url=$1
    local max_attempts=30
    local attempt=0

    info "Waiting for site to be available at $url..."

    while [ $attempt -lt $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            check_pass "Site is available at $url"
            return 0
        fi
        ((attempt++))
        sleep 2
    done

    check_fail "Site did not become available at $url"
    return 1
}

# Function to test HTTP endpoint
test_endpoint() {
    local url=$1
    local expected_status=${2:-200}
    local description=$3

    info "Testing: $description"

    response=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$url" 2>/dev/null || echo "000")

    if [ "$response" = "$expected_status" ]; then
        check_pass "$description (HTTP $response)"
        return 0
    else
        check_fail "$description (Expected $expected_status, got $response)"
        return 1
    fi
}

# Function to test API response
test_api() {
    local url=$1
    local field=$2
    local description=$3

    info "Testing: $description"

    response=$(curl -s --max-time $TIMEOUT "$url" 2>/dev/null)

    if echo "$response" | grep -q "$field"; then
        check_pass "$description (API responding correctly)"
        return 0
    else
        check_fail "$description (API response incorrect)"
        return 1
    fi
}

echo "=========================================="
echo "Post-Deployment Testing"
echo "=========================================="
echo "Testing site: $SITE_URL"
echo ""

# ============================================
# 1. Site Availability Check
# ============================================
echo "1. Checking Site Availability..."

wait_for_site "$SITE_URL"

echo ""

# ============================================
# 2. Core Page Tests
# ============================================
echo "2. Testing Core Pages..."

# Test homepage
test_endpoint "$SITE_URL" 200 "Homepage"

# Test portfolio page
test_endpoint "$SITE_URL/portfolio" 200 "Portfolio page"

# Test explorations page
test_endpoint "$SITE_URL/explorations" 200 "Explorations page"

# Test journal page
test_endpoint "$SITE_URL/journal" 200 "Journal page"

# Test contact page
test_endpoint "$SITE_URL/contact" 200 "Contact page"

echo ""

# ============================================
# 3. API Endpoint Tests
# ============================================
echo "3. Testing API Endpoints..."

# Test health endpoint
test_api "$SITE_URL/api/health" "status" "Health check API"

# Test sitemap endpoint
test_endpoint "$SITE_URL/sitemap.xml" 200 "Sitemap XML"

# Test robots.txt
test_endpoint "$SITE_URL/robots.txt" 200 "Robots.txt"

echo ""

# ============================================
# 4. Static Asset Tests
# ============================================
echo "4. Testing Static Assets..."

# Test manifest.json
test_api "$SITE_URL/manifest.json" "name" "PWA Manifest"

# Test favicon
test_endpoint "$SITE_URL/favicon.ico" 200 "Favicon" || \
test_endpoint "$SITE_URL/favicon.svg" 200 "Favicon SVG"

echo ""

# ============================================
# 5. Performance Tests
# ============================================
echo "5. Testing Performance..."

# Test Time to First Byte (TTFB)
info "Testing TTFB..."
ttfb=$(curl -o /dev/null -s -w '%{time_starttransfer}' "$SITE_URL")
ttfb_int=$(echo "$ttfb * 1000" | bc)

if (( $(echo "$ttfb < 1.0" | bc -l) )); then
    check_pass "TTFB is ${ttfb}s (good)"
elif (( $(echo "$ttfb < 2.0" | bc -l) )); then
    check_warn "TTFB is ${tttfb}s (acceptable)"
else
    check_fail "TTFB is ${ttfb}s (slow)"
fi

# Test response size
info "Testing response size..."
size=$(curl -s "$SITE_URL" | wc -c)
size_kb=$(echo "scale=2; $size / 1024" | bc)

if (( $(echo "$size_kb < 500" | bc -l) )); then
    check_pass "Homepage size is ${size_kb}KB (good)"
elif (( $(echo "$size_kb < 1000" | bc -l) )); then
    check_warn "Homepage size is ${size_kb}KB (acceptable)"
else
    check_fail "Homepage size is ${size_kb}KB (large)"
fi

echo ""

# ============================================
# 6. SSL/HTTPS Tests
# ============================================
echo "6. Testing SSL Configuration..."

if [[ "$SITE_URL" == https://* ]]; then
    info "Testing SSL certificate..."

    if curl -sS "$SITE_URL" 2>&1 | grep -q "SSL"; then
        check_pass "SSL is enabled and working"
    else
        check_warn "SSL configuration might have issues"
    fi

    # Check for HTTP headers
    info "Testing security headers..."
    headers=$(curl -sI "$SITE_URL")

    if echo "$headers" | grep -qi "x-frame-options"; then
        check_pass "X-Frame-Options header set"
    else
        check_warn "X-Frame-Options header missing"
    fi

    if echo "$headers" | grep -qi "x-content-type-options"; then
        check_pass "X-Content-Type-Options header set"
    else
        check_warn "X-Content-Type-Options header missing"
    fi
else
    check_warn "Not using HTTPS (development only)"
fi

echo ""

# ============================================
# 7. Database Tests
# ============================================
echo "7. Testing Database Connectivity..."

# Test database via health endpoint
db_status=$(curl -s "$SITE_URL/api/health" | grep -o '"database":{"status":"[^"]*"' | cut -d'"' -f4)

if [ "$db_status" = "pass" ]; then
    check_pass "Database connection successful"

    # Check database latency
    db_latency=$(curl -s "$SITE_URL/api/health" | grep -o '"latency":[0-9]*' | cut -d':' -f2)

    if [ "$db_latency" -lt 500 ]; then
        check_pass "Database latency is ${db_latency}ms (good)"
    elif [ "$db_latency" -lt 1000 ]; then
        check_warn "Database latency is ${db_latency}ms (acceptable)"
    else
        check_fail "Database latency is ${db_latency}ms (slow)"
    fi
else
    check_fail "Database connection failed"
fi

echo ""

# ============================================
# 8. Service Worker/PWA Tests
# ============================================
echo "8. Testing PWA Configuration..."

# Check service worker registration
info "Testing service worker availability..."
if curl -s "$SITE_URL/sw.js" | grep -q "self"; then
    check_pass "Service worker file is accessible"
else
    check_warn "Service worker might not be accessible"
fi

echo ""

# ============================================
# 9. Content Tests
# ============================================
echo "9. Testing Critical Content..."

# Check for critical CSS
info "Testing for critical CSS..."
if curl -s "$SITE_URL" | grep -q "style"; then
    check_pass "Critical CSS is present"
else
    check_warn "Critical CSS might be missing"
fi

# Check for JavaScript bundles
info "Testing for JavaScript bundles..."
if curl -s "$SITE_URL" | grep -q "script"; then
    check_pass "JavaScript bundles are present"
else
    check_fail "JavaScript bundles might be missing"
fi

echo ""

# ============================================
# 10. Mobile Responsiveness Tests
# ============================================
echo "10. Testing Mobile Responsiveness..."

# Test with mobile user agent
info "Testing mobile viewport..."
mobile_response=$(curl -s -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" "$SITE_URL")

if echo "$mobile_response" | grep -q "viewport"; then
    check_pass "Mobile viewport is configured"
else
    check_warn "Mobile viewport might not be configured"
fi

echo ""

# ============================================
# 11. Environment Check
# ============================================
echo "11. Testing Environment Configuration..."

# Check environment via health endpoint
env_status=$(curl -s "$SITE_URL/api/health" | grep -o '"environment":"[^"]*"' | cut -d'"' -f4)

if [ "$env_status" = "production" ]; then
    check_pass "Running in production mode"
else
    check_warn "Running in $env_status mode"
fi

echo ""

# ============================================
# Summary
# ============================================
echo "=========================================="
echo "Summary"
echo "=========================================="
echo -e "${GREEN}PASSES: $PASS${NC}"
echo -e "${YELLOW}WARNINGS: $WARN${NC}"
echo -e "${RED}FAILURES: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ Post-deployment tests PASSED${NC}"
    echo "Deployment is successful and working correctly!"

    if [ $WARN -gt 0 ]; then
        echo ""
        echo "⚠ There are $WARN warnings that should be reviewed."
    fi

    exit 0
else
    echo -e "${RED}✗ Post-deployment tests FAILED${NC}"
    echo "Please fix the failures or consider rollback."

    if [ $FAIL -ge 3 ]; then
        echo ""
        echo "⚠ Multiple failures detected - recommend immediate rollback."
    fi

    exit 1
fi
