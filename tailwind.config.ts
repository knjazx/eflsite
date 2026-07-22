import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#00E676',
        'primary-dark': '#00C853',
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-card': '#151515',
        'border': 'rgba(255, 255, 255, 0.1)',
        'text-primary': '#ffffff',
        'text-muted': 'rgba(255, 255, 255, 0.6)',
        'text-dim': 'rgba(255, 255, 255, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
