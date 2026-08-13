'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminLoginShell />}>
      <AdminLoginForm />
    </Suspense>
  )
}

function AdminLoginShell() {
  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-oryzo-muted" />
      </div>
    </div>
  )
}

function AdminLoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fromPath = search.get('from') || '/admin/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }
      router.push(fromPath)
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-oryzo-canvas text-oryzo-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-oryzo-surface/60 border border-oryzo-border mb-4">
            <Lock className="w-6 h-6 text-oryzo-ember" />
          </div>
          <h1 className="text-2xl font-oryzo-display text-oryzo-cream mb-1">Admin Portal</h1>
          <p className="text-sm text-oryzo-muted">Lazy Perfectionist — content management</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-oryzo-surface/40 border border-oryzo-border rounded-3xl p-6 md:p-8 space-y-4"
        >
          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-[0.3em] text-oryzo-muted font-oryzo-display mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
              required
              className="w-full bg-oryzo-canvas/60 border border-oryzo-border rounded-xl px-4 py-3 text-oryzo-cream placeholder-oryzo-muted/60 focus:outline-none focus:border-oryzo-ember transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-oryzo-ember/10 border border-oryzo-ember/30 px-4 py-3 text-sm text-oryzo-cream">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full liquid-glass rounded-full px-6 py-3 font-oryzo-display text-sm text-oryzo-cream hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                VERIFYING...
              </>
            ) : (
              'ENTER DASHBOARD'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-oryzo-muted hover:text-oryzo-cream transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}
