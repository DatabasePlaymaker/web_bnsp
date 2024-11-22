/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#202030",
        secondary: "#39304A",
      },
      fontFamily: {
        rubik: ["Rubik", "Verdana", "sans-serif"], // Untuk Rubik
      },
    },
  },
  plugins: [],
};
