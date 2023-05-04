import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Jost', 'sans-serif'],
      'logo': ['Bebas Neue', 'sans-serif'],
    },
    borderWidth: {
      '3': '3px'
    },
    extend: {
      boxShadow: {
        'std': '4px 4px rgba(15, 15, 15, 1)',
      },
      width: {
        '100': '30rem'
      },
      height: {
        '85': '22rem'
      },
      spacing: {
        '85': '24rem',
      },
      colors: {
        'yellow': '#FAEA48',
        'pink': '#F637EC',
        'orange': '#FBB454',
        'blue': '#3330E4',
        'black': '#0F0F0F',
        'white': '#FFFFFF',
        'gray': '#616161'
      },
      scale: {
        '0': '0',
        '10': '.1',
        '20': '.2',
        '30': '.3',
        '40': '.4',
        '50': '.5',
        '60': '.6',
        '70': '.7',
        '80': '.8',
        '90': '.9',
        '100': '1',
      }
    },
  },
  plugins: [],
} satisfies Config;