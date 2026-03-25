import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ title, icon, children, defaultOpen = false, className = "" }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg ${className}`}>
            <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center text-purple-400 border border-white/5">
                            {icon}
                        </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h3>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="text-gray-400" size={18} />
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-5 sm:p-6 pt-0 mt-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
