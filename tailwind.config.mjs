/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#FBF5F6',
          100: '#F6E8EA',
          200: '#EDC9D0',
          300: '#E1A3AE',
          400: '#D07384',
          500: '#B84D62',
          600: '#9A3549',
          700: '#6D1830',
          800: '#48101F',
          900: '#2A0912'
        },
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F6',
          200: '#F3EFEA',
          300: '#E8E3E1',
          400: '#D4CDC8'
        },
        ink: {
          900: '#171717',
          800: '#262626',
          700: '#404040',
          600: '#525252',
          500: '#666666'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(109, 24, 48, 0.08)',
        card: '0 4px 30px -8px rgba(0, 0, 0, 0.08)',
        hover: '0 12px 40px -12px rgba(109, 24, 48, 0.18)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem'
        },
        screens: {
          '2xl': '1320px'
        }
      }
    }
  },
  plugins: []
};
