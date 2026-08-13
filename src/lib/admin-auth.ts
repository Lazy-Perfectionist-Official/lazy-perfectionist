/**
 * Lightweight admin auth — single admin, password from env.
 * Uses Web Crypto API so it runs in both Edge (middleware) and Node runtimes.
 */

export const ADMIN_COOKIE = 'lp_admin_session'
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
const ALGO = 'HS256'

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'lazy-perfectionist-dev-fallback'
  )
}

function constantTimeEqual(a: ArrayBuffer, b: ArrayBuffer): boolean {
  const viewA = new Uint8Array(a)
  const viewB = new Uint8Array(b)
  if (viewA.length !== viewB.length) return false
  let diff = 0
  for (let i = 0; i < viewA.length; i++) diff |= viewA[i] ^ viewB[i]
  return diff === 0
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function fromHex(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes.buffer
}

async function importKey(): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  if (password.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= password.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

export async function signToken(): Promise<string> {
  const iat = Date.now()
  const exp = iat + TOKEN_TTL_MS
  const payload = `${iat}.${exp}`
  const key = await importKey()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return `${payload}.${toHex(sig)}`
}

export async function verifyToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [iatStr, expStr, sigHex] = parts
  const payload = `${iatStr}.${expStr}`
  const key = await importKey()
  const expectedSig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  let sigBuf: ArrayBuffer
  try {
    sigBuf = fromHex(sigHex)
  } catch {
    return false
  }
  if (!constantTimeEqual(sigBuf, expectedSig)) return false
  const exp = Number(expStr)
  if (!Number.isFinite(exp) || Date.now() > exp) return false
  return true
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: TOKEN_TTL_MS / 1000,
}

export { ALGO }
