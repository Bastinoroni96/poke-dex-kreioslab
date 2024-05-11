// tailwind.config.js

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Define custom colors if needed
      },
      fontFamily: {
        // Define custom fonts if needed
      },
      screens: {
        // Define custom breakpoints for responsive design
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
