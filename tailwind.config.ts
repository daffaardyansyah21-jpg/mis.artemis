import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors — Artemis palette
        artemis: {
          50:  '#f0f0ff',
          100: '#e4e0ff',
          200: '#ccc5ff',
          300: '#a99aff',
          400: '#8264ff',
          500: '#6b3fff',
          600: '#5c1fff',
          700: '#4f14eb',
          800: '#4013c4',
          900: '#36119f',
          950: '#1f0769',
        },
        // Neon cyan accent
        neon: {
          cyan:    '#06d6f5',
          purple:  '#a855f7',
          green:   '#10f5a0',
          pink:    '#f50596',
          yellow:  '#f5e206',
          orange:  '#f56206',
        },
        // Glass overlay
        glass: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          border:  'rgba(255,255,255,0.08)',
          hover:   'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        body:    ['var(--font-space-grotesk)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        // Aurora gradient animations referenced in globals.css
        'aurora-1': 'linear-gradient(135deg, #6b3fff 0%, #06d6f5 50%, #10f5a0 100%)',
        'aurora-2': 'linear-gradient(225deg, #a855f7 0%, #06d6f5 50%, #6b3fff 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': `
          linear-gradient(rgba(6,214,245,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,214,245,0.03) 1px, transparent 1px)
        `,
      },
      boxShadow: {
        'neon-cyan':   '0 0 20px rgba(6,214,245,0.4), 0 0 60px rgba(6,214,245,0.1)',
        'neon-purple': '0 0 20px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.1)',
        'neon-green':  '0 0 20px rgba(16,245,160,0.4), 0 0 60px rgba(16,245,160,0.1)',
        'glass':       '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
        'card':        '0 4px 24px rgba(0,0,0,0.3)',
      },
      animation: {
        'aurora':          'aurora 12s ease-in-out infinite alternate',
        'aurora-fast':     'aurora 6s ease-in-out infinite alternate',
        'float':           'float 6s ease-in-out infinite',
        'pulse-neon':      'pulse-neon 2s ease-in-out infinite',
        'scan-line':       'scan-line 3s linear infinite',
        'fade-up':         'fade-up 0.6s ease-out forwards',
        'glow-rotate':     'glow-rotate 4s linear infinite',
        'slide-in-right':  'slide-in-right 0.4s ease-out forwards',
        'slide-in-left':   'slide-in-left 0.4s ease-out forwards',
        'counter':         'counter 0.4s ease-out forwards',
      },
      keyframes: {
        aurora: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-rotate': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl':  '1rem',
        '3xl':  '1.5rem',
        '4xl':  '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
