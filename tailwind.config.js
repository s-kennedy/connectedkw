/** @type {import('tailwindcss').Config} */
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
      body: ['Fredoka', 'Helvetica Neue', 'sans-serif'],
      title: ['Fredoka Bold', 'Helvetica Neue', 'sans-serif'],
      display: ['var(--font-jackerton)', 'Fredoka Bold', 'Helvetica Neue', 'sans-serif'],
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
  plugins: []
}
