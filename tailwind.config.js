/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#f9fafb',
        'create': 'rgb(16, 185, 129)',
        'edit': 'rgb(59, 130, 246)',
        'delete': 'rgb(239, 68, 68)',
      },
    },
  },
  plugins: [],
}