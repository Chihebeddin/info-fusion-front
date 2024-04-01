/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      blue: {
        100: '#dbeafe',
        300: '#93c5fd',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      green: {
        light: '#bbf7d0',
        DEFAULT: '#16a34a',
        dark: '#15803d'
      },
      orange: {
        light: '#fed7aa',
        DEFAULT: '#d97706',
        dark: '#92400e'
      },
      red: {
        light: '#fecaca',
        DEFAULT: '#dc2626',
        dark: '#b91c1c'
      },
      white: '#ffffff',
      teal: {
        light: '#f0fdfa',
        DEFAULT: '#0d9488',
        dark: '#042f2e',
        700: '#0f766e',
        900: '#134e4a'
      },
      gray: {
        light: '#f9fafb',
        DEFAULT: '#4b5563',
        dark: '#030712',
        300: '#e5e7eb',
        400: '#d1d5db',
        500: '#9ca3af'
      }
    },
    screens: {
      sm: '640px',
      md: '960px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '8xl': '1920px'
    },
    extend: {
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        18: '70px',
        74: '295px',
        78: '310px',
        90: '350px',
        98: '28rem',
        128: '32rem',
        144: '36rem'
      }
    }
  },
  plugins: []
}
