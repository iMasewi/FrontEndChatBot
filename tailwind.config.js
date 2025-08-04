// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {  
    screens:{
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1140px',
      '2xl': '1140px'
    },
    extend: {},
  },
  plugins: [],
}
