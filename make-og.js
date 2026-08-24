/* Builds the social share card (1200x630) from real campaign photography. */
'use strict';
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630, PHOTO_W = 560;
const SHOT = path.join(__dirname, 'assets/img/products/brunch-club-m-1600.jpg');
const OUT = path.join(__dirname, 'assets/img/brand/og-cover.jpg');

const textLayer = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="72" y="150" fill="#8a929b" font-family="Helvetica,Arial,sans-serif"
        font-size="19" letter-spacing="7">URBAN MONKEY® · SINCE 2015</text>

  <text x="68" y="300" fill="#f4f6f8" font-family="Helvetica,Arial,sans-serif"
        font-size="96" font-weight="bold" letter-spacing="-3.5">WORN ON</text>
  <text x="68" y="392" fill="#f4f6f8" font-family="Helvetica,Arial,sans-serif"
        font-size="96" font-weight="bold" letter-spacing="-3.5">THE STREET</text>

  <text x="72" y="456" fill="#c3cad2" font-family="Helvetica,Arial,sans-serif"
        font-size="25">Caps · Hoodies · Eyewear</text>

  <rect x="72" y="510" width="250" height="54" rx="27" fill="none" stroke="#7fb0d4" stroke-width="1.6"/>
  <text x="103" y="544" fill="#7fb0d4" font-family="Helvetica,Arial,sans-serif"
        font-size="17" letter-spacing="3.2">TRY IT ON LIVE</text>
</svg>`);

// feathers the photo's left edge into the dark ground
const blend = Buffer.from(`
<svg width="${PHOTO_W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%"  stop-color="#0b0c0e" stop-opacity="1"/>
    <stop offset="38%" stop-color="#0b0c0e" stop-opacity="0.35"/>
    <stop offset="72%" stop-color="#0b0c0e" stop-opacity="0"/>
  </linearGradient></defs>
  <rect width="${PHOTO_W}" height="${H}" fill="url(#g)"/>
</svg>`);

(async () => {
  const photo = await sharp(SHOT)
    .resize({ width: PHOTO_W, height: H, fit: 'cover', position: 'attention' })
    .composite([{ input: blend, top: 0, left: 0 }])
    .toBuffer();

  await sharp({
    create: { width: W, height: H, channels: 3, background: '#0b0c0e' }
  })
    .composite([
      { input: photo, top: 0, left: W - PHOTO_W },
      { input: textLayer, top: 0, left: 0 }
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OUT);

  const m = await sharp(OUT).metadata();
  console.log(`  og-cover.jpg  ${m.width}x${m.height}  ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
})();
