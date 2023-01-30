/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "default-text": "#5B5B5B",
        "dark-background": "#181818",
        "dark-primary": "#202020",
        "dark-secondary": "#292929",
        "dark-text": "#C9C9C9"
      }
    },
  },
  plugins: [],
};
