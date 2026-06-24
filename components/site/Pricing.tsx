"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, animate, useReducedMotion } from "framer-motion"
import { Check, Rocket, TrendingUp, Bot, Building2, Clock, ShieldCheck, ArrowUpRight, Info, Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { PricingModal } from "./PricingModal"

const ease = [0.22, 1, 0.36, 1] as const

const PLAN_ICONS = [Rocket, TrendingUp, Bot, Building2] as const
// Only the featured plan wears coral; the rest take a quiet neutral so the eye
// lands on "Рост" without four competing accent hues.
const PLAN_COLORS = ["#A8B1BC", "#ff5b24", "#A8B1BC", "#A8B1BC"] as const

export function Pricing() {
  const { t } = useI18n()
  const p = t.pricing
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="pricing" className="relative isolate overflow-hidden bg-ink text-cream-50">
      {/* atmosphere — warm coral bloom up top, cool blue counterweight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 [mask-image:radial-gradient(85%_75%_at_50%_0%,#000,transparent)]"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 0%, rgba(255,91,36,0.16), transparent 70%), radial-gradient(45% 55% at 12% 8%, rgba(169,202,249,0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-grid-ink bg-[size:48px_48px] opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_0%,#000,transparent)]"
        aria-hidden
      />

      <div className="container py-20 sm:py-28">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-coral">
            {p.kicker}
          </p>
          <h2 className="mt-5 font-display text-[34px] leading-[1.18] tracking-tightest text-cream-50 sm:text-[52px] sm:leading-[1.15]">
            {p.title}{" "}
            <span className="font-medium text-brand-gold">{p.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-[15px] leading-[1.55] text-cream-100/65 sm:text-[16px]">
            {p.lead}
          </p>
        </div>

        {/* cards */}
        <div className="mx-auto mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.plans.map((plan, i) => {
            const featured = i === 1
            const Icon = PLAN_ICONS[i] ?? Rocket
            const accent = PLAN_COLORS[i] ?? "#ff5b24"
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.0, delay: i * 0.14, ease }}
                className={
                  featured
                    ? "lg:-my-3 lg:-mx-1" // lift the featured column slightly taller
                    : ""
                }
              >
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] p-7 transition-all duration-500 ease-smooth will-change-transform hover:-translate-y-2 ${
                    featured
                      ? "border border-brand-coral/60 bg-gradient-to-b from-ink-700 to-ink-800 pt-9 ring-1 ring-brand-coral/25 shadow-[0_30px_85px_-22px_rgba(255,91,36,0.55)] hover:shadow-[0_44px_110px_-24px_rgba(255,91,36,0.7)]"
                      : "border border-white/10 bg-white/[0.035] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] hover:border-white/25 hover:bg-white/[0.05] hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]"
                  }`}
                >
                  {/* featured: animated grid + glow wash */}
                  {featured && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 -z-10 bg-grid-ink bg-[size:30px_30px] opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-coral/25 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                        aria-hidden
                      />
                    </>
                  )}
                  {/* hover sheen sweep */}
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 ease-smooth group-hover:translate-x-[120%]"
                    aria-hidden
                  />

                  {/* per-plan accent crown on the top edge — brightens on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-7 top-0 h-px opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />

                  {/* most-popular badge — seated on the top edge so it reads as
                      part of the card, not a sticker slapped in the corner */}
                  {featured && (
                    <span className="absolute left-1/2 top-3.5 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-coral px-5 py-1.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_-4px_rgba(255,91,36,0.9)] ring-1 ring-white/20">
                      <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                      {p.popular}
                    </span>
                  )}

                  {/* icon */}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                      featured
                        ? "bg-brand-coral text-white"
                        : "bg-white/[0.06] text-cream-100/80 group-hover:bg-white/[0.1] group-hover:text-cream-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>

                  {/* name + tagline */}
                  <h3 className="mt-6 font-display text-[26px] leading-none tracking-tight text-cream-50">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-snug text-cream-100/60">{plan.tagline}</p>

                  {/* price + delivery time — number is the hero, currency muted,
                      count-up on scroll, min-height keeps CTAs aligned across cards */}
                  <div className="mt-6 min-h-[4.6rem]">
                    <PriceNumber value={plan.price} />
                    {plan.time && (
                      <div className="mt-3 flex items-center gap-1.5 text-[12.5px] text-cream-100/55">
                        <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                        {plan.time}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-[14px] font-semibold transition-all duration-300 ${
                      featured
                        ? "bg-brand-coral text-white shadow-[0_10px_30px_-8px_rgba(255,91,36,0.6)] hover:brightness-110 hover:shadow-[0_14px_38px_-8px_rgba(255,91,36,0.75)]"
                        : "border border-white/15 bg-white/[0.05] text-cream-50 hover:border-white/30 hover:bg-white/[0.09]"
                    }`}
                  >
                    {plan.cta}
                  </a>

                  {/* divider — soft gradient hairline */}
                  <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* features */}
                  <ul className="mt-6 space-y-3.5 text-[14px]">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-cream-100/85">
                        <span
                          className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${accent}26`, color: accent }}
                        >
                          <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* learn more → opens detail modal.
                      Made into a full-width outlined button (clients missed the
                      old subtle text link) with accent fill on hover + a gentle
                      arrow nudge to draw the eye. */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group/btn relative mt-6 inline-flex items-center justify-center gap-2 self-stretch overflow-hidden rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-300"
                    style={{ borderColor: `${accent}5c`, color: accent, background: `${accent}14` }}
                  >
                    {/* accent fill sweeps in on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                      style={{ background: accent }}
                    />
                    <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300 group-hover/btn:text-ink">
                      <Info className="h-4 w-4" strokeWidth={2} />
                      {p.learnMore}
                      <ArrowUpRight
                        className="h-4 w-4 animate-nudge transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* footnotes */}
        <div className="mx-auto mt-12 max-w-xl text-center text-[13px] leading-relaxed text-cream-100/50">
          <p>{p.note}</p>
          <p className="mt-1 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-cream-100/45" strokeWidth={2} />
            {p.secure}
          </p>
        </div>
      </div>

      {openIndex !== null && (
        <PricingModal
          open={openIndex !== null}
          onOpenChange={(v) => !v && setOpenIndex(null)}
          Icon={PLAN_ICONS[openIndex] ?? Rocket}
          color={PLAN_COLORS[openIndex] ?? "#ff5b24"}
          name={p.plans[openIndex].name}
          tagline={p.plans[openIndex].tagline}
          price={p.plans[openIndex].price}
          time={p.plans[openIndex].time}
          features={p.plans[openIndex].features}
          modal={p.plans[openIndex].modal}
        />
      )}
    </section>
  )
}

const groupThousands = (n: number) =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")

/** Price line: number counts up on scroll-in, prefix ("от") + currency ("TJS")
 *  rendered muted/smaller. Non-numeric prices (e.g. "Индивидуально") stay static. */
function PriceNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()

  const m = value.match(/^(\D*?)([\d][\d\s]*\d|\d)(\D*)$/)
  const hasNumber = m !== null
  const target = m ? parseInt(m[2].replace(/\D/g, ""), 10) : 0
  const [n, setN] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!hasNumber || !inView) return
    if (reduce) {
      setN(target)
      return
    }
    const c = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => c.stop()
    // hasNumber/target are primitives derived from `value`; intentionally
    // excluding the freshly-created regex match array to avoid restart loops.
  }, [inView, target, reduce, hasNumber])

  const base =
    "font-display text-[27px] font-semibold leading-[1.06] tracking-tight text-cream-50 [font-variant-numeric:tabular-nums] [overflow-wrap:anywhere] sm:text-[31px]"

  // Word-prices (e.g. "Индивидуально") get a smaller size and balanced wrap so
  // they never hyphenate mid-word inside the narrow card column.
  if (!m) {
    return (
      <div
        ref={ref}
        className="font-display text-[22px] font-semibold leading-[1.12] tracking-tight text-balance text-cream-50 [hyphens:none] sm:text-[24px]"
      >
        {value}
      </div>
    )
  }

  const prefix = m[1].trim()
  const suffix = m[3].trim()

  return (
    <div ref={ref} className={base}>
      {prefix && (
        <span className="mr-1.5 align-baseline text-[18px] font-medium text-cream-100/55">
          {prefix}
        </span>
      )}
      {groupThousands(n)}
      {suffix && (
        <span className="ml-1.5 align-baseline text-[15px] font-medium tracking-normal text-cream-100/45">
          {suffix}
        </span>
      )}
    </div>
  )
}
