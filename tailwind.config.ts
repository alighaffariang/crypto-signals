import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { ember: '#ff6a00', oxblood: '#4b0508', gold: '#ffc45c' },
      fontFamily: { display: ['var(--font-display)', 'serif'], sans: ['var(--font-sans)', 'sans-serif'] },
      boxShadow: { crystal: '0 30px 90px rgba(255,106,0,.2), inset 0 1px 0 rgba(255,255,255,.25)' }
    }
  },
  plugins: []
};
export default config;
