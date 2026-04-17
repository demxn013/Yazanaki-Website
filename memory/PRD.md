# Yazanaki Empire — PRD

## Original Problem Statement
Build a modern, minimalist, dark-themed website for a structured Minecraft empire called **Yazanaki Empire**. Must feel like a professional system / private network — NOT a gaming clan website. Five permanent internal divisions (SNU, ANO, ONF, ONA, KASAII) and external allied factions (Excalibur).

## Iteration Log

### Iteration 1 (Jan 2026) — MVP
Initial React + FastAPI + MongoDB build. Landing, Clans, Alliances, Systems pages. Alliance application modal form posting to MongoDB.

### Iteration 2 (Jan 2026) — Data-driven refactor
All content moved to `/src/data/` (empire, clans, alliances, members, systems). Added Registry/Members page with table layout driven by `members.js`. Added string-keyed Icon registry.

### Iteration 3 (Jan 2026) — Form removed · Emblem system · Crimson accent
- **Removed** alliance application system entirely: `ApplyDialog` component deleted; backend `POST /api/alliances/apply` and `GET /api/alliances/applications` removed. No forms, no validation, no fake system interaction.
- **Replaced** with an informational "Alliance Process" section on `/alliances` — 4 numbered steps (Contact via Discord → Submit faction details → Negotiation → Agreement finalized) plus a "Request Alliance via Discord" CTA linking to `empire.discordInvite`.
- **Added** reusable `Emblem` component (56x56, `#151A20` surface, 12px radius, subtle low-opacity gold ring, object-contain images ~70%, no filters/glow). Used consistently on ClanCard and AllianceCard. Accepts `src` or renders clan code fallback.
- **Added** secondary crimson accent `#8B0000`. Used strictly for active states only: alliance "Active" status badge, member "Active" status badge, and active-nav-link marker dot. Not used for backgrounds or decorative elements.
- **Navbar** "Apply" button replaced with a "Discord" CTA (opens `empire.discordInvite` in a new tab).

## Architecture
- **Frontend**: React 18 + Tailwind CSS + react-router-dom + lucide-react + axios
- **Backend**: FastAPI + Motor (currently only `/api/` + `/api/overview`)
- **Database**: MongoDB (reserved for future members/alliances collections)
- **Routing**: `/`, `/clans`, `/alliances`, `/systems`, `/registry` (alias `/members`)
- **Data layer**: `/src/data/{empire,clans,alliances,members,systems,index}.js`

## Components
`Navbar`, `Footer`, `HeroNetwork`, `SectionHeader`, `ClanCard`, `AllianceCard`, `MemberRow`, `Emblem`, `Icon`

## Testing Status
- Iteration 3: 7/7 backend + 100% frontend (PASS) — no regressions

## Backlog / Future
- P1: Backend `GET /api/members` endpoint + swap `getMembers()` to fetch
- P1: Emblem image assets per clan/alliance (drop into `emblem` field in data)
- P2: Individual clan detail pages `/clans/:code`
- P2: KenzAI bot sync layer feeding the registry
- P2: Historical alliance registry
- P2: `/status` public posture page
