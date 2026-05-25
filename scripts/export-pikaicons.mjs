/**
 * Export all Pikaicons from Figma as SVG files.
 *
 * Usage:
 *   1. Get a Figma Personal Access Token: https://www.figma.com/developers/api#access-tokens
 *   2. Run: FIGMA_TOKEN=your_token node scripts/export-pikaicons.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'icons');
const FILE_KEY = 'HoEiIUU664Gfc5MLZVpXjB';
const TOKEN = process.env.FIGMA_TOKEN;

if (!TOKEN) {
  console.error('Error: Set FIGMA_TOKEN environment variable');
  console.error('  Get one at: https://www.figma.com/developers/api#access-tokens');
  process.exit(1);
}

const headers = { 'X-Figma-Token': TOKEN };

async function figmaGet(endpoint) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, { headers });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  console.log('Fetching Figma file components...');

  const { meta } = await figmaGet(`/files/${FILE_KEY}/components`);
  const components = meta.components || [];

  console.log(`Found ${components.length} total components`);

  // Debug: show first 5 component names to understand the structure
  console.log('\nSample component names:');
  components.slice(0, 10).forEach(c => {
    console.log(`  name="${c.name}" | frame="${c.containing_frame?.name}" | id=${c.node_id}`);
  });

  // Group components by their containing_frame (component set)
  // Each component set has variants like "Style=Stroke", "Style=Solid", etc.
  const sets = new Map();
  for (const comp of components) {
    const frameName = comp.containing_frame?.name || '';
    if (!frameName) continue;

    if (!sets.has(frameName)) {
      sets.set(frameName, []);
    }
    sets.get(frameName).push(comp);
  }

  console.log(`\nGrouped into ${sets.size} component sets`);

  // For each set, pick the Stroke variant (prefer non-Duo), fallback to first
  const iconsToExport = [];
  for (const [setName, variants] of sets) {
    const stroke = variants.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('stroke') && !n.includes('duo');
    });
    const target = stroke || variants[0];

    // Build clean filename from set name
    const parts = setName.split('/');
    const iconName = parts[parts.length - 1].trim();

    if (iconName && target) {
      iconsToExport.push({
        nodeId: target.node_id,
        name: iconName,
        setName,
      });
    }
  }

  console.log(`Selected ${iconsToExport.length} icons to export (Stroke variants)\n`);

  if (iconsToExport.length === 0) {
    console.error('No icons found to export!');
    process.exit(1);
  }

  // Create output directory
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  // Export in batches of 100 (Figma images API limit)
  const BATCH_SIZE = 100;
  let exported = 0;
  let errors = 0;

  for (let i = 0; i < iconsToExport.length; i += BATCH_SIZE) {
    const batch = iconsToExport.slice(i, i + BATCH_SIZE);
    const ids = batch.map(c => c.nodeId).join(',');
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(iconsToExport.length / BATCH_SIZE);

    console.log(`Batch ${batchNum}/${totalBatches} (${batch.length} icons)...`);

    try {
      const { images, err } = await figmaGet(`/images/${FILE_KEY}?ids=${ids}&format=svg`);

      if (err) {
        console.error(`  API error: ${err}`);
      }

      for (const icon of batch) {
        const svgUrl = images?.[icon.nodeId];
        if (!svgUrl) {
          console.warn(`  ⚠ No SVG for: ${icon.name} (${icon.nodeId})`);
          errors++;
          continue;
        }

        try {
          const svgRes = await fetch(svgUrl);
          const svg = await svgRes.text();

          const filename = `${icon.name}.svg`;
          writeFileSync(join(OUT_DIR, filename), svg);
          exported++;
        } catch (err) {
          console.warn(`  ⚠ Download failed: ${icon.name} — ${err.message}`);
          errors++;
        }
      }

      console.log(`  ✓ ${exported} exported so far`);

      // Rate limit: wait between batches
      if (i + BATCH_SIZE < iconsToExport.length) {
        await new Promise(r => setTimeout(r, 1500));
      }
    } catch (err) {
      console.error(`  ✗ Batch failed: ${err.message}`);
      errors += batch.length;
    }
  }

  console.log(`\n✅ Done! Exported ${exported} icons to public/icons/`);
  if (errors > 0) console.log(`⚠️  ${errors} errors`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
