/** @type {import('tailwindcss').Config} */
import primeUi from "tailwindcss-primeui"
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "header-height": "80px",
      },
    },
  },
  plugins: [primeUi],
}
