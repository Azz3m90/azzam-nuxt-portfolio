import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'deploy', 'cpanel-dist')
const outputDir = join(root, '.output')
const nitroPkgPath = join(outputDir, 'server', 'package.json')

if (!existsSync(outputDir) || !existsSync(nitroPkgPath)) {
  console.error('Missing .output — run npm run build first on your PC.')
  process.exit(1)
}

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

cpSync(outputDir, join(outDir, '.output'), { recursive: true })

// CloudLinux installs root package.json into the nodevenv.
// Use Nitro's production package.json so dependencies resolve.
const nitroPkg = JSON.parse(readFileSync(nitroPkgPath, 'utf8'))
nitroPkg.main = '.output/server/index.mjs'
nitroPkg.scripts = { start: 'node .output/server/index.mjs' }
writeFileSync(join(outDir, 'package.json'), `${JSON.stringify(nitroPkg, null, 2)}\n`)

writeFileSync(
  join(outDir, 'README-UPLOAD.txt'),
  [
    'CloudLinux / cPanel deploy',
    '',
    '1) Upload contents DIRECTLY into ~/portfilio',
    '   Required:',
    '     ~/portfilio/package.json',
    '     ~/portfilio/.output/server/index.mjs',
    '',
    '2) cPanel Node.js App settings:',
    '   Application root        = portfilio',
    '   Application startup file = .output/server/index.mjs',
    '   Application mode         = Production',
    '   NODE_ENV                 = production',
    '',
    '   DO NOT set application root to portfilio/.output/server',
    '',
    '3) In cPanel click: Run NPM Install  then  Restart',
    '',
    '4) Or SSH:',
    '   source ~/nodevenv/portfilio/24/bin/activate',
    '   cd ~/portfilio',
    '   npm install --omit=dev',
    '',
  ].join('\n'),
)

console.log('Ready folder: deploy/cpanel-dist')
console.log('cPanel startup file: .output/server/index.mjs')
console.log('cPanel app root must stay: portfilio')
