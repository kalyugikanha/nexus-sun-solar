import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#275b82",
          dark: "#1a3a5c",
        },
      },
      fontFamily: {
        sans: ["Nunito", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
