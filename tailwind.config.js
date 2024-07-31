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
        "image-chat": "url('/images/imageChat.png')",
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
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fadeIn 0.2s ease-in forwards",
        "scale-up": "scaleUp 0.5s ease-in-out forwards",
        "scale-down": "scaleDown 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleUp: {
          "0%": { transform: "scale(0)", opacity: 5 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        scaleDown: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
    require("tailwind-scrollbar"),
  ],
};
