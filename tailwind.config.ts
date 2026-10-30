import type { Config } from 'tailwindcss'

/**
 * Tailwind is the consumption layer for the tokens defined in app/theme.css.
 *
 * Every utility here resolves to a `var(--token)`, never to a literal value.
 * That is what makes a rebrand a one-file change: editing app/theme.css
 * restyles every component in the app without a class rename.
 *
 * Two exceptions, both deliberate:
 *   - `brand.*` reads RGB channel variables so opacity modifiers work
 *     (`bg-brand-600/50`). Decorative use only; UI code prefers semantic tokens.
 *   - `screens` holds literal pixel values because CSS custom properties are
 *     not valid inside `@media` conditions. Tailwind's defaults match, so these
 *     are re-declared explicitly to document the project's breakpoints rather
 *     than to change them.
 *
 * See app/theme.css for the token definitions and their measured contrast
 * ratios.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    /**
     * Breakpoints. The acceptance criteria call out 360px, 768px and 1280px:
     * 360px falls under `sm` and takes base styles; 768px is exactly `md`;
     * 1280px is exactly `xl`. Mobile-first, so base styles are the 360px case.
     */
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    /**
     * Semantic colour. The keys are roles, not colours: `text-ink-muted` keeps
     * working after the palette changes to navy; `text-stone-600` would not.
     *
     * Brand ramp uses the `<alpha-value>` channel syntax so `bg-brand-500/40`
     * compiles correctly.
     */
    colors: {
      canvas: 'var(--color-canvas)',
      surface: {
        DEFAULT: 'var(--color-surface)',
        muted: 'var(--color-surface-muted)',
        inverse: 'var(--color-inverse-bg)',
      },
      line: {
        DEFAULT: 'var(--color-line)',
        strong: 'var(--color-line-strong)',
      },
      ink: {
        DEFAULT: 'var(--color-ink)',
        muted: 'var(--color-ink-muted)',
        inverse: 'var(--color-ink-inverse)',
        'inverse-muted': 'var(--color-ink-inverse-muted)',
      },
      action: {
        DEFAULT: 'var(--color-action)',
        hover: 'var(--color-action-hover)',
        text: 'var(--color-action-text)',
        subtle: 'var(--color-action-subtle)',
      },
      link: 'var(--color-link)',
      focus: 'var(--color-focus)',
      brand: {
        50: 'rgb(var(--color-brand-50) / <alpha-value>)',
        100: 'rgb(var(--color-brand-100) / <alpha-value>)',
        200: 'rgb(var(--color-brand-200) / <alpha-value>)',
        300: 'rgb(var(--color-brand-300) / <alpha-value>)',
        400: 'rgb(var(--color-brand-400) / <alpha-value>)',
        500: 'rgb(var(--color-brand-500) / <alpha-value>)',
        600: 'rgb(var(--color-brand-600) / <alpha-value>)',
        700: 'rgb(var(--color-brand-700) / <alpha-value>)',
        800: 'rgb(var(--color-brand-800) / <alpha-value>)',
        900: 'rgb(var(--color-brand-900) / <alpha-value>)',
      },
    },

    /**
     * Type scale. Replaces Tailwind's default rather than extending it, so the
     * set of sizes is deliberately curated — an untokenised `text-8xl` should
     * not be reachable without adding it to app/theme.css first.
     */
    fontSize: {
      xs: ['var(--font-size-xs)', { lineHeight: 'var(--leading-snug)' }],
      sm: ['var(--font-size-sm)', { lineHeight: 'var(--leading-snug)' }],
      base: ['var(--font-size-base)', { lineHeight: 'var(--leading-normal)' }],
      lg: ['var(--font-size-lg)', { lineHeight: 'var(--leading-normal)' }],
      xl: ['var(--font-size-xl)', { lineHeight: 'var(--leading-snug)' }],
      '2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--leading-tight)' }],
      '3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--leading-tight)' }],
      '4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--leading-tight)' }],
      '5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--leading-tight)' }],
    },

    fontWeight: {
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
    },

    borderRadius: {
      none: '0px',
      sm: 'var(--radius-sm)',
      DEFAULT: 'var(--radius-md)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      full: '9999px',
    },

    boxShadow: {
      none: '0 0 #0000',
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow-md)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
    },

    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },

      /**
       * Tailwind's numeric scale (p-4, gap-6, ...) remains the base spacing
       * scale. These named steps cover the page rhythm that sections share and
       * that varies per breakpoint: `py-section-y md:py-section-y-lg`.
       */
      spacing: {
        'section-y': 'var(--space-section-y)',
        'section-y-lg': 'var(--space-section-y-lg)',
        'section-x': 'var(--space-section-x)',
        'section-x-lg': 'var(--space-section-x-lg)',
      },

      maxWidth: {
        content: 'var(--content-max-width)',
        prose: 'var(--content-text-max-width)',
      },
    },
  },
  plugins: [],
}

export default config
