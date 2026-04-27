import { X } from 'lucide-react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Slide-Over Drawer (Tab-like opening)
 * Replaces the old centered modal with a sleek side-panel drawer.
 */
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        // Prevent body scroll when drawer is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
        xl: 'max-w-5xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[200] flex justify-end"
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={`relative w-full ${sizeClasses[size] || sizeClasses.md} bg-white dark:bg-gray-900 shadow-2xl h-full flex flex-col border-l border-purple-100/50 dark:border-purple-900/50`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 shrink-0">
                            <h2 className="text-xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                aria-label="Close panel"
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto nice-scrollbar flex-1 relative">
                            {/* Decorative ambient background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl pointer-events-none -mt-32 -mr-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl pointer-events-none -mb-32 -ml-32"></div>
                            
                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
