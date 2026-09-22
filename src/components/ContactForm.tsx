'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm({ className = '' }: { className?: string }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }
      toast({
        title: 'Message sent',
        description: data.message || "Thanks — I'll be in touch soon.",
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      toast({
        title: 'Could not send message',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full liquid-glass rounded-2xl px-4 py-3 text-sm text-oryzo-cream placeholder:text-oryzo-muted focus:outline-none focus:ring-1 focus:ring-oryzo-ember';

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${className}`}
      data-testid="contact-form"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          aria-label="Your name"
          disabled={submitting}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          aria-label="Your email"
          disabled={submitting}
          className={inputClass}
        />
      </div>
      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject (optional)"
        aria-label="Subject"
        disabled={submitting}
        className={inputClass}
      />
      <textarea
        name="message"
        required
        minLength={10}
        value={form.message}
        onChange={handleChange}
        placeholder="Your message (at least 10 characters)"
        aria-label="Your message"
        disabled={submitting}
        rows={5}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={submitting}
        className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-oryzo-cream hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center justify-center gap-2 self-start"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            SENDING
          </>
        ) : (
          <>
            <Send size={16} />
            SEND MESSAGE
          </>
        )}
      </button>
    </form>
  );
}
