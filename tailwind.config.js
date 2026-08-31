/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#6C5CE7",
          light: "#8B7CF6",
          dark: "#5645C9",
        },
        coral: "#FF6B9D",
        ink: {
          950: "#0B0B14",
          900: "#12121F",
          800: "#1A1A2C",
          700: "#252539",
        },
        paper: {
          50: "#F8F7FC",
          100: "#F1EFFA",
          200: "#E7E3F7",
        },
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 20, 90, 0.12)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
      },
      animation: {
        blob: "blob 18s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
