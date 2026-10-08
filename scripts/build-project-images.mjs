#!/usr/bin/env node
/**
 * Pre-builds responsive project images, because production (cPanel) can't run sharp/ipx
 * at request time. For every file in public/images/projects it writes to opt/:
 *   <slug>-640.webp, <slug>-1280.webp  → srcset for cards and the detail hero
 *   <slug>-og.jpg (1200×630)            → Open Graph / Twitter card (JPEG for widest support)
 * Names are slugified so they're safe inside srcset. Keep in sync with utils/projectImage.ts.
 * Run: npm run images:projects  (skips files whose outputs are newer than the source)
 */
import { readdir, stat, mkdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import { createRequire } from 'node:module'

const SRC = join(process.cwd(), 'public', 'images', 'projects')
const OUT = join(SRC, 'opt')

let sharp
try {
  sharp = createRequire(import.meta.url)('sharp')
} catch {
  console.error('sharp is not installed. Run: npm i -D sharp')
  process.exit(1)
}

export const slugify = name => basename(name, extname(name)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const isFresh = async (src, out) => {
  try { return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs } catch { return false }
}

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC, { withFileTypes: true }))
  .filter(e => e.isFile() && /\.(png|jpe?g|webp)$/i.test(e.name))
  .map(e => e.name)

let written = 0
for (const name of files) {
  const src = join(SRC, name)
  const slug = slugify(name)
  const targets = [
    { file: `${slug}-640.webp`, run: img => img.resize({ width: 640, withoutEnlargement: true }).webp({ quality: 76 }) },
    { file: `${slug}-1280.webp`, run: img => img.resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 78 }) },
    { file: `${slug}-og.jpg`, run: img => img.resize({ width: 1200, height: 630, fit: 'cover', position: 'top' }).jpeg({ quality: 82, mozjpeg: true }) },
  ]
  for (const t of targets) {
    const out = join(OUT, t.file)
    if (await isFresh(src, out)) continue
    await t.run(sharp(src).rotate()).toFile(out)
    written++
  }
}
console.log(`Project images: ${files.length} sources, ${written} file(s) written to public/images/projects/opt`)
