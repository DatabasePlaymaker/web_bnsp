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
      keyframes: {
        spinIn: {
          to: {transform: "rotate(18deg)"},
        },
        spinOut: {
          to: {transform: "rotate(360deg)"},
        },
      },
      animation: {
        spinIn: "spinIn 30s linear infinite",
        spinout: "spinIn 10s linear infinite",
      },
    },
  },
  plugins: [],
};
