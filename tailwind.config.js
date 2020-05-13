module.exports = {
  theme: {
    borderRadius: {
      sm: "0.25rem",
      default: "0.5rem"
    },
    boxShadow: {
      default: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    inset: {
      "0": 0,
      "3": "0.75rem",
      "4": "1rem",
      "7": "1.75rem",
      "9": "2.25rem"
    },
    extend: {
      backgroundColor: {
        "navbar-hover": "#00b89c",
        footer: "#fafafa",
        popup: "rgba(0, 0, 0, 0.6)",
      }
    },
    fontFamily: {
      heading: "Roboto",
      display: "Roboto",
      body: "Roboto",
    },
  },
  variants: {},
  plugins: [],
  purge: [
    './components/**/*.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
  ],
};
