import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Semantic color tokens backed by CSS variables ──────────────────
      // These bridge the global design system (CSS vars) with Tailwind
      // so both component CSS (@apply) and template classes share one source
      // of truth – the :root / .dark variables defined in styles.css.
      colors: {
        // Brand
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover:   'var(--color-primary-hover)',
          dark:    'var(--color-primary-dark)',
          light:   'var(--color-primary-light)',
          muted:   'var(--color-primary-muted)',
        },
        secondary: 'var(--color-secondary)',
        accent:    'var(--color-accent)',

        // Semantic states
        success: { DEFAULT: 'var(--color-success)', muted: 'var(--color-success-muted)' },
        warning: { DEFAULT: 'var(--color-warning)', muted: 'var(--color-warning-muted)' },
        error:   { DEFAULT: 'var(--color-error)',   muted: 'var(--color-error-muted)'   },
        info:    { DEFAULT: 'var(--color-info)',    muted: 'var(--color-info-muted)'    },

        // Surface system (light/dark aware via CSS vars)
        surface: {
          bg:      'var(--surface-bg)',
          card:    'var(--surface-card)',
          border:  'var(--surface-border)',
          divider: 'var(--surface-divider)',
        },

        // Sidebar palette
        sidebar: {
          bg:     'var(--sidebar-bg)',
          border: 'var(--sidebar-border)',
          hover:  'var(--sidebar-item-hover)',
          active: 'var(--sidebar-item-active)',
          text:   'var(--sidebar-text)',
          accent: 'var(--sidebar-accent)',
        },

        // Neutral scale (mirrors --gray-* CSS vars; dark mode swaps via .dark)
        gray: {
          25:  'var(--gray-25)',
          50:  'var(--gray-50)',
          100: 'var(--gray-100)',
          150: 'var(--gray-150)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },

        // Fixed palette overrides (used in inline template classes)
        indigo: {
          50:  '#f0f4ff',
          100: '#e6edff',
          200: '#cddaff',
          300: '#a4b5ff',
          400: '#7c8aff',
          500: '#4f6ef7', // aligned with --color-primary
          600: '#3d5ce6', // aligned with --color-primary-hover
          700: '#2a45d4', // aligned with --color-primary-dark
          800: '#1e3abf',
          900: '#1230a8',
        },
        emerald: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        slate: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },

      // ── Typography ────────────────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter Tight', 'system-ui', 'sans-serif'],
      },

      // ── Shadows backed by CSS variables ───────────────────────────────
      boxShadow: {
        none:        'none',
        xs:          'var(--shadow-xs)',
        sm:          'var(--shadow-sm)',
        DEFAULT:     'var(--shadow-md)',
        md:          'var(--shadow-md)',
        lg:          'var(--shadow-lg)',
        xl:          'var(--shadow-xl)',
        '2xl':       'var(--shadow-2xl)',
        card:        'var(--card-shadow)',
        'card-hover':'var(--card-shadow-hover)',
      },

      // ── Border radius ─────────────────────────────────────────────────
      borderRadius: {
        none:    '0',
        xs:      'var(--radius-xs)',
        sm:      'var(--radius-sm)',
        DEFAULT: 'var(--radius-base)',
        base:    'var(--radius-base)',
        md:      'var(--radius-md)',
        lg:      'var(--radius-lg)',
        xl:      'var(--radius-xl)',
        '2xl':   'var(--radius-2xl)',
        full:    '9999px',
      },

      // ── Transitions ───────────────────────────────────────────────────
      transitionDuration: {
        0:    '0ms',
        75:   '75ms',
        100:  '100ms',
        150:  '150ms',
        200:  '200ms',
        300:  '300ms',
        500:  '500ms',
        700:  '700ms',
        1000: '1000ms',
      },

      // ── Animations ────────────────────────────────────────────────────
      // Keyframes defined here match the @keyframes in styles.css.
      // Use as: class="animate-fade-in animate-slide-up" etc.
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.55' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        'bounce-in': {
          '0%':   { transform: 'scale(0.3)',  opacity: '0' },
          '50%':  { transform: 'scale(1.08)', opacity: '1' },
          '70%':  { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'draw-circle': {
          from: { strokeDashoffset: '283' },
          to:   { strokeDashoffset: '0' },
        },
      },
      animation: {
        none:          'none',
        'fade-in':     'fade-in 200ms ease-out forwards',
        'slide-up':    'slide-up 320ms ease-out forwards',
        'slide-down':  'slide-down 320ms ease-out forwards',
        'scale-in':    'scale-in 320ms ease-out forwards',
        'pulse-soft':  'pulse-soft 2s ease-in-out infinite',
        float:         'float 3s ease-in-out infinite',
        shimmer:       'shimmer 1.6s infinite linear',
        'bounce-in':   'bounce-in 500ms ease-out forwards',
        blink:         'blink 1s step-end infinite',
        spin:          'spin 1s linear infinite',
        ping:          'ping 1s cubic-bezier(0,0,0.2,1) infinite',
        pulse:         'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        bounce:        'bounce 1s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
