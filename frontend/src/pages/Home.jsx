import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import Modal from '../components/Modal';
import { ArrowRight, Heart, Users, Lightbulb, Calendar, ArrowUpRight, MessageCircle, Shield, Clock, Quote, Sparkles, CheckCircle, Activity, Target, Eye, Flag, Gift, Smartphone, Send, DollarSign, CreditCard, Star } from 'lucide-react';
import { contentAPI, backgroundAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegion } from '../context/RegionContext';

function Home() {
    const { region, isUS } = useRegion();

    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState('idle');



    const [values, setValues] = useState([]);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contentSections, setContentSections] = useState([]);
    const [dynamicBackgrounds, setDynamicBackgrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // New state for mission and vision
    const [mission, setMission] = useState(null);
    const [vision, setVision] = useState(null);
    const [ourStory, setOurStory] = useState(null);
    const [fundTheFuture, setFundTheFuture] = useState(null);

    const backgroundImagesModules = import.meta.glob('../assets/background images/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const localBackgroundImages = Object.values(backgroundImagesModules).map(module => module.default);
    const backgroundImages = dynamicBackgrounds.length > 0 ? dynamicBackgrounds.map(bg => bg.image_url) : localBackgroundImages;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [valuesRes, partnersRes, testimonialsRes, backgroundsRes, sectionsRes] = await Promise.all([
                    contentAPI.getValues(),
                    contentAPI.getPartners(region),
                    contentAPI.getTestimonials(region),
                    backgroundAPI.getActiveBackgrounds().catch(err => ({ data: { backgrounds: [] } })),
                    contentAPI.getSections(region).catch(err => ({ data: { sections: [] } }))
                ]);

                setValues(valuesRes.data.values || []);
                setPartners(partnersRes.data.partners || []);
                setTestimonials(testimonialsRes.data.testimonials || []);
                
                const sectionsList = sectionsRes.data.sections || [];
                setContentSections(sectionsList);
                
                const getCMS = (key, fallback) => {
                    const section = sectionsList.find(s => s.section_key === key);
                    return section && section.content_text ? section.content_text : fallback;
                };

                setMission(getCMS('homepage.mission', "To empower young people with knowledge, skills, and access to sexual reproductive health services and mental health support for a healthier, more informed generation."));
                setVision(getCMS('homepage.vision', "A world where every young person has the knowledge and support to make informed decisions about their health and well-being."));
                setOurStory(getCMS('homepage.our_story', "Wekume Initiative started as a response to the quiet struggles faced by university students accessing reproductive health. We imagine a world where young people no longer navigate these issues alone or in shame, but with strong support and verified information."));
                setFundTheFuture(getCMS('homepage.fund_the_future', "Your contribution provides testing kits, salaries, community events, and vital resources. Stand with us to empower youth across Uganda."));
                
                if (backgroundsRes.data.backgrounds && backgroundsRes.data.backgrounds.length > 0) {
                    setDynamicBackgrounds(backgroundsRes.data.backgrounds);
                }
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [region]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar isTransparent={true} backgroundImages={backgroundImages} />

            <HeroCarousel
                backgroundImages={backgroundImages}
                contentSections={contentSections}
                mission={mission}
                vision={vision}
                values={values}
                region={region}
            />

            {/* Vision, Mission, Values, & Why Us */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Our Story / The Context section - simplified */}
                    <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 sm:p-14 mb-20 relative overflow-hidden text-center max-w-5xl mx-auto border border-white/10">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-600/30 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-6 block relative z-10">The Context</span>
                        
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <h2 className="text-3xl sm:text-4xl font-heading font-black mb-6">Our Story</h2>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                                {ourStory}
                            </p>
                            <Link to={`/${isUS ? 'us' : 'ug'}/activities`} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all inline-flex items-center gap-2">
                                Read More <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action: Fund Us (US ONLY) */}
            {isUS && (
            <section className="relative py-24 overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-gray-900"></div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[150px] opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 text-center lg:text-left">
                            <Heart className="mx-auto lg:mx-0 text-pink-500 mb-6 animate-pulse" fill="currentColor" size={48} />
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-6 tracking-tight">Fund the Future</h2>
                            <p className="text-xl text-purple-100 font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {fundTheFuture}
                            </p>
                            
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 max-w-xl mx-auto lg:mx-0 backdrop-blur-sm">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2 justify-center lg:justify-start">
                                    <DollarSign size={20} className="text-green-400" /> Multiple Payment Options
                                </h4>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <CreditCard size={18} className="text-blue-300" /> <span className="text-sm font-medium">PayPal</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <CreditCard size={18} className="text-purple-300" /> <span className="text-sm font-medium">Bank Transfer</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <Smartphone size={18} className="text-yellow-400" /> <span className="text-sm font-medium">MTN MoMo</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <Smartphone size={18} className="text-red-400" /> <span className="text-sm font-medium">Airtel Money</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/us/support"
                                className="inline-flex bg-white text-secondary-600 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-extrabold hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all items-center justify-center gap-3 text-lg"
                            >
                                Fund Us Today <ArrowRight size={22} className="stroke-[3]" />
                            </Link>
                        </div>
                        
                        {/* Talk to Us Form Block */}
                        <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
                            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 blur-[80px] opacity-40"></div>
                                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Talk to Us First</h3>
                                <p className="text-purple-200 text-sm mb-6 relative z-10">Have questions before giving? Send us a direct message.</p>
                                
                                <form className="space-y-4 relative z-10" onSubmit={(e) => {
                                    e.preventDefault();
                                    setContactStatus('submitting');
                                    setTimeout(() => {setContactStatus('success'); setContactForm({name:'', email:'', message:''});}, 1500);
                                }}>
                                    {contactStatus === 'success' ? (
                                        <div className="bg-green-500/20 border border-green-500/50 text-green-100 p-4 rounded-xl text-center flex flex-col items-center gap-2">
                                            <CheckCircle size={32} className="text-green-400" />
                                            <p className="font-bold">Message sent successfully!</p>
                                            <p className="text-sm">We'll get back to you soon.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <input type="text" placeholder="Your Name" value={contactForm.name} onChange={e=>setContactForm({...contactForm, name:e.target.value})} required className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors" />
                                            </div>
                                            <div>
                                                <input type="email" placeholder="Email Address" value={contactForm.email} onChange={e=>setContactForm({...contactForm, email:e.target.value})} required className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors" />
                                            </div>
                                            <div>
                                                <textarea placeholder="How can we help you?" rows="3" value={contactForm.message} onChange={e=>setContactForm({...contactForm, message:e.target.value})} required className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors resize-none"></textarea>
                                            </div>
                                            <button type="submit" disabled={contactStatus==='submitting'} className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-pink-600 hover:to-orange-600 transition-colors disabled:opacity-70">
                                                {contactStatus === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Message</>}
                                            </button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            )}

            {/* Events Description & Rewards Program Brief */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col md:flex-row group">
                        
                        <div className={`${!isUS ? 'md:w-1/2 border-r border-gray-100 dark:border-gray-700' : 'w-full'} p-6 sm:p-10 md:p-14 flex flex-col justify-center relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 group-hover:bg-white transition-colors`}>
                            <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-sm font-bold tracking-wide w-fit mb-6 flex items-center gap-2">
                                <Activity size={16} /> What We Do
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6">Experience the Action</h2>
                            <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed mb-10">
                                Through our dedicated network of <strong>Peer Ambassadors</strong>, Wekume organizes impactful interactions tailored for the youth. We actively host educational drives and open dialogues at <strong>university campuses</strong>, <strong>student hostels</strong>, and directly <strong>in local communities</strong>. Join us in shaping a well-informed generation through these inclusive, safe spaces.
                            </p>
                            <Link to={`/${isUS ? 'us' : 'ug'}/activities`} className="mt-auto text-purple-600 dark:text-purple-400 font-bold text-lg flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
                                View More <ArrowRight size={20} />
                            </Link>
                        </div>

                        {!isUS && (
                        <div className="md:w-1/2 p-6 sm:p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-purple-600 to-orange-500 text-white relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                            
                            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold tracking-wide w-fit mb-6 flex items-center gap-2">
                                <Gift size={16} /> Rewards
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Wekume Rewards</h2>
                            <p className="text-purple-100 text-lg leading-relaxed mb-10 relative z-10">
                                Be part of our activities and interact with our platform to earn points. Redeem your points for exclusive swag, essential health kits, and special event passes. Your active participation fuels the change and rewards your growth.
                            </p>
                            <Link to="/ug/rewards" className="mt-auto bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all w-fit flex items-center gap-2 relative z-10">
                                Learn More <ArrowRight size={18} />
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Marquee */}
            <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative z-20">
                    <span className="text-pink-600 dark:text-pink-400 font-bold tracking-wider uppercase text-sm mb-2 block">Voices of Change</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full"></div>
                </div>

                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-full overflow-hidden pause-animation">
                    <div className="flex gap-6 items-stretch w-max px-4 py-4 animate-scroll-marquee">
                        {(() => {
                            const fallback = [
                                { id: 'f1', content: "Wekume has given me access to reliable health resources that I couldn't easily find before. It's truly empowering to have this community.", author_name: "Sarah K.", author_role: "University Student", photo_url: "" },
                                { id: 'f2', content: "The peer ambassadors are incredibly supportive and create a safe environment for open dialogues. I've learned so much about reproductive health.", author_name: "David M.", author_role: "Peer Educator", photo_url: "" },
                                { id: 'f3', content: "Attending the community drives opened my eyes to the real impact of accessible healthcare. The app will be a game changer for many of us.", author_name: "Anita T.", author_role: "Community Member", photo_url: "" }
                            ];
                            const source = testimonials && testimonials.length > 0 ? testimonials : fallback;
                            // Repeat 4x for seamless infinite scroll
                            const marqueeItems = [...source, ...source, ...source, ...source];
                            return marqueeItems;
                        })().map((t, index) => (
                            <div 
                                key={`${t.id || index}-${index}`}
                                className="group bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-[0_15px_40px_rgba(234,99,140,0.12)] dark:hover:shadow-[0_15px_40px_rgba(234,99,140,0.05)] hover:-translate-y-2 hover:border-pink-200 dark:hover:border-pink-500/30 transition-all duration-500 w-[85vw] sm:w-[380px] lg:w-[420px] shrink-0 flex flex-col relative overflow-hidden"
                                tabIndex={0}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-transparent dark:from-pink-900/20 rounded-bl-[100px] -z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Quote className="text-pink-400/20 dark:text-pink-600/20 absolute top-8 right-8 z-0 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" size={60} />
                                
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-gray-900 dark:text-gray-100 italic mb-4 flex-1 text-lg leading-relaxed line-clamp-3">" + "{t.content}" + "</p>
                                    
                                    <button 
                                        onClick={() => { setSelectedTestimonial(t); setIsTestimonialModalOpen(true); }}
                                        className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-full font-bold text-sm w-max hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors mb-8 group/btn"
                                    >
                                        Read Full Story <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                                
                                <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-600 shadow-md shrink-0">
                                        {t.photo_url ? (
                                            <img src={t.photo_url} alt={t.author_name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-orange-400 text-white font-black text-xl">{t.author_name?.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{t.author_name}</h4>
                                        <p className="text-xs text-gray-900 dark:text-gray-100 font-medium tracking-wide uppercase mt-0.5">{t.author_role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Banner */}
            <div className="py-16 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden relative pause-animation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-10">Trusted by our partners</p>
                </div>
                
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-full overflow-hidden">
                    <div className="flex gap-8 md:gap-12 items-center w-max px-8 py-4 animate-scroll-marquee">
                        {partners.length > 0 ? [...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                            <button 
                                key={`${partner.id}-${index}`} 
                                className="group flex flex-col items-center justify-between p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-500 shrink-0 w-[85vw] sm:w-[280px] md:w-[320px] h-[180px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 hover:scale-[1.02]"
                                tabIndex={0}
                            >
                                <div className="w-full flex flex-col items-center">
                                    {partner.logo_url ? (
                                        <div className="h-12 flex items-center justify-center mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <img src={partner.logo_url} alt={partner.name} className="h-full w-auto object-contain" />
                                        </div>
                                    ) : (
                                        <div className="h-12 flex flex-col items-center justify-center mb-2">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2 border border-purple-200/50 dark:border-purple-800/50">
                                                <Users size={12} /> {partner.type || 'Partner'}
                                            </div>
                                        </div>
                                    )}
                                    <h4 className="text-lg font-heading font-black text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-center truncate w-full uppercase tracking-tighter">{partner.name}</h4>
                                </div>
                            </button>
                        )) : (
                            [1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                                <div key={`fallback-${index}`} className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-dashed border-gray-200 dark:border-gray-700 shrink-0 w-[85vw] sm:w-[280px] h-[180px] opacity-40">
                                    <Users size={32} className="text-gray-300 dark:text-gray-600 mb-3" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Call to Action: Fund Us (US ONLY) */}
            <div className="relative z-10">
                <Footer />
            </div>

            {/* Testimonial Modal */}
            <Modal
                isOpen={isTestimonialModalOpen}
                onClose={() => { setIsTestimonialModalOpen(false); setSelectedTestimonial(null); }}
                title="Community Testimonial"
            >
                {selectedTestimonial && (
                    <div className="py-4">
                        <Quote className="text-pink-300 dark:text-pink-900/40 mb-4" size={40} />
                        <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed italic mb-8">"{selectedTestimonial.content}"</p>
                        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shadow-sm shrink-0">
                                {selectedTestimonial.photo_url ? (
                                    <img src={selectedTestimonial.photo_url} alt={selectedTestimonial.author_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-black text-xl">{selectedTestimonial.author_name?.charAt(0)}</div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{selectedTestimonial.author_name}</h4>
                                <p className="text-sm text-pink-600 dark:text-pink-400 font-medium tracking-wide uppercase mt-0.5">{selectedTestimonial.author_role}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
}

export default Home;
