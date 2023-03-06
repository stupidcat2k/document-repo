module.exports = {
  // important: true,
  content: [
    './src/**/*.{html,js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}