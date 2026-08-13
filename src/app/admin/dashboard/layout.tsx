'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Music, FileText, Mail, LogOut, ExternalLink, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/dashboard/music', label: 'Music', icon: Music },
  { href: '/admin/dashboard/content', label: 'Content', icon: FileText },
  { href: '/admin/dashboard/messages', label: 'Messages', icon: Mail },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [navOpen, setNavOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  const isActive = (href: string) =>
    href === '/admin/dashboard' ? pathname === href : pathname.startsWith(href)

  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream">
      {/* Top bar */}
      <header className="border-b border-oryzo-border bg-oryzo-canvas/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden liquid-glass rounded-full p-2 text-oryzo-cream"
              aria-label="Toggle nav"
            >
              {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span
              className="text-lg md:text-xl tracking-tight text-oryzo-cream"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Admin
            </span>
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display hidden sm:inline">
              · Lazy Perfectionist
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs md:text-sm text-oryzo-muted hover:text-oryzo-cream transition-colors inline-flex items-center gap-1"
            >
              View site <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-oryzo-cream transition-colors inline-flex items-center gap-1"
            >
              <LogOut className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-56 flex-shrink-0 border-r border-oryzo-border min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  isActive(href)
                    ? 'bg-oryzo-surface/60 text-oryzo-cream'
                    : 'text-oryzo-muted hover:text-oryzo-cream hover:bg-oryzo-surface/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-30 bg-oryzo-canvas/95 backdrop-blur-xl pt-16 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <nav className="space-y-1 pt-4">
                {NAV.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setNavOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base transition-colors ${
                      isActive(href)
                        ? 'bg-oryzo-surface/60 text-oryzo-cream'
                        : 'text-oryzo-muted hover:text-oryzo-cream'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">{children}</main>
      </div>
    </div>
  )
}
