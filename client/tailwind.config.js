/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      fontFamily:{
        Montserrat:["Montserrat"],
        Iceland:["Iceland"],
        Inter:["Inter"],
      }
    },
  },
  plugins: [],
}

