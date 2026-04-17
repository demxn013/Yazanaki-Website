# Yazanaki Empire — PRD

## Original Problem Statement
Build a modern, minimalist, dark-themed website for a structured Minecraft empire called **Yazanaki Empire**. Must feel like a professional system / private network — NOT a gaming clan website. Five permanent internal divisions (SNU, ANO, ONF, ONA, KASAII) and external allied factions (Excalibur). Calm, controlled, strategic tone. No gamer tropes.

## User Choices (Session 1 — Jan 2026)
- Full-stack (alliance application submissions stored in MongoDB)
- Pages built: Landing, Core Clans, Alliances, Systems (Join & Alliance Application page replaced with a modal on Alliances page)
- Hero right-side visual: subtle animated SVG network/grid
- Font: Inter (locked)

## Architecture
- **Frontend**: React 18 + Tailwind CSS + react-router-dom + lucide-react + axios
- **Backend**: FastAPI + Motor (async MongoDB) + Pydantic
- **Database**: MongoDB (`yazanaki_empire` DB, collection: `alliance_applications`)
- **Routing**: `/`, `/clans`, `/alliances`, `/systems`
- **API**: `/api/`, `/api/overview`, `POST /api/alliances/apply`, `GET /api/alliances/applications`

## Implemented (Jan 2026)
- Sticky dark navbar with YAZANAKI wordmark, nav links, gold Apply button, mobile menu
- Landing: hero (split layout + animated SVG network), stats bar, structure preview (5 cards), Excalibur alliance preview, 3-part philosophy
- Core Clans page: 3 principle cards + 5 clan cards with "Permanent Division" + "Locked Structure" tag
- Alliances page: Excalibur active alliance card, 3-column system explanation, large CTA block with modal
- Systems page: Economy / Governance / Alliances layered sections with bullet points
- Global Apply dialog with form → POST `/api/alliances/apply`, success state, ESC/backdrop close, enum-validated dropdowns
- Footer with brand identity strip
- Design tokens exactly matching spec: #0B0D10 bg, #11151A surface, #171C22 elevated, #C6A85B accent, Inter font, 12px radii, 1200px container

## Testing Status
- Backend: 26/26 tests passing (service, overview, apply validation, listing, enum checks)
- Frontend: 100% passing (nav, hero, cards, modal flows, mobile menu, no console errors)

## Backlog / Future
- P1: Admin view for submitted applications (currently only list endpoint exists, no UI)
- P1: Individual clan detail pages (each division)
- P2: "Join as Individual" / "Join as Faction" page from original spec
- P2: Public alliance registry with historical agreements
- P2: Light public stats dashboard (empire posture, economic metrics)

## Next Action Items
- Await user review
- Optionally add admin panel at `/admin` for reviewing alliance applications
