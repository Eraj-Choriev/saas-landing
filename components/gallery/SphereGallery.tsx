"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import gsap from "gsap"
import Lenis from "lenis"
import { PROJECTS, type Project } from "@/lib/gallery-projects"
import { bakeCard } from "./bakeCard"

/* ── tunables ──────────────────────────────────────────────────────────────── */
const COLS = 16
const ROWS = 6
const RADIUS = 10
const CARD_H = 2.95
const CARD_W = CARD_H * 0.8 // texture is 512×640 → 0.8 aspect
const LAT_MIN = (-52 * Math.PI) / 180
const LAT_MAX = (52 * Math.PI) / 180
const FOV = 64
const NTEX = Math.min(30, COLS * ROWS)
const DAMP = 0.09 // lower = floatier "lenis" catch-up
const DRAG_SPEED = 0.0042
const PITCH_LIMIT = 0.62

type CardUserData = { project: Project; lon: number; lat: number; targetScale: number }

export default function SphereGallery() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState<Project | null>(null)
  const [hudHidden, setHudHidden] = useState(false)
  const [clock, setClock] = useState({ tj: "", uk: "" })

  // imperative bridge so the HUD/overlay (React) can drive the GL scene (effect)
  const apiRef = useRef<{
    openProject: (p: Project) => void
    closeProject: () => void
  } | null>(null)

  /* live dual clock, like the reference's location strip */
  useEffect(() => {
    const fmt = (tz: string) =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: tz,
        hour12: false,
      }).format(new Date())
    const tick = () => setClock({ tj: fmt("Asia/Dushanbe"), uk: fmt("Europe/London") })
    tick()
    const id = setInterval(tick, 1000 * 15)
    return () => clearInterval(id)
  }, [])

  /* ── Three.js scene ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 0)
    camera.lookAt(0, 0, -1)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.touchAction = "none"

    const group = new THREE.Group()
    group.rotation.order = "YXZ"
    scene.add(group)

    const geometry = new THREE.PlaneGeometry(CARD_W, CARD_H)
    const textures: THREE.CanvasTexture[] = []
    const materials: THREE.MeshBasicMaterial[] = []
    const cards: THREE.Mesh[] = []

    let raf = 0
    let disposed = false
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-2, -2) // NDC; offscreen until moved
    const tmp = new THREE.Vector3()

    const state = {
      curYaw: 0,
      curPitch: 0,
      targetYaw: 0,
      targetPitch: 0,
      velYaw: 0,
      velPitch: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      downX: 0,
      downY: 0,
      moved: 0,
      locked: false, // true during click→detail transition (gsap owns rotation)
      lastInteract: 0,
    }
    let hovered: THREE.Mesh | null = null
    let prevYaw = 0
    let prevPitch = 0

    const build = async () => {
      const root = getComputedStyle(document.documentElement)
      const mono = root.getPropertyValue("--font-geist-mono").trim() || "monospace"
      const disp = root.getPropertyValue("--font-geologica").trim() || "sans-serif"
      if ("fonts" in document) {
        try {
          await (document as Document).fonts.ready
        } catch {
          /* ignore */
        }
      }
      if (disposed) return

      for (let t = 0; t < NTEX; t++) {
        const project = PROJECTS[t % PROJECTS.length]
        const canvas = bakeCard(project, t, mono, disp)
        const tex = new THREE.CanvasTexture(canvas)
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
        tex.needsUpdate = true
        textures.push(tex)
      }

      for (let r = 0; r < ROWS; r++) {
        const lat = THREE.MathUtils.lerp(LAT_MIN, LAT_MAX, r / (ROWS - 1))
        for (let col = 0; col < COLS; col++) {
          const i = r * COLS + col
          const lon = (col / COLS) * Math.PI * 2
          const texIdx = i % NTEX
          const mat = new THREE.MeshBasicMaterial({
            map: textures[texIdx],
            transparent: true,
            side: THREE.FrontSide,
            depthWrite: false,
          })
          materials.push(mat)
          const mesh = new THREE.Mesh(geometry, mat)
          const cl = Math.cos(lat)
          mesh.position.set(RADIUS * cl * Math.sin(lon), RADIUS * Math.sin(lat), -RADIUS * cl * Math.cos(lon))
          mesh.lookAt(0, 0, 0)
          mesh.userData = {
            project: PROJECTS[texIdx % PROJECTS.length],
            lon,
            lat,
            targetScale: 1,
          } as CardUserData
          group.add(mesh)
          cards.push(mesh)
        }
      }

      setReady(true)
      gsap.fromTo(
        group.scale,
        { x: 0.86, y: 0.86, z: 0.86 },
        { x: 1, y: 1, z: 1, duration: 1.4, ease: "power3.out" }
      )
    }

    void build()

    /* ── interaction (bound to the canvas so HUD clicks don't drag) ─────────── */
    const el = renderer.domElement
    const setPointer = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const onDown = (e: PointerEvent) => {
      if (state.locked) return
      state.dragging = true
      state.lastX = e.clientX
      state.lastY = e.clientY
      state.downX = e.clientX
      state.downY = e.clientY
      state.moved = 0
      state.velYaw = 0
      state.velPitch = 0
      state.lastInteract = performance.now()
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* capture is best-effort — never let it block dragging */
      }
    }
    const onMove = (e: PointerEvent) => {
      setPointer(e)
      if (!state.dragging || state.locked) return
      const dx = e.clientX - state.lastX
      const dy = e.clientY - state.lastY
      state.lastX = e.clientX
      state.lastY = e.clientY
      state.moved += Math.abs(dx) + Math.abs(dy)
      state.targetYaw += dx * DRAG_SPEED
      state.targetPitch = THREE.MathUtils.clamp(state.targetPitch + dy * DRAG_SPEED, -PITCH_LIMIT, PITCH_LIMIT)
      state.velYaw = dx * DRAG_SPEED
      state.velPitch = dy * DRAG_SPEED
      state.lastInteract = performance.now()
    }
    const onUp = (e: PointerEvent) => {
      if (state.locked) return
      const wasTap = state.moved < 6
      state.dragging = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore — capture may not have been held */
      }
      if (wasTap && hovered) {
        openProject((hovered.userData as CardUserData).project, hovered)
      }
    }

    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointerleave", () => (pointer.set(-2, -2), undefined))

    /* ── click → detail: center the card via the group, dolly the camera in ── */
    const openProject = (project: Project, mesh: THREE.Mesh) => {
      if (state.locked) return
      state.locked = true
      state.dragging = false
      prevYaw = state.targetYaw
      prevPitch = state.targetPitch
      hovered = null
      cards.forEach((c) => ((c.userData as CardUserData).targetScale = 1))

      const ud = mesh.userData as CardUserData
      // nearest yaw that brings this card's longitude to front (-Z)
      let desiredYaw = -ud.lon
      while (desiredYaw - state.curYaw > Math.PI) desiredYaw -= Math.PI * 2
      while (desiredYaw - state.curYaw < -Math.PI) desiredYaw += Math.PI * 2
      const desiredPitch = THREE.MathUtils.clamp(ud.lat, -PITCH_LIMIT, PITCH_LIMIT)

      setHudHidden(true)
      const tl = gsap.timeline()
      tl.to(state, {
        curYaw: desiredYaw,
        curPitch: desiredPitch,
        targetYaw: desiredYaw,
        targetPitch: desiredPitch,
        duration: 0.9,
        ease: "power3.inOut",
      })
      tl.to(camera.position, { z: -RADIUS * 0.5, duration: 0.95, ease: "power3.inOut" }, 0)
      tl.call(
        () => {
          if (!disposed) setActive(project)
        },
        undefined,
        0.45
      )
    }

    const closeProject = () => {
      setActive(null)
      setHudHidden(false)
      const tl = gsap.timeline({
        onComplete: () => {
          state.locked = false
          state.velYaw = 0
          state.velPitch = 0
        },
      })
      tl.to(camera.position, { z: 0, duration: 0.85, ease: "power3.inOut" }, 0)
      tl.to(
        state,
        {
          curYaw: prevYaw,
          curPitch: prevPitch,
          targetYaw: prevYaw,
          targetPitch: prevPitch,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0
      )
    }

    apiRef.current = {
      openProject: (p) => {
        const m = cards.find((c) => (c.userData as CardUserData).project === p)
        if (m) openProject(p, m)
      },
      closeProject,
    }

    /* ── render loop ──────────────────────────────────────────────────────── */
    const FWD_FALLOFF = (dot: number) => THREE.MathUtils.smoothstep(dot, 0.55, 0.97)

    const tickScene = () => {
      const now = performance.now()

      if (!state.locked) {
        // idle drift when untouched
        if (!reduce && !state.dragging && now - state.lastInteract > 2600) {
          state.targetYaw += 0.0006
        }
        // inertia after release
        if (!state.dragging) {
          state.targetYaw += state.velYaw
          state.targetPitch = THREE.MathUtils.clamp(state.targetPitch + state.velPitch, -PITCH_LIMIT, PITCH_LIMIT)
          state.velYaw *= 0.94
          state.velPitch *= 0.94
          if (Math.abs(state.velYaw) < 1e-5) state.velYaw = 0
          if (Math.abs(state.velPitch) < 1e-5) state.velPitch = 0
        }
        const k = reduce ? 0.3 : DAMP
        state.curYaw += (state.targetYaw - state.curYaw) * k
        state.curPitch += (state.targetPitch - state.curPitch) * k
      }

      group.rotation.y = state.curYaw
      group.rotation.x = state.curPitch

      // hover pick (skip while dragging or transitioning)
      if (!state.dragging && !state.locked && !active) {
        raycaster.setFromCamera(pointer, camera)
        const hit = raycaster.intersectObjects(cards, false)[0]
        const next = (hit?.object as THREE.Mesh) || null
        if (next !== hovered) {
          if (hovered) (hovered.userData as CardUserData).targetScale = 1
          hovered = next
          if (hovered) (hovered.userData as CardUserData).targetScale = 1.13
        }
      }

      // per-card brightness (spotlight center) + hover scale
      for (const card of cards) {
        tmp.copy(card.position).applyQuaternion(group.quaternion)
        const len = tmp.length() || 1
        const dot = -tmp.z / len
        const front = dot > 0
        const mat = card.material as THREE.MeshBasicMaterial
        const isHover = card === hovered
        const b = front ? FWD_FALLOFF(dot) : 0
        const lit = isHover ? 1 : 0.32 + 0.68 * b
        mat.color.setScalar(lit)
        mat.opacity = front ? 0.12 + 0.88 * (isHover ? 1 : b) : 0
        card.visible = front
        const ud = card.userData as CardUserData
        const s = card.scale.x + (ud.targetScale - card.scale.x) * 0.18
        card.scale.set(s, s, s)
      }

      // cursor affordance
      el.style.cursor = state.locked ? "default" : state.dragging ? "grabbing" : hovered ? "pointer" : "grab"

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tickScene)
    }
    raf = requestAnimationFrame(tickScene)

    /* ── resize ───────────────────────────────────────────────────────────── */
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    /* ── cleanup ──────────────────────────────────────────────────────────── */
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      gsap.killTweensOf(state)
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(group.scale)
      window.removeEventListener("resize", onResize)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      geometry.dispose()
      materials.forEach((m) => m.dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()
      if (el.parentNode === mount) mount.removeChild(el)
      apiRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => apiRef.current?.closeProject(), [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-ink text-cream-50 select-none">
      {/* atmosphere behind the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, #161d27 0%, #0A0E13 58%, #05070a 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-soft-light bg-noise"
      />
      {/* edge vignette to deepen the sphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "radial-gradient(110% 80% at 50% 50%, transparent 52%, rgba(5,7,10,0.82) 100%)" }}
      />

      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* loader */}
      <div
        className={`absolute inset-0 z-40 grid place-items-center bg-ink transition-opacity duration-700 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-cream-300/25 border-t-brand-coral" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream-300/60">
            Assembling sphere
          </span>
        </div>
      </div>

      <Hud hidden={hudHidden} clock={clock} />
      {active && <DetailOverlay project={active} onClose={close} />}
    </div>
  )
}

/* ── HUD chrome ───────────────────────────────────────────────────────────── */
function Hud({ hidden, clock }: { hidden: boolean; clock: { tj: string; uk: string } }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 transition-all duration-500 ${
        hidden ? "opacity-0 blur-sm" : "opacity-100"
      }`}
    >
      {/* top-left — mark */}
      <div className="pointer-events-auto absolute left-5 top-5 flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-cream-50 text-ink">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2c-3.9 0-7 3.1-7 7v12l2.2-1.6L9.4 21l2.2-1.6L13.8 21l2.2-1.6L18.2 21V9c0-3.9-3.1-7-6.2-7Zm-2.4 8.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.8 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
          </svg>
        </span>
        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-cream-50/90">
          Aqly<span className="text-brand-coral">®</span>
        </span>
      </div>

      {/* top-center — sound + manifesto */}
      <div className="absolute left-1/2 top-5 hidden -translate-x-1/2 items-start gap-10 md:flex">
        <button className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.18em] text-cream-300/70 transition-colors hover:text-cream-50">
          ▦ Sound <span className="text-cream-50">[OFF]</span>
        </button>
        <p className="max-w-[20rem] font-mono text-[11px] uppercase leading-[1.5] tracking-[0.12em] text-cream-300/70">
          Aqly is a technology-led AI studio engineering agents, automation &amp; experiences for ambitious teams.
        </p>
      </div>

      {/* top-right — clock + CTA */}
      <div className="absolute right-5 top-5 flex items-start gap-5">
        <div className="hidden text-right font-mono text-[11px] uppercase leading-[1.5] tracking-[0.12em] text-cream-300/70 sm:block">
          <div>
            <span className="text-cream-50">Dushanbe, TJ</span> · {clock.tj} GMT+5
          </div>
          <div>London, UK · {clock.uk} GMT+0</div>
        </div>
        <button className="pointer-events-auto rounded-full bg-cream-50 px-5 py-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.04]">
          Let&apos;s Talk
        </button>
      </div>

      {/* bottom-center — nav pill */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-cream-50/10 bg-ink-800/70 p-1 backdrop-blur-md">
        {["Work", "About", "Careers"].map((t, i) => (
          <button
            key={t}
            className={`rounded-full px-5 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
              i === 0 ? "bg-cream-50 text-ink" : "text-cream-300/80 hover:text-cream-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* bottom-left — layout toggles */}
      <div className="pointer-events-auto absolute bottom-6 left-5 flex items-center gap-1 rounded-full border border-cream-50/10 bg-ink-800/70 p-1 backdrop-blur-md">
        <button className="grid h-9 w-9 place-items-center rounded-full bg-cream-50 text-ink" aria-label="Sphere view">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
          </svg>
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full text-cream-300/70 transition-colors hover:text-cream-50" aria-label="List view">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* bottom-right — filter */}
      <button className="pointer-events-auto absolute bottom-6 right-5 rounded-full border border-cream-50/10 bg-ink-800/70 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-cream-50/90 backdrop-blur-md transition-colors hover:bg-ink-700/70">
        Filter +
      </button>

      {/* hint */}
      <div className="absolute bottom-[4.6rem] left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream-300/35 lg:block">
        drag to explore · tap a card
      </div>
    </div>
  )
}

/* ── detail overlay (basic template, per brief) ───────────────────────────── */
function DetailOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const elv = ref.current
    if (!elv) return
    const targets = elv.querySelectorAll("[data-rise]")
    const ctx = gsap.context(() => {
      gsap.fromTo(elv, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.45, ease: "power2.out" })
      if (!reduce) {
        gsap.fromTo(
          targets,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "power3.out", delay: 0.15 }
        )
      }
    }, ref)

    // lenis smooth scroll inside the detail page
    let lenis: Lenis | null = null
    let lraf = 0
    if (!reduce && scrollerRef.current) {
      lenis = new Lenis({ wrapper: scrollerRef.current, content: scrollerRef.current.firstElementChild as HTMLElement, lerp: 0.09 })
      const loop = (t: number) => {
        lenis?.raf(t)
        lraf = requestAnimationFrame(loop)
      }
      lraf = requestAnimationFrame(loop)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      ctx.revert()
      cancelAnimationFrame(lraf)
      lenis?.destroy()
      window.removeEventListener("keydown", onKey)
    }
  }, [project, onClose])

  return (
    <div ref={ref} className="fixed inset-0 z-50 bg-ink text-cream-50">
      <div ref={scrollerRef} className="h-full overflow-y-auto overscroll-contain">
        <div className="relative min-h-full">
          {/* hero */}
          <header className="relative flex min-h-[78vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-28 md:px-14">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(80% 70% at 72% 18%, rgba(255,91,36,0.32), transparent 60%), radial-gradient(70% 60% at 12% 90%, rgba(169,202,249,0.22), transparent 60%), #0A0E13",
              }}
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] bg-noise" />

            <button
              onClick={onClose}
              data-rise
              className="pointer-events-auto absolute left-6 top-7 flex items-center gap-2 rounded-full border border-cream-50/15 bg-ink-800/60 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-cream-50/90 backdrop-blur transition-colors hover:bg-ink-700/70 md:left-14"
            >
              ← Back to sphere
            </button>

            <div data-rise className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-300/80">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-cream-50/25 px-3 py-1">
                  {t}
                </span>
              ))}
              <span className="text-cream-300/50">/ {project.year}</span>
            </div>
            <h1
              data-rise
              className="max-w-[16ch] font-display text-[13vw] font-semibold leading-[0.92] tracking-tightest md:text-[7.5vw]"
            >
              {project.title}
            </h1>
            <p data-rise className="mt-5 font-mono text-[13px] uppercase tracking-[0.14em] text-brand-coral">
              {project.client}
            </p>
          </header>

          {/* body */}
          <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.4fr] md:px-14">
            <div data-rise className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-300/55">
              <div className="border-t border-cream-50/12 pt-4">Client — {project.client}</div>
              <div className="mt-3 border-t border-cream-50/12 pt-4">Year — {project.year}</div>
              <div className="mt-3 border-t border-cream-50/12 pt-4">
                Discipline — {project.tags.join(", ")}
              </div>
            </div>
            <div data-rise>
              <p className="font-display text-2xl leading-snug text-cream-50/90 md:text-[2rem]">
                {project.blurb}
              </p>
              <p className="mt-7 max-w-prose text-cream-300/70 leading-relaxed">
                This is a template detail view — the focus of the build is the spherical gallery itself.
                In a production case study this is where the deep-dive lives: the problem, the system we
                shipped, the numbers it moved, and the craft behind it.
              </p>
            </div>
          </section>

          {/* big image band */}
          <section className="px-6 pb-24 md:px-14">
            <div
              data-rise
              className="aspect-[16/9] w-full rounded-3xl border border-cream-50/10"
              style={{
                background:
                  "radial-gradient(60% 80% at 30% 30%, rgba(252,232,141,0.5), transparent 60%), radial-gradient(70% 90% at 80% 70%, rgba(255,91,36,0.55), transparent 60%), #141A22",
              }}
            />
          </section>

          <footer className="flex items-center justify-between gap-4 border-t border-cream-50/10 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-300/55 md:px-14">
            <span>Aqly® — selected work</span>
            <button onClick={onClose} className="text-cream-50 underline-offset-4 hover:underline">
              Close ×
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}
