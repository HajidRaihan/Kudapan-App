/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F40027",
        secondary: "#BF3131",
      },
    },
  },

  daisyui: {
    darkTheme: false,
  },
  plugins: [require("daisyui")],
};
