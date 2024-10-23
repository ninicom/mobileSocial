/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {        

        lightBackground: '#FFFFFF',
        lightText: '#333333',
        lightPrimary: '#87CEEB',
        lightSecondary: '#B0C4DE',

        darkBackground: '#121212',
        darkText: '#F0F0F0',
        darkPrimary: '#1DB954',
        darkSecondary: '#4682B4',

        steel_blue: '#4682B4',
        light_steel_blue: '#B0C4DE',
        primary: "#87CEEB",
        active: "#4682B4",
        inactive: "#B0C4DE",  
        likeactive: "#93c5fd",
             
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
