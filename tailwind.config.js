/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        swizblue: {
          vlight: "#A6AFCF",
          dark: "#071A5E",
          light: "#6B77A3",
          DEFAULT: "#0a2587",
        },

        swizpurp: {
          dark: "#570871",
          light: "#B59FBD",
          DEFAULT: "#7e0ca4",
        },
        swizpink: {
          dark: "#9C1457",
          light: "#A2748B",
          DEFAULT: "#b11763",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
