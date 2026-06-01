import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        cream: {
          50: "#FBF8F2",
          100: "#F3EFE6",
          200: "#E9E3D5",
          300: "#D9D1BD",
        },
        ink: {
          DEFAULT: "#0A0E13",
          800: "#141A22",
          700: "#1F2731",
          600: "#2C3540",
          500: "#4A5560",
          400: "#7B8693",
          300: "#A8B1BC",
        },
        brand: {
          blue: "#a9caf9",
          amber: "#d17a00",
          gold: "#fce88d",
          coral: "#ff5b24",
        },
        aqua: {
          50: "#E6FBF8",
          100: "#BFF4EC",
          200: "#86E8DB",
          300: "#3FD3C0",
          400: "#1FB6A6",
          500: "#13998C",
          600: "#0E7C73",
          700: "#0F5F5A",
          800: "#0F3D3E",
        },
        accent: "#a9caf9",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      backgroundImage: {
        "grid-ink":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
