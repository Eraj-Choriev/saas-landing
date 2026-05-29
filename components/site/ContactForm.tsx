"use client"

import { useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Mail, Send, AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type FormState = {
  name: string
  email: string
  website: string
  services: string[]
  timeline: string
  challenge: string
}

const initial: FormState = {
  name: "",
  email: "",
  website: "",
  services: [],
  timeline: "",
  challenge: "",
}

export function ContactForm() {
  const { t } = useI18n()
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // per-field validity — drives the red highlighting
  const valid = useMemo(
    () => ({
      name: form.name.trim().length >= 2,
      email: /\S+@\S+\.\S+/.test(form.email),
      services: form.services.length > 0,
      timeline: !!form.timeline,
      challenge: form.challenge.trim().length >= 20,
    }),
    [form]
  )

  const filled = Object.values(valid).filter(Boolean).length
  const total = 5
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (allValid) {
      setSubmitted(true)
      return
    }
    // incomplete → flag errors + jump to first invalid field
    setAttempted(true)
    const firstInvalid = formRef.current?.querySelector("[data-invalid='true']")
    firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" })
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
              <a
                href={`mailto:${t.footer.email}`}
                className="mt-1 inline-flex items-center gap-2 text-[14px] text-brand-amber hover:text-brand-coral transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {t.footer.email}
              </a>
            </div>
          </aside>

          {/* form */}
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
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
              <Field
                label={t.form.fields.email.label}
                required
                type="email"
                invalid={err("email")}
                errorText={t.form.required}
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder={t.form.fields.email.placeholder}
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
                            ? "border-brand-coral/50 bg-brand-coral/[0.04] text-ink/65 hover:border-brand-coral"
                            : "border-ink/10 bg-cream-100 text-ink/65 hover:border-ink/25"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded-md border transition-all",
                          on
                            ? "bg-brand-blue border-brand-blue text-ink"
                            : err("services")
                              ? "border-brand-coral/60"
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

            {/* timeline */}
            <FieldGroup invalid={err("timeline")} errorText={t.form.required}>
              <Label required invalid={err("timeline")}>
                {t.form.fields.timeline.label}
              </Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.form.fields.timeline.options.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setForm((f) => ({ ...f, timeline: s }))}
                    className={cn(
                      "relative rounded-full border px-4 py-2 text-[13px] transition-colors",
                      form.timeline === s
                        ? "border-brand-coral bg-brand-coral text-white"
                        : err("timeline")
                          ? "border-brand-coral/50 bg-brand-coral/[0.04] text-ink/70 hover:border-brand-coral"
                          : "border-ink/10 bg-cream-100 text-ink/70 hover:border-ink/25"
                    )}
                  >
                    {s}
                  </button>
                ))}
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
                    ? "border-brand-coral focus:border-brand-coral focus:ring-brand-coral/15"
                    : "border-ink/10 focus:border-brand-blue focus:ring-brand-blue/20"
                )}
              />
              <p className="mt-1.5 font-mono text-[11px] text-ink/40">
                {form.challenge.length}/20+
              </p>
            </FieldGroup>

            {/* global error hint */}
            <AnimatePresence>
              {attempted && !allValid && !submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="flex items-center gap-2 rounded-2xl border border-brand-coral/30 bg-brand-coral/[0.06] px-4 py-3 text-[13.5px] text-brand-coral"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {t.form.errorHint}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={submitted}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-medium transition-all",
                submitted
                  ? "bg-brand-blue/70 text-ink cursor-default"
                  : allValid
                    ? "bg-brand-blue text-ink hover:bg-brand-blue/90"
                    : "bg-ink text-cream-50 hover:bg-ink/90"
              )}
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4 text-brand-coral" />
                  Sent
                </>
              ) : (
                <>
                  {t.form.submit}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
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
        invalid ? "text-brand-coral" : "text-ink/85"
      )}
    >
      {children}
      {required && (
        <span className={invalid ? "text-brand-coral" : "text-brand-coral"}>
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
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-brand-coral">
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
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-brand-coral">
          <AlertCircle className="h-3 w-3" />
          {errorText}
        </p>
      )}
    </div>
  )
}
