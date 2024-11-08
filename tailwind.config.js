/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Vite's root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JS, TS, JSX, and TSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B5563",  // Customize colors
        secondary: "#9CA3AF",
        accent: "#F59E0B",
        lightTeal: '#d0fcf4',  
        darkTeal: '#558b88',   
        lightGrey: '#808080',
        darkGrey: '#696969'
      },
    },
  },
  darkMode: 'media', // Enables dark mode based on the user's device settings
  plugins: [],
}
