/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx,mdx}",
  ],
  safelist: [
    "bg-black",
    "bg-white",
    "bg-grey",
    "bg-red",
    "bg-blue",
    "bg-green",
    "bg-yellow",
    "bg-purple",
  ],
  theme: {
    fontFamily: {
      body: ['Outfit', 'Helvetica Neue', 'sans-serif'],
      title: ['Outfit Bold', 'Helvetica Neue', 'sans-serif'],
      display: ['var(--font-slackey)', 'Outfit Bold', 'Helvetica Neue', 'sans-serif'],
    },
    container: {
      padding: '1rem',
    },
    extend: {
      borderWidth: {
        '3': '3px'
      },
      backgroundImage: {
        'check-mark': "url('/icons/check-mark.svg')"
      },
      minHeight: {
        'halfscreen': '50vh',
      },
      fontSize: {
        '8xl': '5.5rem',
        '7xl': '4rem'
      },
      maxHeight: {
        visibleScreen: 'calc(100vh - 100px)'
      },
      height: {
        visibleScreen: 'calc(100vh - 100px)'
      },
      colors: {
        red: "#D81E5B",
        yellow: "#ffd166",
        orange: "#FA7D4B",
        green: "#06d6a0",
        pink: "#FDEDF2",
        seashell: "#FEF1EB",
        latte: "#FFF9EB",
        blue: "#118ab2",
        purple: "#51355a",
        white: "#FFFFFF",
        black: "#030F12"
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        // https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
        ".horizontal-writing-tb": { "writing-mode": "horizontal-tb" },
        ".vertical-writing-rl": { "writing-mode": "vertical-rl" },
        ".vertical-writing-lr": { "writing-mode": "vertical-lr" },
        // https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
        ".orientation-mixed": { "text-orientation": "mixed" },
        ".orientation-upright": { "text-orientation": "upright" },
        ".orientation-sideways-right": { "text-orientation": "sideways-right" },
        ".orientation-sideways": { "text-orientation": "sideways" },
        ".orientation-glyph": { "text-orientation": "use-glyph-orientation" },
      })
    }),
  ],
}
