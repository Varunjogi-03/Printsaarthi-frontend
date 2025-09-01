/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#9ac5d3",
          secondary: "#141e26",
          text: {
            primary: "#cbd8df",
            secondary: "#159ab7",
          },
          stroke: "#1e5067",
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        printsaarthi: {
          primary: "#5E17EB",
          secondary: "#F0AB2F",
          accent: "#F0AB2F",
          neutral: "#231F20",
          "base-100": "#ffffff",
          info: "#C4C2CF",
          success: "#3D3C43",
          warning: "#231F20",
          error: "#3D3C43",
        },
      },
      "light",
    ],
  },
}

