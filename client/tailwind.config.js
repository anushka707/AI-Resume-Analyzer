/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172026',
        ocean: '#0E7490',
        coral: '#E85D4F',
        mint: '#3CAEA3',
        amber: '#F4A261',
      },
      boxShadow: {
        soft: '0 10px 35px rgba(23, 32, 38, 0.08)',
      },
    },
  },
  plugins: [],
};

