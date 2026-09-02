// cPanel / Passenger startup entry for Nuxt SSR
import { existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'

const root = process.cwd()
const entry = join(root, '.output', 'server', 'index.mjs')
const serverModules = join(root, '.output', 'server', 'node_modules')

if (!existsSync(entry)) {
  console.error('[server.mjs] Missing build output. Build on your PC, then upload .output')
  console.error(`[server.mjs] Expected: ${entry}`)
  process.exit(1)
}

if (!existsSync(serverModules)) {
  console.error('[server.mjs] Missing .output/server/node_modules')
  console.error('[server.mjs] Run: cd .output/server && npm install --omit=dev')
  process.exit(1)
}

process.env.HOST = process.env.HOST || '0.0.0.0'
process.env.NITRO_HOST = process.env.NITRO_HOST || process.env.HOST
process.env.NITRO_PORT = process.env.NITRO_PORT || process.env.PORT || '3000'
process.env.PORT = process.env.NITRO_PORT

console.log(`[server.mjs] starting Nitro on ${process.env.HOST}:${process.env.PORT}`)
await import(pathToFileURL(entry).href)
