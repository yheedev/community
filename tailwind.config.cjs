/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  //     // "./node_modules/@gluestack-ui/themed/dist/**/*.js",
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
