/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#08070F",
          900: "#0F0D1A",
          800: "#13111E",
          700: "#1C1A2B",
          600: "#2A2740",
        },
        violet: { 400: "#9B85FF", 500: "#7C5CFF", 600: "#6645E0" },
        teal: { 400: "#5FEBD4", 500: "#33E0C7", 600: "#22B8A2" },
        ink: { 100: "#F2F0FA", 300: "#C7C2DC", 500: "#9590A8", 700: "#6B6680" },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      keyframes: {
        scrollLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        scrollRight: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateY(16px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        spinSlower: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        gradientFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        aurora1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(60%, 20%) scale(1.3)" },
          "66%": { transform: "translate(20%, 70%) scale(0.9)" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(80%, 60%) scale(1)" },
          "33%": { transform: "translate(20%, 10%) scale(0.85)" },
          "66%": { transform: "translate(60%, 80%) scale(1.25)" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(30%, 80%) scale(1)" },
          "50%": { transform: "translate(70%, 10%) scale(1.4)" },
        },
      },
      animation: {
        "scroll-left": "scrollLeft 32s linear infinite",
        "scroll-right": "scrollRight 28s linear infinite",
        "float-y": "floatY 5s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        blink: "blink 0.9s step-end infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "slide-in": "slideIn 0.3s ease-out forwards",
        "spin-slower": "spinSlower 12s linear infinite",
        "gradient-flow": "gradientFlow 8s ease infinite",
        "aurora-1": "aurora1 14s ease-in-out infinite",
        "aurora-2": "aurora2 18s ease-in-out infinite",
        "aurora-3": "aurora3 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
