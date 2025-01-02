/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ["Lato", "sans-serif"],
    },
    screens: {
      sm: "320px",
      md: "480px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1200px",
    },
    extend: {
      fontSize: {
        xs: "14px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "31px",
        "2xl": "36px",
        "3xl": "48px",
      },
    },
  },
  plugins: [],
};
