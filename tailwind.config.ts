import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          50: "#fdf2f4",
          100: "#fbe8eb",
          200: "#f6d5db",
          300: "#eeb4be",
          400: "#e18698",
          500: "#cf5770",
          600: "#b53752",
          700: "#962740",
          800: "#7d2238",
          900: "#701a28", // Main Velora deep wine / maroon
          950: "#3d0a14",
          dark: "#1c090e",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
