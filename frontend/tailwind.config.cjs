/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'Quicksand': ['Quicksand'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
