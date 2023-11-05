/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors : {
      'transparent' : 'transparent',
      'teal': {
        'light' : '#f0fdfa',
        DEFAULT : '#0d9488',
        'dark' : '#042f2e',
        700 : '#0f766e'
      },
      'gray' : {
        'light' : '#f9fafb',
        DEFAULT : '#4b5563',
        'dark' : '#030712',
      }
    },
    screens: {
      'sm': '640px',
      'md': '960px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}

