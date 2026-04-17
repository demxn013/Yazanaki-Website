# Yazanaki Empire — PRD

## Original Problem Statement
Build a modern, minimalist, dark-themed website for a structured Minecraft empire called **Yazanaki Empire**. Must feel like a professional system / private network — NOT a gaming clan website. Five permanent internal divisions (SNU, ANO, ONF, ONA, KASAII) and external allied factions (Excalibur). Calm, controlled, strategic tone.

## Iteration 2 (Jan 2026) — Data-driven refactor
Convert the site into a modular, data-driven system UI that can scale to support dynamic clans, alliances, and a member registry. Remove hardcoded content; everything must read from `/src/data/` JS files.

## Architecture
- **Frontend**: React 18 + Tailwind CSS + react-router-dom + lucide-react + axios
- **Backend**: FastAPI + Motor (async MongoDB) + Pydantic
- **Database**: MongoDB (`yazanaki_empire` DB, collection: `alliance_applications`)
- **Routing**: `/`, `/clans`, `/alliances`, `/systems`, `/registry` (alias `/members`)
- **API**: `/api/`, `/api/overview`, `POST /api/alliances/apply`, `GET /api/alliances/applications`

## Data Layer (iteration 2)
- `/src/data/empire.js` → `{ name, tagline, coreClans: [...], alliances: [...], governance }` — the only file listing codes
- `/src/data/clans.js` → detail lookup by code (role, description, locked flag)
- `/src/data/alliances.js` → detail lookup + `allianceOptions` enums
- `/src/data/members.js` → placeholder members + role/status enums (source of truth for Registry)
- `/src/data/systems.js` → `systems`, `allianceSystemColumns`, `clansPrinciples`, `philosophy` — removes hardcoded arrays from components
- `/src/data/index.js` → aggregator + selectors (`getCoreClanList`, `getAllianceList`, `getMembers`, `getMemberStats`, `getLandingStats`) — single swap point for a future API
- `/src/components/Icon.jsx` → string-keyed icon registry so data files stay framework-free

## Components
- `Navbar`, `Footer`, `HeroNetwork`, `SectionHeader`
- `ClanCard`, `AllianceCard`, `MemberRow` — reusable renderers consumed from data
- `ApplyDialog` — posts to `/api/alliances/apply` using enums from data layer

## Pages
- **Home** — hero, stats bar, loops coreClans, loops alliances, loops philosophy
- **Clans** — principles + loops coreClans
- **Alliances** — loops alliances, loops allianceSystemColumns, Apply CTA
- **Systems** — loops `systems` with icon strings
- **Members / Registry** — table layout (Empire ID, Username, Clan, Role, Status) with search + clan/status filters, stats cards, placeholder data note

## Testing Status
- Iteration 1: 26/26 backend + 100% frontend (PASS)
- Iteration 2: 26/26 backend + 100% frontend (PASS) — Registry page, data-driven refactor, no regression

## Backlog / Future
- P1: Swap static member data for a live API (`GET /api/members`) — backend endpoint + `getMembers()` fetch swap
- P1: Admin/review UI for submitted alliance applications
- P2: Individual clan detail pages (`/clans/:code`)
- P2: KenzAI bot sync layer that writes to members collection
- P2: "Join as Individual / Join as Faction" entry point (original brief)
- P2: Historical alliance registry and audit trail

## Next Action Items
- Ship the backend `/api/members` endpoint + swap `getMembers()` to fetch from it
- Build admin view for alliance application submissions
