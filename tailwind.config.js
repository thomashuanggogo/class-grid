/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          border: 'rgba(148, 163, 184, 0.1)',
        },
        primary: {
          gradient: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
