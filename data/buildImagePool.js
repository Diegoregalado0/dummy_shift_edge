/**
 * Filters raw Wikimedia Commons category listings (fetched into /tmp/commons_*.json)
 * down to plausible clean exterior vehicle photos, and writes a pooled
 * image-sources-pool.json manifest: { model: [filenames...] }
 */
const fs = require('fs');
const path = require('path');

const CATEGORY_FILES = {
  'CX-5': '/tmp/commons_cx5.json',
  'CX-30': '/tmp/commons_cx30.json',
  'CX-50': '/tmp/commons_cx50.json',
  'CX-70': '/tmp/commons_cx70.json',
  'CX-90': '/tmp/commons_cx90.json',
  Mazda3: '/tmp/commons_mazda3.json',
  'MX-5 Miata': '/tmp/commons_mx5.json'
};

const MAX_PER_MODEL = 25;

const BAD_KEYWORDS = [
  'interior', 'engine', 'dashboard', 'dash', 'seat', 'badge', 'logo', 'emblem',
  'brochure', 'advert', 'crash', 'diagram', 'drawing', 'screenshot', 'video',
  'cutaway', 'chassis', 'undercarriage', 'wheel rim', 'rim.jpg', 'wheel.jpg',
  'infotainment', 'steering wheel', 'trunk', 'cargo', 'boot space', 'taillight.jpg',
  'headlight.jpg', 'detail', 'close-up', 'closeup', 'plate.jpg', 'sign.jpg',
  'brake', 'exhaust', 'sticker', 'nameplate', 'production line', 'factory',
  'test track', 'crash test', 'nurburgring', 'safety'
];

const BAD_EXTENSIONS = ['.svg', '.pdf', '.ai', '.gif', '.webm', '.ogv', '.tif', '.tiff'];

function isUsable(title) {
  const lower = title.toLowerCase();
  if (BAD_EXTENSIONS.some((ext) => lower.endsWith(ext))) return false;
  if (BAD_KEYWORDS.some((kw) => lower.includes(kw))) return false;
  // Filenames without at least 3 consecutive letters (outside the extension)
  // are usually junk (raw Flickr IDs, placeholder names like "-i---i-", etc.)
  const nameOnly = title.replace(/\.[a-z0-9]+$/i, '');
  if (!/[a-z]{3,}/i.test(nameOnly)) return false;
  return true;
}

const pool = {};
for (const [model, file] of Object.entries(CATEGORY_FILES)) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const titles = raw.query.categorymembers.map((m) => m.title.replace(/^File:/, ''));
  const usable = titles.filter(isUsable).slice(0, MAX_PER_MODEL);
  pool[model] = usable;
  console.log(`${model}: ${titles.length} total -> ${usable.length} usable (capped at ${MAX_PER_MODEL})`);
}

fs.writeFileSync(
  path.join(__dirname, 'image-sources-pool.json'),
  JSON.stringify(pool, null, 2)
);
console.log('Wrote data/image-sources-pool.json');
