/**
 * Health Check API Endpoint
 *
 * Provides comprehensive health status for deployment verification and monitoring.
 * Used by load balancers, monitoring services, and deployment scripts.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    database: { status: 'pass' | 'fail'; message: string; latency?: number };
    api: { status: 'pass' | 'fail'; message: string };
    memory: { status: 'pass' | 'fail'; message: string; usage: NodeJS.MemoryUsage };
    dependencies: { status: 'pass' | 'fail'; services: Record<string, boolean> };
  };
  metadata: {
    region?: string;
    deployment: string;
    lastDeployment?: string;
  };
}

/**
 * Main health check endpoint
 */
export async function GET(request: Request) {
  const startTime = Date.now();
  const health: HealthCheckResult = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'unknown',
    checks: {
      database: { status: 'pass', message: 'Not configured' },
      api: { status: 'pass', message: 'API operational' },
      memory: { status: 'pass', message: 'Memory usage normal', usage: process.memoryUsage() },
      dependencies: { status: 'pass', services: {} },
    },
    metadata: {
      region: process.env.VERCEL_REGION || process.env.NEXT_PUBLIC_VERCEL_ENV || 'unknown',
      deployment: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      lastDeployment: process.env.VERCEL_DEPLOYMENT_DATE || undefined,
    },
  };

  // Check database connectivity
  try {
    const dbStartTime = Date.now();
    await db.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - dbStartTime;

    health.checks.database = {
      status: 'pass',
      message: 'Database connection successful',
      latency: dbLatency,
    };

    // Check for database performance issues
    if (dbLatency > 1000) {
      health.status = 'degraded';
      health.checks.database.message = `Database slow (${dbLatency}ms)`;
    }
  } catch (error) {
    health.status = 'unhealthy';
    health.checks.database = {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Database connection failed',
    };
  }

  // Check critical environment variables
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'NEXT_PUBLIC_SITE_URL',
  ];

  const optionalEnvVars = [
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'SPOTIFY_ARTIST_ID',
    'SONGLINK_API_KEY',
    'NEXT_PUBLIC_GA_ID',
    'NEXT_PUBLIC_SENTRY_DSN',
  ];

  // Check required environment variables
  const missingRequired = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingRequired.length > 0) {
    health.status = 'degraded';
    health.checks.dependencies = {
      status: 'fail',
      services: {
        ...health.checks.dependencies.services,
        environment_vars: false,
      },
    };
  } else {
    health.checks.dependencies.services = {
      ...health.checks.dependencies.services,
      environment_vars: true,
    };
  }

  // Check optional environment variables
  const missingOptional = optionalEnvVars.filter(varName => !process.env[varName]);
  health.checks.dependencies.services = {
    ...health.checks.dependencies.services,
    optional_integrations: missingOptional.length < optionalEnvVars.length,
    spotify_integration: !!(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET),
    analytics_enabled: !!(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_SENTRY_DSN),
  };

  // Check memory usage
  const memoryUsage = process.memoryUsage();
  const heapUsedMB = memoryUsage.heapUsed / 1024 / 1024;
  const heapTotalMB = memoryUsage.heapTotal / 1024 / 1024;

  if (heapUsedMB / heapTotalMB > 0.9) {
    health.status = 'degraded';
    health.checks.memory = {
      status: 'fail',
      message: 'High memory usage (>90%)',
      usage: memoryUsage,
    };
  } else if (heapUsedMB / heapTotalMB > 0.8) {
    health.status = 'degraded';
    health.checks.memory.message = 'Elevated memory usage (>80%)';
  }

  // Check overall health status
  const overallHealth = Object.values(health.checks).every(
    check => check.status === 'pass'
  );

  if (!overallHealth && health.status !== 'unhealthy') {
    health.status = 'degraded';
  }

  // Calculate response time
  const responseTime = Date.now() - startTime;
  if (responseTime > 5000) {
    health.status = 'degraded';
  }

  // Return appropriate HTTP status
  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;

  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Health-Check-Version': '1.0.0',
      'X-Response-Time': `${responseTime}ms`,
    },
  });
}

/**
 * HEAD endpoint for simple health checks (returns status only)
 */
export async function HEAD() {
  try {
    // Quick database check
    await db.$queryRaw`SELECT 1`;

    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Health-Status': 'healthy',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Health-Status': 'unhealthy',
        'Cache-Control': 'no-cache',
      },
    });
  }
}