const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// ---------------------------------------------------------------------------
// Data layer: inventory is loaded once at startup, filtering happens in memory
// ---------------------------------------------------------------------------
const INVENTORY = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'inventory.json'), 'utf8')
);
const VEHICLES_BY_VIN = new Map(INVENTORY.map((v) => [v.vin, v]));
const VEHICLES_BY_SLUG = new Map(INVENTORY.map((v) => [v.slug, v]));
const MODELS = [...new Set(INVENTORY.map((v) => v.model))].sort();
const MODEL_CONTENT = require('./data/modelContent');

// In-memory store for /api/ping payloads (debugging only, not persisted)
const PING_LOG = [];

// ---------------------------------------------------------------------------
// App config
// ---------------------------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.siteName = 'Mazda';
  res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
  next();
});

// ---------------------------------------------------------------------------
// Performance simulation helpers
// ---------------------------------------------------------------------------
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const delay = (min, max) => new Promise((r) => setTimeout(r, randInt(min, max)));

// ---------------------------------------------------------------------------
// Helpers: filtering + pagination for /inventory
// ---------------------------------------------------------------------------
function filterInventory(query) {
  let results = INVENTORY.filter((v) => v.status !== 'sold' || query.includeSold === 'true');

  if (query.model) {
    results = results.filter((v) => v.model.toLowerCase() === String(query.model).toLowerCase());
  }
  if (query.condition === 'new' || query.condition === 'used') {
    results = results.filter((v) => v.status === query.condition);
  }
  if (query.priceMin) {
    results = results.filter((v) => v.price >= Number(query.priceMin));
  }
  if (query.priceMax) {
    results = results.filter((v) => v.price <= Number(query.priceMax));
  }
  return results;
}

function paginate(results, page, perPage = 12) {
  const totalPages = Math.max(1, Math.ceil(results.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: results.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalResults: results.length
  };
}

// ---------------------------------------------------------------------------
// A. Home Page
// ---------------------------------------------------------------------------
app.get('/', async (req, res) => {
  await delay(50, 150);
  const featured = [...INVENTORY]
    .filter((v) => v.status !== 'sold')
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  res.render('home', {
    title: `${res.locals.siteName} | New & Used Mazda Vehicles for Sale`,
    description: 'Shop new and used Mazda vehicles online. Real prices, real availability.',
    canonical: `${res.locals.baseUrl}/`,
    featured,
    models: MODELS
  });
});

// ---------------------------------------------------------------------------
// B. Inventory Listing Page
// ---------------------------------------------------------------------------
app.get('/inventory', async (req, res) => {
  await delay(50, 150);
  const filtered = filterInventory(req.query);
  const page = parseInt(req.query.page, 10) || 1;
  const { items, currentPage, totalPages, totalResults } = paginate(filtered, page);

  res.render('inventory', {
    title: `Mazda Inventory | ${res.locals.siteName}`,
    description: `Browse ${totalResults} new and used Mazda vehicles in stock.`,
    canonical: `${res.locals.baseUrl}/inventory`,
    vehicles: items,
    currentPage,
    totalPages,
    totalResults,
    query: req.query,
    models: MODELS
  });
});

// ---------------------------------------------------------------------------
// C. Vehicle Detail Page
// Realistic dealer URL: /inventory/new-2026-mazda-cx-5-2-5-s-awd-awd-suv-<vin>
// ---------------------------------------------------------------------------
app.get('/inventory/:slug', async (req, res, next) => {
  await delay(100, 300);
  const vehicle = VEHICLES_BY_SLUG.get(req.params.slug.toLowerCase());

  if (!vehicle) {
    return res.status(404).render('404', {
      title: `Vehicle Not Found | ${res.locals.siteName}`,
      description: 'The vehicle you are looking for could not be found.',
      canonical: `${res.locals.baseUrl}${req.originalUrl}`
    });
  }

  const related = INVENTORY.filter(
    (v) => v.model === vehicle.model && v.vin !== vehicle.vin && v.status !== 'sold'
  ).slice(0, 4);
  const content = MODEL_CONTENT[vehicle.model] || { keyFeatures: [], detailCategories: [] };

  res.render('vehicle', {
    title: `${vehicle.year} Mazda ${vehicle.model} ${vehicle.trim} | VIN ${vehicle.vin} | ${res.locals.siteName}`,
    description: `${vehicle.year} Mazda ${vehicle.model} ${vehicle.trim} for $${vehicle.price.toLocaleString()}. ${vehicle.exteriorColor} exterior, ${vehicle.mileage.toLocaleString()} miles. Stock #${vehicle.stockNumber}.`,
    canonical: `${res.locals.baseUrl}/inventory/${vehicle.slug}`,
    vehicle,
    related,
    keyFeatures: content.keyFeatures,
    detailCategories: content.detailCategories
  });
});

// ---------------------------------------------------------------------------
// C2. Vehicle Print View — stripped-down, opens in a new tab from the VDP
// ---------------------------------------------------------------------------
app.get('/inventory/:slug/print', async (req, res, next) => {
  const vehicle = VEHICLES_BY_SLUG.get(req.params.slug.toLowerCase());

  if (!vehicle) {
    return res.status(404).render('404', {
      title: `Vehicle Not Found | ${res.locals.siteName}`,
      description: 'The vehicle you are looking for could not be found.',
      canonical: `${res.locals.baseUrl}${req.originalUrl}`
    });
  }

  const content = MODEL_CONTENT[vehicle.model] || { keyFeatures: [], detailCategories: [] };
  const allDetailItems = content.detailCategories.flatMap((cat) => cat.items);

  res.render('vehicle-print', {
    title: `${vehicle.year} Mazda ${vehicle.model} ${vehicle.trim} | Print | ${res.locals.siteName}`,
    description: `Printable summary for ${vehicle.year} Mazda ${vehicle.model} ${vehicle.trim}.`,
    canonical: `${res.locals.baseUrl}/inventory/${vehicle.slug}/print`,
    vehicle,
    allDetailItems
  });
});

// ---------------------------------------------------------------------------
// D. API Layer
// ---------------------------------------------------------------------------
app.get('/api/inventory', async (req, res) => {
  await delay(30, 120);
  const filtered = filterInventory(req.query);
  const page = parseInt(req.query.page, 10) || 1;
  const { items, currentPage, totalPages, totalResults } = paginate(filtered, page);

  res.json({
    page: currentPage,
    totalPages,
    totalResults,
    vehicles: items
  });
});

app.get('/api/vehicle/:vin', async (req, res) => {
  await delay(30, 120);
  const vehicle = VEHICLES_BY_VIN.get(req.params.vin.toUpperCase());

  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found', vin: req.params.vin });
  }
  res.json(vehicle);
});

// ---------------------------------------------------------------------------
// Tracking / ping endpoint (for proxy + edge testing)
// ---------------------------------------------------------------------------
app.post('/api/ping', (req, res) => {
  const payload = {
    receivedAt: new Date().toISOString(),
    ip: req.ip,
    body: req.body
  };
  console.log('[ping]', JSON.stringify(payload));
  PING_LOG.push(payload);
  // Keep the in-memory log bounded so this stays a debugging aid, not a leak
  if (PING_LOG.length > 500) PING_LOG.shift();
  res.status(204).end();
});

app.get('/api/ping/debug', (req, res) => {
  res.json({ count: PING_LOG.length, entries: PING_LOG.slice(-50) });
});

// ---------------------------------------------------------------------------
// 404 fallback
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).render('404', {
    title: `Page Not Found | ${res.locals.siteName}`,
    description: 'The page you are looking for could not be found.',
    canonical: `${res.locals.baseUrl}${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log(`Mazda mock dealership server running on port ${PORT}`);
  console.log(`Loaded ${INVENTORY.length} Mazda vehicles into memory`);
});
