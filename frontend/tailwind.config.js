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
            
            // Mapped Grays (Cream to Plum) - Refined for visibility
            gray: {
                50: '#ffffff', // White
                100: '#f2f5d1', // Cream
                200: '#f2f5d1', // Cream
                300: '#f7b2d0', // Soft Pink (Light enough for light backgrounds)
                400: '#7d52a0', // Muted Purple
                500: '#7d52a0', // Muted Purple
                600: '#7d52a0', // Muted Purple
                700: '#341525', // Plum
                800: '#341525', // Plum
                900: '#1a0a12', // Deep Plum
                950: '#010101', // Black
            },
            slate: { 50: '#ffffff', 100: '#f2f5d1', 200: '#f2f5d1', 300: '#f7b2d0', 400: '#7d52a0', 500: '#7d52a0', 600: '#7d52a0', 700: '#341525', 800: '#341525', 900: '#1a0a12', 950: '#010101' },
            zinc: { 50: '#ffffff', 100: '#f2f5d1', 200: '#f2f5d1', 300: '#f7b2d0', 400: '#7d52a0', 500: '#7d52a0', 600: '#7d52a0', 700: '#341525', 800: '#341525', 900: '#1a0a12', 950: '#010101' },
            neutral: { 50: '#ffffff', 100: '#f2f5d1', 200: '#f2f5d1', 300: '#f7b2d0', 400: '#7d52a0', 500: '#7d52a0', 600: '#7d52a0', 700: '#341525', 800: '#341525', 900: '#1a0a12', 950: '#010101' },
            stone: { 50: '#ffffff', 100: '#f2f5d1', 200: '#f2f5d1', 300: '#f7b2d0', 400: '#7d52a0', 500: '#7d52a0', 600: '#7d52a0', 700: '#341525', 800: '#341525', 900: '#1a0a12', 950: '#010101' },

            // Mapped Primary/Pink/Red
            primary: {
                50: '#fdf2f5',
                100: '#fae6ec',
                200: '#f7b2d0', // Light Pink
                300: '#f7b2d0', // Light Pink
                400: '#f389ab',
                500: '#ea638c', // Pink
                600: '#d14a73',
                700: '#b8345c',
                800: '#912244',
                900: '#7a1835',
            },
            pink: { 50: '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f7b2d0', 400: '#f389ab', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c', 800: '#912244', 900: '#7a1835' },
            red: { 50: '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f7b2d0', 400: '#f389ab', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c', 800: '#912244', 900: '#7a1835' },
            rose: { 50: '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f7b2d0', 400: '#f389ab', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c', 800: '#912244', 900: '#7a1835' },

            // Mapped Purple/Blue/Green
            purple: {
                50: '#f5ebff',
                100: '#ecd6ff',
                200: '#d9adff',
                300: '#c685ff',
                400: '#b35cff',
                500: '#7d52a0', // Muted Purple
                600: '#9e00ff', // Neon Purple
                700: '#8000cc',
                800: '#610099',
                900: '#470070',
            },
            blue: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            indigo: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            violet: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            green: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            emerald: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            sky: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            cyan: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },

            // Mapped Orange/Yellow
            orange: {
                50: '#fff5ed',
                100: '#ffebdb',
                200: '#ffd0b0',
                300: '#ffb585',
                400: '#faa166',
                500: '#f89d61', // Orange
                600: '#e58040',
                700: '#cc6a2c',
                800: '#a34e1a',
                900: '#80380f',
            },
            yellow: { 50: '#fff5ed', 100: '#ffebdb', 200: '#ffd0b0', 300: '#ffb585', 400: '#faa166', 500: '#f89d61', 600: '#e58040', 700: '#cc6a2c', 800: '#a34e1a', 900: '#80380f' },
            amber: { 50: '#fff5ed', 100: '#ffebdb', 200: '#ffd0b0', 300: '#ffb585', 400: '#faa166', 500: '#f89d61', 600: '#e58040', 700: '#cc6a2c', 800: '#a34e1a', 900: '#80380f' },

            // Extras mapped for compatibility
            teal: { 50: '#f5ebff', 100: '#ecd6ff', 200: '#d9adff', 300: '#c685ff', 400: '#b35cff', 500: '#7d52a0', 600: '#9e00ff', 700: '#8000cc', 800: '#610099', 900: '#470070' },
            fuchsia: { 50: '#fdf2f5', 100: '#fae6ec', 200: '#f7b2d0', 300: '#f7b2d0', 400: '#f389ab', 500: '#ea638c', 600: '#d14a73', 700: '#b8345c', 800: '#912244', 900: '#7a1835' },

            // Core Aliases used previously
            darkTone: {
                DEFAULT: '#341525',
                plum: '#341525',
                black: '#010101',
            },
            accent: {
                vivid: '#9e00ff',
                light: '#f2f5d1',
                DEFAULT: '#f89d61',
            },
            brand: {
                white: '#ffffff',
                cream: '#f2f5d1',
                black: '#010101',
                plum: '#341525',
            }
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #ea638c 0%, #9e00ff 100%)',
                'gradient-purple': 'linear-gradient(135deg, #7d52a0 0%, #341525 100%)',
                'gradient-accent': 'linear-gradient(135deg, #f89d61 0%, #ea638c 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'scale-up': 'scaleUp 0.3s ease-out forwards',
                'pulse-slow': 'pulseSlow 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleUp: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseSlow: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
