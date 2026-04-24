/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Syne'", "sans-serif"],
      },
      colors: {
        // Backgrounds
        void: "#050508",
        deep: "#08080d",
        surface: "#0d0d14",
        raised: "#12121a",
        hover: "#1a1a26",
        // Borders
        dim: "#1e1e2e",
        mid: "#2a2a3e",
        bright: "#3d3d5c",
        // Text
        primary: "#e8e8f0",
        secondary: "#9090b0",
        muted: "#50506a",
        // Accents
        amber: "#f5a623",
        electric: "#00ff88",
        plasma: "#7c6af7",
        crimson: "#ff3366",
        cyan: "#00d4ff",
        gold: "#ffd700",
        sage: "#88cc88",
        coral: "#ff6b4a",
      },
      boxShadow: {
        amber: "0 0 24px rgba(245,166,35,0.2)",
        electric: "0 0 24px rgba(0,255,136,0.15)",
        plasma: "0 0 24px rgba(124,106,247,0.2)",
        crimson: "0 0 24px rgba(255,51,102,0.2)",
      },
    },
  },
  plugins: [],
};
