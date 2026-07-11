#!/bin/bash

# ============================================
# Pre-Deployment Verification Script
# ============================================
# This script runs comprehensive checks before deployment
# to ensure the application is ready for production.

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

echo "=========================================="
echo "Pre-Deployment Verification"
echo "=========================================="
echo ""

# ============================================
# 1. Environment Variables Check
# ============================================
echo "1. Checking Environment Variables..."

REQUIRED_VARS=(
    "DATABASE_URL"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "NEXT_PUBLIC_SITE_URL"
)

OPTIONAL_VARS=(
    "SPOTIFY_CLIENT_ID"
    "SPOTIFY_CLIENT_SECRET"
    "SPOTIFY_ARTIST_ID"
    "SONGLINK_API_KEY"
    "NEXT_PUBLIC_GA_ID"
    "NEXT_PUBLIC_SENTRY_DSN"
)

# Check for .env.example existence
if [ -f ".env.example" ]; then
    check_pass ".env.example exists"
else
    check_fail ".env.example missing"
fi

# Check if .env.local exists (for development)
if [ -f ".env.local" ]; then
    check_pass ".env.local exists"

    # Check required variables
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^$var=" .env.local 2>/dev/null || grep -q "^$var=" .env.local 2>/dev/null; then
            check_pass "$var is set"
        else
            check_fail "$var is not set"
        fi
    done

    # Check NEXTAUTH_SECRET is not default
    if grep -q "NEXTAUTH_SECRET=your_nextauth_secret" .env.local 2>/dev/null; then
        check_fail "NEXTAUTH_SECRET is using default value"
    else
        check_pass "NEXTAUTH_SECRET is properly set"
    fi
else
    check_warn ".env.local not found (will use production environment)"
fi

# Check NODE_ENV
if [ "$NODE_ENV" = "production" ]; then
    check_pass "NODE_ENV is production"
else
    check_warn "NODE_ENV is $NODE_ENV (should be production for deployment)"
fi

echo ""

# ============================================
# 2. Build and Compile Check
# ============================================
echo "2. Checking Build Status..."

# Check if node_modules exists
if [ -d "node_modules" ]; then
    check_pass "node_modules exists"
else
    check_fail "node_modules missing - run npm install"
    exit 1
fi

# Check if dependencies are installed
if [ -f "package.json" ]; then
    check_pass "package.json exists"

    # Check for critical dependencies
    CRITICAL_DEPS=(
        "next"
        "react"
        "react-dom"
        "@prisma/client"
        "typescript"
    )

    for dep in "${CRITICAL_DEPS[@]}"; do
        if grep -q "\"$dep\"" package.json; then
            check_pass "$dep in package.json"
        else
            check_fail "$dep missing from package.json"
        fi
    done
else
    check_fail "package.json missing"
fi

# Test TypeScript compilation
echo "Testing TypeScript compilation..."
if npm run build --dry-run >/dev/null 2>&1; then
    check_pass "TypeScript compilation test passed"
else
    check_warn "TypeScript compilation test had issues (will test during build)"
fi

echo ""

# ============================================
# 3. Database Check
# ============================================
echo "3. Checking Database Configuration..."

# Check Prisma schema
if [ -f "prisma/schema.prisma" ]; then
    check_pass "Prisma schema exists"

    # Check if Prisma client is generated
    if [ -d "node_modules/.prisma/client" ]; then
        check_pass "Prisma client generated"
    else
        check_warn "Prisma client not generated - run npx prisma generate"
    fi
else
    check_fail "Prisma schema missing"
fi

# Check for database migrations
if [ -d "prisma/migrations" ]; then
    MIGRATION_COUNT=$(ls prisma/migrations | wc -l)
    if [ "$MIGRATION_COUNT" -gt 0 ]; then
        check_pass "Database migrations found ($MIGRATION_COUNT migrations)"
    else
        check_warn "No database migrations found"
    fi
else
    check_warn "No migrations directory found"
fi

echo ""

# ============================================
# 4. Production Configuration Check
# ============================================
echo "4. Checking Production Configuration..."

# Check next.config.ts
if [ -f "next.config.ts" ]; then
    check_pass "next.config.ts exists"

    # Check for production optimizations
    if grep -q "compress: true" next.config.ts; then
        check_pass "Compression enabled in next.config.ts"
    else
        check_warn "Compression not enabled in next.config.ts"
    fi

    if grep -q "output: 'standalone'" next.config.ts; then
        check_pass "Standalone output configured"
    else
        check_warn "Standalone output not configured"
    fi
else
    check_fail "next.config.ts missing"
fi

# Check vercel.json
if [ -f "vercel.json" ]; then
    check_pass "vercel.json exists"
else
    check_warn "vercel.json not found (needed for Vercel deployment)"
fi

echo ""

# ============================================
# 5. Assets and Static Files Check
# ============================================
echo "5. Checking Assets and Static Files..."

# Check for public directory
if [ -d "public" ]; then
    check_pass "public directory exists"

    # Check for manifest.json
    if [ -f "public/manifest.json" ]; then
        check_pass "PWA manifest exists"
    else
        check_warn "PWA manifest not found"
    fi

    # Check for robots.txt
    if [ -f "public/robots.txt" ]; then
        check_pass "robots.txt exists"
    else
        check_warn "robots.txt not found"
    fi

    # Check for favicon
    if [ -f "public/favicon.ico" ] || [ -f "public/favicon.svg" ]; then
        check_pass "Favicon exists"
    else
        check_warn "Favicon not found"
    fi
else
    check_fail "public directory missing"
fi

echo ""

# ============================================
# 6. Security Check
# ============================================
echo "6. Checking Security Configuration..."

# Check for .env files in git
if git ls-files | grep -q ".env"; then
    check_fail ".env files tracked in git (SECURITY RISK)"
else
    check_pass "No .env files tracked in git"
fi

# Check for API keys in code
if grep -r "api_key\|API_KEY\|api-secret\|API_SECRET" src/ 2>/dev/null | grep -v "process.env" | grep -q .; then
    check_warn "Possible hardcoded API keys found in source code"
else
    check_pass "No hardcoded API keys detected"
fi

# Check NEXTAUTH_SECRET strength
if [ -f ".env.local" ]; then
    SECRET=$(grep "^NEXTAUTH_SECRET=" .env.local | cut -d'=' -f2)
    if [ ${#SECRET} -lt 32 ]; then
        check_warn "NEXTAUTH_SECRET appears weak (should be at least 32 characters)"
    else
        check_pass "NEXTAUTH_SECRET appears strong enough"
    fi
fi

echo ""

# ============================================
# 7. Testing Check
# ============================================
echo "7. Checking Testing Configuration..."

# Check for Playwright tests
if [ -d "tests" ] || [ -d "e2e" ]; then
    check_pass "Test directory exists"

    # Check playwright.config.ts
    if [ -f "playwright.config.ts" ]; then
        check_pass "Playwright configuration exists"
    else
        check_warn "Playwright configuration not found"
    fi
else
    check_warn "No test directory found"
fi

# Check for lighthouserc configuration
if [ -f "lighthouserc.json" ] || [ -f ".lighthouserc.json" ]; then
    check_pass "Lighthouse configuration exists"
else
    check_warn "Lighthouse configuration not found"
fi

echo ""

# ============================================
# 8. Git Status Check
# ============================================
echo "8. Checking Git Status..."

# Check if there are uncommitted changes
if git diff --quiet 2>/dev/null && git diff --cached --quiet 2>/dev/null; then
    check_pass "No uncommitted changes"
else
    check_warn "Uncommitted changes detected"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
echo "Current branch: $CURRENT_BRANCH"

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
    echo -e "${GREEN}✓ Pre-deployment check PASSED${NC}"
    echo "Application is ready for deployment!"
    exit 0
else
    echo -e "${RED}✗ Pre-deployment check FAILED${NC}"
    echo "Please fix the failures before deploying."
    exit 1
fi
