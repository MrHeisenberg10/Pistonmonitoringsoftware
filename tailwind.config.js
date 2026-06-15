/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          accent: '#14B8A6',
        },
        navy: {
          dark: '#1E2230',
        },
        status: {
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
        },
        bg: {
          neutral: '#F4F6F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
