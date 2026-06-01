import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Tipografía ───────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-pixelify)", "monospace"],
        body: ["var(--font-pixelify)", "monospace"],
      },

      // ─── Paleta PlanMe ────────────────────────────────────────
      colors: {
        cream: {
          DEFAULT: "#FBF5EA",
          2: "#F4E9D6",
        },
        paper: "#FFFCF6",
        sage: {
          DEFAULT: "#A7BD9B",
          deep: "#7C9670",
          soft: "#DEE8D4",
        },
        pink: {
          DEFAULT: "#E9B5B2",
          deep: "#D2807D",
          soft: "#F7DCD9",
        },
        brown: {
          DEFAULT: "#B89A80",
          line: "#9A7B63",
        },
        ink: {
          DEFAULT: "#6E5645",
          soft: "#9C8472",
        },
        butter: "#EFCF93",
        lilac: "#CDB6D8",
        sky: "#BCD3D6",
      },

      // ─── Border radius ────────────────────────────────────────
      borderRadius: {
        sm: "12px",
        md: "18px",
        lg: "26px",
        phone: "54px",
        screen: "42px",
      },

      // ─── Sombras ─────────────────────────────────────────────
      boxShadow: {
        planme: "0 14px 30px -16px rgba(122, 92, 72, 0.45)",
        card: "0 0 0 3px #fff, 0 14px 30px -16px rgba(122, 92, 72, 0.45)",
        btn: "0 4px 0 #9A7B63",
        "btn-sm": "0 3px 0 #9A7B63",
        phone: "0 2px 0 2px #fff, 0 0 0 4px #B89A80, 0 40px 70px -30px rgba(122,92,72,0.6)",
      },

      // ─── Animaciones ─────────────────────────────────────────
      keyframes: {
        pop: {
          from: { opacity: "0", transform: "translateY(8px) scale(0.99)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "var(--rot, 0deg) translateY(0)" },
          "50%": { transform: "var(--rot, 0deg) translateY(-6px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        pop: "pop 0.32s ease both",
        float: "float 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.2s ease both",
        "slide-up": "slideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;