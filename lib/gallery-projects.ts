// Gallery content for the spherical /gallery experience.
// Aqly-flavored agency work — plausible AI-studio case studies. The sphere cycles
// through these; `bakeCard` turns each into a framed cell texture, and the detail
// overlay reads the long-form fields.

export type Project = {
  title: string
  client: string
  tags: string[]
  year: string
  blurb: string
}

export const PROJECTS: Project[] = [
  { title: "Voice Concierge", client: "Salom Bank", tags: ["VOICE", "AGENT"], year: "2025", blurb: "A real-time voice agent that handles balance, transfers and disputes in Tajik, Russian and English — sub-second latency, escalates to a human only when it should." },
  { title: "Night Dispatch", client: "Bahor Logistics", tags: ["AUTOMATION", "OPS"], year: "2024", blurb: "An autonomous routing brain that re-plans 400 deliveries a night around traffic, weather and driver hours. Cut idle fuel 22%." },
  { title: "Atlas Copilot", client: "Pamir Energy", tags: ["AGENT", "INTEGRATION"], year: "2025", blurb: "A copilot wired into SCADA, tickets and docs — engineers ask in plain language, it answers with the live grid state and the runbook." },
  { title: "Ten Weeks of Magic", client: "Dushanbe Arts", tags: ["EXPERIENCE", "WEBSITE"], year: "2023", blurb: "A festival microsite with a generative poster engine — every visitor leaves with a one-of-one print made from their answers." },
  { title: "Stop & Search", client: "Open Justice", tags: ["CAMPAIGN", "DATA"], year: "2024", blurb: "A data story that turns five years of stop-and-search records into a scrollable, human-scale investigation." },
  { title: "Travel Hacker", client: "Skyroute", tags: ["WEBSITE", "AI"], year: "2024", blurb: "Tell it a vibe and a budget; it assembles a real, bookable itinerary from live fares — and explains every choice." },
  { title: "Perinaise", client: "Nando's", tags: ["FILM", "CAMPAIGN"], year: "2022", blurb: "A spot built around a fake condiment that became a real product. We ran the launch, the site and the sell-out." },
  { title: "Virtual Try-On", client: "Loop Audio", tags: ["TOOL", "3D"], year: "2025", blurb: "WebGL ear-fit preview — point your camera, see the buds in place, hear the seal. Returns dropped by a third." },
  { title: "Club Vision", client: "Doja", tags: ["WEBSITE", "3D"], year: "2025", blurb: "A mirror-ball microsite that reacts to the track — every facet is a clip, every beat a cut." },
  { title: "Pixel Takeover", client: "Pixel", tags: ["OOH", "BRAND"], year: "2025", blurb: "A city-wide takeover stitched to a live API — the billboards knew the weather, the score and the time of day." },
  { title: "Qibla Finder", client: "Open Faith", tags: ["PRODUCT", "AR"], year: "2021", blurb: "A precise, offline-first qibla compass with a calm, tactile interface used in 40 countries." },
  { title: "Walking Tour", client: "Netflix", tags: ["EXPERIENCE", "AR"], year: "2024", blurb: "A GPS-anchored audio tour that drops you inside the show — the street becomes the set." },
  { title: "Happily Ever After", client: "Studio Bridge", tags: ["OOH", "CAMPAIGN"], year: "2025", blurb: "Dynamic transit creative that finished the sentence based on where you were standing." },
  { title: "AI Compass", client: "Meridian", tags: ["PRODUCT", "AGENT"], year: "2025", blurb: "A research copilot that reads the room — pulls the right source, cites it, and never bluffs." },
  { title: "Sleepy Girl", client: "Resta", tags: ["CAMPAIGN", "SOCIAL"], year: "2024", blurb: "A bedtime ritual brand launched entirely through generative shorts — 9M views, zero media spend." },
  { title: "Grain Engine", client: "Tabarruk Foods", tags: ["AUTOMATION", "VISION"], year: "2024", blurb: "Computer vision on the line grades 12 tonnes of grain an hour and flags contamination before it ships." },
  { title: "Ask the Archive", client: "National Library", tags: ["AGENT", "WEBSITE"], year: "2025", blurb: "A retrieval agent over a century of scanned manuscripts — ask in modern Tajik, get answers from the originals." },
  { title: "Field Notes", client: "Pamir Trails", tags: ["WEBSITE", "MAPS"], year: "2023", blurb: "An offline trail guide for the high Pamir — every switchback, spring and shelter, pre-cached for the dead zones." },
]
