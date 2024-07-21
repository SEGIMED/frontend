/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "380px",
        "2xl": "1540px",
      },
      colors: {
        primary: "#0070f3",
        secondary: "#ff4081",
        bluePrimary: "#487FFA",
        greenPrimary: "#70C247",
        textPrimary: "#808080",
        textSubtitle: "#686868",
      },
      darkMode: "class",
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
