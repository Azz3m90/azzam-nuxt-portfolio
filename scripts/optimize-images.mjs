#!/usr/bin/env node
/**
 * Compress oversized public images (Screaming Frog "Image file size too large").
 * Uses sharp if available. Run: npm run optimize:images
 */
import { readdir, stat, rename, copyFile, unlink } from 'node:fs/promises'
import { join, extname, dirname, basename } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = join(process.cwd(), 'public')
const MAX_KB = 300

let sharp
try {
  const require = createRequire(import.meta.url)
  sharp = require('sharp')
} catch {
  console.error('sharp is not installed. Run: npm i -D sharp')
  console.error('Then re-run: npm run optimize:images')
  process.exit(1)
}

async function walk(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p, out)
    else if (/\.(png|jpe?g|webp)$/i.test(e.name) && !e.name.startsWith('.opt-')) out.push(p)
  }
  return out
}

const all = await walk(join(ROOT, 'images')).catch(() => [])
let changed = 0

for (const file of all) {
  let s
  try { s = await stat(file) } catch { continue }
  if (s.size <= MAX_KB * 1024) continue

  const ext = extname(file).toLowerCase()
  const backup = `${file}.bak`
  await copyFile(file, backup)

  const img = sharp(file).rotate()
  const meta = await img.metadata()
  const width = meta.width && meta.width > 1920 ? 1920 : undefined

  let pipeline = width ? img.resize({ width, withoutEnlargement: true }) : img
  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, quality: 80, palette: true })
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 78 })
  } else {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true })
  }

  const tmp = join(dirname(file), `.opt-${basename(file)}`)
  await pipeline.toFile(tmp)
  const after = await stat(tmp)
  const rel = file.slice(ROOT.length + 1)

  if (after.size < s.size) {
    await rename(tmp, file)
    await unlink(backup).catch(() => {})
    console.log(`✓ ${rel}: ${(s.size / 1024).toFixed(0)}KB → ${(after.size / 1024).toFixed(0)}KB`)
    changed++
  } else {
    await unlink(tmp).catch(() => {})
    await unlink(backup).catch(() => {})
    console.log(`– skipped (no gain): ${rel}`)
  }
}

console.log(`Done. Optimized ${changed} image(s).`)
