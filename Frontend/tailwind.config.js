/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main branding colors
        coffee: "#5C4C49",
        tan: "#DCB491",
        cream: "#ffe6c1",
        sepia: "#7C664D",
        // Semantic Colors
        red: {
          error: "#ef4444",
          heart: "#D10000",
        },
        success: "#22c55e",
        orange: "#CD6D18",
        warning: "#f5ab0bff",
        info: "#3b82f6",
        purple: "#7e22ce",
      },
      screens: {
        "xl-custom": "1560px",
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
    },
    plugins: [],
  },
};
