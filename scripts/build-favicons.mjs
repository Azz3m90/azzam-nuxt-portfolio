#!/usr/bin/env node
/**
 * Generates the favicon set from public/favicon.svg (the "A." brand mark).
 * Google Search shows a site's favicon only if it is square and a multiple of 48px, so the
 * set includes 48/192/512 sizes plus a real multi-size favicon.ico (PNG-encoded entries).
 * The iOS home-screen icon keeps the portrait photo, resized to the 180×180 iOS expects.
 * Run: npm run images:favicons
 */
import { writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const sharp = createRequire(import.meta.url)('sharp')
const pub = name => fileURLToPath(new URL(`../public/${name}`, import.meta.url))
const svg = pub('favicon.svg')

const png = size => sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

for (const size of [16, 32, 48, 192, 512]) {
  await writeFile(pub(`favicon-${size}x${size}.png`), await png(size))
}

// ICO container with PNG payloads: 6-byte header, 16 bytes per directory entry, then the images.
const icoSizes = [16, 32, 48]
const images = await Promise.all(icoSizes.map(png))
const header = Buffer.alloc(6 + 16 * images.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)
let offset = header.length
images.forEach((img, i) => {
  const e = 6 + 16 * i
  header.writeUInt8(icoSizes[i] % 256, e)
  header.writeUInt8(icoSizes[i] % 256, e + 1)
  header.writeUInt16LE(1, e + 4)
  header.writeUInt16LE(32, e + 6)
  header.writeUInt32LE(img.length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += img.length
})
await writeFile(pub('favicon.ico'), Buffer.concat([header, ...images]))

await writeFile(
  pub('apple-touch-icon.png'),
  await sharp(pub('images/Azzam.jpg')).resize(180, 180).png({ compressionLevel: 9 }).toBuffer(),
)

console.log('Favicons written: favicon-{16,32,48,192,512}.png, favicon.ico, apple-touch-icon.png')
