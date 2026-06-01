"use client"

import { useI18n } from "@/lib/i18n"

type Glyph = ({ className }: { className?: string }) => JSX.Element

type Item = { name: string; color: string; Glyph: Glyph }

// monochrome brand glyphs — inherit currentColor, brand colour reveals on hover
const STACK: Item[] = [
  // AI platforms first
  { name: "Claude", color: "#D97757", Glyph: ClaudeMark },
  { name: "OpenAI Codex", color: "#0A0E13", Glyph: OpenAIMark },
  { name: "Gemini", color: "#1B72E8", Glyph: GeminiMark },
  { name: "Perplexity", color: "#1F9AAE", Glyph: PerplexityMark },
  { name: "MCP", color: "#2F6FB0", Glyph: McpMark },
  // platforms & infra
  { name: "FastAPI", color: "#009688", Glyph: FastApiMark },
  { name: "AWS", color: "#FF9900", Glyph: AwsMark },
  { name: "Firebase", color: "#FFA000", Glyph: FirebaseMark },
  { name: "PostgreSQL", color: "#336791", Glyph: PostgresMark },
  { name: "Nginx", color: "#009639", Glyph: NginxMark },
  { name: "API", color: "#ff5b24", Glyph: ApiMark },
  // frameworks
  { name: "React", color: "#149ECA", Glyph: ReactMark },
  { name: "Next.js", color: "#0A0E13", Glyph: NextMark },
  { name: "Vue", color: "#42B883", Glyph: VueMark },
  { name: "TypeScript", color: "#3178C6", Glyph: TsMark },
  { name: "Node.js", color: "#5FA04E", Glyph: NodeMark },
  { name: "PHP", color: "#6E7BB8", Glyph: PhpMark },
]

export function TechStack() {
  const { t } = useI18n()
  const row = [...STACK, ...STACK]

  return (
    <section className="relative z-10 overflow-hidden bg-cream-50 py-14 shadow-[0_-30px_60px_-30px_rgba(10,14,19,0.45)]">
      <p className="container text-center font-mono text-[12px] uppercase tracking-[0.24em] text-ink/40">
        {t.stack.title}
      </p>

      {/* edge-faded marquee */}
      <div className="tech-marquee group relative mt-9 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="tech-track flex w-max items-center gap-12 pr-12">
          {row.map((item, i) => (
            <div
              key={i}
              className="group/item flex shrink-0 items-center gap-2.5 text-ink/35 transition-colors duration-300 group-hover/item:text-[color:var(--c)]"
              style={{ ["--c" as string]: item.color }}
            >
              <item.Glyph className="h-6 w-6 shrink-0" />
              <span className="whitespace-nowrap text-[17px] font-medium tracking-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- brand glyphs ---------- */

function ReactMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.95">
        <ellipse cx="12" cy="12" rx="10" ry="4.3" />
        <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(120 12 12)" />
      </g>
    </svg>
  )
}

function NextMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.6 16.4V7.6l8 9.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.4 7.6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function VueMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M2 4h4.4L12 13.3 17.6 4H22L12 21 2 4Z" opacity="0.45" />
      <path d="M6.8 4h3L12 8.1 14.2 4h3L12 12.7 6.8 4Z" />
    </svg>
  )
}

function TsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" opacity="0.16" />
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fontFamily="ui-monospace, monospace" fill="currentColor">TS</text>
    </svg>
  )
}

function NodeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 2.2 21 7.1v9.8L12 21.8 3 16.9V7.1L12 2.2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9.4 15.2c0 1 .8 1.5 1.9 1.5 1.3 0 2.1-.6 2.1-1.8 0-1.1-.7-1.5-2-1.9-1.1-.3-1.5-.6-1.5-1.3 0-.6.5-1 1.4-1 .9 0 1.4.3 1.5 1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function PhpMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 24" className={className} fill="none">
      <ellipse cx="14" cy="12" rx="13" ry="8.4" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <text x="14" y="15.4" textAnchor="middle" fontSize="9" fontWeight="800" fontStyle="italic" fontFamily="ui-sans-serif, system-ui" fill="currentColor">php</text>
    </svg>
  )
}

function ClaudeMark({ className }: { className?: string }) {
  // Anthropic-style radial burst
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const r1 = 3.2
          const r2 = 9.5
          return (
            <line
              key={i}
              x1={12 + r1 * Math.cos(a)}
              y1={12 + r1 * Math.sin(a)}
              x2={12 + r2 * Math.cos(a)}
              y2={12 + r2 * Math.sin(a)}
            />
          )
        })}
      </g>
    </svg>
  )
}

function OpenAIMark({ className }: { className?: string }) {
  // approximated hexafoil knot
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse key={i} cx="12" cy="12" rx="3.4" ry="8.4" transform={`rotate(${i * 60} 12 12)`} />
        ))}
      </g>
    </svg>
  )
}

function PerplexityMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M12 7 5 4v8l7-3 7 3V4l-7 3" />
      <path d="M5 12v5l7-4 7 4v-5" />
    </svg>
  )
}

function McpMark({ className }: { className?: string }) {
  // node-graph: three connected nodes
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 5.5 6 9.5M12 5.5l6 4M6 9.5v5l6 4 6-4v-5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="5.5" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="6" cy="9.5" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="9.5" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18.5" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ApiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8 4.5 12 9 16" />
      <path d="M15 8l4.5 4L15 16" />
      <path d="M13 6.5 11 17.5" />
    </svg>
  )
}

function GeminiMark({ className }: { className?: string }) {
  // four-point sparkle
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 1.5c.5 5.4 4.6 9.5 10 10-5.4.5-9.5 4.6-10 10-.5-5.4-4.6-9.5-10-10 5.4-.5 9.5-4.6 10-10Z" />
    </svg>
  )
}

function FastApiMark({ className }: { className?: string }) {
  // bolt in ring
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9.4" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <path d="M13 4.8 7.6 13H11l-1 6.2L16.4 11H13l1-6.2Z" fill="currentColor" />
    </svg>
  )
}

function AwsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 24" className={className} fill="none">
      <text x="14" y="13" textAnchor="middle" fontSize="8.5" fontWeight="800" fontFamily="ui-sans-serif, system-ui" fill="currentColor">aws</text>
      <path d="M5 16.5c5.4 3.2 13.6 3.2 19 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M22 14.6l2 1.9-2.6 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FirebaseMark({ className }: { className?: string }) {
  // flame
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M5 16.6 8.7 3.4l3 5.1 2.4-3.8 4.9 11.9-6.9 4.1-7.1-4.1Z" />
      <path d="M5 16.6 11.7 8.5l3 5.1" opacity="0.5" />
    </svg>
  )
}

function PostgresMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <ellipse cx="12" cy="12" rx="9.6" ry="10" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
      <text x="12" y="15.6" textAnchor="middle" fontSize="8.5" fontWeight="800" fontFamily="ui-sans-serif, system-ui" fill="currentColor">Pg</text>
    </svg>
  )
}

function NginxMark({ className }: { className?: string }) {
  // angular hex with N
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M12 2.4 20.5 7v10L12 21.6 3.5 17V7L12 2.4Z" />
      <path d="M9 16V8.6l6 6.8V8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
