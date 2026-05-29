"use client"

import Image, { type StaticImageData } from "next/image"
import { motion } from "framer-motion"
import { Mic, Phone } from "lucide-react"

import telegramImg from "@/assets/services/telegram.jpg"
import websitesImg from "@/assets/services/websites.jpg"
import n8nImg from "@/assets/services/n8n.png"
import aiImg from "@/assets/services/ai-integration.jpg"

// real screenshots per service; null → fall back to a coded visual
const PHOTOS: (StaticImageData | null)[] = [
  telegramImg, // 0 Telegram Bots
  websitesImg, // 1 Websites
  null, // 2 AI Voice Assistants — coded widget mock
  n8nImg, // 3 n8n Workflows
  aiImg, // 4 AI Integration
  null, // 5 Growth Marketing — coded chart
]

/**
 * Product preview shown for each service inside the modal.
 * Uses a real screenshot when available, otherwise a coded mock.
 */
export function ServiceVisual({ index, color }: { index: number; color: string }) {
  const photo = PHOTOS[index]

  if (photo) {
    return (
      <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 90vw, 700px"
          className="object-contain"
        />
      </div>
    )
  }

  const coded = [null, null, <VoiceVisual key={2} color={color} />, null, null, <GrowthVisual key={5} color={color} />]
  return (
    <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      {coded[index]}
    </div>
  )
}

function Bar({ w, color }: { w: string; color?: string }) {
  return (
    <span
      className="block h-2 rounded-full"
      style={{ width: w, backgroundColor: color ?? "rgba(243,239,230,0.16)" }}
    />
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
