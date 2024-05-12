/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        darkBg: "#0C090A",
        darkBg2: "#171717",
        whiteBg: "#F8FBF8",
        whiteBg2: "#F3F2ED",
        textB: "#0C0A00",
        textW: "#FFFAFA",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
