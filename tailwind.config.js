/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"]
      },
      colors: {
        morning: {
          bg: "#FDFBF7",
          text: "#2C2A29",
          accent: "#C4A484",
          soft: "#F5EEE4"
        },
        night: {
          bg: "#121826",
          text: "#E2E8F0",
          accent: "#6366F1",
          soft: "#1B2436"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(44, 42, 41, 0.10)"
      }
    }
  },
  plugins: []
};
