/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1714',
        charcoal: '#262019',
        gold: '#C9A24B',
        'gold-light': '#E0C170',
        cream: '#F5EFE2',
        sand: '#A89C88',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.08' }],
        h2: ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.15' }],
        h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
