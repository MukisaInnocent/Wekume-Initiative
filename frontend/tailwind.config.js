/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            '3xl': '1920px',
        },
        extend: {
            colors: {
                // Primary Brand Color - Pink/Red
                primary: {
                    50: '#fef1f4',
                    100: '#fde3e9',
                    200: '#fcc7d4',
                    300: '#f7b2d0', // Soft pink accent
                    400: '#f39bad',
                    500: '#ea638c', // PRIMARY BRAND COLOR
                    600: '#d94575',
                    700: '#b93360',
                    800: '#9a2a51',
                    900: '#7d2445',
                },
                // Secondary Brand Color - Purple
                purple: {
                    50: '#f3e5ff',
                    100: '#e6ccff',
                    200: '#cc99ff',
                    300: '#b366ff',
                    400: '#9933ff',
                    500: '#6900A8', // PRIMARY PURPLE BRAND COLOR
                    600: '#530085',
                    700: '#3d0062',
                    800: '#2a0043',
                    900: '#1a0029',
                },
                // Secondary Brand Color - Aliased to Purple for consistency
                secondary: {
                    50: '#f3e5ff',
                    100: '#e6ccff',
                    200: '#cc99ff',
                    300: '#b366ff',
                    400: '#9933ff',
                    500: '#6900A8',
                    600: '#530085',
                    700: '#3d0062',
                    800: '#2a0043',
                    900: '#1a0029',
                },
                // Orange Accent
                orange: {
                    50: '#fef5ee',
                    100: '#fde9d7',
                    200: '#fbcfae',
                    300: '#f8b07b',
                    400: '#f89d61', // ORANGE ACCENT
                    500: '#f47f42',
                    600: '#e56328',
                    700: '#be4c1e',
                    800: '#973d1d',
                    900: '#7a341b',
                },
                // Pink variant (keeping for backward compatibility)
                pink: {
                    50: '#fef1f4',
                    100: '#fde3e9',
                    200: '#fcc7d4',
                    300: '#f7b2d0', // Soft pink
                    400: '#f39bad',
                    500: '#ea638c',
                    600: '#d94575',
                    700: '#b93360',
                    800: '#9a2a51',
                    900: '#7d2445',
                },
                // Special Accents
                accent: {
                    vivid: '#6900A8', // Vivid purple highlight
                    light: '#f2f5d1', // Light background highlight
                    DEFAULT: '#f89d61', // Orange for backward compatibility
                },
                // Dark tones (renamed from 'dark' to avoid conflict with darkMode variant)
                darkTone: {
                    DEFAULT: '#341525',
                    plum: '#341525', // Dark plum
                    black: '#010101', // Black emphasis
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #ea638c 0%, #6900A8 100%)',
                'gradient-purple': 'linear-gradient(135deg, #6900A8 0%, #1a0029 100%)',
                'gradient-accent': 'linear-gradient(135deg, #f89d61 0%, #6900A8 100%)',
            },
        },
    },
    plugins: [],
}
