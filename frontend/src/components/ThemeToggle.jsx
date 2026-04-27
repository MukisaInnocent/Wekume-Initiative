import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`
                relative w-10 h-10 rounded-full flex items-center justify-center
                bg-gray-100 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-600 dark:text-gray-300
                hover:bg-primary-100 dark:hover:bg-primary-900/30
                hover:text-primary-600 dark:hover:text-primary-300
                hover:border-primary-300 dark:hover:border-primary-700
                hover:shadow-pink
                transition-all duration-250 hover:scale-110 active:scale-95
                ${className}
            `}
        >
            <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            {isDark ? (
                <Sun size={18} className="text-orange-400 drop-shadow-sm" aria-hidden="true" />
            ) : (
                <Moon size={18} className="text-gray-600" aria-hidden="true" />
            )}
        </button>
    );
}

export default ThemeToggle;
