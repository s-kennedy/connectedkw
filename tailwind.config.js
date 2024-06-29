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
    "bg-lightGrey",
    "bg-red",
    "bg-lightRed",
    "bg-blue",
    "bg-lightBlue",
    "bg-green",
    "bg-lightGreen",
    "bg-yellow",
    "bg-lightYellow",
    "bg-purple",
    "bg-lightPurple"
  ],
  theme: {
    colors: {
      red: "#ef476f",
      lightRed: "#ef476f40",
      yellow: "#ffd166",
      lightYellow: "#ffd16640",
      green: "#06d6a0",
      lightGreen: "#06d6a040",
      blue: "#118ab2",
      lightBlue: "#118ab240",
      purple: "#51355a",
      lightPurple: "#d7d1d8",
      black: "#170F1A",
      white: "#FFFFFF",
      grey: "#5C706C",
      lightGrey: "#DDE3E2"
    },
    fontFamily: {
      body: ['Outfit', 'Helvetica Neue', 'sans-serif'],
      title: ['Outfit Bold', 'Helvetica Neue', 'sans-serif'],
      display: ['var(--font-jackerton)', 'Outfig Bold', 'Helvetica Neue', 'sans-serif'],
    },
    container: {
      padding: '1rem',
    },
    extend: {
      borderWidth: {
        '3': '3px'
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
      }
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
