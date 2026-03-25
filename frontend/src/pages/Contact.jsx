import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formAPI } from '../services/api';
import { Mail, Phone, MapPin, CheckCircle, Loader, ArrowRight, MessageCircle, AlertCircle, Smartphone, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useRegion } from '../context/RegionContext';
import Accordion from '../components/Accordion';


function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errors, setErrors] = useState({});
    const [mounted, setMounted] = useState(false);
    
    const [contactMethod, setContactMethod] = useState(null); // 'email' or 'whatsapp'

    // Parallax background effect
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { isUS } = useRegion();
    
    const contactInfo = {
        whatsapp: '+256766344603',
        email: 'admin@wekume.org',
        phone: '+256 766 344 603',
        poBox: isUS ? '' : 'PO BOX 180589, Kampala GPO',
        officeAddress: isUS ? 'Friends of Wekume (US), 4844 North 300 West Ste 300, Provo, Utah 84604, USA' : 'Wekume Youth Initiative, Uganda'
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveAndRedirect = async () => {
        if (!validateForm()) {
            setStatus('error');
            return;
        }
        setStatus('submitting');
        setErrors({});
        try {
            await formAPI.submitSupport({ ...formData, channel: contactMethod });
            setStatus('success');

            if (contactMethod === 'whatsapp') {
                const waNumber = contactInfo.whatsapp.replace(/[^0-9]/g, '');
                const waText = encodeURIComponent(
                    `Hi Wekume! My name is ${formData.name}.\n\n${formData.subject ? `Subject: ${formData.subject}\n\n` : ''}${formData.message}`
                );
                window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
            } else if (contactMethod === 'email') {
                const mailSubject = encodeURIComponent(formData.subject || 'Message from wekume.org');
                const mailBody = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
                window.open(`mailto:${contactInfo.email}?subject=${mailSubject}&body=${mailBody}`, '_self');
            }

            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => {
                setStatus('idle');
                setContactMethod(null);
            }, 5000);
        } catch (error) {
            setStatus('error');
            setErrors({ submit: error.response?.data?.error || 'Failed to connect. Please try again.' });
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen selection:bg-purple-500/30 font-sans">
            <Navbar />

            {/* Premium Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-gradient-to-br from-indigo-600 to-purple-800 transition-transform duration-1000 ease-out"
                    style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                />
                <div 
                    className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[150px] opacity-20 bg-gradient-to-tl from-orange-600 to-pink-700 transition-transform duration-1000 ease-out"
                    style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}
                />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
            </div>

            <main className="relative z-10 w-full px-4 sm:px-6 md:px-8 pt-24 pb-12 min-h-[85vh] flex flex-col items-center">
                
                {/* Header Section */}
                <div className={`text-center mb-8 max-w-2xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 w-fit mx-auto">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium tracking-wide text-gray-300">We respond within 24 hours</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-tight mb-3">
                        Let's Talk.
                    </h1>
                    <p className="text-base text-gray-400 leading-relaxed max-w-lg mx-auto">
                        Whether you need confidential support, mental health advice, or want to partner with us—choose how you'd like to connect.
                    </p>
                </div>

                {/* Accordion List Container */}
                <div className={`w-full max-w-3xl mx-auto space-y-3 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    
                    {/* Section 1: Send a Message (Form) */}
                    <Accordion title="Send a Message" icon={<MessageCircle size={24} />} defaultOpen={true}>
                        <div className="pt-4">
                            {status === 'success' ? (
                                <div className="py-12 text-center animate-fade-in">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                                        <CheckCircle className="text-green-400 w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Message Initiated</h3>
                                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">Your message details were prepared. Please complete sending via your chosen app.</p>
                                    <button 
                                        onClick={() => { setStatus('idle'); setContactMethod(null); }}
                                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-all"
                                    >
                                        Start another message
                                    </button>
                                </div>
                            ) : !contactMethod ? (
                                <div className="py-6 animate-fade-in">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setContactMethod('whatsapp')}
                                            className="group flex flex-col items-center justify-center gap-4 p-8 bg-black/20 hover:bg-black/40 border border-white/5 hover:border-green-500/30 rounded-[2rem] transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/10"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <MessageCircle className="text-white w-8 h-8" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-white font-bold text-lg">WhatsApp</h4>
                                                <p className="text-gray-500 text-sm mt-1">Chat directly via phone</p>
                                            </div>
                                        </button>
                                        
                                        <button
                                            onClick={() => setContactMethod('email')}
                                            className="group flex flex-col items-center justify-center gap-4 p-8 bg-black/20 hover:bg-black/40 border border-white/5 hover:border-blue-500/30 rounded-[2rem] transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <Mail className="text-white w-8 h-8" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-white font-bold text-lg">Email</h4>
                                                <p className="text-gray-500 text-sm mt-1">Official correspondence</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form className="pt-2 flex flex-col gap-5 animate-fade-in pb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-gray-400 text-sm font-medium">
                                            Currently drafting for: <span className="text-white font-bold capitalize">{contactMethod}</span>
                                        </p>
                                        <button 
                                            type="button" 
                                            onClick={() => { setContactMethod(null); setErrors({}); }}
                                            className="text-gray-400 hover:text-white px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <ModernInput 
                                            id="name" label="Full Name" 
                                            value={formData.name} 
                                            onChange={e => setFormData({...formData, name: e.target.value})} 
                                            error={errors.name}
                                        />
                                        <ModernInput 
                                            id="email" label="Email Address" type="email"
                                            value={formData.email} 
                                            onChange={e => setFormData({...formData, email: e.target.value})} 
                                            error={errors.email}
                                        />
                                    </div>
                                    
                                    <ModernInput 
                                        id="subject" label="Subject" 
                                        value={formData.subject} 
                                        onChange={e => setFormData({...formData, subject: e.target.value})} 
                                    />
                                    
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            rows={contactMethod === 'whatsapp' ? 5 : 4}
                                            value={formData.message}
                                            onChange={e => setFormData({...formData, message: e.target.value})}
                                            className={`w-full bg-black/20 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all resize-none`}
                                            placeholder="What's on your mind?"
                                        ></textarea>
                                        {errors.message && <p className="absolute -bottom-6 left-2 text-[11px] text-red-400 uppercase tracking-wider">{errors.message}</p>}
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 mt-2">
                                            <AlertCircle size={18} />
                                            <span className="text-sm">{errors.submit || 'Please fix the errors above.'}</span>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={saveAndRedirect}
                                            disabled={status === 'submitting'}
                                            className={`group relative w-full sm:w-auto px-8 sm:px-12 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 overflow-hidden transition-all disabled:opacity-50 ml-auto ${contactMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#1ebd5a] text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                                        >
                                            {status === 'submitting' ? <Loader className="animate-spin" size={20} /> : (
                                                <>
                                                    <span className="text-base uppercase tracking-wider">Open {contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}</span>
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Accordion>
                </div>

                <div className={`w-full max-w-5xl mx-auto mt-4 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Section 2: Direct Contact Details */}
                        <Accordion title="Direct Contact Details" icon={<Phone size={24} />} className="h-full">
                            <div className="py-4 space-y-3">
                                <ContactCard 
                                    icon={<MessageCircle size={18} className="text-green-400" />}
                                    title="WhatsApp / Phone"
                                    detail={contactInfo.phone}
                                    href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                                />
                                <ContactCard 
                                    icon={<Mail size={18} className="text-blue-400" />}
                                    title="Official Email"
                                    detail={contactInfo.email}
                                    href={`mailto:${contactInfo.email}`}
                                />
                                <div className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <MapPin size={18} className="text-purple-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-white font-medium text-xs mb-0.5">Office Location</h4>
                                        <p className="text-gray-400 text-xs leading-relaxed">{contactInfo.officeAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
    
                        {/* Section 3: Wekume App */}
                        <Accordion title="Get the Wekume App" icon={<Smartphone size={24} />} className="h-full">
                            <div className="py-4">
                                <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-white/5 p-5 rounded-xl flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-black/50 flex items-center justify-center mb-4 border border-white/10 shadow-lg">
                                        <Smartphone className="text-purple-400" size={28} />
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-2">Health in Your Pocket</h4>
                                    <p className="text-gray-400 text-xs mb-4">Download the official Wekume app for anonymous counseling and tools.</p>
                                    <a href="#" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-bold text-sm transition-colors">
                                        Download App
                                    </a>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </main>
            
            <div className="relative z-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <Footer />
            </div>
        </div>
    );
}

// Subcomponents
const ModernInput = ({ id, label, value, onChange, error, type = "text" }) => {
    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={label}
                className={`w-full bg-black/20 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all`}
            />
            {error && <p className="absolute -bottom-6 left-2 text-[11px] text-red-400 uppercase tracking-wider">{error}</p>}
        </div>
    );
};

const ContactCard = ({ icon, title, detail, href }) => (
    <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer">
        <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <h4 className="text-white font-medium text-sm">{title}</h4>
            <p className="text-gray-400 font-medium">{detail}</p>
        </div>
        <ArrowRight size={18} className="ml-auto text-gray-600 group-hover:text-white transform -translate-x-2 group-hover:translate-x-0 transition-all" />
    </a>
);

export default Contact;
