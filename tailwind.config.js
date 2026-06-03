/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0a0e1a',
          800: '#0f172a',
          700: '#1e293b',
        },
        planet: {
          sun: '#fbbf24',
          mercury: '#9ca3af',
          venus: '#f472b6',
          earth: '#3b82f6',
          mars: '#ef4444',
          jupiter: '#d97706',
          saturn: '#f59e0b',
          uranus: '#06b6d4',
          neptune: '#6366f1',
        },
        badge: {
          bronze: '#cd7f32',
          silver: '#c0c0c0',
          gold: '#ffd700',
          platinum: '#e5e4e2',
        }
      },
      fontFamily: {
        display: ['Nunito', 'Comic Sans MS', 'cursive', 'sans-serif'],
        body: ['Nunito', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
