/**
 * Generates a realistic mock Mazda-only inventory dataset and writes it to
 * data/inventory.json. Run with: npm run generate-inventory
 */
const fs = require('fs');
const path = require('path');

// Realistic Mazda lineup: model -> body type, trims, drivetrains, base price
const MODELS = {
  'CX-5': {
    bodyType: 'SUV',
    trims: ['2.5 S', '2.5 S Select', '2.5 S Preferred', '2.5 S Premium', '2.5 S Premium Plus', '2.5 Turbo', '2.5 Turbo Premium Plus'],
    drivetrains: ['AWD', 'FWD'],
    engines: ['2.5L 4-Cylinder', '2.5L Turbo 4-Cylinder'],
    basePrice: 29000
  },
  'CX-50': {
    bodyType: 'SUV',
    trims: ['2.5 S', '2.5 S Select', '2.5 S Preferred', '2.5 Turbo Premium', '2.5 Turbo Meridian Edition'],
    drivetrains: ['AWD'],
    engines: ['2.5L 4-Cylinder', '2.5L Turbo 4-Cylinder'],
    basePrice: 31000
  },
  'CX-70': {
    bodyType: 'SUV',
    trims: ['3.3 Turbo Preferred', '3.3 Turbo Premium', '3.3 Turbo Premium Plus', 'PHEV Premium Plus'],
    drivetrains: ['AWD'],
    engines: ['3.3L Turbo I6', '2.5L Turbo Hybrid'],
    basePrice: 42000
  },
  'CX-90': {
    bodyType: 'SUV',
    trims: ['3.3 Turbo Select', '3.3 Turbo Preferred', '3.3 Turbo Premium', '3.3 Turbo Premium Plus', 'PHEV Premium Plus'],
    drivetrains: ['AWD'],
    engines: ['3.3L Turbo I6', '2.5L Turbo Hybrid'],
    basePrice: 40000
  },
  'CX-30': {
    bodyType: 'SUV',
    trims: ['2.5 S', '2.5 S Select', '2.5 S Preferred', '2.5 Turbo Premium'],
    drivetrains: ['AWD', 'FWD'],
    engines: ['2.5L 4-Cylinder', '2.5L Turbo 4-Cylinder'],
    basePrice: 24000
  },
  'Mazda3': {
    bodyType: 'Sedan',
    trims: ['2.5 S', '2.5 S Select', '2.5 S Preferred', '2.5 Turbo Premium Plus'],
    drivetrains: ['FWD', 'AWD'],
    engines: ['2.5L 4-Cylinder', '2.5L Turbo 4-Cylinder'],
    basePrice: 23000
  },
  'MX-5 Miata': {
    bodyType: 'Convertible',
    trims: ['Sport', 'Club', 'Grand Touring'],
    drivetrains: ['RWD'],
    engines: ['2.0L 4-Cylinder'],
    basePrice: 29000
  }
};

const INTERIOR_COLORS = ['Black Leather', 'Greige Leather', 'Black Cloth', 'Terracotta Nappa Leather'];
const TRANSMISSIONS = ['6-Speed Automatic', '6-Speed Manual'];
const DEALER_IDS = ['DLR-2201'];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Each vehicle gets exactly 1 real photo, picked from a vision-verified
// color -> photo map (data/color-photo-map/<model-slug>.json). These maps
// are built by having an agent view every downloaded Commons photo in a
// model's pool and classify its actual paint color; only colors with at
// least one real matching photo are ever assignable to that model, so the
// photo is always accurate rather than the description being force-fit to
// an arbitrary photo. See data/color-photo-map/README (agent-generated).
const COLOR_PHOTO_MAP_ROOT = path.join(__dirname, 'color-photo-map');
const colorMapCache = {};
const modelColorCounters = {};

function getColorMap(model) {
  const slug = slugify(model);
  if (!(slug in colorMapCache)) {
    const file = path.join(COLOR_PHOTO_MAP_ROOT, `${slug}.json`);
    try {
      colorMapCache[slug] = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      throw new Error(`No color-photo-map found for model "${model}" at ${file}`);
    }
  }
  return colorMapCache[slug];
}

function availableColors(model) {
  return Object.keys(getColorMap(model));
}

// Assigns a distinct photo within the chosen color's bucket, sliding
// through with wraparound once that color's real-photo supply runs out.
function nextImage(model, color) {
  const slug = slugify(model);
  const colorMap = getColorMap(model);
  const photos = colorMap[color];
  const key = `${slug}::${color}`;
  const idx = modelColorCounters[key] || 0;
  modelColorCounters[key] = idx + 1;
  return photos[idx % photos.length];
}

function generateVin(index) {
  // Mazda WMI prefix (JM3/JM1 style) + realistic-looking body, format-correct only
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'; // VINs exclude I, O, Q
  const wmi = pick(['JM3', 'JM1']);
  let vin = wmi;
  for (let i = 0; i < 13; i++) {
    vin += chars[randInt(0, chars.length - 1)];
  }
  return (vin.slice(0, 17).padEnd(17, '0')).slice(0, 14) + String(index).padStart(3, '0');
}

function buildSlug(vehicle) {
  const modelSlug = slugify(vehicle.model);
  const trimSlug = slugify(vehicle.trim);
  const drivetrainSlug = vehicle.drivetrain.toLowerCase();
  const bodySlug = slugify(vehicle.bodyType);
  return `${vehicle.status}-${vehicle.year}-mazda-${modelSlug}-${trimSlug}-${drivetrainSlug}-${bodySlug}-${vehicle.vin.toLowerCase()}`;
}

function generateVehicle(index) {
  const model = pick(Object.keys(MODELS));
  const info = MODELS[model];
  const trim = pick(info.trims);
  const drivetrain = pick(info.drivetrains);
  const engine = pick(info.engines);
  const year = pick([2024, 2025, 2026]);
  const status = pick(['new', 'new', 'new', 'used', 'used', 'sold']);
  const mileage = status === 'new' ? 0 : randInt(1500, 55000);
  const priceVariance = randInt(-2000, 8000);
  const price = Math.max(20000, info.basePrice + priceVariance + (year - 2024) * 1200 - (status === 'used' ? mileage * 0.05 : 0));

  const vin = generateVin(index);
  const trimWithDrivetrain = drivetrain === 'AWD' && !trim.toUpperCase().includes('AWD') ? `${trim} AWD` : trim;
  const exteriorColor = pick(availableColors(model));

  const vehicle = {
    vin,
    year,
    make: 'Mazda',
    model,
    trim: trimWithDrivetrain,
    bodyType: info.bodyType,
    price: Math.round(price / 100) * 100,
    mileage: status === 'new' ? 0 : mileage,
    status,
    stockNumber: `ST${String(10000 + index)}`,
    exteriorColor,
    interiorColor: pick(INTERIOR_COLORS),
    engine,
    transmission: pick(TRANSMISSIONS),
    drivetrain,
    image: nextImage(model, exteriorColor),
    dealerId: pick(DEALER_IDS)
  };
  vehicle.slug = buildSlug(vehicle);
  return vehicle;
}

function generateInventory(count = 60) {
  const vehicles = [];
  const seenVins = new Set();
  for (let i = 1; i <= count; i++) {
    let vehicle = generateVehicle(i);
    while (seenVins.has(vehicle.vin)) {
      vehicle = generateVehicle(i + count);
    }
    seenVins.add(vehicle.vin);
    vehicles.push(vehicle);
  }
  return vehicles;
}

const inventory = generateInventory(60);
const outPath = path.join(__dirname, 'inventory.json');
fs.writeFileSync(outPath, JSON.stringify(inventory, null, 2));
console.log(`Generated ${inventory.length} Mazda vehicles -> ${outPath}`);
