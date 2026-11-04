// scripts/compress-media.mjs
// Run: node scripts/compress-media.mjs
// Requires: npm install sharp --save-dev

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const INPUT_DIR  = 'public/assets/images';
const OUTPUT_DIR = 'public/assets/images/compressed';

// ── Size targets by filename pattern ──────────────────────────
// All output to WebP for maximum compression with quality parity
const PROFILES = [
  {
    match: /hero|backdrop/i,
    width: 1920,
    quality: 78,
    label: 'Hero / Backdrop',
  },
  {
    match: /portrait/i,
    width: 900,
    quality: 80,
    label: 'Portrait',
  },
  {
    match: /thumb|pillar|matrix|tile/i,
    width: 800,
    quality: 80,
    label: 'Thumbnail / Card',
  },
  {
    match: /.*/,          // default — catches everything else
    width: 1440,
    quality: 78,
    label: 'General',
  },
];

function getProfile(filename) {
  return PROFILES.find((p) => p.match.test(filename));
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function run() {
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const images = files.filter((f) =>
    /\.(webp|jpeg|png|webp)$/i.test(f)
  );

  console.log(`\nCompressing ${images.length} images → ${OUTPUT_DIR}\n`);
  console.log('File'.padEnd(46), 'Before'.padStart(9), '→', 'After'.padStart(9), '  Profile');
  console.log('─'.repeat(80));

  let totalBefore = 0;
  let totalAfter  = 0;

  for (const file of images) {
    const inputPath  = path.join(INPUT_DIR, file);
    const outputName = path.parse(file).name + '.webp';
    const outputPath = path.join(OUTPUT_DIR, outputName);

    const profile    = getProfile(file);
    const sizeBefore = (await stat(inputPath)).size;

    await sharp(inputPath)
      .resize({ width: profile.width, withoutEnlargement: true })
      .webp({ quality: profile.quality })
      .toFile(outputPath);

    const sizeAfter = (await stat(outputPath)).size;
    totalBefore += sizeBefore;
    totalAfter  += sizeAfter;

    const flag = sizeAfter > 180_000 ? ' ⚠ OVER 180KB' : '';
    console.log(
      file.padEnd(46),
      formatKB(sizeBefore).padStart(9),
      '→',
      formatKB(sizeAfter).padStart(9),
      ` [${profile.label}]${flag}`
    );
  }

  console.log('─'.repeat(80));
  console.log(
    'TOTAL'.padEnd(46),
    formatKB(totalBefore).padStart(9),
    '→',
    formatKB(totalAfter).padStart(9)
  );
  console.log(`\nSaved to: ${OUTPUT_DIR}`);
  console.log('Review ⚠ files and increase quality or adjust width if needed.\n');
  console.log('When happy: replace files in public/assets/images/ and update');
  console.log('any .webp/.png references in your .tsx files to .webp\n');
}

run().catch(console.error);
