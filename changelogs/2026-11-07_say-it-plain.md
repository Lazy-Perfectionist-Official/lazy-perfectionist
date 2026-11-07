---
title: 2026-11-07 - Say it plain
description: The description texts lose the AI cadence — the em-dash appositive in six of nine lines, the flourish tails, the title-pun — and keep every fact.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 📝 Content
impact: Announcement, liner note, release descriptions, shop summaries
---

# 📅 2026-11-07 - Say It Plain

**Author**: Samuel Lee
**Category**: 📝 Content
**Impact**: Announcement, liner note, release descriptions, shop summaries

## 🎯 Overview

*"also, deslop the description texts"* — read as a set, the catalog's copy
had one voice problem: an em-dash appositive in six of nine lines
("X — flourish"), a tail on every shop summary written to sell ("written
out to play", "ready to remix", "waiting for a solo"), and one title-pun
("a first orbit around…"). The facts were right; the cadence was the
machine's.

- **Releases.** LUSG leads with the concrete image ("Strings and synths
  stacked to the ceiling: the bedroom at full scale."); Orbit drops the
  pun for the plain truth ("The debut single. The catalog starts
  here."); Cyclothymia was already clean and stays verbatim.
- **Announcement.** One separator character, consistently:
  "LUSG · the new single · out now".
- **Liner note.** The dash and the hedge go; the line tightens to
  "…bedroom instrumental rock from Hong Kong: three singles, all made in
  one room."
- **Shop summaries.** Pure contents, no selling: "All seven buses of
  Orbit as separate WAVs."; "The original Orbit mix with the lead guitar
  removed, for soloing over." The Orbit tabs line was already plain and
  stays.
- The ledes ("Three songs, one bedroom.", "Tabs, stems and jam
  tracks.", "Notes, on Medium.") were already plain and stay; the Medium
  excerpts are sync-owned and untouchable here.

## 🧪 Verified

- No spec pinned the old wording (grep); the liner-note lock still
  matches its substring; the full suite re-ran green as part of the
  hidden-door gates (**117 passed, 7 skipped**).

## 🔁 Built on

`changelogs/2026-11-07_the-hidden-door.md`: the copy now lives in
`content.json` and `shop-copy.json` — both editable at /admin, so the
next wording pass is a form, not a commit.
