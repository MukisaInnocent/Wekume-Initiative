import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe2, Users, Heart } from 'lucide-react';

/* ─── Country data ──────────────────────────────────────────────── */
const africanCountries = new Set([
    "Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon",
    "Central African Republic","Chad","Comoros","Democratic Republic of the Congo","Republic of the Congo",
    "Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana",
    "Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi",
    "Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda",
    "Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan",
    "Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"
]);

/* ─── Stats ─────────────────────────────────────────────────────── */
const stats = [
    { icon: Globe2, value: 54, label: 'Countries', suffix: '' },
    { icon: Users,  value: 50, label: 'Youth Reached', suffix: 'K+' },
    { icon: Heart,  value: 6,  label: 'Years of Impact', suffix: '' },
    { icon: Zap,    value: 12, label: 'Active Programs', suffix: '' },
];

/* ─── Animated counter ───────────────────────────────────────────── */
function Counter({ target, suffix }) {
    const [count, setCount] = useState(0);
    const raf = useRef(null);
    useEffect(() => {
        const start = performance.now();
        const duration = 1800;
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) raf.current = requestAnimationFrame(step);
        };
        raf.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf.current);
    }, [target]);
    return <>{count}{suffix}</>;
}

/* ─── Floating orb ───────────────────────────────────────────────── */
function Orb({ style, delay = 0 }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={style}
            animate={{
                scale: [1, 1.15, 1],
                x: [0, 20, -10, 0],
                y: [0, -25, 15, 0],
                opacity: [0.35, 0.55, 0.35],
            }}
            transition={{ duration: 12 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        />
    );
}

/* ─── Animated grid lines ─────────────────────────────────────────── */
function GridBackground() {
    return (
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.06 }}>
            <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    );
}

/* ─── Main component ─────────────────────────────────────────────── */
function Welcome() {
    const [detecting, setDetecting] = useState(true);
    const [statsVisible, setStatsVisible] = useState(false);
    const [detectedRegion, setDetectedRegion] = useState(null); // 'ug' or 'us'
    const [detectedCountryName, setDetectedCountryName] = useState('');
    const statsRef = useRef(null);
    const navigate = useNavigate();

    // IP-based auto-detection on page load
    useEffect(() => {
        const detectByIP = async () => {
            setDetecting(true);
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                const country = data?.country_name;
                if (country) {
                    setDetectedCountryName(country);
                    const isAfrican = africanCountries.has(country);
                    setDetectedRegion(isAfrican ? 'ug' : 'us');
                }
            } catch {
                // Silent fail
            }
            setDetecting(false);
        };
        detectByIP();
    }, []);

    // Trigger counter animation when stats section is visible
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setStatsVisible(true);
        }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <div className="min-h-screen bg-[#080612] text-white flex flex-col relative overflow-hidden">

            {/* ── Background ───────────────────────────────────── */}
            <GridBackground />

            {/* Orbs */}
            <Orb style={{ top: '-10%', left: '-8%', width: '55vw', height: '55vw', background: 'radial-gradient(circle, rgba(109,40,217,0.6) 0%, transparent 70%)' }} delay={0} />
            <Orb style={{ top: '30%', right: '-12%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(234,99,140,0.45) 0%, transparent 70%)' }} delay={3} />
            <Orb style={{ bottom: '-15%', left: '25%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 70%)' }} delay={6} />

            {/* Subtle grain overlay */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

            {/* ── Main layout ──────────────────────────────────── */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 sm:px-10 lg:px-16 gap-12 py-16">

                {/* ── LEFT: Mission panel ──────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
                >
                    {/* Logo */}
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-3 mb-8">
                            <img
                                src="/assets/wekume-logo.png"
                                alt="Wekume Initiative"
                                className="w-16 h-16 rounded-2xl drop-shadow-2xl"
                            />
                            <div>
                                <p className="text-[11px] tracking-[0.25em] uppercase text-violet-400 font-semibold">Est. 2020</p>
                                <p className="text-xl font-extrabold tracking-tight text-white">Wekume Initiative</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-5">
                        <span className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            Health · Education · Empowerment
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
                    >
                        <span className="bg-gradient-to-br from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">
                            Building a
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                            Healthier{' '}
                        </span>
                        <span className="bg-gradient-to-br from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">
                            Africa.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-400 leading-relaxed mb-10 max-w-md"
                    >
                        Connecting youth, health information, and global partners to create sustainable change across borders.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        ref={statsRef}
                        variants={itemVariants}
                        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full"
                    >
                        {stats.map(({ icon: Icon, value, label, suffix }) => (
                            <div
                                key={label}
                                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm hover:bg-white/8 transition-colors"
                            >
                                <Icon size={18} className="mx-auto mb-1.5 text-violet-400" />
                                <p className="text-2xl font-black text-white">
                                    {statsVisible ? <Counter target={value} suffix={suffix} /> : `0${suffix}`}
                                </p>
                                <p className="text-[11px] text-gray-500 font-medium mt-0.5">{label}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: Auto-Detection Card ─────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 40, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md flex-shrink-0"
                >
                    <div
                        className="relative rounded-[2rem] overflow-hidden p-[1px]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(167,139,250,0.5) 0%, rgba(139,92,246,0.1) 50%, rgba(236,72,153,0.3) 100%)',
                        }}
                    >
                        <div className="bg-[#0f0a1e]/95 backdrop-blur-2xl rounded-[calc(2rem-1px)] p-8 sm:p-10 text-center">

                            {/* Card header */}
                            <div className="w-16 h-16 bg-violet-500/15 border border-violet-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-violet-400">
                                <Globe2 size={32} />
                            </div>

                            <h2 className="text-2xl font-extrabold text-white mb-6">Choose Your Experience</h2>

                            {detecting ? (
                                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                    Detecting your location...
                                </p>
                            ) : (
                                <>
                                    {detectedCountryName && (
                                        <div className="mb-8 border-b border-white/5 pb-6">
                                            <p className="text-gray-400 text-sm mb-1">We've detected your region as</p>
                                            <p className="text-xl font-bold text-white mb-2">{detectedCountryName}</p>
                                            <p className="text-gray-500 text-sm">
                                                {detectedRegion === 'ug'
                                                    ? "It looks like you're in Africa. We recommend visiting our Activities."
                                                    : "It looks like you're outside Africa. We recommend the Global Site."}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => navigate('/us')}
                                            className={`w-full py-4 px-6 rounded-xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2 ${
                                                detectedRegion === 'us' || !detectedRegion
                                                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-violet-900/50'
                                                    : 'bg-white/5 border border-white/15 text-gray-300 hover:bg-white/10 hover:-translate-y-0.5'
                                            }`}
                                        >
                                            Visit the Global Site <ArrowRight size={18} />
                                        </button>
                                        
                                        <button
                                            onClick={() => navigate('/ug')}
                                            className={`w-full py-4 px-6 rounded-xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2 ${
                                                detectedRegion === 'ug'
                                                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-violet-900/50'
                                                    : 'bg-white/5 border border-white/15 text-gray-300 hover:bg-white/10 hover:-translate-y-0.5'
                                            }`}
                                        >
                                            Visit Our Activities <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Founders link */}
                            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                <a
                                    href="/?founder=WEKUME2026"
                                    className="text-xs text-gray-600 hover:text-violet-400 transition-colors tracking-wide"
                                >
                                    Founders & Partners Portal →
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Footer ───────────────────────────────────────── */}
            <div className="relative z-10 pb-6 text-center">
                <p className="text-gray-700 text-xs tracking-widest uppercase">
                    © {new Date().getFullYear()} Wekume Initiative · All rights reserved
                </p>
            </div>
        </div>
    );
}

export default Welcome;
