"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref"> & {
	/** Dot color as a hex string. Default ink `#0A0E13` (for light/cream sections).
	 *  On dark sections pass a light color, e.g. `#FFFFFF`. */
	dotColor?: string
	/** Dot opacity 0–1. Default 0.55. */
	opacity?: number
	/** Base dot size in px. Default 6. */
	size?: number
	/** Fog color — distant dots fade into it for depth. Match the section's
	 *  background (e.g. `#0A0E13`). Omit to disable fog. */
	fogColor?: string
}

/** "#0A0E13" → [r,g,b] normalized 0–1 */
function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace("#", "")
	const full =
		h.length === 3
			? h.split("").map((c) => c + c).join("")
			: h.padEnd(6, "0").slice(0, 6)
	const int = parseInt(full, 16)
	return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

/**
 * Animated 3D dotted wave surface (three.js / WebGL).
 *
 * Adapted to the Aqly palette — the site has no light/dark theme system, so the
 * original `next-themes` dependency was removed in favor of an explicit
 * `dotColor` prop (default ink, for cream sections; pass a light hex on dark
 * sections). Honors `prefers-reduced-motion` by rendering a single static frame.
 *
 * Renders a `pointer-events-none fixed inset-0 -z-10` layer by default — pass a
 * `className` to scope it (e.g. `absolute` inside a `relative` section).
 */
export function DottedSurface({
	className,
	dotColor = "#0A0E13",
	opacity = 0.55,
	size = 6,
	fogColor,
	...props
}: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const sceneRef = useRef<{
		scene: THREE.Scene
		camera: THREE.PerspectiveCamera
		renderer: THREE.WebGLRenderer
		points: THREE.Points
		animationId: number | null
	} | null>(null)

	useEffect(() => {
		// capture the node: React nulls containerRef.current before this effect's
		// cleanup runs on unmount, so cleanup must use this closure variable
		const container = containerRef.current
		if (!container) return

		const SEPARATION = 100
		const AMOUNTX = 100
		const AMOUNTY = 120

		const [DOT_R, DOT_G, DOT_B] = hexToRgb(dotColor)

		const reduceMotion =
			typeof window !== "undefined" &&
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

		// Scene setup
		const scene = new THREE.Scene()
		// distance fog — only the very far edge dissolves; the converging rows
		// near the horizon survive so the perspective payoff stays visible
		if (fogColor) {
			scene.fog = new THREE.Fog(new THREE.Color(fogColor), 4200, 9500)
		}

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			12000,
		)
		// elevated grazing angle → floor fills the lower frame and the rows
		// converge to a dense bright line (the "dotted surface" look)
		camera.position.set(0, 360, 1220)

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		})
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setClearColor(0x000000, 0) // transparent — show the cream page through

		container.appendChild(renderer.domElement)

		// Build the grid of points
		const positions: number[] = []
		const colors: number[] = []
		const geometry = new THREE.BufferGeometry()

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
				const y = 0 // animated below
				// all rows ahead of the camera (z=1220) so the full grid recedes
				const z = 300 - iy * SEPARATION
				positions.push(x, y, z)
				colors.push(DOT_R, DOT_G, DOT_B)
			}
		}

		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3),
		)
		geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

		const material = new THREE.PointsMaterial({
			size,
			vertexColors: true,
			transparent: true,
			opacity,
			sizeAttenuation: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		})

		const points = new THREE.Points(geometry, material)
		scene.add(points)

		const positionAttribute = geometry.attributes.position
		const posArray = positionAttribute.array as Float32Array

		// Compute wave heights for a given phase
		const applyWave = (count: number) => {
			let i = 0
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					posArray[i * 3 + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50
					i++
				}
			}
			positionAttribute.needsUpdate = true
		}

		let count = 0
		let animationId: number | null = null
		let disposed = false
		let visible = true

		const renderFrame = () => {
			applyWave(count)
			renderer.render(scene, camera)
		}

		const animate = () => {
			if (disposed || !visible) {
				animationId = null
				return
			}
			animationId = requestAnimationFrame(animate)
			renderFrame()
			count += 0.1
		}

		if (reduceMotion) {
			// Static final frame — no rAF loop
			renderFrame()
		} else {
			animate()
		}

		// pause the loop while the surface is off-screen (scrolled past the hero)
		// or the tab is hidden — WebGL at 60fps is the most expensive thing on the
		// page, no reason to pay for it when nobody can see it
		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting
			if (visible && !reduceMotion && animationId === null && !disposed) {
				animate()
			}
		})
		io.observe(container)

		const onVisibility = () => {
			if (document.hidden) return // rAF already throttles; flag handles resume
			if (!reduceMotion && animationId === null && !disposed && visible) animate()
		}
		document.addEventListener("visibilitychange", onVisibility)

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener("resize", handleResize)

		sceneRef.current = { scene, camera, renderer, points, animationId }

		return () => {
			// `animationId` is read from the closure — it holds the CURRENT frame's
			// id. (The old code cancelled a stale first-frame id snapshotted into
			// sceneRef, leaking the loop on every remount.)
			disposed = true
			if (animationId !== null) cancelAnimationFrame(animationId)
			io.disconnect()
			document.removeEventListener("visibilitychange", onVisibility)
			window.removeEventListener("resize", handleResize)

			scene.traverse((object) => {
				if (object instanceof THREE.Points) {
					object.geometry.dispose()
					if (Array.isArray(object.material)) {
						object.material.forEach((m) => m.dispose())
					} else {
						object.material.dispose()
					}
				}
			})

			renderer.dispose()
			// `container` from the closure — containerRef.current is already null
			// here on unmount, which used to leave a dead <canvas> in the DOM
			if (renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement)
			}
			sceneRef.current = null
		}
	}, [dotColor, opacity, size, fogColor])

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className={cn("pointer-events-none fixed inset-0 -z-10", className)}
			{...props}
		/>
	)
}
