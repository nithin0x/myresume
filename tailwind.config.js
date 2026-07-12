/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050508',
        'bg-secondary': '#0a0a14',
        'bg-card': '#0d0d1a',
        'bg-card-hover': '#111120',
        'cyan': '#00d4ff',
        'green-neon': '#00ff41',
        'purple-neon': '#7b2fff',
        'text-muted': '#4a5568',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Space Grotesk', 'Inter', 'sans-serif'],
      },
      keyframes: {
        glitch1: {
          '0%, 100%': { clipPath: 'none', transform: 'translate(0)' },
          '10%': { clipPath: 'polygon(0 30%, 100% 30%, 100% 40%, 0 40%)', transform: 'translate(-3px)' },
          '20%': { clipPath: 'polygon(0 65%, 100% 65%, 100% 78%, 0 78%)', transform: 'translate(3px)' },
          '30%': { clipPath: 'none', transform: 'translate(0)' },
          '60%': { clipPath: 'polygon(0 15%, 100% 15%, 100% 25%, 0 25%)', transform: 'translate(-2px)' },
          '70%': { clipPath: 'none', transform: 'translate(0)' },
        },
        glitch2: {
          '0%, 100%': { clipPath: 'none', transform: 'translate(0)' },
          '15%': { clipPath: 'polygon(0 10%, 100% 10%, 100% 20%, 0 20%)', transform: 'translate(3px)' },
          '25%': { clipPath: 'polygon(0 55%, 100% 55%, 100% 68%, 0 68%)', transform: 'translate(-3px)' },
          '35%': { clipPath: 'none', transform: 'translate(0)' },
          '55%': { clipPath: 'polygon(0 40%, 100% 40%, 100% 50%, 0 50%)', transform: 'translate(2px)' },
          '65%': { clipPath: 'none', transform: 'translate(0)' },
        },
        scanline: {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,212,255,0.3), 0 0 30px rgba(0,212,255,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.2)' },
        },
      },
      animation: {
        glitch1: 'glitch1 4s infinite',
        glitch2: 'glitch2 4s infinite',
        scanline: 'scanline 4s linear infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
