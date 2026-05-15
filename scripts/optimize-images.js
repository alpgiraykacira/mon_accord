#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Image Optimizer
// Converts large PNGs to WebP and updates all JS imports.
// Run: node scripts/optimize-images.js
// ═══════════════════════════════════════════════════════════════

import sharp from 'sharp';
import { readdir, readFile, writeFile, unlink, stat } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const ASSETS    = join(ROOT, 'src', 'assets');
const SRC       = join(ROOT, 'src');

const WEBP_QUALITY   = 85;   // 85 = excellent quality, ~80% smaller than PNG
const SKIP_BELOW_KB  = 50;   // Don't convert tiny files (logos, icons)

// ── 1. Collect all PNG/JPG files ──────────────────────────────
async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await collectImages(full));
    } else if (/\.(png|jpg|jpeg)$/i.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

// ── 2. Convert one image to WebP ──────────────────────────────
async function convertToWebP(src) {
  const info   = await stat(src);
  const sizeKB = info.size / 1024;

  if (sizeKB < SKIP_BELOW_KB) return null; // skip tiny files

  const dest = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  try {
    const { size: outBytes } = await sharp(src)
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(dest);

    const saving = (((info.size - outBytes) / info.size) * 100).toFixed(0);
    const relSrc = relative(ROOT, src);
    console.log(`  ✓ ${relSrc}`);
    console.log(`    ${(info.size/1024).toFixed(0)} KB → ${(outBytes/1024).toFixed(0)} KB  (-${saving}%)`);
    return { src, dest, oldExt: extname(src) };
  } catch (e) {
    console.warn(`  ⚠ Skipped ${basename(src)}: ${e.message}`);
    return null;
  }
}

// ── 3. Update imports in all JS files ────────────────────────
async function updateImports(conversions) {
  if (!conversions.length) return;

  const jsFiles = await collectJsFiles(SRC);

  for (const jsPath of jsFiles) {
    let code = await readFile(jsPath, 'utf8');
    let changed = false;

    for (const { src, oldExt } of conversions) {
      // Match both import statements and string references
      const assetRelPath = relative(SRC, src).replace(/\\/g, '/');
      const filename     = basename(src);
      const oldName      = filename;
      const newName      = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');

      // Replace filename references (handles both relative and absolute-ish paths)
      const patterns = [
        // import x from '...filename.ext'
        new RegExp(`(['"\`])([^'"\`]*?)${escapeRegex(oldName)}(['"\`])`, 'g'),
      ];

      for (const pattern of patterns) {
        const newCode = code.replace(pattern, (m, q1, path, q2) =>
          `${q1}${path}${newName}${q2}`
        );
        if (newCode !== code) { code = newCode; changed = true; }
      }
    }

    if (changed) {
      await writeFile(jsPath, code, 'utf8');
      console.log(`  📝 Updated imports in ${relative(ROOT, jsPath)}`);
    }
  }
}

async function collectJsFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules') {
      files.push(...await collectJsFiles(full));
    } else if (/\.(js|ts|jsx|tsx)$/.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── 4. Delete original files ──────────────────────────────────
async function deleteOriginals(conversions) {
  for (const { src } of conversions) {
    await unlink(src);
  }
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  console.log('\n🖼  Mon Accord — Image Optimizer\n');

  const images = await collectImages(ASSETS);
  console.log(`Found ${images.length} images in src/assets/\n`);

  console.log('Converting to WebP...');
  const results = await Promise.all(images.map(convertToWebP));
  const conversions = results.filter(Boolean);

  if (!conversions.length) {
    console.log('\nNo images needed conversion.');
    return;
  }

  console.log(`\nUpdating JS imports...`);
  await updateImports(conversions);

  console.log(`\nRemoving original files...`);
  await deleteOriginals(conversions);

  // Summary
  console.log(`\n✅ Done! Converted ${conversions.length} images to WebP.\n`);
}

main().catch(e => { console.error(e); process.exit(1); });
