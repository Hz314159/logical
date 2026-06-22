export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Tahoma", "Arial", "system-ui", "sans-serif"],
        mono: ["Consolas", "Monaco", "Courier New", "monospace"]
      },
      boxShadow: { soft: "0 14px 40px rgba(15,23,42,.08)" }
    }
  },
  plugins: []
};
