// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{ts,tsx,js,jsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         "risk-low": "#22c55e",
//         "risk-moderate": "#eab308",
//         "risk-high": "#f97316",
//         "risk-very-high": "#ef4444",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "risk-low": "#22c55e",
        "risk-moderate": "#eab308",
        "risk-high": "#f97316",
        "risk-very-high": "#ef4444",
      },
    },
  },
  plugins: [],
};

