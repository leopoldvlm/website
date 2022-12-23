/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
    fontFamily: {
      'noto': ["'Noto Sans'", 'sans-serif'],
      'urbanist': ['Urbanist', 'sans-serif']
    }
  },
  plugins: [],
  darkMode: 'class'
};
