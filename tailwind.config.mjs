/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Это сканирует ВСЕ файлы в папке src
  ],
  theme: {
    extend: {
      colors: {
        'ps-gold': '#D4AF37',
        'ps-beige': '#F5F5DC',
      },
    },
  },
  plugins: [],
};