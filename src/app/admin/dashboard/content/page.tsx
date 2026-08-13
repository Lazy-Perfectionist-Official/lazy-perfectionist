'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react'
import { CONTENT_SCHEMA } from '@/lib/site-content'

type ContentMap = Record<string, string>

export default function AdminContentPage() {
  const [values, setValues] = useState<ContentMap>({})
  const [original, setOriginal] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = { ...CONTENT_SCHEMA_DEFAULTS }
    void init
    void load()
  }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      const merged = { ...DEFAULTS }
      if (data.success) Object.assign(merged, data.data)
      setValues(merged)
      setOriginal(merged)
    } catch {
      setError('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const dirtyKeys = Object.keys(values).filter((k) => values[k] !== original[k])

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    if (dirtyKeys.length === 0) return
    setSaving(true)
    setError(null)
    try {
      const patch: Record<string, string> = {}
      for (const k of dirtyKeys) patch[k] = values[k]
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error('Save failed')
      setOriginal({ ...values })
      setSaved(true)
    } catch {
      setError('Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setValues(original)
    setSaved(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-oryzo-muted">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-oryzo-border" />
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
              Copy
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display italic text-oryzo-cream">Site Content</h1>
          <p className="text-oryzo-muted mt-2 text-sm">
            Edit headlines, descriptions, and links shown across the site. Changes apply on save.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirtyKeys.length > 0 && (
            <button
              onClick={handleReset}
              disabled={saving}
              className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-4 py-2 text-sm text-oryzo-cream transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={dirtyKeys.length === 0 || saving}
            className="liquid-glass rounded-full px-5 py-2 text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="w-4 h-4 text-oryzo-ember" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? 'SAVED' : dirtyKeys.length > 0 ? `SAVE (${dirtyKeys.length})` : 'SAVED'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-oryzo-ember/10 border border-oryzo-ember/30 px-4 py-3 text-sm text-oryzo-cream">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {CONTENT_SCHEMA.map((group) => (
          <div
            key={group.section}
            className="bg-oryzo-surface/40 border border-oryzo-border rounded-3xl p-5 md:p-6"
          >
            <h2 className="text-sm font-oryzo-display text-oryzo-cream uppercase tracking-[0.2em] mb-4">
              {group.section}
            </h2>
            <div className="space-y-4">
              {group.fields.map((field) => {
                const isLong = field.default.length > 60
                const isDirty = values[field.key] !== original[field.key]
                return (
                  <div key={field.key}>
                    <label className="block text-xs text-oryzo-muted mb-1.5 font-oryzo-display">
                      {field.label}
                      {isDirty && <span className="text-oryzo-ember ml-2">● unsaved</span>}
                    </label>
                    {isLong ? (
                      <textarea
                        value={values[field.key] ?? ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        rows={3}
                        className="w-full bg-oryzo-canvas/60 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[field.key] ?? ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full bg-oryzo-canvas/60 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const DEFAULTS: ContentMap = (() => {
  const d: ContentMap = {}
  for (const g of CONTENT_SCHEMA) for (const f of g.fields) d[f.key] = f.default
  return d
})()

const CONTENT_SCHEMA_DEFAULTS = DEFAULTS
