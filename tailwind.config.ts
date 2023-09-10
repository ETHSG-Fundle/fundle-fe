import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors')

const customColors = {
  red: {
    "light": "#FDDCDB",
    "dark": "#86100D",
    DEFAULT: "#F3322C", // Overwrite default
    "hover": "#DD1009",
    "active": "#DD100950",
    "medium": "#F3322C30"
  },
  blue: {
    DEFAULT: "#2B83F6", // Overwrite default
  },
  green: {
    DEFAULT: "#4BEA69" // Overwrite default
  },
  gray: {
    DEFAULT: "#D9D9D9", // Overwrite default
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'display': ['var(--font-londrina-solid)'],
      'body': ['var(--font-inter)']
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: customColors,
    },
  },
  plugins: [],
};
export default config;
