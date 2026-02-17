/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A3409',
        'primary-light': '#2D5016',
        'primary-dark': '#0D1A05',
        accent: '#C5A059',
      },
    },
  },
  plugins: [],
};

