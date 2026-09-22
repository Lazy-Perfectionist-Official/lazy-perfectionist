'use client'

import { useState, useEffect, useCallback } from 'react'
import { Music, Plus, Trash2, ExternalLink, Loader2, Save, X, Edit3, Link2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PlatformLinkRow {
  id: string
  platformName: string
  platformUrl: string
  isActive: boolean
}

interface TrackRow {
  id: string
  name: string
  spotifyUrl: string | null
  previewUrl: string | null
  isrc: string | null
  album: { id: string; name: string; imageUrl: string | null } | null
  platformLinks: PlatformLinkRow[]
}

interface TrackModalState {
  mode: 'create' | 'edit'
  track?: TrackRow
}

const COMMON_PLATFORMS = [
  'spotify',
  'apple_music',
  'youtube_music',
  'soundcloud',
  'bandcamp',
  'tidal',
  'deezer',
  'amazon_music',
]

export default function AdminMusicPage() {
  const [tracks, setTracks] = useState<TrackRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState<TrackModalState | null>(null)
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)

  const loadTracks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/tracks')
      const data = await res.json()
      if (data.success) setTracks(data.data)
      else setError(data.error || 'Failed to load tracks')
    } catch {
      setError('Network error loading tracks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTracks()
  }, [loadTracks])

  const handleDeleteTrack = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This also removes its platform links.`)) return
    try {
      await fetch(`/api/admin/tracks/${id}`, { method: 'DELETE' })
      setTracks((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Failed to delete track')
    }
  }

  const handleDeleteLink = async (linkId: string, trackId: string) => {
    try {
      await fetch('/api/admin/platform-links', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: linkId }),
      })
      setTracks((prev) =>
        prev.map((t) =>
          t.id === trackId
            ? { ...t, platformLinks: t.platformLinks.filter((l) => l.id !== linkId) }
            : t
        )
      )
    } catch {
      setError('Failed to delete platform link')
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-oryzo-border" />
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
              Catalog
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display italic text-oryzo-cream">Music</h1>
          <p className="text-oryzo-muted mt-2 text-sm">
            Manually manage tracks and streaming links. These appear on the live site when the Spotify API is unavailable.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="liquid-glass rounded-full px-5 py-2.5 font-medium text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          ADD TRACK
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-oryzo-ember/10 border border-oryzo-ember/30 px-4 py-3 text-sm text-oryzo-cream">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-oryzo-muted">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : tracks.length === 0 ? (
        <div className="text-center py-20 bg-oryzo-surface/30 border border-oryzo-border rounded-3xl">
          <Music className="w-12 h-12 text-oryzo-muted mx-auto mb-4" />
          <h3 className="text-xl font-medium text-oryzo-cream mb-2">NO TRACKS YET</h3>
          <p className="text-oryzo-muted mb-6 text-sm">
            Add your first track manually to populate the music page.
          </p>
          <button
            onClick={() => setModal({ mode: 'create' })}
            className="liquid-glass rounded-full px-6 py-3 font-medium text-sm text-oryzo-cream hover:scale-[1.03] transition-transform inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            ADD YOUR FIRST TRACK
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-oryzo-surface/40 border border-oryzo-border rounded-2xl overflow-hidden"
            >
              <div className="p-4 md:p-5 flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden bg-oryzo-canvas border border-oryzo-border flex-shrink-0">
                  {track.album?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={track.album.imageUrl}
                      alt={track.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-5 h-5 text-oryzo-muted" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium uppercase text-oryzo-cream truncate">{track.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-oryzo-muted mt-1 flex-wrap">
                    {track.album?.name && <span>{track.album.name}</span>}
                    {track.isrc && <span>ISRC: {track.isrc}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      {track.platformLinks.length} links
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      setExpandedTrack(expandedTrack === track.id ? null : track.id)
                    }
                    className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-3 py-1.5 text-xs text-oryzo-cream transition-colors"
                  >
                    {expandedTrack === track.id ? 'Hide' : 'Links'}
                  </button>
                  <button
                    onClick={() => setModal({ mode: 'edit', track })}
                    className="rounded-full border border-oryzo-border hover:border-oryzo-cream p-2 text-oryzo-cream transition-colors"
                    aria-label="Edit track"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTrack(track.id, track.name)}
                    className="rounded-full border border-oryzo-ember/40 hover:border-oryzo-ember p-2 text-oryzo-ember transition-colors"
                    aria-label="Delete track"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedTrack === track.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-oryzo-border"
                  >
                    <div className="p-4 md:p-5 bg-oryzo-canvas/40">
                      <PlatformLinksEditor
                        track={track}
                        onDeleteLink={(linkId) => handleDeleteLink(linkId, track.id)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <TrackModal
            state={modal}
            onClose={() => setModal(null)}
            onSaved={() => {
              setModal(null)
              loadTracks()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function PlatformLinksEditor({
  track,
  onDeleteLink,
}: {
  track: TrackRow
  onDeleteLink: (id: string) => void
}) {
  const [platformName, setPlatformName] = useState('')
  const [platformUrl, setPlatformUrl] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = async () => {
    if (!platformName || !platformUrl) return
    setAdding(true)
    try {
      const res = await fetch('/api/admin/platform-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId: track.id,
          platformName,
          platformUrl,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPlatformName('')
        setPlatformUrl('')
        // Refresh by reloading — simplest path
        window.location.reload()
      }
    } catch {
      // ignore
    } finally {
      setAdding(false)
    }
  }

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-oryzo-muted font-medium mb-3">
        Platform links
      </div>

      {track.platformLinks.length === 0 ? (
        <p className="text-sm text-oryzo-muted mb-4">No platform links yet. Add one below.</p>
      ) : (
        <div className="space-y-2 mb-4">
          {track.platformLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-3 bg-oryzo-surface/40 border border-oryzo-border rounded-xl px-3 py-2"
            >
              <span className="text-xs font-medium text-oryzo-cream uppercase tracking-wider min-w-[100px]">
                {link.platformName}
              </span>
              <a
                href={link.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-xs text-oryzo-muted hover:text-oryzo-cream truncate inline-flex items-center gap-1"
              >
                {link.platformUrl.replace(/^https?:\/\//, '').slice(0, 50)}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
              <button
                onClick={() => onDeleteLink(link.id)}
                className="text-oryzo-muted hover:text-oryzo-ember transition-colors p-1"
                aria-label="Remove link"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
          className="bg-oryzo-canvas/60 border border-oryzo-border rounded-lg px-3 py-2 text-sm text-oryzo-cream focus:outline-none focus:border-oryzo-ember"
        >
          <option value="">Select platform...</option>
          {COMMON_PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        <input
          type="url"
          value={platformUrl}
          onChange={(e) => setPlatformUrl(e.target.value)}
          placeholder="https://..."
          className="flex-1 bg-oryzo-canvas/60 border border-oryzo-border rounded-lg px-3 py-2 text-sm text-oryzo-cream placeholder-oryzo-muted/60 focus:outline-none focus:border-oryzo-ember"
        />
        <button
          onClick={handleAdd}
          disabled={!platformName || !platformUrl || adding}
          className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-4 py-2 text-sm text-oryzo-cream transition-colors disabled:opacity-50 inline-flex items-center gap-1 justify-center"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add
        </button>
      </div>
    </div>
  )
}

function TrackModal({
  state,
  onClose,
  onSaved,
}: {
  state: TrackModalState
  onClose: () => void
  onSaved: () => void
}) {
  const isEdit = state.mode === 'edit' && state.track
  const [name, setName] = useState(state.track?.name || '')
  const [spotifyUrl, setSpotifyUrl] = useState(state.track?.spotifyUrl || '')
  const [previewUrl, setPreviewUrl] = useState(state.track?.previewUrl || '')
  const [imageUrl, setImageUrl] = useState(state.track?.album?.imageUrl || '')
  const [albumName, setAlbumName] = useState(state.track?.album?.name || '')
  const [isrc, setIsrc] = useState(state.track?.isrc || '')
  const [links, setLinks] = useState(
    state.track?.platformLinks?.map((l) => ({
      platformName: l.platformName,
      platformUrl: l.platformUrl,
    })) || [{ platformName: 'spotify', platformUrl: '' }]
  )
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const handleSave = async () => {
    setSaving(true)
    setErr(null)
    try {
      if (isEdit && state.track) {
        const res = await fetch(`/api/admin/tracks/${state.track.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, spotifyUrl, previewUrl, imageUrl }),
        })
        if (!res.ok) {
          const d = await res.json()
          throw new Error(d.error || 'Update failed')
        }
      } else {
        const res = await fetch('/api/admin/tracks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            spotifyUrl,
            previewUrl,
            imageUrl,
            albumName: albumName || name,
            isrc,
            platformLinks: links.filter((l) => l.platformUrl),
          }),
        })
        if (!res.ok) {
          const d = await res.json()
          throw new Error(d.error || 'Create failed')
        }
      }
      onSaved()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const updateLink = (i: number, field: 'platformName' | 'platformUrl', value: string) => {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)))
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-oryzo-canvas border border-oryzo-border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-oryzo-canvas/90 backdrop-blur border-b border-oryzo-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-medium uppercase text-oryzo-cream">
            {isEdit ? 'Edit track' : 'New track'}
          </h2>
          <button
            onClick={onClose}
            className="text-oryzo-muted hover:text-oryzo-cream transition-colors p-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Field label="Track name *">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember"
              placeholder="Orbit"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Album name">
              <input
                type="text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                disabled={isEdit}
                className="w-full bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember disabled:opacity-60"
                placeholder="Orbit"
              />
            </Field>
            <Field label="ISRC">
              <input
                type="text"
                value={isrc}
                onChange={(e) => setIsrc(e.target.value)}
                disabled={isEdit}
                className="w-full bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember disabled:opacity-60"
                placeholder="optional"
              />
            </Field>
          </div>

          <Field label="Cover art URL">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isEdit}
              className="w-full bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember disabled:opacity-60"
              placeholder="https://... or /assets/img/..."
            />
            {imageUrl && (
              <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-oryzo-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="cover" className="w-full h-full object-cover" />
              </div>
            )}
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Spotify URL">
              <input
                type="url"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                className="w-full bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember"
                placeholder="https://open.spotify.com/track/..."
              />
            </Field>
            <Field label="Preview audio URL">
              <input
                type="url"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                className="w-full bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-oryzo-cream focus:outline-none focus:border-oryzo-ember"
                placeholder="https://... .mp3"
              />
            </Field>
          </div>

          {!isEdit && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.2em] text-oryzo-muted font-medium">
                  Platform links
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setLinks((prev) => [...prev, { platformName: '', platformUrl: '' }])
                  }
                  className="text-xs text-oryzo-cream hover:text-oryzo-ember transition-colors inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add row
                </button>
              </div>
              <div className="space-y-2">
                {links.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <select
                      value={link.platformName}
                      onChange={(e) => updateLink(i, 'platformName', e.target.value)}
                      className="bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-sm text-oryzo-cream focus:outline-none focus:border-oryzo-ember"
                    >
                      <option value="">Platform...</option>
                      {COMMON_PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                    <input
                      type="url"
                      value={link.platformUrl}
                      onChange={(e) => updateLink(i, 'platformUrl', e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-oryzo-surface/40 border border-oryzo-border rounded-lg px-3 py-2 text-sm text-oryzo-cream placeholder-oryzo-muted/60 focus:outline-none focus:border-oryzo-ember"
                    />
                    <button
                      type="button"
                      onClick={() => setLinks((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-oryzo-muted hover:text-oryzo-ember p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {err && (
            <div className="rounded-xl bg-oryzo-ember/10 border border-oryzo-ember/30 px-4 py-3 text-sm text-oryzo-cream">
              {err}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-oryzo-canvas/90 backdrop-blur border-t border-oryzo-border px-6 py-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-oryzo-border hover:border-oryzo-cream px-5 py-2 text-sm text-oryzo-cream transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name || saving}
            className="liquid-glass rounded-full px-5 py-2 text-sm text-oryzo-cream hover:scale-[1.02] transition-transform inline-flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? 'SAVE CHANGES' : 'CREATE TRACK'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-oryzo-muted font-medium mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
