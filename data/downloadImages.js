/**
 * Downloads real, freely-licensed Mazda photos from Wikimedia Commons
 * (see data/image-sources-pool.json, built by buildImagePool.js) into
 * public/images/vehicles/<model-slug>/pool/1.jpg .. N.jpg
 *
 * Run with: node data/downloadImages.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const pool = require('./image-sources-pool.json');
const outRoot = path.join(__dirname, '..', 'public', 'images', 'vehicles');

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fetchOnce(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'dealership-mock-site/1.0 (internal test fixture; contact: diegoregalado145@gmail.com)' } }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
          res.resume();
          resolve(fetchOnce(res.headers.location, redirectsLeft - 1));
          return;
        }
        if (res.statusCode === 429 || res.statusCode === 503) {
          res.resume();
          const retryAfter = Number(res.headers['retry-after']) || null;
          reject(Object.assign(new Error(`HTTP ${res.statusCode}`), { retryAfter }));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

async function fetchFollow(url, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchOnce(url);
    } catch (err) {
      const isLast = i === attempts - 1;
      if (isLast) throw err;
      const backoff = err.retryAfter ? err.retryAfter * 1000 : 3000 * (i + 1);
      console.log(`  retrying in ${backoff}ms (${err.message})`);
      await sleep(backoff);
    }
  }
}

async function downloadAll() {
  for (const [model, filenames] of Object.entries(pool)) {
    const dir = path.join(outRoot, slugify(model), 'pool');
    fs.mkdirSync(dir, { recursive: true });

    let n = 0;
    for (const filename of filenames) {
      n += 1;
      const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
      const dest = path.join(dir, `${n}.jpg`);
      try {
        const buf = await fetchFollow(url);
        fs.writeFileSync(dest, buf);
        console.log(`OK   ${model} [${n}/${filenames.length}] <- ${filename} (${(buf.length / 1024).toFixed(0)} KB)`);
      } catch (err) {
        console.error(`FAIL ${model} [${n}/${filenames.length}] <- ${filename}: ${err.message}`);
      }
      await sleep(1200); // be polite to Wikimedia's servers
    }
  }
}

downloadAll();
