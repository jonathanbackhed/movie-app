/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};
