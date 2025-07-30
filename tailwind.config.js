/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "red-hat-display": ["var(--font-red-hat-display)", "sans-serif"],
        "monesta-semibold": ["var(--font-monesta-semibold)", "serif"],
      },
    },
  },
  plugins: [],
};
