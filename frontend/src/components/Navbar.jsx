import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X, ChevronRight, Lock, Home, Heart, Gift, BarChart2, Mail, Info, Smartphone, Calendar, Users, MessageSquare, FileText, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useRegion } from '../context/RegionContext';
import { useSidebar } from '../context/SidebarContext';

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
    const { isCollapsed, setIsCollapsed } = useSidebar();

    const navLinks = isUS ? [
        { path: '/us', label: 'Home', icon: Home },
        { path: '/us/funders', label: 'Funders', icon: Heart },
        { path: '/us/rewards', label: 'Rewards', icon: Gift },
        { path: '/us/impact', label: 'Impact Reporting', icon: BarChart2 },
        { path: '/us/contact', label: 'Contact', icon: Mail }
    ] : [
        { path: '/ug', label: 'Home', icon: Home },
        { path: '/ug/about', label: 'About', icon: Info },
        { path: '/ug/wekume-app', label: 'Wekume App', icon: Smartphone },
        { path: '/ug/events', label: 'Events', icon: Calendar },
        { path: '/ug/get-involved', label: 'Get Involved', icon: Users },
        { path: '/ug/testimonials', label: 'Testimonials', icon: MessageSquare },
        { path: '/ug/reports', label: 'Reports', icon: FileText },
        { path: '/ug/contact', label: 'Contact', icon: Mail }
    ];

    const isHome = location.pathname === '/' || location.pathname === '/ug' || location.pathname === '/us' || location.pathname === '/ug/' || location.pathname === '/us/';

    if (!isHome) {
        return (
            <>
                {/* Hamburger Top Bar (Mobile always, Desktop when Sidebar is hidden) */}
                <div className={`sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 h-16 flex items-center justify-between shadow-sm ${!isCollapsed ? 'lg:hidden' : ''}`}>
                     <div className="flex items-center gap-3">
                        <Link to={isUS ? "/us" : "/ug"} className="flex items-center gap-2">
                             <img src="/assets/wekume-logo.png" className="w-8 h-8 rounded-lg object-contain" alt="Wekume" />
                             <span className="font-bold text-gray-900 dark:text-white">Wekume</span>
                        </Link>
                     </div>
                     <div className="flex gap-2 items-center">
                        <ThemeToggle />
                        <button onClick={() => {
                            if (window.innerWidth < 1024) setIsMenuOpen(true);
                            else setIsCollapsed(false);
                        }} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hover:scale-105 active:scale-95">
                             <Menu />
                        </button>
                     </div>
                </div>

                {/* Mobile Overlay */}
                {isMenuOpen && <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 lg:hidden" onClick={() => setIsMenuOpen(false)} />}
                
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-xl lg:shadow-none z-50 transition-transform duration-300 flex flex-col ${isMenuOpen ? 'translate-x-0' : (isCollapsed ? '-translate-x-full' : '-translate-x-full lg:translate-x-0')}`}>
                      {/* Sidebar Header */}
                      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 relative group">
                           <Link to={isUS ? "/us" : "/ug"} className="flex items-center gap-3">
                               <img src="/assets/wekume-logo.png" className="w-10 h-10 rounded-xl object-contain hover:scale-110 transition-transform flex-shrink-0" alt="Wekume" />
                               <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent tracking-wide whitespace-nowrap">Wekume</span>
                           </Link>
                           <button className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={() => setIsMenuOpen(false)}>
                                <X size={20} />
                           </button>
                           
                           {/* Desktop Hide Toggle */}
                           <button 
                               onClick={() => setIsCollapsed(true)}
                               title="Hide sidebar"
                               className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full items-center justify-center text-gray-400 hover:text-purple-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                               <ChevronLeft size={14} />
                           </button>
                      </div>
                      
                      {/* Navigation Links */}
                      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 nice-scrollbar">
                           <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 px-3">Menu</div>
                           {navLinks.map((link) => {
                               const Icon = link.icon;
                               return (
                                   <NavLink
                                       key={link.path}
                                       to={link.path}
                                       className={({ isActive }) =>
                                           `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group font-medium relative ${
                                               isActive 
                                                   ? 'bg-gradient-to-r from-purple-500/10 to-orange-500/10 text-purple-600 dark:text-purple-400 shadow-sm border border-purple-100/50 dark:border-purple-900/50' 
                                                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 border border-transparent'
                                           }`
                                       }
                                       onClick={() => setIsMenuOpen(false)}
                                   >
                                       <Icon size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                                       <span className="whitespace-nowrap flex-1">{link.label}</span>
                                       <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -mr-1 transition-all flex-shrink-0" />
                                   </NavLink>
                               );
                           })}
                      </div>

                      {/* Sidebar Footer */}
                      <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
                           {isUS && (
                               <Link
                                   to="/us/donate"
                                   className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm mb-4"
                                   onClick={() => setIsMenuOpen(false)}
                               >
                                   <Heart size={16} /> Donate Now
                               </Link>
                           )}
                           <div className="flex items-center justify-between px-2 w-full">
                               <ThemeToggle />
                               <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">© 2026 Wekume</span>
                           </div>
                      </div>
                </aside>
            </>
        );
    }

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
                        <ThemeToggle />
                        {isUS && (
                            <Link
                                to="/us/donate"
                                className={`px-6 py-2.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${buttonClass}`}
                            >
                                Donate
                            </Link>
                        )}
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
