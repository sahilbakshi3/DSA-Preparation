/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        bg: "#0d0f14",
        bg2: "#13161d",
        bg3: "#1a1e28",
        bg4: "#222736",
        border1: "#2a2f3d",
        border2: "#343b50",
        tx1: "#e8eaf0",
        tx2: "#9aa0b5",
        tx3: "#5c6480",
        accent: "#e8593c",
        blue: "#3B8BD4",
        green: "#1D9E75",
        yellow: "#c9963a",
        purple: "#9F77DD",
        pink: "#D4537E",
        orange: "#EF9F27",
        teal: "#5DCAA5",
      },
    },
  },
  plugins: [],
};
