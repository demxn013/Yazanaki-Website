# Yazanaki Empire — PRD

## Original Problem Statement
Modern, minimalist, dark-themed website for the **Yazanaki Empire** — a structured, multi-clan Minecraft organization. Must feel like a private network / controlled system, never a gaming clan site.

## Iteration Log

### Iteration 1 — MVP
React + FastAPI + MongoDB; Landing, Clans, Alliances, Systems pages; alliance application modal.

### Iteration 2 — Data-driven refactor
All content moved to `/src/data/`. Added Registry (members) page with table layout. Central selectors in `data/index.js`.

### Iteration 3 — Form removed / Emblem system / Crimson accent introduced
- Deleted alliance application form & backend endpoints.
- Added `Emblem` component (56×56, `#151A20` surface, gold ring).
- Added crimson `#8B0000` for active states.

### Iteration 4 — Color swap · Assets · Structure updates (Jan 2026)
- **Primary accent → Crimson `#8B0000`**; **Secondary → Gold `#C6A85B`**.
- `.btn-primary` now crimson with white text. Discord CTAs and hero "Explore Structure" use it.
- Navbar: default white, **hover gold** (replaced the old grey→white behavior). Active nav still uses the small crimson marker dot.
- Added `/assets/emblems/*.png` and `/assets/flags/*.png` (6 each — SNU, ANO, ONF, ONA, KASAII, Excalibur). Generated as dark-surface PNGs with distinct geometric sigils per clan. Referenced in `clans.js` / `alliances.js` and rendered via the existing `Emblem` container.
- **Systems page removed** entirely (file, route, nav link).
- **Members page**: `Reserve` → `Draft` in data enum, filter dropdown, and row styling.
- **Clans page text corrected**: clans are autonomous, non-specialized, server-anchored branches. Added a "How coordination works" note explaining empire-wide operations are handled by selected cross-clan members. Clan cards show `SERVER · SV-0X` instead of the old "role".
- **Alliance card columns** changed from Relation / Control / Terms → **Clan / Server / Type** (Excalibur: SNU / SV-01 / Mutual Defense Pact).

## Architecture
- **Frontend**: React 18 + Tailwind + react-router-dom + lucide-react
- **Backend**: FastAPI + Motor (only `/api/` and `/api/overview`)
- **Routing**: `/`, `/clans`, `/alliances`, `/registry` (alias `/members`)
- **Static assets**: `/app/frontend/public/assets/{emblems,flags}/*.png`

## Testing Status
- Iteration 4: 8/8 backend + 100% frontend (PASS) — no regressions

## Backlog / Future
- P1: Live backend `GET /api/members` + swap `getMembers()` to fetch
- P1: Display clan flag on an individual clan detail page (`/clans/:code`)
- P2: KenzAI bot sync → Registry
- P2: Historical alliance registry
- P2: Replace placeholder PNGs with final emblem/flag artwork
