/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        portblue: "var(--portblue)",
        portred: "var(--portred)",
        portgray: "var(--portgray)",
        portgreen: "var(--portgreen)",
        portyellow: "var(--portyellow)",
      },
    },
  },
  plugins: [],
};
