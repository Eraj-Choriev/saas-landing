// Bakes one gallery cell — branded poster artwork + mono labels (title / client /
// tags / year) — into a <canvas>, mirroring the phantom.land card anatomy but in
// the Aqly palette. The canvas becomes a THREE.CanvasTexture on a plane.
//
// Text is part of the cell (it sits on the dark gutter around the art, exactly
// like the reference), so the whole thing is one texture. Crispness at gallery
// scale is fine; clicking a card hands off to a real HTML detail page.

import type { Project } from "@/lib/gallery-projects"

const INK = "#0A0E13"
const INK2 = "#141A22"
const INK3 = "#1F2731"
const CREAM = "#F3EFE6"
const CREAM_DIM = "rgba(243,239,230,0.5)"
const CORAL = "#ff5b24"
const BLUE = "#a9caf9"
const GOLD = "#fce88d"
const AMBER = "#d17a00"
const ART = [CORAL, BLUE, GOLD, AMBER]

const W = 512
const H = 640

/** Deterministic RNG so a given slot always bakes the same cell. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length) % arr.length]
}

/* ── artwork generators — each fills the image block (x,y,w,h) ─────────────── */

function artMesh(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rng: () => number) {
  c.fillStyle = INK2
  c.fillRect(x, y, w, h)
  c.save()
  c.beginPath()
  c.rect(x, y, w, h)
  c.clip()
  c.globalCompositeOperation = "lighter"
  for (let i = 0; i < 5; i++) {
    const bx = x + rng() * w
    const by = y + rng() * h
    const r = (0.4 + rng() * 0.6) * w
    const col = ART[i % ART.length]
    const g = c.createRadialGradient(bx, by, 0, bx, by, r)
    g.addColorStop(0, col + "cc")
    g.addColorStop(1, col + "00")
    c.fillStyle = g
    c.fillRect(x, y, w, h)
  }
  c.restore()
}

function artOrbital(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rng: () => number) {
  const g = c.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w * 0.8)
  g.addColorStop(0, INK3)
  g.addColorStop(1, INK)
  c.fillStyle = g
  c.fillRect(x, y, w, h)
  const cx = x + w / 2
  const cy = y + h / 2
  c.strokeStyle = "rgba(243,239,230,0.16)"
  c.lineWidth = 1
  for (let i = 1; i <= 6; i++) {
    c.beginPath()
    c.ellipse(cx, cy, (w / 2) * (i / 6), (h / 2) * (i / 6) * 0.82, 0, 0, Math.PI * 2)
    c.stroke()
  }
  const node = pick(rng, [CORAL, GOLD, BLUE])
  const ng = c.createRadialGradient(cx, cy, 0, cx, cy, w * 0.34)
  ng.addColorStop(0, node)
  ng.addColorStop(0.5, node + "66")
  ng.addColorStop(1, node + "00")
  c.fillStyle = ng
  c.fillRect(x, y, w, h)
  for (let i = 0; i < 4; i++) {
    const a = rng() * Math.PI * 2
    const rr = (0.3 + rng() * 0.6) * (w / 2)
    c.fillStyle = CREAM
    c.beginPath()
    c.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.82, 3, 0, Math.PI * 2)
    c.fill()
  }
}

function artWave(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rng: () => number) {
  c.fillStyle = INK
  c.fillRect(x, y, w, h)
  const bars = 26
  const bw = (w * 0.74) / bars
  const x0 = x + (w - bars * bw) / 2
  const cy = y + h / 2
  const top = pick(rng, [CORAL, BLUE, GOLD])
  for (let i = 0; i < bars; i++) {
    const t = i / bars
    const amp = (Math.sin(t * 9 + rng() * 0.4) * 0.5 + 0.5) * (h * 0.4) + 8
    const bx = x0 + i * bw
    const g = c.createLinearGradient(0, cy - amp, 0, cy + amp)
    g.addColorStop(0, top)
    g.addColorStop(1, AMBER)
    c.fillStyle = g
    const r = Math.min(bw * 0.4, 6)
    c.beginPath()
    c.roundRect(bx + bw * 0.18, cy - amp, bw * 0.64, amp * 2, r)
    c.fill()
  }
}

function artType(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rng: () => number, letter: string, font: string) {
  const bg = pick(rng, [CORAL, BLUE, AMBER])
  c.fillStyle = bg
  c.fillRect(x, y, w, h)
  c.save()
  c.beginPath()
  c.rect(x, y, w, h)
  c.clip()
  c.fillStyle = bg === BLUE ? INK : CREAM
  c.globalAlpha = 0.92
  c.font = `900 ${h * 1.05}px ${font}`
  c.textBaseline = "middle"
  c.textAlign = "center"
  c.fillText(letter, x + w / 2, y + h / 2 + h * 0.04)
  c.restore()
}

function artGrid(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rng: () => number) {
  c.fillStyle = INK
  c.fillRect(x, y, w, h)
  const n = 9
  const cw = w / n
  const ch = h / n
  c.fillStyle = "rgba(243,239,230,0.22)"
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      c.beginPath()
      c.arc(x + i * cw, y + j * ch, 1.4, 0, Math.PI * 2)
      c.fill()
    }
  }
  const hx = Math.floor(rng() * (n - 2))
  const hy = Math.floor(rng() * (n - 2))
  const hue = pick(rng, [CORAL, GOLD, BLUE])
  c.fillStyle = hue + "33"
  c.fillRect(x + hx * cw, y + hy * ch, cw * 2, ch * 2)
  c.strokeStyle = hue
  c.lineWidth = 1.5
  c.strokeRect(x + hx * cw, y + hy * ch, cw * 2, ch * 2)
}

function artBlob(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rng: () => number) {
  c.fillStyle = INK
  c.fillRect(x, y, w, h)
  const bx = x + w * (0.3 + rng() * 0.4)
  const by = y + h * (0.3 + rng() * 0.4)
  const r = w * (0.55 + rng() * 0.25)
  const a = pick(rng, [AMBER, CORAL])
  const b = pick(rng, [GOLD, BLUE])
  const g = c.createRadialGradient(bx, by, 0, bx, by, r)
  g.addColorStop(0, b)
  g.addColorStop(0.5, a)
  g.addColorStop(1, INK)
  c.fillStyle = g
  c.beginPath()
  c.ellipse(bx, by, r, r * 0.9, rng() * Math.PI, 0, Math.PI * 2)
  c.fill()
}

/* ── labels ────────────────────────────────────────────────────────────────── */

function chip(c: CanvasRenderingContext2D, text: string, x: number, y: number, font: string): number {
  c.font = `500 17px ${font}`
  const padX = 11
  const tw = c.measureText(text).width
  const w = tw + padX * 2
  const h = 28
  c.strokeStyle = "rgba(243,239,230,0.28)"
  c.lineWidth = 1
  c.beginPath()
  c.roundRect(x, y, w, h, 14)
  c.stroke()
  c.fillStyle = CREAM
  c.textBaseline = "middle"
  c.textAlign = "left"
  c.fillText(text, x + padX, y + h / 2 + 1)
  return w
}

/**
 * Bake a single gallery cell to a canvas.
 * @param p      project content
 * @param seed   slot index — varies the artwork so repeated projects differ
 * @param mono   resolved monospace family name (from the --font-geist-mono var)
 * @param disp   resolved display family name (for the big type-poster letter)
 */
export function bakeCard(p: Project, seed: number, mono: string, disp: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const c = canvas.getContext("2d")!
  const rng = mulberry32(seed * 2654435761)

  // image block
  const ix = 26
  const iy = 84
  const iw = W - ix * 2
  const ih = 452

  const style = seed % 6
  if (style === 0) artMesh(c, ix, iy, iw, ih, rng)
  else if (style === 1) artOrbital(c, ix, iy, iw, ih, rng)
  else if (style === 2) artWave(c, ix, iy, iw, ih, rng)
  else if (style === 3) artType(c, ix, iy, iw, ih, rng, p.title[0]?.toUpperCase() || "A", disp)
  else if (style === 4) artGrid(c, ix, iy, iw, ih, rng)
  else artBlob(c, ix, iy, iw, ih, rng)

  // inner hairline frame on the art
  c.strokeStyle = "rgba(243,239,230,0.18)"
  c.lineWidth = 1
  c.strokeRect(ix + 0.5, iy + 0.5, iw - 1, ih - 1)

  // top band — title (left) + client (right)
  c.fillStyle = CREAM
  c.font = `500 22px ${mono}`
  c.textBaseline = "alphabetic"
  c.textAlign = "left"
  let title = p.title.toUpperCase()
  while (c.measureText(title).width > iw * 0.66 && title.length > 4) title = title.slice(0, -2)
  if (title !== p.title.toUpperCase()) title = title.trimEnd() + "…"
  c.fillText(title, ix, 56)

  c.fillStyle = CREAM_DIM
  c.font = `500 18px ${mono}`
  c.textAlign = "right"
  c.fillText(p.client.toUpperCase(), W - ix, 55)

  // bottom band — tag chips (left) + year (right)
  let cx = ix
  const by = 568
  for (const tag of p.tags.slice(0, 3)) {
    cx += chip(c, tag, cx, by, mono) + 8
  }
  c.fillStyle = CREAM_DIM
  c.font = `500 18px ${mono}`
  c.textAlign = "right"
  c.textBaseline = "middle"
  c.fillText(p.year, W - ix, by + 14)

  return canvas
}

export const CARD_PX = { W, H }
