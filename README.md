#Mock Dealership Site

## Stack

- Node.js + Express
- EJS server-side templates
- In-memory JSON dataset (`data/inventory.json`, loaded once at startup)
- Docker / Cloud Run ready (port 8080, stateless)

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

| Model | Pool size | Vehicles in inventory |
|---|---|---|
| CX-5 | 25 | 10 |
| CX-30 | 25 | 8 |
| CX-50 | 25 | 8 |
| CX-70 | 9 (thin — 2024 launch, limited Commons coverage) | 7 |
| CX-90 | 25 | 7 |
| Mazda3 | 25 | 11 |
| MX-5 Miata | 25 | 9 |
