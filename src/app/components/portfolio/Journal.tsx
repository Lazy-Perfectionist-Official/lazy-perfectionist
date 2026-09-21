'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface MediumPost {
  id: string;
  title: string;
  thumbnail: string;
  readTime: string;
  publishedDate: string;
  link: string;
}

export default function Journal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/medium?limit=4&sort=latest');
        if (!res.ok) throw new Error('Medium fetch failed');
        const data = await res.json();
        if (cancelled) return;
        setPosts((data.data || []).slice(0, 4));
      } catch {
        if (!cancelled) setErrored(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <section ref={sectionRef} className="bg-oryzo-canvas py-16 md:py-24" data-testid="journal-section">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
          data-testid="journal-header"
        >
          <div className="mb-6">
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
              RECENT
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight">
            RECENT THOUGHTS
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            Behind the scenes of Lazy Perfectionist&apos;s musical journey and creative process.
          </p>

          {posts.length > 0 && (
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 border border-oryzo-border hover:border-oryzo-cream hover:text-oryzo-cream transition-all group font-oryzo-display"
            >
              VIEW ALL
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden>
                →
              </span>
            </Link>
          )}
        </motion.div>

        {/* Journal Entries */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-4 bg-oryzo-surface/30 border border-oryzo-border rounded-[40px] sm:rounded-full opacity-50 animate-pulse"
              >
                <div className="w-16 h-16 rounded-2xl bg-oryzo-border/40" />
                <div className="flex-1">
                  <div className="h-5 bg-oryzo-border/40 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-oryzo-border/40 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : errored || posts.length === 0 ? (
          <div className="text-center py-12 text-oryzo-muted font-oryzo-body">
            Stories coming soon.{' '}
            <Link href="/blog" className="text-oryzo-cream hover:underline">
              Visit the blog →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((entry, index) => (
              <motion.a
                key={entry.id}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{
                  y: -4,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.1,
                  backgroundColor: { duration: 0.2 },
                  borderColor: { duration: 0.2 },
                  y: { type: 'spring', stiffness: 300, damping: 25 },
                }}
                viewport={{ once: true, margin: '-50px' }}
                className="flex items-center gap-6 p-4 bg-oryzo-surface/30 border border-oryzo-border rounded-[40px] sm:rounded-full cursor-pointer group"
                data-testid={`journal-entry-${index}`}
              >
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-oryzo-border/40">
                  {entry.thumbnail ? (
                    <Image
                      src={entry.thumbnail}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-oryzo-muted text-2xl">
                      ✦
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-oryzo-display text-oryzo-cream mb-1 truncate">
                    {entry.title.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-oryzo-muted font-oryzo-body">
                    {entry.readTime && <span>{entry.readTime} READ</span>}
                    {entry.readTime && entry.publishedDate && <span>•</span>}
                    {entry.publishedDate && <span>{formatDate(entry.publishedDate)}</span>}
                  </div>
                </div>

                <div className="text-oryzo-muted group-hover:text-oryzo-cream group-hover:translate-x-1 transition-all">
                  →
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
