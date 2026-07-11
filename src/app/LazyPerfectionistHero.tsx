'use client';

import Link from 'next/link';
import { generateStructuredData } from '@/components/SEO';

export default function LazyPerfectionistHero() {

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData('MusicGroup', {
          name: 'Lazy Perfectionist',
          description: 'Instrumental progressive rock/metal project from Hong Kong. Where technical precision meets emotional storytelling.',
          url: 'https://lazyperfectionist.com',
          genre: ['Progressive Rock', 'Progressive Metal', 'Instrumental Rock'],
          origin: 'Hong Kong',
          foundingDate: '2023',
        })}
      />

      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex flex-row justify-between px-8 py-6 max-w-7xl mx-auto">
        <div
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Lazy Perfectionist
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm text-foreground">Home</Link>
          <Link href="/music" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Music</Link>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <Link href="/store" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Store</Link>
          <Link href="/platform-links" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Connect</Link>
        </div>

        <Link
          href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform inline-flex items-center"
        >
          Listen Now
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px]">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-muted-foreground">silence</em> speaks{' '}
          <em className="not-italic text-muted-foreground">through the sound.</em>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          Instrumental progressive rock from a Hong Kong bedroom studio. Technical precision meets emotional storytelling
          without saying a word.
        </p>

        <Link
          href="https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2 inline-flex items-center justify-center"
        >
          Stream "Orbit" Now
        </Link>
      </section>
    </>
  );
}