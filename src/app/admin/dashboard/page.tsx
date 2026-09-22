import { db } from '@/lib/db'
import { Music, FileText, Mail, Users, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  try {
    const [tracks, platformLinks, messages, subscribers, blogPosts, unreadMessages] =
      await Promise.all([
        db.track.count(),
        db.platformLink.count({ where: { isActive: true } }),
        db.contactMessage.count(),
        db.subscriber.count({ where: { status: 'ACTIVE' } }),
        db.blogPost.count({ where: { status: 'PUBLISHED' } }),
        db.contactMessage.count({ where: { responded: false } }),
      ])
    return { tracks, platformLinks, messages, subscribers, blogPosts, unreadMessages }
  } catch (e) {
    // DB might not be initialized — return zeros
    return {
      tracks: 0,
      platformLinks: 0,
      messages: 0,
      subscribers: 0,
      blogPosts: 0,
      unreadMessages: 0,
    }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Music Tracks',
      value: stats.tracks,
      href: '/admin/dashboard/music',
      icon: Music,
      hint: `${stats.platformLinks} active platform links`,
    },
    {
      label: 'Site Content',
      value: 'Edit',
      href: '/admin/dashboard/content',
      icon: FileText,
      hint: 'Hero copy, bio, stats, socials',
    },
    {
      label: 'Messages',
      value: stats.messages,
      href: '/admin/dashboard/messages',
      icon: Mail,
      hint: stats.unreadMessages > 0 ? `${stats.unreadMessages} awaiting reply` : 'All responded',
    },
    {
      label: 'Subscribers',
      value: stats.subscribers,
      href: '/admin/dashboard/messages',
      icon: Users,
      hint: 'Newsletter contacts',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-oryzo-border" />
          <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
            Dashboard
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display italic text-oryzo-cream">
          Welcome back
        </h1>
        <p className="text-oryzo-muted mt-2">
          Manage your site content, music catalog, and audience from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {cards.map(({ label, value, href, icon: Icon, hint }) => (
          <Link
            key={label}
            href={href}
            className="group bg-oryzo-surface/40 border border-oryzo-border hover:border-oryzo-cream/40 rounded-3xl p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-oryzo-canvas/60 border border-oryzo-border flex items-center justify-center">
                <Icon className="w-5 h-5 text-oryzo-ember" />
              </div>
              <ArrowRight className="w-4 h-4 text-oryzo-muted group-hover:text-oryzo-cream group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-3xl md:text-4xl font-medium text-oryzo-cream mb-1">
              {value}
            </div>
            <div className="text-sm text-oryzo-muted">{label}</div>
            {hint && <div className="text-xs text-oryzo-muted/70 mt-2">{hint}</div>}
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-oryzo-surface/30 border border-oryzo-border rounded-3xl p-6">
        <h2 className="text-lg font-medium uppercase text-oryzo-cream mb-3">Quick links</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/dashboard/music"
            className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-4 py-2 text-sm text-oryzo-cream transition-colors"
          >
            Add a track
          </Link>
          <Link
            href="/admin/dashboard/content"
            className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-4 py-2 text-sm text-oryzo-cream transition-colors"
          >
            Edit hero text
          </Link>
          <Link
            href="/"
            target="_blank"
            className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-4 py-2 text-sm text-oryzo-cream transition-colors inline-flex items-center gap-1"
          >
            View live site <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
