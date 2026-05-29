import { Navbar } from "@/components/site/Navbar"
import { Hero } from "@/components/site/Hero"
import { WhatWeBuild } from "@/components/site/WhatWeBuild"
import { Approach } from "@/components/site/Approach"
import { ContactForm } from "@/components/site/ContactForm"
import { Footer } from "@/components/site/Footer"

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhatWeBuild />
      <Approach />
      <ContactForm />
      <Footer />
    </main>
  )
}
