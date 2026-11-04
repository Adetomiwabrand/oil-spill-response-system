/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyPanel: '#0F1B2C',
        responseGreen: '#22C55E',
        signalBlue: '#0057ff',
        alertRed: '#DC2626',
        fieldBg: '#F4F6F9'
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        focusRing: '0 0 0 2px #0057ff'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}