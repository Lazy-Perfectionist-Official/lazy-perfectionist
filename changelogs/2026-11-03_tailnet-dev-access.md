---
title: 2026-11-03 - Dev server over Tailscale
description: The dev server is reachable at the MagicDNS tailnet URL. Next must bind loopback because Tailscale serve owns the tailnet address on :3000, and the MagicDNS hostname joins allowedDevOrigins so HMR upgrades are not blocked.
commit: pending
author: Samuel Lee
date: 2026-11-03
category: 🔧 Infrastructure
impact: Low
---

# 📅 2026-11-03 - Dev Server Over Tailscale

**Author**: Samuel Lee
**Category**: 🔧 Infrastructure

## 🎯 Overview

Request, verbatim: *"https://samuels-mac-mini.tail2bbd23.ts.net:3000/ not
reachable thruogh tailscale."* The dev server is now exposed through
`tailscale serve` on port 3000 and the two gates that blocked it — the
wildcard bind and the HMR origin check — are closed in config.

## 📦 What changed

| Area | Change |
|---|---|
| `package.json` | `dev` binds loopback: `next dev -H 127.0.0.1`. `tailscale serve` on :3000 is a listener owned by the root network extension on `100.76.128.50:3000`; a wildcard bind collides and Next silently falls back to 3001, so the tailnet URL 502s. Loopback lets both coexist. |
| `next.config.ts` | `allowedDevOrigins` gains `samuels-mac-mini.tail2bbd23.ts.net`. Next 15.3 blocks cross-site HMR upgrades from origins missing there, which the proxy surfaces as a 502 WebSocket. The tailnet IP alone is not enough — the browser sends the MagicDNS origin. |

The `tailscale serve` mapping itself lives in the daemon's state, not the
repo, and survives restarts. The 443 serve is a different app and was
left untouched.

## ✅ Verification

- `https://samuels-mac-mini.tail2bbd23.ts.net:3000/` returns 200 over
  HTTPS; the `/_next/image` optimizer returns 200.
- HMR WebSocket connects from the tailnet origin (previously 502).
- Zero console errors and no horizontal overflow in the page loaded over
  the tailnet URL.
- `npx tsc --noEmit` and `npm run lint` clean after the config edit.

## 📝 Notes

- HSTS is served on 443 for this hostname, so browsers force HTTPS on
  every port; plain `http://…:3000` is not usable from a browser.
- Playwright still reaches the server at `http://localhost:3000`, because
  the loopback bind keeps the local URL intact.
