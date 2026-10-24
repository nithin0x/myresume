/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // Layout spacing is always a multiple of the 8px base unit.
    spacing: Object.fromEntries(Array.from({ length: 33 }, (_, i) => [i * 2, `${i * 8}px`])),
    extend: {
      colors: {
        base: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-mono)', 'monospace'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
