'use client';

import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast({
        title: 'Subscribed',
        description: data.message || "You're on the list.",
      });
      setEmail('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      toast({
        title: 'Could not subscribe',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
      data-testid="newsletter-form"
    >
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-oryzo-muted" size={18} />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          disabled={submitting}
          className="w-full liquid-glass rounded-full pl-12 pr-4 py-3 text-sm text-oryzo-cream placeholder:text-oryzo-muted focus:outline-none focus:ring-1 focus:ring-oryzo-ember"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="liquid-glass rounded-full px-6 py-3 text-sm font-oryzo-display text-oryzo-cream hover:scale-[1.03] transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            SUBSCRIBING
          </>
        ) : (
          'SUBSCRIBE'
        )}
      </button>
    </form>
  );
}
