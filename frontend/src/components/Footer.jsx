import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail } from 'lucide-react';

const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/wekume', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/wekume', label: 'Twitter/X' },
    { icon: Instagram, href: 'https://instagram.com/wekume', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/wekume', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@wekume', label: 'YouTube' },
];

function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            // TODO: Wire up to backend newsletter endpoint
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="bg-gradient-to-br from-purple-950 via-purple-900 to-black text-white mt-12 sm:mt-16 md:mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10">

                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-10 sm:mb-12">

                    {/* Column 1: Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/assets/wekume-logo.png"
                                alt="Wekume Initiative"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="font-bold text-lg tracking-tight text-white">Wekume Initiative</span>
                        </div>
                        <p className="text-sm text-purple-200 leading-relaxed mb-6">
                            Empowering youth through education, innovation, and accessible sexual & reproductive health resources.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-300 mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/about', label: 'About Us' },
                                { to: '/events', label: 'Events' },
                                { to: '/testimonials', label: 'Testimonials' },
                                { to: '/get-involved', label: 'Get Involved' },
                                { to: '/contact', label: 'Contact' },
                                { to: '/admin/dashboard', label: 'Admin Dashboard' },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="text-sm text-purple-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                                    >
                                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Programs */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-300 mb-4">Our Programs</h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/wekume-app', label: 'Wekume App' },
                                { to: '/', label: 'Lina AI Safe Chat' },
                                { to: '/events', label: 'Health Events' },
                                { to: '/reports', label: 'Impact Reports' },
                                { to: '/donate', label: 'Support Us' },
                            ].map(({ to, label }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="text-sm text-purple-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                                    >
                                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Newsletter */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-pink-300 mb-4">Stay Connected</h3>
                        <div className="space-y-2 mb-6">
                            <a
                                href="mailto:info@wekume.org"
                                className="flex items-center gap-2 text-sm text-purple-200 hover:text-white transition-colors"
                            >
                                <Mail size={14} className="text-pink-400 flex-shrink-0" />
                                info@wekume.org
                            </a>
                        </div>

                        {/* Newsletter */}
                        <p className="text-xs text-purple-300 mb-3 font-medium uppercase tracking-wider">Newsletter</p>
                        {subscribed ? (
                            <p className="text-sm text-green-400 font-medium">✅ Thanks for subscribing!</p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
                    <p>© {new Date().getFullYear()} Wekume Initiative. All rights reserved.</p>
                    <p className="text-center">Built with ❤️ for Uganda's youth</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span>·</span>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
