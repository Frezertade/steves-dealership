# Steve's Dealership

Independent used-car lot site for **Steve's Dealership** in Lancaster, PA. Inventory, sales leads, financing estimates, trade-in estimates, compare tray, and optional AI chat.

This is **not** a luxury franchise and **not** the repair-shop site. Same lot as the shop: **1027 Dillerville Rd #16, Lancaster, PA 17603**. Phone `(717) 397-3497`. Email `stevesdealer@gmail.com`.

**Do not push until `TASKS.md` is complete.** Work stays on `wip/system-complete`. Push happens once, after every task is `[x]`.

## Run

Needs Node.js 18+ and npm.

```bash
git clone <this-repo>
cd steves-dealership
git checkout wip/system-complete
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server (hot reload) |
| `npm run build` | Production build (required; this is a **server** app, not `output: 'export'`) |
| `npm start` | Serve the production build |

Copy `.env.example` to `.env.local` before running. Keys can stay empty for a local walkthrough; chat and lead email have fallbacks (see below).

Do not commit `.env`, `.env.local`, `data/leads.json`, `.next`, `out`, `node_modules`, or `.grok/builder.lock`.

## Env

Defined in `.env.example`:

| Variable | Required? | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | No | Sales chatbot. If unset, `POST /api/chat` answers from lot inventory + hours + phone and never invents a VIN. |
| `RESEND_API_KEY` | No | Email new leads. If unset, leads are still logged and written to `data/leads.json` when the filesystem allows. |
| `LEAD_INBOX` | No | Lead email destination. Defaults to `stevesdealer@gmail.com`. |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics. Analytics script is omitted when this is empty. |

## Pages

| Path | What you get |
| --- | --- |
| `/` | Home: hero, inventory, financing calculator (`#financing`), trade-in (`#trade-in`), compare tray, about (`#about`), contact (`#contact`), chat widget |
| `/#inventory` | Search/filter lot inventory |
| `/inventory/[id]` | Vehicle detail (price, miles, features, call + lead form). Example: `/inventory/1` |
| `/privacy` | Privacy policy (leads, optional AI chat, no sale of data) |
| `/terms` | Terms of use |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots file (`/api/` disallowed) |

### APIs

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/api/leads` | JSON `{ name, phone, email?, message? }`. Name and phone required. Returns `200` with `{ ok, saved, delivered }`. |
| `POST` | `/api/chat` | JSON `{ message }` or `{ messages }`. Returns `{ text }`. |

Example lead:

```bash
curl -sS -X POST http://localhost:3000/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Buyer","phone":"7175550100"}'
```

Hours, address, and contact copy live in `lib/business.ts`. Lot cars live in `lib/data.ts`.

## Branch / push

- Branch: `wip/system-complete`
- **Do not push until `TASKS.md` is complete.**
- Builder loop: one `TASKS.md` item per fire (`LOOP.md`). Never `git push` from a builder.
