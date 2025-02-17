/** @type {import('tailwindcss').Config} */
import primeUi from "tailwindcss-primeui"
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [primeUi],
}
