# Wobb Frontend Assignment

Influencer search app built with React, TypeScript, Vite, Tailwind CSS, and Zustand. Browse creators across Instagram, YouTube, and TikTok, view profile details, and build a persistent shortlist.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint     # ESLint
npm test         # unit tests
```

---

## Before Submitting

Please ensure:

- ✅ `npm run build` completes successfully
- ✅ The application runs without errors (`npm run dev`)
- ✅ Your repository is public (or we have access)
- ✅ This README describes what changed, libraries added, assumptions, trade-offs, and remaining improvements
- ✅ Your Git history contains meaningful commits
- ✅ You submit your GitHub repository URL before the deadline (**2 July 2026, 2:00 PM IST**)

---

## What I Changed

### Bugs & quality fixes

| Issue | Fix |
|-------|-----|
| Engagement rate displayed incorrectly (e.g. 125% instead of 1.26%) | Corrected multiplier from `× 10000` to `× 100` |
| "Engagements" stat showed a percentage | Now displays the raw engagement count |
| Stale profile data when navigating between profiles | Component remounts via `key={username}`; loading skeleton shown during fetch |
| YouTube profiles missing `username` field | `normalizeProfile()` falls back to `handle` or `user_id` |
| Case-sensitive username search | Search is now case-insensitive across username, handle, and fullname |
| Dead debug code (`clickCount`, `console.log`) | Removed |
| Duplicate follower/formatter logic across files | Consolidated in `utils/formatters.ts` |
| Nested interactive elements in profile cards | Separated link navigation from button click handlers |
| Missing `rel="noopener noreferrer"` on external links | Added |
| Missing image `alt` text | Added descriptive alt attributes |

### UI/UX redesign

- Replaced the basic layout with a modern, responsive interface (Inter font, purple accent, dark mode)
- Sticky header with branded navigation and **My List** toggle (badge count)
- Responsive profile card grid with hover states and platform badges
- Slide-out **Selected Profiles** panel to view and manage the shortlist
- Loading skeleton on profile detail page
- Accessibility improvements: skip-to-content link, ARIA labels, keyboard focus styles, reduced-motion support

### State management

- Implemented **Zustand** with `persist` middleware for the selected profile list
- No React Context used — state lives in `src/store/selectedListStore.ts`
- List persists in `localStorage` under key `wobb-selected-profiles`

### "Add to List" feature

- Enabled **Add to List** on profile cards and profile detail page
- Add/remove profiles with toggle button ("Add to List" ↔ "Added")
- Duplicate prevention via composite key `platform:user_id`
- View selected profiles in slide-out panel
- Remove individual profiles or clear the entire list
- List survives page refresh

### Code quality & structure

```
src/
├── components/
│   ├── layout/       # App shell, header
│   ├── list/         # Add to List, selected list panel
│   ├── profiles/     # Cards, filters, stats, skeleton
│   └── ui/           # Button, badges
├── hooks/            # useProfileDetail
├── store/            # Zustand store + tests
├── types/            # Shared TypeScript interfaces
├── utils/            # Data helpers, formatters, profile loader
└── pages/            # SearchPage, ProfileDetailPage
```

### Performance optimizations

- `memo` on `ProfileCard` and `AddToListButton`
- `useMemo` for filtered profile lists
- Selective Zustand selectors to avoid unnecessary re-renders
- Lazy-loaded profile images
- Component remount on username change to prevent stale async state

### Tests

- 10 unit tests covering the Zustand store (add, duplicate prevention, remove) and utility functions
- Run with `npm test`

---

## Libraries Added

| Library | Type | Purpose |
|---------|------|---------|
| `zustand` | dependency | Global state management + `localStorage` persistence for selected list |
| `lucide-react` | dependency | Icons (search, list, verified badge, etc.) |
| `clsx` | dependency | Conditional CSS class composition |
| `tailwind-merge` | dependency | Merge Tailwind classes without conflicts |
| `vitest` | devDependency | Unit test runner |
| `@testing-library/react` | devDependency | React component testing utilities |
| `@testing-library/jest-dom` | devDependency | DOM assertion matchers |
| `jsdom` | devDependency | Browser environment for tests |

Existing stack retained: React 19, TypeScript, Vite, Tailwind CSS v4, react-router-dom.

---

## Assumptions Made

1. **Partial detail data** — Only 6 of ~30 searchable profiles have full JSON detail files in `src/assets/data/profiles/`. Profiles without detail data show a clear error state instead of fabricated content.
2. **Platform context** — When adding from the profile detail page, platform is taken from the `?platform=` URL query param. Defaults to `instagram` if missing or invalid.
3. **Duplicate definition** — A duplicate is the same `user_id` on the same `platform`. The same creator on different platforms is allowed.
4. **No backend** — All data is static JSON bundled at build time. No API calls or authentication.
5. **Toggle UX** — Clicking "Added" removes the profile from the list (in addition to remove buttons in the panel).

---

## Trade-offs

| Decision | Rationale |
|----------|-----------|
| `localStorage` over a backend | Matches assignment scope; zero infra, instant persistence, works offline |
| Slide-out panel vs. dedicated list page | Keeps users in search context; faster to review shortlist without losing place |
| Toggle button for add/remove | Fewer UI elements on cards; panel still offers explicit remove/clear actions |
| Component remount (`key={username}`) over complex effect cleanup | Simpler, reliable fix for stale profile data on navigation |
| Custom UI over a component library (MUI, shadcn) | Full design control, smaller bundle, Tailwind-native styling |
| Vitest for utils/store only (no component E2E) | Good coverage of business logic without heavy test setup |

---

## Remaining Improvements

If I had more time, I would:

- **Deploy** the app to Vercel/Netlify and add a live demo URL
- Add **toast notifications** when profiles are added/removed
- Add **E2E tests** (Playwright/Cypress) for the full add-to-list flow
- Implement **virtualized list** rendering if the shortlist grows very large
- Add **sort/filter** options in the selected list panel (by platform, followers)
- Generate or fetch **detail JSON** for all searchable profiles so no profile 404s
- Add **export/share** shortlist (CSV or shareable link)
- Improve **SEO** with per-profile meta tags via react-helmet or similar

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run preview` | Preview production build locally |
