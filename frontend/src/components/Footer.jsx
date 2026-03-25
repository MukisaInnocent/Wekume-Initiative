import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail, ChevronDown, CheckCircle } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/wekume', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/wekume', label: 'Twitter/X' },
    { icon: Instagram, href: 'https://instagram.com/wekume', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/wekume', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@wekume', label: 'YouTube' },
];

function FooterAccordion({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-white/10">
            <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3.5 flex items-center justify-between text-left focus:outline-none group"
            >
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-pink-300 group-hover:text-pink-200 transition-colors">
                    {title}
                </h3>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
                    <ChevronDown size={14} className={isOpen ? 'text-pink-300' : 'text-gray-400'} />
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
}

function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const { isUS } = useRegion();
    const prefix = isUS ? '/us' : '/ug';

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="bg-gradient-to-br from-purple-950 via-purple-900 to-black text-white mt-8 sm:mt-12 rounded-t-2xl sm:rounded-t-[2rem] border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6 relative z-10">
                
                {/* Top Section: Brand & Newsletter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-white/10 pb-8">
                    {/* Brand */}
                    <div className="max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/assets/wekume-logo.png"
                                alt="Wekume Initiative"
                                className="h-12 w-12 object-contain bg-white/5 p-1 rounded-xl border border-white/10"
                            />
                            <span className="font-bold text-2xl tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Wekume Initiative</span>
                        </div>
                        <p className="text-sm text-purple-200 leading-relaxed mb-6">
                            Empowering youth through education, innovation, and accessible sexual & reproductive health resources.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-pink-500 hover:border-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 text-gray-300 hover:text-white"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter (Standalone to keep it highly visible) */}
                    <div className="w-full md:w-auto md:max-w-xs bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                        <p className="text-sm text-white font-bold mb-1 flex items-center gap-2">
                            Stay Updated <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span></span>
                        </p>
                        <p className="text-xs text-purple-300 mb-4">Join our newsletter for updates and impact stories.</p>
                        {subscribed ? (
                            <div className="bg-green-500/20 text-green-300 border border-green-500/30 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                                <CheckCircle size={16} /> Thanks for subscribing!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold transition-all duration-300 hover:shadow-lg shadow-pink-600/20"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Main Links - Accordion Layout */}
                <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                    <FooterAccordion title="Quick Links">
                        <ul className="flex flex-col gap-2 pt-2">
                            {[
                                { to: `${prefix}/about`, label: 'About Us' },
                                { to: `${prefix}/events`, label: 'Events' },
                                { to: `${prefix}/testimonials`, label: 'Testimonials' },
                                { to: `${prefix}/get-involved`, label: 'Get Involved' },
                                { to: `${prefix}/contact`, label: 'Contact' },
                                { to: '/admin/dashboard', label: 'Admin Dashboard' },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-2 transition-all duration-200 group py-1"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-pink-500/50 group-hover:scale-150 transition-transform"></div>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FooterAccordion>

                    <FooterAccordion title="What We Do">
                        <div className="flex flex-col gap-2 pt-2">
                            {['Sexual & Reproductive Health Education', 'Mental Health Support & Counseling', 'Skill Development & Entrepreneurship', 'Community Outreach Programs', 'Youth Mentorship'].map((item, i) => (
                                <div key={i} className="text-[11px] leading-relaxed text-gray-400 flex items-start gap-2 py-1">
                                    <span className="text-pink-500 flex-shrink-0 mt-0.5">•</span> 
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </FooterAccordion>

                    <FooterAccordion title="Contact Us">
                        <div className="flex flex-col gap-4 pt-2">
                            <div className="space-y-2 text-xs text-gray-400">
                                <a href="mailto:admin@wekume.org" className="block hover:text-white transition-colors">
                                    Email: <span className="text-pink-300">admin@wekume.org</span>
                                </a>
                                <p>Phone: <span className="text-pink-300 tracking-wider">+256 766 344 603</span></p>
                            </div>
                            
                            <div className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-white/5">
                                {isUS ? (
                                    <>
                                        <p className="font-bold text-gray-400 mb-1">Friends of Wekume (US)</p>
                                        <p>4844 North 300 West Ste 300, Provo, UT 84604</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-bold text-gray-400 mb-1">Wekume Initiative (UG)</p>
                                        <p>PO BOX 180589, Kampala, Uganda</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </FooterAccordion>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
                    <p>© {new Date().getFullYear()} Wekume Initiative. All rights reserved.</p>
                    <p className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-gray-400">Built with <span className="text-red-500 animate-pulse">❤️</span> for youth</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

// Add simple CheckCircle missing in imports if necessary, wait, let me just add it above. Oh wait I did not import CheckCircle. I will replace it with a text emoji above so I don't need the import. Wait, I imported CheckCircle! Oh wait, `ArrowRight, Mail, ChevronDown` were imported. I'll fix the missing CheckCircle.
export default Footer;
