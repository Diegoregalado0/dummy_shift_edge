# Velocity Mazda — Mock Dealership Site

A high-fidelity mock Mazda dealership website used to test an edge reverse
proxy (Cloudflare Worker). Server-side rendered with Express + EJS, backed by
an in-memory JSON inventory. No database, no auth, no SPA framework.

Vehicle detail URLs follow the real-world DealerOn/Mazda-dealer pattern, e.g.:

```
/inventory/new-2026-mazda-cx-5-2-5-s-awd-awd-suv-jm3kmaha1t0167432
```

## Stack

- Node.js + Express
- EJS server-side templates
- In-memory JSON dataset (`data/inventory.json`, loaded once at startup)
- Docker / Cloud Run ready (port 8080, stateless)

## Running locally

```bash
npm install
npm start          # http://localhost:8080
```

To regenerate the mock inventory (60 Mazda vehicles across CX-5, CX-50,
CX-70, CX-90, CX-30, Mazda3, and MX-5 Miata):

```bash
npm run generate-inventory
```

## Routes

| Method | Path | Description |
|---|---|---|
| GET | `/` | Home page, featured vehicles |
| GET | `/inventory` | SSR listing with filters (`model`, `condition`, `priceMin`, `priceMax`, `page`) |
| GET | `/inventory/:slug` | SSR vehicle detail page — slug is `{condition}-{year}-mazda-{model}-{trim}-{drivetrain}-{bodytype}-{vin}` (100–300ms simulated CMS latency) |
| GET | `/api/inventory` | JSON list, same filters/pagination as `/inventory` |
| GET | `/api/vehicle/:vin` | JSON for a single vehicle, looked up by VIN |
| POST | `/api/ping` | Tracking endpoint (page views, perf metrics, VIN context, session/user id) — 204, logs to console + in-memory buffer |
| GET | `/api/ping/debug` | Inspect the last 50 ping payloads (debugging only) |
| POST | `/inventory/:slug/request-info` | Fake lead form submit, logs to console, renders confirmation |

## Testing

**Inventory page with filters + pagination:**
```bash
curl -s "http://localhost:8080/inventory?model=CX-5&priceMin=25000&priceMax=40000&page=2"
```

**Vehicle detail page** (grab a real slug from the API first):
```bash
SLUG=$(curl -s http://localhost:8080/api/inventory | node -e \
  "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).vehicles[0].slug))")
curl -s "http://localhost:8080/inventory/$SLUG" | grep "VIN:"
```

**API endpoints:**
```bash
curl -s http://localhost:8080/api/inventory | jq '.totalResults'
VIN=$(curl -s http://localhost:8080/api/inventory | jq -r '.vehicles[0].vin')
curl -s http://localhost:8080/api/vehicle/$VIN | jq '.model, .trim'
```

**Ping / tracking endpoint:**
```bash
curl -i -X POST http://localhost:8080/api/ping \
  -H "Content-Type: application/json" \
  -d '{"type":"page_view","sessionId":"sess_abc","vin":"'"$VIN"'"}'
# -> 204 No Content

curl -s http://localhost:8080/api/ping/debug | jq '.count'
```

**Simulating browser traffic:** every rendered page loads
`/js/tracking.js`, which auto-fires a `page_view` ping on load and a
`performance` ping (load time, DOMContentLoaded, TTFB) once the page
finishes loading — open any page in a browser and watch the server log,
or check `GET /api/ping/debug`.

**404 handling:**
```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:8080/inventory/not-a-real-vehicle-slug
# -> 404
```

## Performance simulation

Simulated latency is injected server-side to mimic a real dealer CMS:

- `/inventory` — 50–150ms
- `/inventory/:slug` — 100–300ms
- `/api/*` — 30–120ms

This is intentional and exists to give CDN/edge caching experiments
something realistic to measure against.

## Deploying to Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/velocity-mazda

# Deploy
gcloud run deploy velocity-mazda \
  --image gcr.io/PROJECT_ID/velocity-mazda \
  --platform managed \
  --port 8080 \
  --allow-unauthenticated
```

The app is stateless (all state is in-memory and rebuilt from
`data/inventory.json` at startup), so it scales horizontally on Cloud Run
with no shared state concerns. The in-memory ping log is per-instance and
for local debugging only — don't rely on it across instances.

## Notes

- VIN is the primary key for vehicle lookups; VINs are 17 characters,
  format-realistic (Mazda-style JM1/JM3 WMI prefix) but not decodable.
- Each vehicle's `slug` field is precomputed at generation time and used
  for the public `/inventory/:slug` URL; `/api/vehicle/:vin` still looks
  up by VIN for API consumers.
- Inventory is static for the life of the process — no writes, no DB.
- No authentication, no analytics dashboard, no SPA framework, by design.

## Image attribution

Vehicle photos are real Mazda photos pulled from Wikimedia Commons (freely
licensed for reuse). Each vehicle gets its own distinct 5-photo set, drawn
from a per-model pool in `public/images/vehicles/<model>/pool/`:

| Model | Pool size | Vehicles in inventory |
|---|---|---|
| CX-5 | 25 | 10 |
| CX-30 | 25 | 8 |
| CX-50 | 25 | 8 |
| CX-70 | 9 (thin — 2024 launch, limited Commons coverage) | 7 |
| CX-90 | 25 | 7 |
| Mazda3 | 25 | 11 |
| MX-5 Miata | 25 | 9 |

Every vehicle currently has a fully unique image set (verified: 60/60
distinct across the inventory), since each model's pool comfortably
exceeds its vehicle count. If the generator (`npm run generate-inventory`)
is later run with more vehicles per model than a pool holds, sets start
repeating (sliding window with wraparound) rather than failing.

Regenerating the pool:
1. `node data/buildImagePool.js` — filters raw Commons category listings
   (fetched via the MediaWiki API, cached in `/tmp/commons_*.json`) down
   to plausible clean exterior shots, capped at 25/model, and writes
   `data/image-sources-pool.json`.
2. `node data/downloadImages.js` — downloads each listed file via Commons'
   `Special:FilePath` endpoint (throttled to be polite to Wikimedia's
   servers) into `public/images/vehicles/<model>/pool/`.

Check each file's Commons page for its specific license/attribution terms
before any use beyond this internal test fixture.
