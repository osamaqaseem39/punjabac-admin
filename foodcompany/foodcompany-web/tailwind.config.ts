/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emeraldPine: '#003E29',
        oliveDrab: '#6B8E23',
        sandstone: '#D4C5A1',
        deepTeal: '#264E46',
        richCharcoal: '#2D2D2D',
      },
    },
  },
  plugins: [],
} 