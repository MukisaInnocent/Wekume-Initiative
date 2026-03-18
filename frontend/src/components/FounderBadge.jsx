import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';

const FOUNDER_TOKEN = 'WEKUME2026';
const STORAGE_KEY = 'wekume_founder';

function FounderBadge() {
    const [isFounder, setIsFounder] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check URL param
        const params = new URLSearchParams(window.location.search);
        const token = params.get('founder');

        if (token === FOUNDER_TOKEN) {
            localStorage.setItem(STORAGE_KEY, 'true');
        }

        // Check localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'true') {
            setIsFounder(true);
        }

        // Check if dismissed for this session
        const sessionDismissed = sessionStorage.getItem('founder_banner_dismissed');
        if (sessionDismissed === 'true') {
            setDismissed(true);
        }
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
        sessionStorage.setItem('founder_banner_dismissed', 'true');
    };

    if (!isFounder || dismissed) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center"
                style={{
                    background: 'linear-gradient(90deg, #78350f 0%, #d97706 30%, #fbbf24 50%, #d97706 70%, #78350f 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmerGold 4s linear infinite',
                }}
            >
                <div className="flex items-center gap-3 py-2 px-6 text-sm font-semibold text-amber-950">
                    <Star size={16} className="fill-amber-900 text-amber-900 flex-shrink-0" />
                    <span>
                        🏅 Welcome back, <span className="font-extrabold">Founder</span> — thank you for building the Wekume Initiative.
                    </span>
                    <Star size={16} className="fill-amber-900 text-amber-900 flex-shrink-0" />
                    <button
                        onClick={handleDismiss}
                        className="ml-4 p-1 rounded-full hover:bg-amber-900/20 transition-colors"
                        aria-label="Dismiss founder banner"
                    >
                        <X size={14} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default FounderBadge;
