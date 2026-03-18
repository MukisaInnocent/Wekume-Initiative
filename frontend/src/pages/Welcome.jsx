import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Search, ChevronDown, Zap, Globe2, Users, Heart } from 'lucide-react';

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

const allCountries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Costa Rica","Croatia","Cuba","Cyprus","Czechia",
    "Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
    "Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan",
    "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
    "Pakistan","Palau","Palestine State","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
    "Republic of the Congo","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

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
    const [selectedCountry, setSelectedCountry] = useState('');
    const [query, setQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [detecting, setDetecting] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const filtered = allCountries.filter(c =>
        c.toLowerCase().includes(query.toLowerCase())
    );

    const handleContinue = () => {
        if (!selectedCountry) return;
        navigate(africanCountries.has(selectedCountry) ? '/ug' : '/us');
    };

    const handleDetect = () => {
        if (!navigator.geolocation) return;
        setDetecting(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
                    );
                    const data = await res.json();
                    const country = data?.address?.country;
                    if (country && allCountries.includes(country)) {
                        setSelectedCountry(country);
                        setQuery(country);
                    }
                } catch { /* silent */ }
                setDetecting(false);
            },
            () => setDetecting(false)
        );
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
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

                {/* ── RIGHT: Country selector card ─────────────── */}
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
                        <div className="bg-[#0f0a1e]/95 backdrop-blur-2xl rounded-[calc(2rem-1px)] p-8 sm:p-10">

                            {/* Card header */}
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-14 h-14 bg-violet-500/15 border border-violet-500/30 rounded-2xl flex items-center justify-center mb-5 text-violet-400">
                                    <Globe2 size={28} />
                                </div>
                                <h2 className="text-2xl font-extrabold text-white mb-2">Where are you?</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Select your country so we can show you the most relevant experience.
                                </p>
                            </div>

                            {/* Auto-detect */}
                            <button
                                onClick={handleDetect}
                                disabled={detecting}
                                className="w-full flex items-center justify-center gap-2 mb-4 py-3 px-5 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-semibold hover:bg-violet-500/20 transition-all disabled:opacity-50"
                            >
                                {detecting ? (
                                    <>
                                        <motion.div
                                            className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                                        />
                                        Detecting location…
                                    </>
                                ) : (
                                    <>
                                        <MapPin size={16} />
                                        Auto-detect my location
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-xs text-gray-600 font-medium">or choose manually</span>
                                <div className="flex-1 h-px bg-white/10" />
                            </div>

                            {/* Searchable dropdown */}
                            <div className="relative mb-6" ref={dropdownRef}>
                                <div
                                    onClick={() => setDropdownOpen(o => !o)}
                                    className="w-full flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 cursor-pointer hover:bg-white/8 transition-colors"
                                >
                                    <Search size={16} className="text-gray-500 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={dropdownOpen ? query : selectedCountry || ''}
                                        onChange={e => { setQuery(e.target.value); setDropdownOpen(true); }}
                                        onFocus={() => { setDropdownOpen(true); setQuery(''); }}
                                        placeholder="Search country…"
                                        className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
                                        onClick={e => e.stopPropagation()}
                                    />
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </div>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute z-50 w-full mt-2 bg-[#130d24] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto"
                                            style={{ maxHeight: '220px' }}
                                        >
                                            {filtered.length === 0 ? (
                                                <li className="px-4 py-4 text-gray-500 text-sm text-center">No countries found.</li>
                                            ) : filtered.map(country => (
                                                <li
                                                    key={country}
                                                    onClick={() => {
                                                        setSelectedCountry(country);
                                                        setQuery(country);
                                                        setDropdownOpen(false);
                                                    }}
                                                    className={`px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2 transition-colors ${
                                                        selectedCountry === country
                                                            ? 'bg-violet-600/30 text-violet-200'
                                                            : 'text-gray-300 hover:bg-white/8'
                                                    }`}
                                                >
                                                    {africanCountries.has(country) && (
                                                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md font-semibold flex-shrink-0">🌍 Africa</span>
                                                    )}
                                                    {country}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CTA button */}
                            <motion.button
                                onClick={handleContinue}
                                disabled={!selectedCountry}
                                whileHover={selectedCountry ? { scale: 1.02 } : {}}
                                whileTap={selectedCountry ? { scale: 0.98 } : {}}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                                    selectedCountry
                                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-violet-900/50'
                                        : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
                                }`}
                                style={selectedCountry ? {
                                    boxShadow: '0 0 30px rgba(124,58,237,0.4), 0 4px 20px rgba(0,0,0,0.4)'
                                } : {}}
                            >
                                {selectedCountry ? (
                                    <>Enter Experience <ArrowRight size={20} /></>
                                ) : (
                                    'Select a country to continue'
                                )}
                            </motion.button>

                            {/* Region indicator */}
                            <AnimatePresence>
                                {selectedCountry && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-center text-xs text-gray-500 mt-3"
                                    >
                                        You'll be directed to the{' '}
                                        <span className="text-violet-400 font-semibold">
                                            {africanCountries.has(selectedCountry) ? 'Uganda / Africa' : 'United States'}
                                        </span>{' '}
                                        experience.
                                    </motion.p>
                                )}
                            </AnimatePresence>

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
