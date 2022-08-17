/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'Arial', 'sans-serif'],
      'sans-serif': ['Poppins', 'Arial', 'sans-serif']
    },
    fontSize: {
      'xs': '.50rem',
      'sm': '.75rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    extend: {},
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [require("daisyui")],
}
