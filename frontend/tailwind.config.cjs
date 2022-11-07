/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'Quicksand': ['Quicksand'],
      },
      backgroundImage: {
        'placeholder': "url(/images/photo.svg)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
