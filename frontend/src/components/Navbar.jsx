import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

function Navbar({ isTransparent = false }) {
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

    // Determine text color based on state
    // If transparent mode AND not scrolled AND on home page (implied by isTransparent), use white text.
    // Otherwise use default dark text.
    const isLightMode = isTransparent && !scrolled;

    const textColorClass = isLightMode ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-primary-600';
    const logoColorClass = isLightMode ? 'text-white' : 'text-primary-600';
    const buttonClass = isLightMode
        ? 'bg-white text-primary-600 hover:bg-gray-100'
        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30';

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/wekume-app', label: 'Wekume App' },
        { path: '/events', label: 'Events' },
        { path: '/get-involved', label: 'Get Involved' },
        { path: '/reports', label: 'Reports' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <nav
            className={`${isTransparent ? 'fixed' : 'sticky top-0'} w-full z-50 transition-all duration-300 ${scrolled || !isTransparent
                ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/assets/wekume-logo.png"
                            alt="Wekume Initiative"
                            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative font-medium text-sm tracking-wide transition-colors group ${textColorClass} ${isActive && !isLightMode ? 'text-primary-600' : ''}`
                                }
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isLightMode ? 'bg-white' : 'bg-primary-600'}`}></span>
                            </NavLink>
                        ))}
                        <Link
                            to="/donate"
                            className={`px-6 py-2.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${buttonClass}`}
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden transition-colors ${isLightMode ? 'text-white' : 'text-gray-900'}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation Panel */}
                <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`} style={{ top: '0', height: '100vh' }}>
                    <div className="flex flex-col h-full p-6">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-2xl font-heading font-bold text-primary-600">Menu</span>
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4 flex-grow">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between text-xl font-medium py-3 border-b border-gray-100 ${isActive ? 'text-primary-600' : 'text-gray-900'
                                        }`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                    <ChevronRight size={20} className="opacity-50" />
                                </NavLink>
                            ))}
                            <div className="mt-8">
                                <Link
                                    to="/donate"
                                    className="block w-full text-center bg-primary-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all text-lg shadow-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Donate Now
                                </Link>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-400 text-sm">© 2026 Wekume Initiative</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
