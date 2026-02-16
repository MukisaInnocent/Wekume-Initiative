import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formAPI } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader, ArrowRight, Sparkles, MessageCircle, Heart } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [focusedField, setFocusedField] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Refs for 3D interactions
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        // Calculate center relative position (-1 to 1)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXVal = ((y - centerY) / centerY) * -1; // Subtle rotation
        const rotateYVal = ((x - centerX) / centerX) * 1;

        setRotateX(rotateXVal);
        setRotateY(rotateYVal);
        setSpotlightPos({ x, y });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setSpotlightPos({ x: -500, y: -500 }); // Move spotlight away
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await formAPI.submitSupport(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
        }
    };

    const handleFocus = (field) => setFocusedField(field);
    const handleBlur = () => setFocusedField(null);

    return (
        <>
            <Navbar />

            {/* Main Wrapper with Brand Themed Background */}
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-noise relative overflow-hidden flex flex-col items-center">

                {/* Brand Mesh Gradient Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[100px] animate-float-slow mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[100px] animate-float-delayed mix-blend-multiply"></div>
                    <div className="absolute top-[40%] left-[30%] w-[60%] h-[60%] bg-yellow-100/30 rounded-full blur-[120px] animate-float mix-blend-multiply"></div>
                </div>

                {/* Dynamic Hero Header Section with Deep Purple Background */}
                <header className="relative w-full py-24 px-4 text-center z-10 flex justify-center">
                    <div className={`max-w-4xl w-full bg-primary-900 rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl shadow-purple-900/40 transition-all duration-1000 transform overflow-hidden relative group ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>

                        {/* Animated Gradient Behind Purple */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-950 opacity-100 animate-gradient-shift"></div>

                        {/* Subtle Glow Effects */}
                        <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-gradient-to-br from-purple-500/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[150%] h-[150%] bg-gradient-to-tl from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-8 shadow-sm hover:scale-105 transition-transform">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                </span>
                                <span className="text-sm font-bold tracking-wide text-orange-200 uppercase">We are Online</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-heading font-extrabold mb-8 tracking-tight leading-none text-white drop-shadow-xl">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-yellow-200 to-white animate-pulse">
                                    Get in Touch
                                </span>
                            </h1>

                            <p className="text-xl text-purple-100 font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
                                Have a question, feedback, or a partnership idea? We'd love to hear from you. Let's create something meaningful together.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Main Content Section - 3D Card */}
                <main className="w-full pb-32 px-4 sm:px-6 lg:px-8 z-10 flex justify-center -mt-10">

                    {/* 3D Tilt Card Wrapper */}
                    <div
                        className="relative perspective-1000 max-w-6xl w-full"
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className={`w-full bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden grid lg:grid-cols-5 min-h-[700px] transform transition-all duration-300 ease-out border border-white/60 dark:border-gray-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 delay-200'}`}
                            style={{
                                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {/* Dynamic Spotlight Overlay */}
                            <div
                                className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(800px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.4), transparent 40%)`,
                                    mixBlendMode: 'overlay',
                                }}
                            ></div>

                            {/* Left Panel: Brand & Info */}
                            <div className="lg:col-span-2 bg-primary-900 text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden group">
                                {/* Brand Gradient Background - Purple base */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-950 opacity-100 animate-gradient-shift"></div>

                                {/* Glass Noise Overlay */}
                                <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>

                                {/* Floating Orbs - In Brand Colors */}
                                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 rounded-full blur-[80px] -mr-20 -mt-20 animate-float transition-transform duration-700 group-hover:scale-110 mix-blend-screen"></div>
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-[80px] -ml-20 -mb-20 animate-float-delayed transition-transform duration-700 group-hover:scale-110 mix-blend-screen"></div>

                                {/* Content Layer (elevated for 3D) */}
                                <div className="relative z-10 transform translate-z-10 group-hover:translate-x-2 transition-transform duration-500">
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
                                            <Sparkles size={14} className="text-yellow-300" />
                                            <span className="text-xs font-semibold tracking-wide uppercase text-yellow-100">24/7 Support</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tighter leading-none text-white">
                                            Contact Info
                                        </h2>
                                        <p className="text-purple-100 text-lg opacity-90">Reach out via any channel.</p>
                                    </div>

                                    <div className="space-y-5">
                                        <ContactItem
                                            icon={<Mail size={22} />}
                                            label="Email Us"
                                            value="info@wekume.org"
                                            href="mailto:info@wekume.org"
                                            color="text-yellow-300"
                                            hoverBg="group-hover:bg-yellow-500/20"
                                        />
                                        <ContactItem
                                            icon={<Phone size={22} />}
                                            label="Call Us"
                                            value="+256 000 000 000"
                                            href="tel:+256000000000"
                                            color="text-orange-300"
                                            hoverBg="group-hover:bg-orange-500/20"
                                        />
                                        <ContactItem
                                            icon={<MapPin size={22} />}
                                            label="Visit Us"
                                            value="Kampala, Uganda"
                                            color="text-purple-300"
                                            hoverBg="group-hover:bg-purple-500/20"
                                        />
                                    </div>

                                    {/* Socials Placeholder */}
                                    <div className="mt-12 pt-8 border-t border-white/10">
                                        <p className="text-sm font-semibold text-purple-200 mb-4 uppercase tracking-wider">Follow Us</p>
                                        <div className="flex gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-orange-500/20">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: The Form */}
                            <div className="lg:col-span-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 md:p-16 flex flex-col justify-center relative">
                                {/* Mesh Gradient Bloom - Brand Colors */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-50/40 via-transparent to-orange-50/40 blur-3xl pointer-events-none opacity-50"></div>

                                <div className="max-w-lg w-full mx-auto relative z-10">
                                    <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">Send a Message</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">Fill out the form below and we'll get back to you.</p>

                                    {status === 'success' ? (
                                        <SuccessMessage onReset={() => setStatus('idle')} />
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FloatingInput
                                                    id="name" label="Full Name"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    onFocus={() => handleFocus('name')} onBlur={handleBlur}
                                                />
                                                <FloatingInput
                                                    id="email" label="Email Address" type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    onFocus={() => handleFocus('email')} onBlur={handleBlur}
                                                />
                                            </div>
                                            <FloatingInput
                                                id="subject" label="Subject"
                                                value={formData.subject}
                                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                                onFocus={() => handleFocus('subject')} onBlur={handleBlur}
                                            />
                                            <FloatingTextArea
                                                id="message" label="Your Message"
                                                value={formData.message}
                                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                onFocus={() => handleFocus('message')} onBlur={handleBlur}
                                            />

                                            {status === 'error' && (
                                                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wide border border-red-100 flex items-center gap-2">
                                                    <span>Error:</span> Something went wrong.
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="group relative w-full bg-primary-900 text-white py-4 rounded-xl font-bold overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-orange-500/20"
                                            >
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-800 via-primary-900 to-purple-800 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <div className="relative flex items-center justify-center gap-2">
                                                    {status === 'submitting' ? (
                                                        <Loader className="animate-spin" size={20} />
                                                    ) : (
                                                        <>
                                                            <span className="tracking-wide">SEND MESSAGE</span>
                                                            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}

// Sub-components for cleanliness
const FloatingInput = ({ id, label, value, onChange, onFocus, onBlur, type = "text" }) => (
    <div className="relative group">
        <input
            type={type} required id={id}
            className="peer w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-gray-50/50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 placeholder-transparent text-gray-900 dark:text-white font-medium box-border"
            placeholder={label}
            value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
        />
        <label
            htmlFor={id}
            className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 text-base transition-all duration-300 pointer-events-none z-10
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-2 peer-focus:ml-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700
            peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 dark:peer-[&:not(:placeholder-shown)]:text-gray-400 peer-[&:not(:placeholder-shown)]:bg-white dark:peer-[&:not(:placeholder-shown)]:bg-gray-800 peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:ml-2 peer-[&:not(:placeholder-shown)]:rounded-full peer-[&:not(:placeholder-shown)]:shadow-sm peer-[&:not(:placeholder-shown)]:border peer-[&:not(:placeholder-shown)]:border-gray-100 dark:peer-[&:not(:placeholder-shown)]:border-gray-700"
        >
            {label}
        </label>
    </div>
);

const FloatingTextArea = ({ id, label, value, onChange, onFocus, onBlur }) => (
    <div className="relative group">
        <textarea
            required rows="4" id={id}
            className="peer w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-gray-50/50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 placeholder-transparent text-gray-900 dark:text-white font-medium resize-none box-border"
            placeholder={label}
            value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
        ></textarea>
        <label
            htmlFor={id}
            className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 text-base transition-all duration-300 pointer-events-none z-10
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-2 peer-focus:ml-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700
            peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 dark:peer-[&:not(:placeholder-shown)]:text-gray-400 peer-[&:not(:placeholder-shown)]:bg-white dark:peer-[&:not(:placeholder-shown)]:bg-gray-800 peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:ml-2 peer-[&:not(:placeholder-shown)]:rounded-full peer-[&:not(:placeholder-shown)]:shadow-sm peer-[&:not(:placeholder-shown)]:border peer-[&:not(:placeholder-shown)]:border-gray-100 dark:peer-[&:not(:placeholder-shown)]:border-gray-700"
        >
            {label}
        </label>
    </div>
);

const ContactItem = ({ icon, label, value, href, color, hoverBg }) => (
    <a href={href} className={`flex items-center gap-4 group p-3 rounded-2xl hover:bg-white/5 transition-all cursor-${href ? 'pointer' : 'default'} border border-transparent hover:border-white/10 ${hoverBg}`}>
        <div className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white/10 ${color}`}>
            {icon}
        </div>
        <div>
            <p className={`text-xs font-medium tracking-wide uppercase mb-0.5 opacity-60 ${color.replace('text-', 'text-opacity-80 text-')}`}>{label}</p>
            <p className="font-bold text-white text-lg tracking-tight group-hover:text-white transition-colors">{value}</p>
        </div>
        {href && <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-white/50" size={18} />}
    </a>
);

const SuccessMessage = ({ onReset }) => (
    <div className="text-center py-12 px-8 bg-green-50/50 dark:bg-green-900/20 rounded-3xl border border-green-100/50 dark:border-green-800 backdrop-blur-sm animate-fade-in shadow-inner">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6 shadow-sm animate-bounce">
            <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Message Sent!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out. Our team has received your message and will get back to you shortly.
        </p>
        <button
            onClick={onReset}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl border border-gray-100 transition-all hover:-translate-y-1"
        >
            Send Another
        </button>
    </div>
);

export default Contact;
