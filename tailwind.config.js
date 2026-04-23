/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        display: ["'Bebas Neue'", "cursive"],
      },
      colors: {
        bg: "#0a0a0a",
        bg2: "#111111",
        bg3: "#1a1a1a",
        bg4: "#222222",
        wire: "#2a2a2a",
        wire2: "#333333",
        tx1: "#f0f0f0",
        tx2: "#aaaaaa",
        tx3: "#555555",
        accent: "#ff4500",
        lime: "#aaff00",
        blue: "#4488ff",
        green: "#00cc88",
        yellow: "#ffaa00",
        purple: "#aa66ff",
        pink: "#ff4488",
        orange: "#ff7722",
        teal: "#00ddbb",
        red: "#ff3333",
      },
    },
  },
  plugins: [],
};
