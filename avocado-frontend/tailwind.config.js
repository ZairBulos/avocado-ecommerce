/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#f9f2e8',
          100: '#f1e5cb',
          200: '#e4cda0',
          300: '#d7b474',
          400: '#c99849',
          500: '#b27b29',
          600: '#8f6422',
          700: '#6b4b1c',
          800: '#483314',
          900: '#2d1e0c',
        },
      }
    },
  },
}

