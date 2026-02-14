/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dracula: {
          bg: '#282a36',
          text: '#f8f8f2',
        },
        warm: {
          bg: '#fdf6e3',
          text: '#2d2d2d',
        }
      }
    },
  },
  plugins: [],
}
