/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#5E56E7',
          'primary-light': '#F8F7FF',
          'grey-light': '#F0F0F6',
          'grey-medium': '#A0A0A0',
          'grey-dark': '#333333',
        },
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
        },
        fontSize: {
          'heading-1': '48px',
          'heading-2': '30px',
          'genre-card': '20px',
          'body': '16px',
          'search': '16px',
          'book-name': '12px',
          'book-author': '12px',
        },
        boxShadow: {
          'card': '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
        },
      },
    },
    plugins: [],
  }