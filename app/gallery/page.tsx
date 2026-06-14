import type { Metadata } from "next"
import GalleryClient from "@/components/gallery/GalleryClient"

export const metadata: Metadata = {
  title: "Aqly® — Selected Work, in orbit",
  description: "An experimental spherical gallery of selected Aqly work. Drag to explore.",
}

export default function GalleryPage() {
  return <GalleryClient />
}
