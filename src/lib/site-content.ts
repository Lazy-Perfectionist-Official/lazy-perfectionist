import { db } from '@/lib/db'

/**
 * Editable site content keys with labels and default values.
 * The admin content manager reads this schema to render the form.
 */
export const CONTENT_SCHEMA = [
  {
    section: 'Homepage hero',
    fields: [
      { key: 'hero_eyebrow', label: 'Eyebrow text', default: 'Debut Single — Orbit' },
      {
        key: 'hero_title_line1',
        label: 'Headline line 1',
        default: 'Where silence speaks',
      },
      {
        key: 'hero_title_line2',
        label: 'Headline line 2',
        default: 'through the sound.',
      },
      {
        key: 'hero_description',
        label: 'Description',
        default:
          'Instrumental progressive rock from a Hong Kong bedroom studio. Technical precision meets emotional storytelling without saying a word.',
      },
    ],
  },
  {
    section: 'Stats section',
    fields: [
      { key: 'stats_eyebrow', label: 'Eyebrow', default: 'IMPACT' },
      { key: 'stats_headline', label: 'Headline', default: 'THE JOURNEY BEGINS' },
      {
        key: 'stats_subhead',
        label: 'Subtext',
        default:
          'A bedroom studio project from Hong Kong, currently building its first chapter.',
      },
    ],
  },
  {
    section: 'Music page',
    fields: [
      { key: 'music_eyebrow', label: 'Eyebrow', default: 'Discography' },
      { key: 'music_headline', label: 'Headline', default: 'Music' },
      {
        key: 'music_description',
        label: 'Description',
        default: 'Instrumental progressive rock from a Hong Kong bedroom studio.',
      },
    ],
  },
  {
    section: 'Blog page',
    fields: [
      { key: 'blog_eyebrow', label: 'Eyebrow', default: 'Journal' },
      { key: 'blog_headline', label: 'Headline', default: 'Behind the Music' },
      {
        key: 'blog_description',
        label: 'Description',
        default:
          'Stories, process notes, and creative insights from the Lazy Perfectionist journey.',
      },
    ],
  },
  {
    section: 'Contact section',
    fields: [
      { key: 'contact_headline', label: 'Headline', default: 'READY TO COLLABORATE?' },
      {
        key: 'contact_description',
        label: 'Description',
        default:
          "Open for commissions, collaborations, and interesting conversations about music, creativity, and pushing creative boundaries.",
      },
      {
        key: 'contact_email',
        label: 'Contact form recipient email',
        default: '',
      },
    ],
  },
  {
    section: 'Social links',
    fields: [
      {
        key: 'social_spotify',
        label: 'Spotify artist URL',
        default: 'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um',
      },
      {
        key: 'social_instagram',
        label: 'Instagram URL',
        default: 'https://instagram.com/lazyperfectionist',
      },
      {
        key: 'social_twitter',
        label: 'Twitter / X URL',
        default: 'https://twitter.com/lazyperfectionist',
      },
      {
        key: 'social_youtube',
        label: 'YouTube URL',
        default: 'https://youtube.com/@lazyperfectionist',
      },
      {
        key: 'social_linktree',
        label: 'Linktree URL',
        default: 'https://linktr.ee/lazyperfectionist_official',
      },
    ],
  },
] as const

/**
 * Load all site content as a key-value map, merged with defaults.
 * Returns plain object (safe to use in server components).
 */
export async function getSiteContent(): Promise<Record<string, string>> {
  const defaults: Record<string, string> = {}
  for (const group of CONTENT_SCHEMA) {
    for (const field of group.fields) {
      defaults[field.key] = field.default
    }
  }

  try {
    const rows = await db.siteContent.findMany()
    for (const row of rows) defaults[row.key] = row.value
  } catch {
    // DB unavailable — fall back to defaults
  }

  return defaults
}
