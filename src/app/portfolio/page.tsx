'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortfolioRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to root page with portfolio design
    router.replace('/');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-display italic text-oryzo-cream mb-4">
          Redirecting...
        </div>
        <div className="text-sm text-oryzo-muted uppercase tracking-[0.3em]">
          Portfolio design has moved to the homepage
        </div>
      </div>
    </div>
  );
}