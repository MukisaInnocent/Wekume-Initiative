import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X, ChevronRight, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import oldLogo from '../assets/images/old-logo.png';
import { useRegion } from '../context/RegionContext';

function Navbar({ isTransparent = false, backgroundImages, currentBackgroundIndex }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // If transparent (Home), always use light mode styles (white text) and background image
    // It will scroll away (absolute) so we don't need to switch to dark text/white bg
    const isLightMode = isTransparent;

    const textColorClass = isLightMode ? 'text-white hover:text-gray-200' : 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400';
    const logoColorClass = isLightMode ? 'text-white' : 'text-primary-600 dark:text-primary-400';
    const buttonClass = isLightMode
        ? 'bg-white text-primary-600 hover:bg-gray-100'
        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30';

    const { isUS } = useRegion();

    const navLinks = isUS ? [
        { path: '/us', label: 'Home' },
        { path: '/us/funders', label: 'Funders' },
        { path: '/us/rewards', label: 'Rewards' },
        { path: '/us/impact', label: 'Impact Reporting' },
        { path: '/us/contact', label: 'Contact' }
    ] : [
        { path: '/ug', label: 'Home' },
        { path: '/ug/about', label: 'About' },
        { path: '/ug/wekume-app', label: 'Wekume App' },
        { path: '/ug/events', label: 'Events' },
        { path: '/ug/get-involved', label: 'Get Involved' },
        { path: '/ug/testimonials', label: 'Testimonials' },
        { path: '/ug/reports', label: 'Reports' },
        { path: '/ug/contact', label: 'Contact' }
    ];

    return (
        <nav
            className={`${isTransparent ? 'fixed top-0 left-0' : 'sticky top-0'} w-full z-50 transition-all duration-300 ${isTransparent
                ? (scrolled ? 'bg-black/60 backdrop-blur-md py-3' : 'bg-transparent py-6')
                : (scrolled
                    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-200 dark:border-gray-700'
                    : 'bg-white dark:bg-gray-900 py-4 border-b border-gray-200 dark:border-gray-700')
                } overflow-hidden`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logos Container */}
                    <div className="flex items-center gap-6">
                        {/* Main App Logo */}
                        <Link to={isUS ? "/us" : "/ug"} className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
                            <img
                                src="/assets/wekume-logo.png"
                                alt="Wekume Initiative"
                                className="h-10 w-10 sm:h-14 sm:w-14 min-w-[40px] sm:min-w-[56px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative font-medium text-sm tracking-wide transition-colors group ${textColorClass} ${isActive && !isLightMode ? 'text-primary-600 dark:text-primary-400' : ''}`
                                }
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isLightMode ? 'bg-white' : 'bg-primary-600 dark:bg-primary-400'}`}></span>
                            </NavLink>
                        ))}
                        <Link
                            to="/admin/login"
                            className={`p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${textColorClass}`}
                            title="Admin Login"
                        >
                            <Lock size={20} />
                        </Link>
                        <ThemeToggle />
                        {isUS && (
                            <Link
                                to="/us/donate"
                                className={`px-6 py-2.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${buttonClass}`}
                            >
                                Donate
                            </Link>
                        )}
                        {/* Legacy Logo */}
                        <a href="https://wekume.org" className="transition-transform duration-300 hover:scale-105 flex-shrink-0">
                            <img src={oldLogo} alt="Original Wekume" className="h-14 w-auto min-w-[56px] flex-shrink-0 object-contain" />
                        </a>
                    </div>

                    {/* Mobile Menu Button — inside the same flex row as the brand */}
                    <div className="lg:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            className={`transition-colors ${isLightMode ? 'text-white' : 'text-gray-900 dark:text-white'}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                        {/* Legacy Logo */}
                        <a href="https://wekume.org" className="transition-transform duration-300 hover:scale-105 flex-shrink-0">
                            <img src={oldLogo} alt="Original Wekume" className="h-10 w-auto min-w-[40px] flex-shrink-0 object-contain" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            <div className={`fixed inset-0 z-40 bg-white dark:bg-gray-900 transform transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`} style={{ top: '0', height: '100vh' }}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-2xl font-heading font-bold text-primary-600 dark:text-primary-400">Menu</span>
                        <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 flex-grow">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center justify-between text-xl font-medium py-3 border-b border-gray-100 dark:border-gray-800 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                                <ChevronRight size={20} className="opacity-50" />
                            </NavLink>
                        ))}
                        <div className="mt-8">
                            {isUS && (
                                <Link
                                    to="/us/donate"
                                    className="block w-full text-center bg-primary-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all text-lg shadow-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Donate Now
                                </Link>
                            )}
                            <Link
                                to="/admin/login"
                                className="block w-full text-center mt-4 text-gray-500 dark:text-gray-400 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Lock size={16} /> Admin Login
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                        <p className="text-gray-400 dark:text-gray-500 text-sm">© 2026 Wekume Initiative</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
