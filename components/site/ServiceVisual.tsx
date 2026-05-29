"use client"

import { motion } from "framer-motion"
import { Mic, Phone } from "lucide-react"

/**
 * A stylized product preview rendered for each service inside the modal —
 * a lightweight "screenshot" so the user instantly sees what they get.
 */
export function ServiceVisual({ index, color }: { index: number; color: string }) {
  const visuals = [
    <TelegramVisual key={0} color={color} />,
    <WebsiteVisual key={1} color={color} />,
    <VoiceVisual key={2} color={color} />,
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

function VoiceVisual({ color }: { color: string }) {
  // animated waveform bars — the agent "speaking"
  const wave = [0.4, 0.8, 0.55, 1, 0.7, 0.35, 0.9, 0.5, 0.75, 0.45]
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink/70">
      {/* fake site under the widget */}
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-cream-100/45">yoursite.com</span>
      </div>

      <div className="relative h-[150px] p-4">
        {/* faint page content */}
        <div className="space-y-2.5 opacity-50">
          <Bar w="60%" />
          <Bar w="40%" />
          <Bar w="52%" />
        </div>

        {/* floating voice widget */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 22 }}
          className="absolute bottom-3 right-3 w-[200px] rounded-2xl border border-white/12 bg-ink-800/95 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur"
        >
          <div className="flex items-center gap-2.5">
            {/* pulsing avatar */}
            <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ backgroundColor: color }}>
              <Mic className="h-4 w-4 text-ink" strokeWidth={2.2} />
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: `1.5px solid ${color}` }}
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
            <div className="leading-tight">
              <p className="text-[12px] font-medium text-cream-50">Aqly Voice</p>
              <p className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400/85">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                live · human voice
              </p>
            </div>
          </div>

          {/* waveform */}
          <div className="mt-3 flex h-7 items-center justify-between gap-[3px]">
            {wave.map((h, i) => (
              <motion.span
                key={i}
                className="w-full rounded-full"
                style={{ backgroundColor: color }}
                animate={{ scaleY: [h, h * 0.35, h * 1.1, h * 0.5, h] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
                initial={{ height: `${h * 100}%` }}
              />
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-cream-100/50">00:12</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-ink">
              <Phone className="h-3 w-3" strokeWidth={2.4} />
            </span>
          </div>
        </motion.div>
      </div>
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
        <span className="font-mono text-[10px] uppercase tracking-wider text-cream-100/40">request</span>
        <p className="mt-1">Handle the support queue & write our launch post</p>
      </motion.div>
      <motion.div
        {...stagger(1)}
        className="rounded-xl border px-3.5 py-2.5 text-[12.5px] text-cream-50"
        style={{ borderColor: `${color}55`, backgroundColor: `${color}12` }}
      >
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color }}>agent · automated</span>
        <p className="mt-1">Resolved 38 chats · drafted 5 posts ✦</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Claude", "GPT-class", "+18% revenue"].map((s) => (
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
