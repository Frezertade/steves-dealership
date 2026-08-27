# Steve's Dealership — used-car dealership system

System type: independent used-car dealership in Lancaster, PA (same lot as the shop: 1027 Dillerville Rd #16). Phone `(717) 397-3497`. Email `stevesdealer@gmail.com`.

This is **not** a luxury franchise and **not** a repair-shop site. Inventory, leads, financing, trade-in, and sales chat are the product.

Branch: `wip/system-complete`. **Never `git push`.** Push happens once, after every task is `[x]`.

## Status

- current: none
- completed: 6/12
- last_completed: D06

## Backlog

- [x] **D01** Turn this into a real Next.js server app (APIs cannot run on `output: 'export'`). Remove `output: 'export'` from `next.config.js`. Add `.env.example` with `OPENAI_API_KEY`, `RESEND_API_KEY`, `LEAD_INBOX=stevesdealer@gmail.com`, `NEXT_PUBLIC_GA_ID`. Gitignore `.env`, `.env.local`, `data/leads.json`, `.grok/builder.lock`. Keep images unoptimized or add `images.remotePatterns` for Unsplash. Done when: `npm run build` succeeds and `app/api/` is part of a non-static build.
- [x] **D02** Lead capture for sales. Add `POST /api/leads` that validates name + phone, logs the payload, writes `data/leads.json` when possible, and emails via Resend only if `RESEND_API_KEY` is set. Wire `ContactSection` to this API (no fake thank-you). Done when: a curl POST with JSON returns 200 and the form shows an error on missing phone.
- [x] **D03** Working sales chatbot. Change `/api/chat` to return JSON `{ text }` (the UI already expects that). If `OPENAI_API_KEY` is missing, answer from inventory + hours + phone without calling OpenAI. System prompt: Steve's Dealership, Lancaster, help find cars, financing, test drives; never invent a VIN or a car not in `lib/data.ts`. Done when: POST `/api/chat` returns JSON and the widget does not 404.
- [x] **D04** About + hours + location. Add an `#about` section (nav already links there). Include since 2007, independent lot, address, Mon–Sat hours that you document in one source of truth (`lib/business.ts`), map link. Do not claim “#1 rated”. Done when: `#about` exists and nav/footer use the shared business constants.
- [x] **D05** Honest Lancaster lot inventory. Replace the Tesla/BMW/Mercedes-as-typical mix in `lib/data.ts` with 10–12 independent-lot cars (Honda, Toyota, Ford, Chevy, Nissan, Hyundai, Jeep, plus at least one Prius/hybrid). Prices roughly $9,900–$24,900. Keep Unsplash images if needed but match make/body style. Search/filter must still work. Done when: no Tesla/BMW/Mercedes as the default featured mix and InventorySection still renders.
- [x] **D06** Vehicle detail pages. Add `app/inventory/[id]/page.tsx` with price, miles, features, CTA call + lead form. Inventory cards link here as well as the modal. Done when: `/inventory/1` builds and shows a real vehicle.
- [ ] **D07** SEO + honest claims. Add `app/sitemap.ts` and `app/robots.ts`. Remove “#1 Rated Used Car Dealer in Lancaster” from the hero. Add Open Graph title/description. Done when: `/sitemap.xml` and `/robots.txt` exist after build and the unverifiable #1 claim is gone.
- [ ] **D08** Analytics from env. `Analytics.tsx` currently hardcodes `GA_MEASUREMENT_ID`. Load `NEXT_PUBLIC_GA_ID` and render nothing if unset. Done when: no placeholder GA id in the client bundle.
- [ ] **D09** Privacy and terms pages at `/privacy` and `/terms`, linked in the footer. Short, accurate (leads, optional AI chat, no sale of data). Done when: both routes build and footer links work.
- [ ] **D10** Financing + trade-in + compare still work after the above. Fix any broken `#financing` / compare-tray bugs you find. Done when: those three sections render and `npm run build` passes.
- [ ] **D11** Product README. Replace the one-liner README with run, env, pages, and “do not push until TASKS.md is complete”. Done when: a stranger can run the dealer site from README.
- [ ] **D12** Smoke tests. Add `scripts/smoke.mjs` that fails if TASKS still has `- [ ]`, if `next.config.js` still has `output: 'export'`, or if `/api/leads` / `/api/chat` files are missing. Add `npm run smoke`. Done when: `npm run smoke` and `npm run build` both pass.

## Done rule

Mark a task `[x]` only after build (and smoke, once D12 exists) pass, then commit on `wip/system-complete`.
