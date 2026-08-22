/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'risk-low': '#10b981',
        'risk-medium': '#f59e0b',
        'risk-high': '#ef4444',
        'risk-uncertain': '#8b5cf6',
        'surface': '#0f172a',
        'surface-elevated': '#1e293b',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
      },
      fontSize: {
        'body': '16px',
        'sm-body': '14px',
      },
      lineHeight: {
        'comfortable': '1.6',
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        'fast': '120ms',
        'normal': '150ms',
      },
    },
  },
  plugins: [],
};
