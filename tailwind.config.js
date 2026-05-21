/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ritual palette
        midnight: {
          950: '#070318',
          900: '#0c0822',
          800: '#15103a',
          700: '#1f1851',
        },
        ember: {
          50: '#fff6e8',
          100: '#ffe6b8',
          300: '#ffc370',
          500: '#ff9533',
          600: '#f0691b',
          700: '#c84a0e',
        },
        crimson: {
          400: '#ff4d6d',
          500: '#e6294b',
          600: '#b21338',
          700: '#7a0a26',
        },
        rose: {
          glow: '#ff7aa8',
        },
        violet: {
          ritual: '#7a3df5',
        },
        gold: {
          400: '#f4d27a',
          500: '#d9a441',
          600: '#a87622',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(255,77,109,0.35)',
        ember: '0 0 60px rgba(255,149,51,0.45)',
        candle: '0 0 80px rgba(255,195,112,0.55)',
      },
      backgroundImage: {
        'ritual-radial':
          'radial-gradient(ellipse at top, rgba(122,61,245,0.25), transparent 60%), radial-gradient(ellipse at bottom, rgba(255,77,109,0.18), transparent 65%)',
        'smoke':
          'radial-gradient(ellipse at center, rgba(255,195,112,0.18), transparent 70%)',
      },
      animation: {
        flicker: 'flicker 3s infinite',
        'spin-slow': 'spin 28s linear infinite',
        'spin-reverse': 'spin-reverse 36s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
          '20%': { opacity: 0.85, filter: 'brightness(0.92)' },
          '50%': { opacity: 1, filter: 'brightness(1.15)' },
          '70%': { opacity: 0.9, filter: 'brightness(0.95)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-12px) translateX(4px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 25px rgba(255,77,109,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(255,77,109,0.85)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
