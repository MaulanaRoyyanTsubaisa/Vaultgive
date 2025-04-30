/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD23F",
        secondary: "#FFA62B",
        accent: "#FF8C2D",
        background: "#FFF5EB",
        "blockchain-dark": "#0F172A",
        "blockchain-gray": "#1F2937",
        "blockchain-light-gray": "#374151",
        "blockchain-gradient":
          "linear-gradient(135deg, #FFD23F 0%, #FF8C2D 100%)",
        "blockchain-gradient-hover":
          "linear-gradient(135deg, #FFA62B 0%, #FF8C2D 100%)",
      },
      backgroundImage: {
        "blockchain-pattern": "url('/src/assets/blockchain-bg.png')",
      },
      boxShadow: {
        blockchain:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "blockchain-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        blockchain: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
