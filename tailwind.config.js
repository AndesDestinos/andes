module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-metropolis)"],
        serif: ["var(--font-bodoni)"],
      },
    },
  },
  plugins: [],
};