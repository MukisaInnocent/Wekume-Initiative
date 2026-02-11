import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)'
                    : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #f97316 100%)'
            }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Sliding knob */}
            <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out flex items-center justify-center
                    ${isDark ? 'translate-x-7 bg-indigo-900 shadow-indigo-500/40' : 'translate-x-0 bg-white shadow-orange-300/50'}
                `}
            >
                {isDark ? (
                    <Moon size={12} className="text-blue-200 transition-all duration-300" />
                ) : (
                    <Sun size={12} className="text-amber-500 transition-all duration-300" />
                )}
            </span>

            {/* Stars for dark mode */}
            <span className={`absolute right-2 top-1.5 w-1 h-1 rounded-full bg-white transition-all duration-500 ${isDark ? 'opacity-80 scale-100' : 'opacity-0 scale-0'}`}></span>
            <span className={`absolute right-3.5 top-3 w-0.5 h-0.5 rounded-full bg-blue-200 transition-all duration-500 delay-100 ${isDark ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}></span>
            <span className={`absolute right-1.5 top-3.5 w-0.5 h-0.5 rounded-full bg-white transition-all duration-500 delay-200 ${isDark ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}></span>

            {/* Sun rays for light mode */}
            <span className={`absolute left-8 top-1 w-1.5 h-0.5 rounded-full bg-yellow-200 transition-all duration-500 ${isDark ? 'opacity-0 scale-0' : 'opacity-80 scale-100'}`}></span>
            <span className={`absolute left-9.5 top-3 w-1 h-0.5 rounded-full bg-orange-200 transition-all duration-500 delay-100 ${isDark ? 'opacity-0 scale-0' : 'opacity-60 scale-100'}`}></span>
        </button>
    );
}

export default ThemeToggle;
