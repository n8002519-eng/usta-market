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
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff6b00', // Primary vibrant orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#ff6b00',
        },
        dark: {
          950: '#07090e',
          900: '#0b0f17', // Main deep dark background
          850: '#101726',
          800: '#151d2f', // Card background
          700: '#1e293b', // Elevated surfaces
          600: '#334155', // Borders
          500: '#64748b',
          400: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 107, 0, 0.45)',
        'glow-orange-sm': '0 0 15px -3px rgba(255, 107, 0, 0.3)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
