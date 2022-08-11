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
    extend: {},
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [require("daisyui")],
}
