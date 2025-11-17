import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tim Kilroy Brand Colors
        brand: {
          red: '#E51B23',      // Primary brand color - headlines, CTAs, accents
          black: '#000000',    // Body text, backgrounds, authority
          yellow: '#FFDE59',   // Highlights, energy, attention
        },
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a7',
          400: '#f87171',
          500: '#E51B23',      // Brand red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],      // Headlines/Titles - bold, condensed, impactful
        poppins: ['Poppins', 'sans-serif'],  // Body Text - clean, modern, readable
      },
    },
  },
  plugins: [],
}
export default config
