import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-heading font-bold text-primary-500 hover:text-primary-600 transition-colors">
                        Wekume Initiative
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-dark-black hover:text-primary-500 transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/donate"
                            className="bg-orange-400 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-dark-plum hover:text-primary-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block py-2 text-dark-black hover:text-primary-500 hover:bg-pink-50 px-4 rounded transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/donate"
                            className="block text-center bg-orange-400 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-500 transition-all mx-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Donate
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
