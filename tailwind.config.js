/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColorStart: '#123456',
        customColorEnd: '#654321',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #123456, #654321)',
      },
    },
  },
  plugins: [],
}