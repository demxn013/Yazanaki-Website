/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        background: "#0B0D10",
        surface: "#11151A",
        elevated: "#171C22",
        primary: "#E8ECF1",
        secondary: "#9AA4AF",
        muted: "#6B7380",
        accent: {
          DEFAULT: "#C6A85B",
          hover: "#D4B76A",
        },
        crimson: {
          DEFAULT: "#8B0000",
          soft: "#A63232",
        },
        line: "#1F2630",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "12px",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseNode: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.55" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-6px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 600ms ease-out both",
        pulseNode: "pulseNode 4s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
