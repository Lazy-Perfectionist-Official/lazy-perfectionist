import { redirect } from 'next/navigation'
import { STORE_URL } from '@/lib/nav'

// Direct-entry fallback: nav links point straight at the Ko-fi shop
// (see @/lib/nav); this route keeps typed/legacy /store URLs working.
export default function StorePage() {
  redirect(STORE_URL)
}