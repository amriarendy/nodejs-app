/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
      extend: {
          spacing: {
              13: '3.25rem'
          },
          fontFamily: {
              inter: ['Inter']
          },
          colors: {
              luffy: '#bada55',
              onepiece: '#c0ffee'
          },
          animation: {
              'spin-slow': 'spin 3s linear infinite',
              'goyang': 'wiggle 1s ease-in-out'
          },
          keyframes: {
              wiggle: {
                  '0%, 100%': {transform: 'rotate(-3deg)'},
                  '50%': {transform: 'rotate(3deg)'},
              },
          },
      },
  },
  plugins: [],
}

