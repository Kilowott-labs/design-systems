/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './blocks/src/**/*.js',
    './blocks/src/**/*.jsx',
    './blocks/src/**/*.php',
    './src/**/*.js',
    './src/**/*.jsx',
    './templates/**/*.html',
    './core/src/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        ragna: ['"Ragna"', 'serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        mango: ["'MangoGrotesque'", 'serif'],
        'mango-semibold': ["'MangoGrotesqueSemBd'", 'serif'],
        clash: ["'ClashDisplay-Medium'", 'serif'],
        inter: ["'Inter'", 'sans-serif'],
      },
      colors: {
        cream: '#f9f4e8',
        dark: '#0a0a0a',
        'dark-alt': '#141414',
        'dot-pink': '#fb4566',
      },
      screens: {
        xs: '576px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
};
