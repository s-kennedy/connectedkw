/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      red: "#ef476f",
      yellow: "#ffd166",
      green: "#06d6a0",
      blue: "#118ab2",
      purple: "#51355a",
      black: "#170F1A",
      white: "#FFFFFF"
    },
    fontFamily: {
      body: ['Fredoka', 'Helvetica Neue', 'sans-serif'],
      title: ['Fredoka Bold', 'Helvetica Neue', 'sans-serif'],
      display: ['GT-Maru Mega', 'serif'],
    },
    extend: {
      borderWidth: {
        '3': '3px'
      },
      minHeight: {
        'halfscreen': '50vh',
      }
    },
  },
  plugins: [],
}
