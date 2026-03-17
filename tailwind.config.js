/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0a',
        charcoal: '#1a1a1a',
        graphite: '#2d2d2d',
        steel: '#4a4a4a',
        ash: '#8a8a8a',
        silver: '#c4c4c4',
        pearl: '#e8e4de',
        cream: '#f5f0e8',
        sand: '#d4c5a9',
        taupe: '#b8a48a',
        mocha: '#8b6e4e',
        walnut: '#6b4f35',
        espresso: '#3d2b1a',
        bone: '#e9e0d0',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        headline: ['Bebas Neue', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      }
    },
  },
  plugins: [],
}
