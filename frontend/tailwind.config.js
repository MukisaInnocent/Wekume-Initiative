/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
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
                    50: '#f5f1f9',
                    100: '#ebe3f3',
                    200: '#d9cae8',
                    300: '#bea6d6',
                    400: '#9f7bbf',
                    500: '#7d52a0', // DEEP PURPLE CONTRAST
                    600: '#66418a',
                    700: '#543570',
                    800: '#472e5e',
                    900: '#341525', // DARK PLUM
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
                    vivid: '#9e00ff', // Vivid purple highlight
                    light: '#f2f5d1', // Light background highlight
                    DEFAULT: '#f89d61', // Orange for backward compatibility
                },
                // Dark tones
                dark: {
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
                'gradient-primary': 'linear-gradient(135deg, #ea638c 0%, #7d52a0 100%)',
                'gradient-purple': 'linear-gradient(135deg, #7d52a0 0%, #341525 100%)',
                'gradient-accent': 'linear-gradient(135deg, #f89d61 0%, #9e00ff 100%)',
            },
        },
    },
    plugins: [],
}
