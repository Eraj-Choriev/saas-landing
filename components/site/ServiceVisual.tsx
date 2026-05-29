"use client"

import { motion } from "framer-motion"

/**
 * A stylized product preview rendered for each service inside the modal —
 * a lightweight "screenshot" so the user instantly sees what they get.
 */
export function ServiceVisual({ index, color }: { index: number; color: string }) {
  const visuals = [
    <TelegramVisual key={0} color={color} />,
    <WebsiteVisual key={1} color={color} />,
    <LandingVisual key={2} color={color} />,
    <WorkflowVisual key={3} color={color} />,
    <AIVisual key={4} color={color} />,
    <GrowthVisual key={5} color={color} />,
  ]
  return (
    <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      {visuals[index] ?? visuals[0]}
    </div>
  )
}

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
})

function Bar({ w, color }: { w: string; color?: string }) {
  return (
    <span
      className="block h-2 rounded-full"
      style={{ width: w, backgroundColor: color ?? "rgba(243,239,230,0.16)" }}
    />
  )
}

function TelegramVisual({ color }: { color: string }) {
  return (
    <div className="space-y-2.5">
      <motion.div {...stagger(0)} className="flex justify-start">
        <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-[12.5px] text-cream-100/85">
          Hi! I want to book a demo 👋
        </div>
      </motion.div>
      <motion.div {...stagger(1)} className="flex justify-end">
        <div
          className="max-w-[78%] rounded-2xl rounded-br-sm px-3.5 py-2 text-[12.5px] text-ink"
          style={{ backgroundColor: color }}
        >
          Great — I see you&apos;re in the Pro plan. Tuesday 14:00 or Wednesday 11:00?
        </div>
      </motion.div>
      <motion.div {...stagger(2)} className="flex justify-start">
        <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-[12.5px] text-cream-100/85">
          Wednesday works ✅
        </div>
      </motion.div>
      <motion.div {...stagger(3)} className="flex items-center gap-2 pt-1 text-[11px] font-mono uppercase tracking-wider text-cream-100/45">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        booked · synced to CRM · payment link sent
      </motion.div>
    </div>
  )
}

function WebsiteVisual({ color }: { color: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink/70">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-cream-100/45">aqly.io</span>
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-3 p-4">
        <div className="space-y-2.5">
          <motion.div {...stagger(0)}><Bar w="85%" color={color} /></motion.div>
          <motion.div {...stagger(1)}><Bar w="60%" /></motion.div>
          <motion.div {...stagger(2)} className="pt-1.5">
            <span className="inline-block rounded-md px-3 py-1.5 text-[10px] font-medium text-ink" style={{ backgroundColor: color }}>
              Get started
            </span>
          </motion.div>
        </div>
        <motion.div {...stagger(2)} className="rounded-lg border border-white/10 bg-white/[0.04]" />
      </div>
    </div>
  )
}

function LandingVisual({ color }: { color: string }) {
  return (
    <div className="space-y-3 px-2 py-1 text-center">
      <motion.div {...stagger(0)} className="mx-auto"><Bar w="55%" color={color} /></motion.div>
      <div className="mx-auto flex flex-col items-center gap-2">
        <motion.div {...stagger(1)} className="w-full flex justify-center"><Bar w="72%" /></motion.div>
        <motion.div {...stagger(2)} className="w-full flex justify-center"><Bar w="48%" /></motion.div>
      </div>
      <motion.div {...stagger(3)}>
        <span className="inline-block rounded-full px-5 py-2 text-[11px] font-medium text-ink" style={{ backgroundColor: color }}>
          Claim your spot →
        </span>
      </motion.div>
      <motion.div {...stagger(4)} className="flex justify-center gap-4 pt-1 font-mono text-[10px] uppercase tracking-wider text-cream-100/45">
        <span>A / B ready</span>
        <span>·</span>
        <span>analytics on</span>
      </motion.div>
    </div>
  )
}

function WorkflowVisual({ color }: { color: string }) {
  const nodes = ["Trigger", "Enrich", "AI", "Sync"]
  return (
    <div className="flex items-center justify-between gap-1 py-3">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1">
          <motion.div
            {...stagger(i)}
            className="grid place-items-center rounded-lg border px-2.5 py-2 text-[10.5px] font-mono"
            style={{ borderColor: `${color}55`, backgroundColor: `${color}14`, color: "#F3EFE6" }}
          >
            {n}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.3 }}
              className="block h-px w-4 origin-left sm:w-6"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function AIVisual({ color }: { color: string }) {
  return (
    <div className="space-y-3">
      <motion.div {...stagger(0)} className="rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-[12.5px] text-cream-100/70">
        <span className="font-mono text-[10px] uppercase tracking-wider text-cream-100/40">prompt</span>
        <p className="mt-1">What was our Q3 churn and why?</p>
      </motion.div>
      <motion.div
        {...stagger(1)}
        className="rounded-xl border px-3.5 py-2.5 text-[12.5px] text-cream-50"
        style={{ borderColor: `${color}55`, backgroundColor: `${color}12` }}
      >
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color }}>answer · grounded</span>
        <p className="mt-1">Q3 churn was 4.2%, driven by onboarding drop-off.</p>
        <div className="mt-2 flex gap-1.5">
          {["report.pdf", "crm", "tickets"].map((s) => (
            <span key={s} className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[9.5px] font-mono text-cream-100/55">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function GrowthVisual({ color }: { color: string }) {
  const bars = [38, 52, 47, 68, 74, 92]
  return (
    <div className="flex h-32 items-end justify-between gap-2 px-1 pt-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${h}%`, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-t-md"
          style={{
            background:
              i === bars.length - 1
                ? color
                : "linear-gradient(180deg, rgba(243,239,230,0.22), rgba(243,239,230,0.06))",
          }}
        />
      ))}
    </div>
  )
}
