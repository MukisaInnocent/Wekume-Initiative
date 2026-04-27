/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#010101',
            white: '#ffffff',

            // ── Gray Scale (Cream → Deep Plum) — Contrast-stepped ──────────
            gray: {
                50:  '#fefefe',    // near-white
                100: '#f2f5d1',    // cream (brand surface)
                200: '#e8e0d8',    // warm light gray
                300: '#c4b5be',    // muted mauve-gray
                400: '#9e8a96',    // medium warm gray
                500: '#7d6a77',    // body text — good contrast on white
                600: '#5e4a56',    // strong text
                700: '#432a38',    // dark plum-gray
                800: '#2d1622',    // deep plum
                900: '#1a0a12',    // near-black plum
                950: '#010101',    // pure black
            },

            // ── Aliases — same scale for Tailwind utility compatibility ──
            slate:   { 50: '#fefefe', 100: '#f2f5d1', 200: '#e8e0d8', 300: '#c4b5be', 400: '#9e8a96', 500: '#7d6a77', 600: '#5e4a56', 700: '#432a38', 800: '#2d1622', 900: '#1a0a12', 950: '#010101' },
            zinc:    { 50: '#fefefe', 100: '#f2f5d1', 200: '#e8e0d8', 300: '#c4b5be', 400: '#9e8a96', 500: '#7d6a77', 600: '#5e4a56', 700: '#432a38', 800: '#2d1622', 900: '#1a0a12', 950: '#010101' },
            neutral: { 50: '#fefefe', 100: '#f2f5d1', 200: '#e8e0d8', 300: '#c4b5be', 400: '#9e8a96', 500: '#7d6a77', 600: '#5e4a56', 700: '#432a38', 800: '#2d1622', 900: '#1a0a12', 950: '#010101' },
            stone:   { 50: '#fefefe', 100: '#f2f5d1', 200: '#e8e0d8', 300: '#c4b5be', 400: '#9e8a96', 500: '#7d6a77', 600: '#5e4a56', 700: '#432a38', 800: '#2d1622', 900: '#1a0a12', 950: '#010101' },

            // ── Primary / Pink ─────────────────────────────────────────────
            primary: {
                50:  '#fdf2f5',
                100: '#fae6ec',
                200: '#f7b2d0',  // Soft Pink
                300: '#f389ab',
                400: '#ee7099',
                500: '#ea638c',  // Primary Pink ★
                600: '#d14a73',
                700: '#b8345c',
                800: '#912244',
                900: '#7a1835',
                950: '#341525',
            },
            pink: {
                50:  '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f389ab',
                400: '#ee7099', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c',
                800: '#912244', 900: '#7a1835', 950: '#341525',
            },
            rose: {
                50:  '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f389ab',
                400: '#ee7099', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c',
                800: '#912244', 900: '#7a1835', 950: '#341525',
            },
            red: {
                // Keep true-ish red for error states (deviates from brand but needed for UX)
                50:  '#fff0f0', 100: '#ffe0e0', 200: '#ffbdbd', 300: '#ff8a8a',
                400: '#ff5252', 500: '#f03030', 600: '#d91b1b', 700: '#b81616',
                800: '#911414', 900: '#701212', 950: '#4a0a0a',
            },

            // ── Secondary / Purple ─────────────────────────────────────────
            secondary: {
                50:  '#f5ebff',
                100: '#ecd6ff',
                200: '#d9adff',
                300: '#c685ff',
                400: '#b35cff',
                500: '#7d52a0',  // Muted Purple ★
                600: '#6a4490',
                700: '#5e3a7a',
                800: '#4b2a62',
                900: '#341525',  // Deep Maroon ★
                950: '#1a0a12',
            },
            purple: {
                50:  '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff',
                400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc',
                800: '#610099', 900: '#470070', 950: '#2d0050',
            },
            violet: {
                50:  '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff',
                400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc',
                800: '#610099', 900: '#470070', 950: '#2d0050',
            },
            indigo: {
                50:  '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff',
                400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc',
                800: '#610099', 900: '#470070', 950: '#2d0050',
            },
            blue: {
                // True blue for info/link states
                50:  '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
                400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
                800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
            },

            // ── Accent / Orange ────────────────────────────────────────────
            accent: {
                50:  '#fff5ed',
                100: '#ffebdb',
                200: '#ffd0b0',
                300: '#ffb585',
                400: '#faa166',
                500: '#f89d61',  // Accent Orange ★
                600: '#e58040',
                700: '#cc6a2c',
                800: '#a34e1a',
                900: '#80380f',
            },
            orange: {
                50:  '#fff5ed', 100: '#ffebdb', 200: '#ffd0b0', 300: '#ffb585',
                400: '#faa166', 500: '#f89d61', 600: '#e58040', 700: '#cc6a2c',
                800: '#a34e1a', 900: '#80380f',
            },
            amber: {
                50:  '#fff5ed', 100: '#ffebdb', 200: '#ffd0b0', 300: '#ffb585',
                400: '#faa166', 500: '#f89d61', 600: '#e58040', 700: '#cc6a2c',
                800: '#a34e1a', 900: '#80380f',
            },
            yellow: {
                // True yellow for stars/highlights
                50:  '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
                400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
                800: '#854d0e', 900: '#713f12', 950: '#422006',
            },

            // ── Green — TRUE green for success states ──────────────────────
            green: {
                50:  '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
                400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
                800: '#166534', 900: '#14532d', 950: '#052e16',
            },
            emerald: {
                50:  '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
                400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
                800: '#065f46', 900: '#064e3b', 950: '#022c22',
            },
            teal: {
                50:  '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
                400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
                800: '#115e59', 900: '#134e4a', 950: '#042f2e',
            },
            sky: {
                50:  '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
                400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
                800: '#075985', 900: '#0c4a6e', 950: '#082f49',
            },
            cyan: {
                50:  '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
                400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
                800: '#155e75', 900: '#164e63', 950: '#083344',
            },
            fuchsia: {
                50:  '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f389ab',
                400: '#ee7099', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c',
                800: '#912244', 900: '#7a1835',
            },

            // ── Brand Aliases ───────────────────────────────────────────────
            darkTone: {
                DEFAULT: '#341525',
                plum: '#341525',
                black: '#010101',
            },
            brand: {
                white: '#ffffff',
                cream: '#f2f5d1',
                black: '#010101',
                plum: '#341525',
                pink: '#ea638c',
                softPink: '#f7b2d0',
                purple: '#7d52a0',
                orange: '#f89d61',
                highlight: '#9e00ff',
            },
        },

        extend: {
            fontFamily: {
                sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                heading: ['Outfit', 'Inter', 'sans-serif'],
                mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
                '2xs': ['0.65rem', { lineHeight: '1rem' }],
            },
            backgroundImage: {
                'gradient-primary':   'linear-gradient(135deg, #ea638c 0%, #9e00ff 100%)',
                'gradient-purple':    'linear-gradient(135deg, #7d52a0 0%, #341525 100%)',
                'gradient-accent':    'linear-gradient(135deg, #f89d61 0%, #ea638c 100%)',
                'gradient-brand':     'linear-gradient(135deg, #ea638c 0%, #7d52a0 50%, #f89d61 100%)',
                'gradient-dark':      'linear-gradient(135deg, #341525 0%, #010101 100%)',
                'gradient-warm-dark': 'linear-gradient(135deg, #1a0a12 0%, #341525 50%, #010101 100%)',
            },
            boxShadow: {
                'pink':          '0 8px 32px rgba(234, 99, 140, 0.25)',
                'pink-lg':       '0 16px 48px rgba(234, 99, 140, 0.35)',
                'purple':        '0 8px 32px rgba(125, 82, 160, 0.25)',
                'purple-lg':     '0 16px 48px rgba(125, 82, 160, 0.35)',
                'orange':        '0 8px 32px rgba(248, 157, 97, 0.25)',
                'highlight':     '0 8px 32px rgba(158, 0, 255, 0.30)',
                'inner-brand':   'inset 0 2px 8px rgba(234, 99, 140, 0.15)',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            animation: {
                'fade-in':        'fadeIn 0.5s ease-out forwards',
                'fade-in-scale':  'fadeInScale 0.4s ease-out forwards',
                'slide-in-left':  'slideInLeft 0.5s ease-out forwards',
                'pulse-slow':     'pulseSoft 3s ease-in-out infinite',
                'bounce-soft':    'bounceSoft 2s infinite',
                'shimmer':        'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn:       { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                fadeInScale:  { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
                slideInLeft:  { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
                pulseSoft:    { '0%, 100%': { transform: 'scale(1)', opacity: '0.85' }, '50%': { transform: 'scale(1.04)', opacity: '1' } },
                bounceSoft:   { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
                shimmer:      { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
            },
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
            },
        },
    },
    plugins: [],
}
