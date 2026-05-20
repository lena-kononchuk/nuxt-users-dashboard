# Users Dashboard

A small users table built with **Vue 3 + Nuxt 4 + Tailwind CSS**.
Solution for the UpToWin Frontend test task.

## Features

### Required
- 🔍 **Search** by name or email
- 🎚 **Filter** by role (admin / manager / user)
- ↕️ **Sort** by age and created date (asc / desc)
- 📄 **Pagination** with 10, 15, or 20 items per page
- 📌 **Sticky** table header on scroll
- 🔗 **URL state** — filters, sort and page are saved to the URL
- 🔄 **Reload restore** — page state comes back after F5 or shared link

### Bonus
- 🌗 **Theme toggle** — light / dark, saved to localStorage
- ⏳ **Debounced search** — 800ms delay, with loading effect

### Extra polish
- Empty state when no users match the filter
- Clear filters button (shows only when something is active)
- "Showing 1–10 of 50" item counter
- Active filter visual state (emerald accent on Role select)
- Backdrop-blur on sticky header
- Pill-style theme toggle (sun / moon icons)

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
composables/
  useUsersTable.js   ← all the logic (filter, sort, paginate, URL sync, debounce)
components/
  UserFilters.vue    ← search + role select
  UserTable.vue      ← table with sortable headers, role badges, empty state
  BaseSelect.vue     ← styled select with optional "All" option
pages/
  index.vue          ← main page (header, card with filters + table + footer)
data/
  users.js           ← 50 mock users
tailwind.config.mjs  ← brand colors (emerald) + dark theme tokens
```

## Tech notes

- **No TypeScript in code.** TypeScript config is set up by Nuxt, but the files
  are written in plain JavaScript. I do not have commercial TS experience yet,
  so I chose to be honest about it. Easy to add types later.
- **All logic lives in one composable** (`useUsersTable.js`). No Pinia or
  external state library — the task is small enough for refs + computed.
- **URL params stay clean.** Default values (page=1, perPage=10, empty search)
  are not written to the URL, so the link looks `/?role=admin` and not
  `/?search=&role=admin&page=1&perPage=10`.
- **Debounce is custom.** Just `setTimeout` + `clearTimeout`. No VueUse needed.
- **Theme switch disables CSS transitions** for one frame to avoid
  color-flicker on toggle.

## What I would add with more time

- Reset sort to "none" (third click on a column) — now it only flips asc / desc
- E2E tests (Playwright) for URL state and filter scenarios
- Server-side rendering of the saved theme to avoid a small flash on reload
