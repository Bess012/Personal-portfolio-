/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080E14',
        panel: '#0C1520',
        paper: '#F1EEE3',
        paperdim: '#A9B4BC',
        amber: '#E8A33D',
        amberdim: '#8C6A31',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(232,163,61,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(232,163,61,0.22) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
}
