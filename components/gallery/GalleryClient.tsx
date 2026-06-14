"use client"

import dynamic from "next/dynamic"

// Client-only boundary: three.js + gsap + lenis must never run on the server.
// (next/dynamic with ssr:false isn't allowed in a Server Component, so it lives here.)
const SphereGallery = dynamic(() => import("./SphereGallery"), { ssr: false })

export default function GalleryClient() {
  return <SphereGallery />
}
