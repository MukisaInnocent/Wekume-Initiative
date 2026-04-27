import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Accordion — Reusable collapsible section component.
 * Works on both dark backgrounds (Contact page) and light mode.
 */
export default function Accordion({
    title,
    icon,
    children,
    defaultOpen = false,
    className = '',
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div
            className={`
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl overflow-hidden
                transition-all duration-300
                shadow-lg shadow-black/20
                ${isOpen ? 'border-white/15' : ''}
                ${className}
            `}
        >
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-4 sm:px-6 sm:py-5
                           flex items-center justify-between text-left
                           hover:bg-white/5 active:bg-white/10
                           transition-colors duration-150
                           focus:outline-none focus-visible:ring-2
                           focus-visible:ring-primary-500/50 focus-visible:ring-inset"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center
                                       bg-gradient-to-br from-primary-500/20 to-secondary-500/20
                                       text-primary-300 border border-white/8
                                       group-hover:scale-110 transition-transform"
                            aria-hidden="true"
                        >
                            {icon}
                        </div>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {title}
                    </h3>
                </div>

                <div
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        bg-white/8 border border-white/10
                        transition-all duration-300 flex-shrink-0 ml-4
                        ${isOpen ? 'rotate-180 bg-primary-500/20 border-primary-500/30' : ''}
                    `}
                    aria-hidden="true"
                >
                    <ChevronDown
                        className={`transition-colors ${isOpen ? 'text-primary-300' : 'text-gray-400'}`}
                        size={17}
                    />
                </div>
            </button>

            {/* Animated content panel */}
            <div
                className={`
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
