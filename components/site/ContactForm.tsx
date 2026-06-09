"use client"

import { useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Mail, Send, AlertCircle, Loader2 } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type FormState = {
  name: string
  phone: string
  website: string
  services: string[]
  challenge: string
}

const initial: FormState = {
  name: "",
  phone: "+992 ",
  website: "",
  services: [],
  challenge: "",
}

const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT

export function ContactForm() {
  const { t, lang } = useI18n()
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [company, setCompany] = useState("") // honeypot — humans never fill this
  const formRef = useRef<HTMLFormElement>(null)

  // per-field validity — drives the red highlighting
  const valid = useMemo(
    () => ({
      name: form.name.trim().length >= 2,
      // Tajik number: +992 followed by 9 digits (12 digits total incl. country code)
      phone: (() => {
        const d = form.phone.replace(/\D/g, "")
        return d.length === 12 && d.startsWith("992")
      })(),
      services: form.services.length > 0,
      challenge: form.challenge.trim().length >= 20,
    }),
    [form]
  )

  const filled = Object.values(valid).filter(Boolean).length
  const total = 4
  const pct = (filled / total) * 100
  const allValid = filled === total

  // only show errors once the user has tried to submit
  const err = (k: keyof typeof valid) => attempted && !valid[k]

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!allValid) {
      // incomplete → flag errors + jump to first invalid field
      setAttempted(true)
      const firstInvalid = formRef.current?.querySelector("[data-invalid='true']")
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSendError(false)
    setSending(true)
    try {
      // no endpoint configured yet → optimistic success (dev / not wired)
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, company, lang }),
        })
        if (!res.ok) throw new Error("send failed")
      }
      setSubmitted(true)
      // show success card, then reset back to a fresh empty form
      window.setTimeout(() => {
        setForm(initial)
        setAttempted(false)
        setSubmitted(false)
      }, 5000)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative">
      <div className="container py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-amber">
            {t.form.kicker}
          </p>
          <h2 className="mt-4 font-display text-[34px] leading-[1.02] tracking-tightest text-ink sm:text-[48px] lg:text-[56px] text-balance">
            {t.form.title}
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.55] text-ink/65 text-pretty">
            {t.form.lede}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* sidebar */}
          <aside className="rounded-3xl border border-ink/8 bg-cream-100 p-7 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                {t.form.progress}
              </p>
              <span className="font-mono text-[11px] text-ink/55">
                {filled}/{total}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/8">
              <motion.div
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-amber to-brand-coral"
              />
            </div>

            <h3 className="mt-7 font-display text-[19px] text-ink">
              {t.form.expect.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.form.expect.items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[14px] text-ink/75"
                >
                  <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full bg-brand-blue text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-ink/10 pt-5">
              <p className="text-[13px] text-ink/55">{t.form.expect.email}</p>
              <div className="mt-2 flex flex-col gap-1.5">
                <a
                  href={`mailto:${t.footer.email}`}
                  className="inline-flex items-center gap-2 text-[14px] text-brand-amber hover:text-brand-coral transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {t.footer.email}
                </a>
                <a
                  href="https://t.me/aqly_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] text-brand-amber hover:text-brand-coral transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  @aqly_io
                </a>
              </div>
            </div>
          </aside>

          {/* form / success */}
          <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessCard key="success" t={t} />
          ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            className="rounded-3xl border border-ink/8 bg-cream-50 p-6 sm:p-8 space-y-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t.form.fields.name.label}
                required
                invalid={err("name")}
                errorText={t.form.required}
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder={t.form.fields.name.placeholder}
              />
              <PhoneField
                label={t.form.fields.phone.label}
                invalid={err("phone")}
                errorText={t.form.required}
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                placeholder={t.form.fields.phone.placeholder}
              />
            </div>

            <Field
              label={t.form.fields.website.label}
              value={form.website}
              onChange={(v) => setForm((f) => ({ ...f, website: v }))}
              placeholder={t.form.fields.website.placeholder}
            />

            {/* services */}
            <FieldGroup invalid={err("services")} errorText={t.form.required}>
              <Label required invalid={err("services")}>
                {t.form.fields.services.label}
              </Label>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {t.form.fields.services.options.map((s) => {
                  const on = form.services.includes(s)
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleService(s)}
                      className={cn(
                        "rounded-2xl border px-3 py-2.5 text-[13px] text-left transition-all flex items-center gap-2",
                        on
                          ? "border-brand-blue bg-brand-blue/10 text-ink"
                          : err("services")
                            ? "border-danger/60 bg-danger/[0.07] text-ink/70 hover:border-danger"
                            : "border-ink/10 bg-cream-100 text-ink/65 hover:border-ink/25"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded-md border transition-all",
                          on
                            ? "bg-brand-blue border-brand-blue text-ink"
                            : err("services")
                              ? "border-danger/70"
                              : "border-ink/20"
                        )}
                      >
                        {on && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                      </span>
                      {s}
                    </button>
                  )
                })}
              </div>
            </FieldGroup>

            {/* challenge */}
            <FieldGroup invalid={err("challenge")} errorText={t.form.required}>
              <Label required invalid={err("challenge")}>
                {t.form.fields.challenge.label}
              </Label>
              <textarea
                value={form.challenge}
                onChange={(e) =>
                  setForm((f) => ({ ...f, challenge: e.target.value }))
                }
                placeholder={t.form.fields.challenge.placeholder}
                rows={4}
                className={cn(
                  "mt-3 w-full rounded-2xl border bg-cream-100 px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 focus:outline-none focus:ring-4 transition-all resize-none",
                  err("challenge")
                    ? "border-danger bg-danger/[0.05] focus:border-danger focus:ring-danger/20"
                    : "border-ink/10 focus:border-brand-blue focus:ring-brand-blue/20"
                )}
              />
              <p className="mt-1.5 font-mono text-[11px] text-ink/40">
                {form.challenge.length}/20+
              </p>
            </FieldGroup>

            {/* honeypot — hidden from humans; bots fill it and get dropped server-side */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {/* global error hint */}
            <AnimatePresence>
              {attempted && !allValid && !submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="flex items-center gap-2 rounded-2xl border border-danger/40 bg-danger/[0.08] px-4 py-3 text-[13.5px] text-danger"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {t.form.errorHint}
                </motion.div>
              )}
              {sendError && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="flex items-center gap-2 rounded-2xl border border-danger/40 bg-danger/[0.08] px-4 py-3 text-[13.5px] text-danger"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {t.form.sendError}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className={cn(
                "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-[18px] text-[15px] font-semibold text-white transition-[filter,box-shadow] duration-300",
                sending ? "cursor-wait" : "hover:brightness-[1.06]"
              )}
              style={{
                background:
                  "linear-gradient(100deg, #ff5b24 0%, #ff7a3c 46%, #d17a00 100%)",
                boxShadow: allValid
                  ? "0 16px 44px -10px rgba(255,91,36,0.78), inset 0 1px 0 rgba(255,255,255,0.25)"
                  : "0 12px 34px -14px rgba(255,91,36,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* light sweep across the button on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform [transition-duration:800ms] ease-smooth group-hover:translate-x-full"
              />
              {/* fine top highlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40"
              />
              {sending ? (
                <span className="relative inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.form.sending}
                </span>
              ) : (
                <span className="relative inline-flex items-center gap-2">
                  {t.form.submit}
                  <Send className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </span>
              )}
            </motion.button>
          </motion.form>
          )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ── celebratory success card — animated, replaces the form on submit ── */
function SuccessCard({ t }: { t: ReturnType<typeof useI18n>["t"] }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-ink/8 bg-cream-50 px-6 py-16 text-center sm:px-10 sm:py-20"
    >
      {/* soft accent wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-70"
        style={{ background: "radial-gradient(60% 80% at 50% 0%, rgba(169,202,249,0.22), transparent 70%)" }}
        aria-hidden
      />

      {/* animated check medallion */}
      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 14 }}
        className="relative grid h-20 w-20 place-items-center rounded-full bg-brand-blue text-ink"
      >
        {/* ping ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 2px rgba(169,202,249,0.55)" }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: "easeOut" }}
          aria-hidden
        />
        <motion.svg
          viewBox="0 0 24 24"
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.32, duration: 0.5, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-7 font-display text-[28px] leading-tight tracking-tight text-ink sm:text-[34px]"
      >
        {t.form.successTitle}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-3 max-w-sm text-[15.5px] leading-[1.55] text-ink/65 text-pretty"
      >
        {t.form.successBody}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-7 flex items-center gap-2 rounded-full border border-ink/10 bg-cream-100 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55"
      >
        <Check className="h-3.5 w-3.5 text-brand-coral" strokeWidth={3} />
        {t.form.successTag}
      </motion.div>
    </motion.div>
  )
}

function Label({
  children,
  required,
  invalid,
}: {
  children: React.ReactNode
  required?: boolean
  invalid?: boolean
}) {
  return (
    <label
      className={cn(
        "block text-[13px] font-medium transition-colors",
        invalid ? "text-danger" : "text-ink/85"
      )}
    >
      {children}
      {required && (
        <span className={invalid ? "text-danger" : "text-ink/35"}>
          {" "}
          *
        </span>
      )}
    </label>
  )
}

/** wraps a control group, shakes + shows an error line when invalid */
function FieldGroup({
  children,
  invalid,
  errorText,
}: {
  children: React.ReactNode
  invalid?: boolean
  errorText?: string
}) {
  return (
    <div data-invalid={invalid ? "true" : "false"} className={cn(invalid && "animate-shake")}>
      {children}
      {invalid && errorText && (
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-danger">
          <AlertCircle className="h-3 w-3" />
          {errorText}
        </p>
      )}
    </div>
  )
}

/* ── Tajikistan flag — red / white(+gold crown & stars) / green ── */
function TajFlag() {
  return (
    <svg viewBox="0 0 21 15" className="h-3.5 w-[21px] shrink-0 rounded-[2px] ring-1 ring-ink/10" aria-hidden>
      <rect width="21" height="15" fill="#ffffff" />
      <rect width="21" height="4.3" fill="#cc0000" />
      <rect y="10.7" width="21" height="4.3" fill="#006600" />
      <g fill="#f8c300">
        <rect x="8.4" y="7.7" width="4.2" height="0.5" />
        <path d="M8.4 7.7 l0.5 -1.5 0.85 1 0.85 -1.2 0.85 1.2 0.85 -1 0.5 1.5 z" />
        <circle cx="9" cy="5.0" r="0.34" />
        <circle cx="10.5" cy="4.7" r="0.34" />
        <circle cx="12" cy="5.0" r="0.34" />
      </g>
    </svg>
  )
}

/** Format up to 9 local digits as "90 123 45 67". */
function formatLocal(d: string) {
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ")
}

/* ── styled phone field: locked +992 prefix with TJ flag + auto-format ── */
function PhoneField({
  label,
  value,
  onChange,
  placeholder,
  invalid,
  errorText,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  invalid?: boolean
  errorText?: string
}) {
  const digits = value.replace(/\D/g, "")
  const local = digits.startsWith("992") ? digits.slice(3) : digits
  const grouped = formatLocal(local)

  const handle = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 9)
    onChange("+992 " + formatLocal(d))
  }

  return (
    <div data-invalid={invalid ? "true" : "false"} className={cn(invalid && "animate-shake")}>
      <Label required invalid={invalid}>
        {label}
      </Label>
      <div
        className={cn(
          "mt-3 flex items-center overflow-hidden rounded-2xl border bg-cream-100 transition-all focus-within:ring-4",
          invalid
            ? "border-danger bg-danger/[0.05] focus-within:border-danger focus-within:ring-danger/20"
            : "border-ink/10 focus-within:border-brand-blue focus-within:ring-brand-blue/20"
        )}
      >
        <span className="flex items-center gap-2 py-3 pl-3.5 pr-3 text-[14px] text-ink/80">
          <TajFlag />
          <span className="font-medium tracking-wide">+992</span>
        </span>
        <span className="my-2 h-5 w-px shrink-0 bg-ink/15" aria-hidden />
        <input
          type="tel"
          inputMode="numeric"
          value={grouped}
          onChange={(e) => handle(e.target.value)}
          placeholder={placeholder}
          aria-invalid={invalid}
          className="w-full flex-1 bg-transparent px-3 py-3 text-[14px] tracking-wide text-ink placeholder:text-ink/35 focus:outline-none"
        />
      </div>
      {invalid && errorText && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-danger">
          <AlertCircle className="h-3 w-3" />
          {errorText}
        </p>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  invalid,
  errorText,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  invalid?: boolean
  errorText?: string
}) {
  return (
    <div
      data-invalid={invalid ? "true" : "false"}
      className={cn(invalid && "animate-shake")}
    >
      <Label required={required} invalid={invalid}>
        {label}
      </Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={cn(
          "mt-3 w-full rounded-2xl border bg-cream-100 px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 focus:outline-none focus:ring-4 transition-all",
          invalid
            ? "border-brand-coral focus:border-brand-coral focus:ring-brand-coral/15"
            : "border-ink/10 focus:border-brand-blue focus:ring-brand-blue/20"
        )}
      />
      {invalid && errorText && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-danger">
          <AlertCircle className="h-3 w-3" />
          {errorText}
        </p>
      )}
    </div>
  )
}
