export function Wordmark({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const c = tone === "ink" ? "#0A0E13" : "#F3EFE6"
  const a = "#ff5b24"
  return (
    <div className="flex items-center gap-2">
      {/* Aqly mark — geometric "A" crowned with a coral 4-point AI spark.
          Single-weight rounded strokes echo the Unbounded display face.
          Reads in one colour and survives down to favicon size. */}
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M7 25.5 L16 11.4 L25 25.5 M11.5 19.4 H20.5"
          stroke={c}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 0.8 Q17.6 4.2 21.2 5.8 Q17.6 7.4 16 11.4 Q14.4 7.4 10.8 5.8 Q14.4 4.2 16 0.8 Z"
          fill={a}
        />
      </svg>
      <span
        className="font-display text-[19px] leading-none tracking-tightest"
        style={{ color: c, fontWeight: 500 }}
      >
        aqly<span style={{ color: a }}>.</span>io
      </span>
    </div>
  )
}
