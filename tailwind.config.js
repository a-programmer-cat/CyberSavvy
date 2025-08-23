/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#111827", // gray-900
          card: "rgba(31, 41, 55, 0.8)", // gray-800/80
          border: "#374151", // gray-700
        },

        text: {
          main: "#ffffff",
          secondary: "#d1d5db",
        },

        gradient: {
          start: "#60a5fa", // blue-400
          end: "#67e8f9",   // cyan-300
        },

        primary: {
          DEFAULT: "#3b82f6", // blue-500
          hover: "#2563eb",   // blue-600
        },
        success: {
          DEFAULT: "#22c55e", // green-500
          hover: "#16a34a",   // green-600
        },
        accent: {
          DEFAULT: "#a855f7", // purple-500
          hover: "#9333ea",   // purple-600
        },
        warning: {
          DEFAULT: "#f97316", // orange-500
          hover: "#ea580c",   // orange-600
        },
        error: {
          DEFAULT: "#ef4444", // red-500
          hover: "#dc2626",   // red-600
        },
        info: {
          DEFAULT: "#06b6d4", // cyan-500
          hover: "#0891b2",   // cyan-600
        },

        highlight: {
          blue: "#60a5fa",
          green: "#4ade80",
          purple: "#c084fc",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
    }),
  ],
}