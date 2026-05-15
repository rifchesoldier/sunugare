/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e8a045',
        dark:    '#0f0c29',
        mid:     '#1a1a2e',
        light:   '#16213e',
      }
    }
  },
  plugins: []
}
