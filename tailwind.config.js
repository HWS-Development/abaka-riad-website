/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#7A1F33",
          rose: "#F6DCE3",
          charcoal: "#222222",
          grey: "#E3E3E3",
          off: "#FAF8F8",
          primary: "#7A1C2B", // Burgundy
          light: "#F6EDEE",   // Pale rose background
          dark: "#5C141F",    // Darker hover/active
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.10)",   // <— this defines shadow-soft
        chip: "0 4px 14px rgba(0,0,0,.06)"
      },
    },
  },
  plugins: [],
}
