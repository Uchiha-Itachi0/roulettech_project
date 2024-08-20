/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'onboarding-yellow': '#FE8C00',

        },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(110deg, rgba(243, 221, 56, .2) 10%, #FFFFFF 90%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

