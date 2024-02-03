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
      green: {
        light: '#bbf7d0',
        DEFAULT: '#15803d',
        dark: '#166534'
      },
      red: {
        DEFAULT: '#b91c1c',
        dark: '#991b1b'
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
        400: '#d1d5db'
      }
    },
    screens: {
      sm: '640px',
      md: '960px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        18: '70px',
        74: '295px',
        90: '350px',
        128: '32rem',
        144: '36rem'
      }
    }
  },
  plugins: []
}
