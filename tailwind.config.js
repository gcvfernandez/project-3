/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F3460',
          50: '#E5EAF1',
          100: '#C1CDE0',
          200: '#7A94C1',
          300: '#4C71AA',
          400: '#33558A',
          500: '#0F3460',
          600: '#0B2A4E',
          700: '#081F3B',
          800: '#051529',
          900: '#020A16',
          950: '#01050D',
        },
        secondary: {
          DEFAULT: '#16697A',
          50: '#E8F1F3',
          100: '#C5DCE2',
          200: '#7FB8C5',
          300: '#4E9DAF',
          400: '#348294',
          500: '#16697A',
          600: '#125563',
          700: '#0D404A',
          800: '#092A32',
          900: '#041519',
          950: '#020B0D',
        },
        accent: {
          DEFAULT: '#FFA62B',
          50: '#FFEFD9',
          100: '#FFDEB3',
          200: '#FFBE66',
          300: '#FFA62B',
          400: '#F58D00',
          500: '#BD6D00',
          600: '#8F5200',
          700: '#613800',
          800: '#331D00',
          900: '#050300',
          950: '#000000',
        },
      },
      boxShadow: {
        card: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-in': 'slide-in 0.3s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};