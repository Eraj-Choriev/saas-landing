import { Navbar } from "@/components/site/Navbar"
import { Hero } from "@/components/site/Hero"
import { TechStack } from "@/components/site/TechStack"
import { About } from "@/components/site/About"
import { WhatWeBuild } from "@/components/site/WhatWeBuild"
import { CaseStudies } from "@/components/site/CaseStudies"
import { Approach } from "@/components/site/Approach"
import { ContactForm } from "@/components/site/ContactForm"
import { FinalCTA } from "@/components/site/FinalCTA"
import { Footer } from "@/components/site/Footer"

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TechStack />
      <About />
      <WhatWeBuild />
      <CaseStudies />
      <Approach />
      <ContactForm />
      <FinalCTA />
      <Footer />
    </main>
  )
}
