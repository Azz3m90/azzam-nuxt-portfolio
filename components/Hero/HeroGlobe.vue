<script setup lang="ts">
/**
 * A 3D "planet" of skills & featured projects orbiting the portrait.
 *
 * Two layers cooperate so everything reads as genuinely three-dimensional:
 *
 *  1. Two <canvas> layers (behind / in front of the portrait) draw the planet
 *     itself — dotted landmasses, lat/long wireframe, atmosphere limb, orbit
 *     rings with satellites and a parallax starfield.
 *  2. DOM chips on top carry the labels, so the text stays crisp, selectable,
 *     linkable and readable by assistive tech.
 *
 * Chip positions are expressed as percentages of the container, which keeps the
 * server-rendered markup identical to the first client render (no measuring, no
 * hydration mismatch) and gives a sane no-JS fallback.
 */
import type { GlobeItem } from '~/types/globe'

const props = withDefaults(defineProps<{
  items: GlobeItem[]
  /** Radius of the label shell, in % of the container width. */
  radius?: number
  label?: string
}>(), {
  radius: 41,
  label: 'Skills and featured projects',
})

const colorMode = useColorMode()

/** Camera distance in sphere radii — controls how strong the perspective is. */
const PERSP = 3
/** Planet radius as a fraction of the container width. */
const PLANET = 0.36
/**
 * Projected distance (in label-radius units) inside which a front-facing chip
 * would sit on top of the portrait. Those fade out so the face stays clear.
 */
const CORE_COVER = 0.72
/** Idle rotation speed, radians per millisecond (~24s per revolution). */
const SPIN = 0.00026
/** Angles the sphere is rendered at on the server / before the loop starts. */
const START_Y = 0.55
const START_X = -0.14
const TAU = Math.PI * 2

type Vec3 = [number, number, number]

/* -------------------------------------------------------------------------- */
/* Geometry, all precomputed once on the unit sphere                          */
/* -------------------------------------------------------------------------- */

/** Fibonacci lattice — spreads N points evenly over a unit sphere. */
function fibonacciSphere(n: number): Vec3[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const pts: Vec3[] = []
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? 0 : 1 - (2 * (i + 0.5)) / n
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r])
  }
  return pts
}

/**
 * Dotted planet surface. A few summed sine waves stand in for a heightmap —
 * enough to give organic "continents" without shipping any map data.
 */
function buildDots() {
  const dots: { p: Vec3, land: boolean }[] = []
  for (let lat = -84; lat <= 84; lat += 8) {
    const phi = (lat * Math.PI) / 180
    const cosP = Math.cos(phi)
    const count = Math.max(6, Math.round(42 * cosP))
    for (let j = 0; j < count; j++) {
      const lon = (j / count) * TAU
      const n = Math.sin(3.1 * lon + 1.7) * Math.cos(2.3 * phi)
        + 0.6 * Math.sin(5.7 * lon + 2.1 * phi)
        + 0.45 * Math.cos(4.3 * phi - 1.9 * lon)
      dots.push({
        p: [cosP * Math.cos(lon), Math.sin(phi), cosP * Math.sin(lon)],
        land: n > 0.35,
      })
    }
  }
  return dots
}

/** Latitude / longitude wireframe. */
function buildRings(): Vec3[][] {
  const rings: Vec3[][] = []
  for (let k = 0; k < 6; k++) {
    const lam = (k * Math.PI) / 6
    const pts: Vec3[] = []
    for (let i = 0; i <= 30; i++) {
      const t = (i / 30) * TAU
      pts.push([Math.sin(t) * Math.cos(lam), Math.cos(t), Math.sin(t) * Math.sin(lam)])
    }
    rings.push(pts)
  }
  for (const deg of [-60, -30, 0, 30, 60]) {
    const phi = (deg * Math.PI) / 180
    const y = Math.sin(phi)
    const r = Math.cos(phi)
    const pts: Vec3[] = []
    for (let i = 0; i <= 34; i++) {
      const t = (i / 34) * TAU
      pts.push([r * Math.cos(t), y, r * Math.sin(t)])
    }
    rings.push(pts)
  }
  return rings
}

/** Two tilted satellite orbits, kept in their own (slower) rotating frame. */
function buildOrbit(tiltDeg: number, yawDeg: number): Vec3[] {
  const tilt = (tiltDeg * Math.PI) / 180
  const yaw = (yawDeg * Math.PI) / 180
  const pts: Vec3[] = []
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * TAU
    const x0 = Math.cos(t)
    const y0 = Math.sin(t) * Math.sin(tilt)
    const z0 = Math.sin(t) * Math.cos(tilt)
    pts.push([x0 * Math.cos(yaw) + z0 * Math.sin(yaw), y0, z0 * Math.cos(yaw) - x0 * Math.sin(yaw)])
  }
  return pts
}

/** Starfield on a much larger shell, so it drifts with parallax. */
function buildStars() {
  const stars: { p: Vec3, s: number }[] = []
  let seed = 1337
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  for (let i = 0; i < 90; i++) {
    const y = 1 - 2 * rnd()
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const t = rnd() * TAU
    stars.push({ p: [Math.cos(t) * r, y, Math.sin(t) * r], s: 0.6 + rnd() * 1.1 })
  }
  return stars
}

const DOTS = buildDots()
const RINGS = buildRings()
const ORBITS = [buildOrbit(72, 18), buildOrbit(108, -34)]
const STARS = buildStars()

const points = computed(() => fibonacciSphere(props.items.length))

/* -------------------------------------------------------------------------- */
/* Projection                                                                  */
/* -------------------------------------------------------------------------- */

/** Rotate around Y, then X, then apply the perspective divide. */
function project(p: Vec3, cy: number, sy: number, cx: number, sx: number) {
  const x1 = p[0] * cy + p[2] * sy
  const z1 = p[2] * cy - p[0] * sy
  const y2 = p[1] * cx - z1 * sx
  const z2 = p[1] * sx + z1 * cx
  const s = PERSP / (PERSP - z2)
  return { x: x1 * s, y: y2 * s, z: z2, s }
}

/** Label shell radius actually used when painting; tightened on small screens. */
let shellRadius = props.radius
/** Opacity of the rear-most chips. Pushed down on small, crowded planets. */
let backFloor = 0.26

function depthStyle(x: number, y: number, z: number, s: number) {
  const t = (z + 1) / 2
  let opacity = backFloor + (1 - backFloor) * t * t
  if (z > 0) {
    // Chip sits between the camera and the portrait — dim it off the face.
    const dr = Math.sqrt(x * x + y * y)
    if (dr < CORE_COVER) opacity *= 0.06 + 0.94 * (dr / CORE_COVER) ** 2
  }
  // Quantised so the browser can cache the blurred rasterisations.
  const blur = z < -0.15 ? Math.min(2, Math.round((-z - 0.15) * 3.4)) * 0.6 : 0
  return {
    marginLeft: (x * shellRadius).toFixed(2) + '%',
    marginTop: (y * shellRadius).toFixed(2) + '%',
    transform: 'translate(-50%, -50%) scale(' + s.toFixed(3) + ') rotateY('
      + (-x * 24).toFixed(1) + 'deg)',
    opacity: opacity.toFixed(3),
    filter: blur ? 'blur(' + blur + 'px)' : 'none',
    zIndex: String(z >= 0 ? 56 + Math.round(t * 40) : 2 + Math.round(t * 40)),
  }
}

/** Server render + no-JS fallback: the sphere frozen at its starting angle. */
const initialStyles = computed(() => {
  const cy = Math.cos(START_Y); const sy = Math.sin(START_Y)
  const cx = Math.cos(START_X); const sx = Math.sin(START_X)
  return points.value.map((p) => {
    const q = project(p, cy, sy, cx, sx)
    return depthStyle(q.x, q.y, q.z, q.s)
  })
})

/* -------------------------------------------------------------------------- */
/* Runtime state                                                               */
/* -------------------------------------------------------------------------- */

const root = ref<HTMLElement | null>(null)
const chips = ref<HTMLElement[]>([])
const backCanvas = ref<HTMLCanvasElement | null>(null)
const frontCanvas = ref<HTMLCanvasElement | null>(null)

let backCtx: CanvasRenderingContext2D | null = null
let frontCtx: CanvasRenderingContext2D | null = null
let box = 0
let dpr = 1

let raf = 0
let last = 0
let rotY = START_Y
let rotX = START_X
let velY = SPIN
let velX = 0
let tiltTarget = START_X
let orbitPhase = 0
let starPhase = 0
let paused = false
let dragging = false
let onScreen = true
let reduced = false
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

interface Palette {
  land: string
  ocean: string
  wire: string
  rim: string
  body: [string, string, string]
  orbit: string
  sat: string
  star: string
  /** Light theme needs stronger ink to hold contrast against a pale ground. */
  boost: number
}

const DARK: Palette = {
  land: '125,211,252',
  ocean: '59,130,246',
  wire: '129,140,248',
  rim: '96,165,250',
  body: ['rgba(59,130,246,0.30)', 'rgba(30,64,175,0.20)', 'rgba(2,6,23,0.45)'],
  orbit: '165,180,252',
  sat: '110,231,183',
  star: '203,213,225',
  boost: 1,
}

const LIGHT: Palette = {
  land: '37,99,235',
  ocean: '99,102,241',
  wire: '37,99,235',
  rim: '59,130,246',
  body: ['rgba(191,219,254,0.62)', 'rgba(147,197,253,0.36)', 'rgba(224,231,255,0.24)'],
  orbit: '99,102,241',
  sat: '5,150,105',
  star: '148,163,184',
  boost: 1.4,
}

let pal: Palette = DARK

/** Reused per-frame bins so dots become ~8 batched fills instead of ~600. */
const bins: number[][] = Array.from({ length: 8 }, () => [])

/* -------------------------------------------------------------------------- */
/* Canvas rendering                                                            */
/* -------------------------------------------------------------------------- */

function resize() {
  const el = root.value
  if (!el) return
  box = el.clientWidth
  // Chips are a fixed pixel size, so pull them in when the planet is small.
  shellRadius = props.radius * (box < 340 ? 0.78 : box < 400 ? 0.88 : 1)
  backFloor = box < 400 ? 0.13 : 0.26
  dpr = Math.min(2, window.devicePixelRatio || 1)
  for (const c of [backCanvas.value, frontCanvas.value]) {
    if (!c) continue
    c.width = Math.round(box * dpr)
    c.height = Math.round(box * dpr)
  }
  backCtx = backCanvas.value?.getContext('2d') ?? null
  frontCtx = frontCanvas.value?.getContext('2d') ?? null
  backCtx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  frontCtx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

/** Fade factor that hides front-layer detail sitting on top of the portrait. */
function coreFade(dx: number, dy: number, R: number) {
  const d = Math.sqrt(dx * dx + dy * dy) / (R * 0.68)
  return d >= 1 ? 1 : 0.05 + 0.95 * d * d
}

function strokeRings(
  ctx: CanvasRenderingContext2D,
  rings: Vec3[][],
  front: boolean,
  cy: number, sy: number, cx: number, sx: number,
  cxp: number, cyp: number, R: number, alpha: number, color: string, width: number,
) {
  ctx.beginPath()
  for (const ring of rings) {
    let drawing = false
    for (const p of ring) {
      const q = project(p, cy, sy, cx, sx)
      if ((q.z >= 0) !== front) {
        drawing = false
        continue
      }
      const X = cxp + q.x * R
      const Y = cyp + q.y * R
      if (drawing) ctx.lineTo(X, Y)
      else ctx.moveTo(X, Y)
      drawing = true
    }
  }
  ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')'
  ctx.lineWidth = width
  ctx.stroke()
}

function draw() {
  const bc = backCtx
  const fc = frontCtx
  if (!bc || !fc || !box) return

  const c = box / 2
  const R = box * PLANET
  const cy = Math.cos(rotY); const sy = Math.sin(rotY)
  const cx = Math.cos(rotX); const sx = Math.sin(rotX)

  bc.clearRect(0, 0, box, box)
  fc.clearRect(0, 0, box, box)

  /* --- starfield (parallax shell, behind everything) --- */
  const scy = Math.cos(starPhase); const ssy = Math.sin(starPhase)
  bc.fillStyle = 'rgba(' + pal.star + ',0.55)'
  for (const st of STARS) {
    const q = project(st.p, scy, ssy, cx, sx)
    if (q.z < -0.2) continue
    const X = c + q.x * R * 1.62
    const Y = c + q.y * R * 1.62
    bc.globalAlpha = 0.18 + 0.42 * ((q.z + 1) / 2)
    bc.fillRect(X, Y, st.s, st.s)
  }
  bc.globalAlpha = 1

  /* --- orbit rings: back half --- */
  for (let i = 0; i < ORBITS.length; i++) {
    const phase = orbitPhase * (i === 0 ? 1 : -0.72)
    const oc = Math.cos(phase); const os = Math.sin(phase)
    strokeRings(bc, [ORBITS[i]!], false, oc, os, cx, sx, c, c, R * 1.16, 0.14, pal.orbit, 1)
  }

  /* --- planet body --- */
  const body = bc.createRadialGradient(c - R * 0.38, c - R * 0.42, R * 0.05, c, c, R * 1.15)
  body.addColorStop(0, pal.body[0])
  body.addColorStop(0.55, pal.body[1])
  body.addColorStop(1, pal.body[2])
  bc.beginPath()
  bc.arc(c, c, R, 0, TAU)
  bc.fillStyle = body
  bc.fill()

  /* --- dotted surface, batched into depth bins --- */
  for (const b of bins) b.length = 0
  for (const dot of DOTS) {
    const q = project(dot.p, cy, sy, cx, sx)
    const front = q.z >= 0
    const t = (q.z + 1) / 2
    const level = Math.min(3, Math.max(0, Math.floor(t * 4)))
    const X = c + q.x * R
    const Y = c + q.y * R
    const size = (dot.land ? 1.5 : 1) * (0.75 + 0.5 * t) * (box / 420 + 0.55)
    bins[(front ? 4 : 0) + level]!.push(X, Y, size, dot.land ? 1 : 0)
  }
  for (let i = 0; i < 8; i++) {
    const bin = bins[i]!
    if (!bin.length) continue
    const front = i >= 4
    const level = i % 4
    const ctx = front ? fc : bc
    const t = (level + 0.5) / 4
    const baseAlpha = (front ? 0.25 + 0.6 * t : 0.06 + 0.16 * t) * pal.boost
    for (let landPass = 0; landPass < 2; landPass++) {
      ctx.beginPath()
      let any = false
      for (let k = 0; k < bin.length; k += 4) {
        if (bin[k + 3] !== landPass) continue
        const s = bin[k + 2]!
        let a = 1
        if (front) a = coreFade(bin[k]! - c, bin[k + 1]! - c, R)
        if (a < 0.08) continue
        ctx.rect(bin[k]! - s / 2, bin[k + 1]! - s / 2, s, s)
        any = true
      }
      if (!any) continue
      const mult = landPass === 1 ? 1 : 0.45
      ctx.fillStyle = 'rgba(' + (landPass === 1 ? pal.land : pal.ocean) + ','
        + (baseAlpha * mult).toFixed(3) + ')'
      ctx.fill()
    }
  }

  /* --- wireframe --- */
  strokeRings(bc, RINGS, false, cy, sy, cx, sx, c, c, R, 0.13 * pal.boost, pal.wire, 0.8)
  fc.save()
  fc.beginPath()
  fc.arc(c, c, R, 0, TAU)
  fc.clip()
  strokeRings(fc, RINGS, true, cy, sy, cx, sx, c, c, R, 0.24 * pal.boost, pal.wire, 0.9)
  fc.restore()

  /* --- atmosphere limb --- */
  const rim = fc.createRadialGradient(c, c, R * 0.9, c, c, R * 1.13)
  rim.addColorStop(0, 'rgba(' + pal.rim + ',0)')
  rim.addColorStop(0.42, 'rgba(' + pal.rim + ',0.45)')
  rim.addColorStop(1, 'rgba(' + pal.rim + ',0)')
  fc.beginPath()
  fc.arc(c, c, R * 1.13, 0, TAU)
  fc.fillStyle = rim
  fc.fill()

  /* --- orbit rings: front half + satellites --- */
  for (let i = 0; i < ORBITS.length; i++) {
    const phase = orbitPhase * (i === 0 ? 1 : -0.72)
    const oc = Math.cos(phase); const os = Math.sin(phase)
    strokeRings(fc, [ORBITS[i]!], true, oc, os, cx, sx, c, c, R * 1.16, 0.3, pal.orbit, 1)

    const ring = ORBITS[i]!
    const idx = Math.floor(((orbitPhase * (i === 0 ? 0.9 : 1.4) + i * 2.1) / TAU % 1 + 1) % 1 * 72)
    const q = project(ring[idx]!, oc, os, cx, sx)
    const X = c + q.x * R * 1.16
    const Y = c + q.y * R * 1.16
    const ctx = q.z >= 0 ? fc : bc
    const glow = ctx.createRadialGradient(X, Y, 0, X, Y, 9)
    glow.addColorStop(0, 'rgba(' + pal.sat + ',' + (q.z >= 0 ? 0.9 : 0.35) + ')')
    glow.addColorStop(1, 'rgba(' + pal.sat + ',0)')
    ctx.beginPath()
    ctx.arc(X, Y, 9, 0, TAU)
    ctx.fillStyle = glow
    ctx.fill()
    ctx.beginPath()
    ctx.arc(X, Y, q.z >= 0 ? 2.2 : 1.5, 0, TAU)
    ctx.fillStyle = 'rgba(' + pal.sat + ',' + (q.z >= 0 ? 1 : 0.45) + ')'
    ctx.fill()
  }
}

function paintChips() {
  const cy = Math.cos(rotY); const sy = Math.sin(rotY)
  const cx = Math.cos(rotX); const sx = Math.sin(rotX)
  const pts = points.value
  for (let i = 0; i < pts.length; i++) {
    const el = chips.value[i]
    const p = pts[i]
    if (!el || !p) continue
    const q = project(p, cy, sy, cx, sx)
    const s = depthStyle(q.x, q.y, q.z, q.s)
    el.style.cssText = 'margin-left:' + s.marginLeft + ';margin-top:' + s.marginTop
      + ';transform:' + s.transform + ';opacity:' + s.opacity
      + ';filter:' + s.filter + ';z-index:' + s.zIndex
  }
}

function render() {
  paintChips()
  draw()
}

/* -------------------------------------------------------------------------- */
/* Animation loop                                                              */
/* -------------------------------------------------------------------------- */

function step(now: number) {
  const dt = Math.min(48, now - last || 16)
  last = now
  if (!dragging) {
    const target = paused ? 0 : SPIN
    velY += (target - velY) * 0.05
    velX += (0 - velX) * 0.05
    rotX += (tiltTarget - rotX) * 0.035
  }
  rotY += velY * dt
  rotX = Math.max(-0.6, Math.min(0.6, rotX + velX * dt))
  orbitPhase = (orbitPhase + dt * 0.00042) % TAU
  starPhase = (starPhase + dt * 0.00009) % TAU
  render()
  raf = requestAnimationFrame(step)
}

function start() {
  if (raf || reduced || !onScreen) return
  raf = requestAnimationFrame((t) => {
    last = t
    step(t)
  })
}

function stop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

/* -------------------------------------------------------------------------- */
/* Pointer                                                                     */
/* -------------------------------------------------------------------------- */

let lastX = 0
let lastY = 0
let moved = 0

function onDown(e: PointerEvent) {
  if (reduced || e.button !== 0) return
  dragging = true
  moved = 0
  lastX = e.clientX
  lastY = e.clientY
  velY = 0
  velX = 0
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onUp)
}

function onDragMove(e: PointerEvent) {
  if (!dragging) return
  const dx = e.clientX - lastX
  const dy = e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
  moved += Math.abs(dx) + Math.abs(dy)
  velY = dx * 0.00035
  velX = -dy * 0.00035
  rotY += dx * 0.006
  rotX = Math.max(-0.6, Math.min(0.6, rotX - dy * 0.006))
  tiltTarget = rotX
  render()
}

function onUp() {
  dragging = false
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onUp)
}

/** Gentle tilt that follows the cursor, so the planet feels like an object. */
function onHoverMove(e: PointerEvent) {
  if (reduced || dragging || e.pointerType !== 'mouse') return
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const ny = (e.clientY - r.top) / r.height - 0.5
  tiltTarget = Math.max(-0.42, Math.min(0.42, -ny * 0.7))
}

function onLeave() {
  paused = false
  tiltTarget = START_X
}

/** Swallow the click that ends a drag so project links don't fire by accident. */
function onClickCapture(e: MouseEvent) {
  if (moved > 8) {
    e.preventDefault()
    e.stopPropagation()
    moved = 0
  }
}

function onVisibility() {
  if (document.hidden) stop()
  else start()
}

watch(() => colorMode.value, (v) => {
  pal = v === 'light' ? LIGHT : DARK
  if (reduced || !raf) render()
})

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  pal = colorMode.value === 'light' ? LIGHT : DARK

  resize()
  ro = new ResizeObserver(() => {
    resize()
    render()
  })
  if (root.value) ro.observe(root.value)
  render()
  if (reduced) return

  io = new IntersectionObserver((entries) => {
    onScreen = !!entries[0]?.isIntersecting
    if (onScreen) start()
    else stop()
  }, { threshold: 0 })
  if (root.value) io.observe(root.value)

  document.addEventListener('visibilitychange', onVisibility)
  start()
})

onBeforeUnmount(() => {
  stop()
  io?.disconnect()
  ro?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onUp)
})
</script>

<template>
  <div
    ref="root"
    class="hero-globe relative aspect-square w-full select-none touch-pan-y"
    @pointerdown="onDown"
    @pointermove="onHoverMove"
    @pointerleave="onLeave"
    @click.capture="onClickCapture"
  >
    <!-- ambient bloom -->
    <div
      class="globe-bloom pointer-events-none absolute inset-[6%] rounded-full"
      aria-hidden="true"
    ></div>

    <!-- planet, back half -->
    <canvas ref="backCanvas" class="pointer-events-none absolute inset-0 h-full w-full" style="z-index: 1" aria-hidden="true" />

    <!-- portrait / core -->
    <div class="absolute left-1/2 top-1/2 h-[43%] w-[43%] -translate-x-1/2 -translate-y-1/2" style="z-index: 50">
      <div class="core-halo absolute -inset-[9%] rounded-full" aria-hidden="true"></div>
      <div class="relative h-full w-full overflow-hidden rounded-full border-2 border-white/40 shadow-2xl dark:border-white/15">
        <slot name="core" />
        <div class="core-shade pointer-events-none absolute inset-0 rounded-full" aria-hidden="true"></div>
      </div>
    </div>

    <!-- planet, front half -->
    <canvas ref="frontCanvas" class="pointer-events-none absolute inset-0 h-full w-full" style="z-index: 52" aria-hidden="true" />

    <!-- orbiting labels -->
    <ul class="globe-shell absolute inset-0 m-0 list-none p-0" :aria-label="label">
      <li
        v-for="(item, i) in items"
        :key="item.label"
        ref="chips"
        class="globe-chip absolute left-1/2 top-1/2"
        :style="initialStyles[i]"
        @pointerenter="paused = true"
        @pointerleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <NuxtLink v-if="item.to" :to="item.to" class="globe-tag globe-tag--project">
          <span class="globe-dot" aria-hidden="true"></span>
          {{ item.label }}
        </NuxtLink>
        <span v-else class="globe-tag globe-tag--skill">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hero-globe {
  cursor: grab;
}
.hero-globe:active {
  cursor: grabbing;
}

.globe-bloom {
  background: radial-gradient(circle at 38% 32%, rgb(99 102 241 / 0.35), rgb(37 99 235 / 0.16) 45%, transparent 72%);
  filter: blur(28px);
}

.globe-shell {
  perspective: 900px;
}

.globe-chip {
  will-change: transform, opacity;
}

.globe-tag {
  @apply inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-0.5
         text-[9px] font-semibold shadow-sm sm:gap-1.5 sm:py-1
         transition-[background-color,box-shadow,color] duration-200 sm:px-2.5 sm:text-xs;
}
.globe-tag--skill {
  @apply cursor-default border border-slate-200/70 bg-white/95 text-slate-700
         dark:border-white/10 dark:bg-slate-800/95 dark:text-slate-200;
  box-shadow: 0 2px 10px -4px rgb(15 23 42 / 0.35);
}
.globe-tag--project {
  @apply cursor-pointer text-white;
  background-image: linear-gradient(135deg, rgb(37 99 235), rgb(99 102 241));
  box-shadow: 0 4px 16px -4px rgb(59 130 246 / 0.7);
}
.globe-tag--project:hover {
  background-image: linear-gradient(135deg, rgb(59 130 246), rgb(129 140 248));
  box-shadow: 0 6px 22px -4px rgb(99 130 246 / 0.85);
}
.globe-dot {
  @apply h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300;
  box-shadow: 0 0 6px rgb(110 231 183 / 0.9);
}

.core-halo {
  background: conic-gradient(
    from 0deg,
    rgb(37 99 235 / 0) 0deg,
    rgb(59 130 246 / 0.75) 70deg,
    rgb(99 102 241 / 0.2) 150deg,
    rgb(37 99 235 / 0) 230deg,
    rgb(129 140 248 / 0.6) 310deg,
    rgb(37 99 235 / 0) 360deg
  );
  filter: blur(10px);
  animation: globe-halo 9s linear infinite;
}

/* Terminator shading so the portrait reads as a lit sphere, not a flat disc. */
.core-shade {
  background:
    radial-gradient(circle at 30% 26%, rgb(255 255 255 / 0.22), transparent 46%),
    radial-gradient(circle at 74% 78%, rgb(2 6 23 / 0.45), transparent 62%);
  mix-blend-mode: soft-light;
}

@keyframes globe-halo {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-globe {
    cursor: default;
  }
  .core-halo {
    animation: none;
  }
}
</style>
