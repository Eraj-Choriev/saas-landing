export function Wordmark({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const c = tone === "ink" ? "#0A0E13" : "#F3EFE6"
  const a = "#ff5b24"
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" stroke={c} strokeWidth="1.5" />
        <path
          d="M10 22 L16 8 L22 22 M12.5 17 H19.5"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="9" r="2" fill={a} />
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
