import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import { ArrowRight, Heart, Users, Lightbulb, Calendar, ArrowUpRight, MessageCircle, Shield, Clock, Quote, Sparkles, CheckCircle, Activity } from 'lucide-react';
import { contentAPI, backgroundAPI } from '../services/api';
import { motion } from 'framer-motion';
import { useRegion } from '../context/RegionContext';

function Home() {
    const { region } = useRegion();

    const [values, setValues] = useState([]);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [dynamicBackgrounds, setDynamicBackgrounds] = useState([]);

    // Eager import as fallback
    const backgroundImagesModules = import.meta.glob('../assets/background images/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const localBackgroundImages = Object.values(backgroundImagesModules).map(module => module.default);

    // Use dynamic images if available, otherwise fallback
    const backgroundImages = dynamicBackgrounds.length > 0 ? dynamicBackgrounds.map(bg => bg.image_url) : localBackgroundImages;

    // Auto-play for Background Images
    useEffect(() => {
        if (backgroundImages.length === 0) return;

        const timer = setInterval(() => {
            setCurrentBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 8000); // Sync with HeroCarousel duration

        return () => clearInterval(timer);
    }, [backgroundImages.length]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [valuesRes, eventsRes, partnersRes, testimonialsRes, backgroundsRes] = await Promise.all([
                    contentAPI.getValues(),
                    contentAPI.getEvents(region),
                    contentAPI.getPartners(region),
                    contentAPI.getTestimonials(region),
                    backgroundAPI.getActiveBackgrounds().catch(err => ({ data: { backgrounds: [] } })) // Soft fail for backgrounds
                ]);

                setValues(valuesRes.data.values || []);
                setEvents(eventsRes.data.events?.slice(0, 3) || []); // Top 3 events
                setPartners(partnersRes.data.partners || []);
                setTestimonials(testimonialsRes.data.testimonials || []);

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
            <Navbar isTransparent={true} backgroundImages={backgroundImages} currentBackgroundIndex={currentBackgroundIndex} />

            {/* Dynamic Hero Carousel */}
            <HeroCarousel
                currentBackgroundIndex={currentBackgroundIndex}
                backgroundImages={backgroundImages}
                setCurrentBackgroundIndex={setCurrentBackgroundIndex}
            />

            {/* Introduction / Our Story Section */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-50 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        <div className="order-2 lg:order-1">
                            <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold text-xs tracking-wider uppercase mb-4">
                                Our Origin Story
                            </motion.span>
                            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                Wekume was born from a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">deeply personal promise</span>.
                            </motion.h2>

                            <motion.div variants={fadeInUp} className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>
                                    Our founder, <strong className="text-gray-900 dark:text-white">Joshua Walusimbi</strong>, witnessed firsthand the devastating impact of silence. Losing his sister to preventable health complications sparked a fire to change the narrative for other young people.
                                </p>
                                <p>
                                    He realized that without safe, stigma-free spaces to ask questions and seek support, history would keep repeating itself. Wekume is the answer to that silence.
                                </p>
                                <p>
                                    Today, <span className="font-bold text-purple-600 dark:text-purple-400">Wekume</span> ("Protect Yourself") empowers university students to take control of their health with confidence, dignity, and the right information.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden`}>
                                            <Users size={20} className="text-gray-400" />
                                        </div>
                                    ))}
                                    <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                                        500+
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Students Impacted
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeInUp} className="order-1 lg:order-2 relative perspective-1000">
                            {/* Card Stack Effect */}
                            <motion.div
                                className="relative z-10 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-700"
                                whileHover={{ rotateY: 5, rotateX: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="absolute -top-10 -left-10 bg-gradient-to-br from-orange-400 to-pink-500 text-white p-6 rounded-2xl shadow-xl transform rotate-12">
                                    <Lightbulb size={40} />
                                </div>

                                <blockquote className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 italic mb-8 pt-6 relative">
                                    <Quote className="absolute -top-4 -left-2 text-purple-200 dark:text-purple-900/50 w-16 h-16 -z-10" />
                                    "Joshua knew things had to change. Through features like SafeChat, QuickTest, and our appointment scheduler, Wekume offers students discreet, trusted access to professional help."
                                </blockquote>

                                <div className="flex items-center gap-5 border-t border-gray-100 dark:border-gray-700 pt-8">
                                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-2xl">
                                        JW
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white text-lg">Joshua Walusimbi</div>
                                        <div className="text-purple-600 dark:text-purple-400">Founder, Wekume Initiative</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative backing */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-orange-500 rounded-[2rem] transform rotate-3 scale-105 opacity-20 -z-10 blur-sm"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Meet Lina - AI Safe Chat Section */}
            <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Full Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"></div>

                        {/* Animated Orbs */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse-slow"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] -ml-40 -mb-40 animate-pulse-slow delay-1000"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
                                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-6">
                                    <Sparkles size={16} className="text-blue-300" />
                                    AI-Powered Support
                                </motion.div>
                                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">Lina</span>
                                    <br />Your Safe Space.
                                </motion.h2>
                                <motion.p variants={fadeInUp} className="text-blue-100 text-lg mb-8 leading-relaxed max-w-xl">
                                    Have questions about your health but afraid to ask? Lina is here 24/7.
                                    Click the icon in the corner to start a <span className="font-bold text-white">secure, private, and anonymous</span> conversation.
                                </motion.p>

                                <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                    {[
                                        { icon: Shield, text: "100% Private & Anonymous", color: "text-green-400" },
                                        { icon: Clock, text: "Available 24/7/365", color: "text-blue-400" },
                                        { icon: CheckCircle, text: "Accurate Information", color: "text-purple-400" },
                                        { icon: MessageCircle, text: "Judgement-Free Zone", color: "text-pink-400" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                                            <item.icon size={20} className={item.color} />
                                            <span className="text-white/90 text-sm font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-300 shrink-0">
                                            <Activity size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-1">Deep Analysis Mode</h4>
                                            <p className="text-sm text-blue-200 leading-relaxed">
                                                Lina takes 30-40 seconds to cross-reference trusted medical databases and cultural context to provide the most accurate, helpful response possible.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative hidden lg:block"
                            >
                                {/* Augmented Reality / Holographic Effect Mockup */}
                                <div className="relative mx-auto w-80">
                                    <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20"></div>
                                    <img
                                        src="/assets/lina-logo.jpg"
                                        alt="Lina Chat"
                                        className="relative z-10 w-full drop-shadow-2xl animate-float"
                                    />
                                    {/* Floating Chat Bubbles */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="absolute -right-12 top-20 bg-white text-gray-800 p-4 rounded-2xl rounded-bl-sm shadow-xl max-w-[200px] text-sm z-20"
                                    >
                                        <p>Hey! I'm Lina. What's on your mind today? 💜</p>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                        className="absolute -left-12 bottom-20 bg-purple-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-xl max-w-[200px] text-sm z-20"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Shield size={14} />
                                            <span>Your chat is encrypted.</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">Core Values</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto rounded-full"></div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {/* Values Logic */}
                        {values.length > 0 ? values.map((value, index) => (
                            <motion.div
                                key={value.id}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl hover:border-purple-200 dark:hover:border-purple-800"
                            >
                                <div className={`inline-flex p-5 rounded-2xl mb-6 shadow-md ${index % 2 === 0 ? 'bg-white text-orange-500' : 'bg-white text-purple-600'}`}>
                                    {index === 0 ? <Heart size={32} /> : index === 1 ? <Users size={32} /> : <Lightbulb size={32} />}
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                            </motion.div>
                        )) : (
                            // Fallback Values
                            <>
                                <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
                                    <div className="inline-flex p-5 rounded-2xl mb-6 bg-white text-orange-500 shadow-sm"><Heart size={32} /></div>
                                    <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900 dark:text-white">Learn, Unlearn, Relearn</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Embracing continuous growth and adaptation in an ever-changing world.</p>
                                </motion.div>
                                <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
                                    <div className="inline-flex p-5 rounded-2xl mb-6 bg-white text-purple-600 shadow-sm"><Users size={32} /></div>
                                    <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900 dark:text-white">Innovation</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Using technology and creative solutions to solve real problems.</p>
                                </motion.div>
                                <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
                                    <div className="inline-flex p-5 rounded-2xl mb-6 bg-white text-orange-500 shadow-sm"><Lightbulb size={32} /></div>
                                    <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900 dark:text-white">Accessibility</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Making education and health resources available to everyone.</p>
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Events Preview */}
            {events.length > 0 && (
                <section className="py-24 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-between items-end mb-12"
                        >
                            <div>
                                <span className="text-orange-600 dark:text-orange-400 font-semibold tracking-wider uppercase text-sm">Get Involved</span>
                                <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2">Upcoming Events</h2>
                            </div>
                            <Link to="/events" className="hidden md:flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 hover:gap-3 transition-all">View All <ArrowRight size={20} /></Link>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {events.map(event => (
                                <motion.div
                                    key={event.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="h-56 bg-gray-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        {/* Placeholder Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-orange-400 opacity-80"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                            <Calendar size={64} />
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <div className="flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-2">
                                                    <Calendar size={14} />
                                                    {new Date(event.event_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed">{event.description}</p>
                                        <span className="text-purple-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Details <ArrowUpRight size={16} /></span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        <div className="mt-12 text-center md:hidden">
                            <Link to="/events" className="btn-secondary">View All Events</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Partners Banner */}
            <div className="py-16 border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-10">Trusted by our partners</p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-10 md:gap-16 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Fallback Partners if API data is missing/empty, or use real data */}
                        {partners.length > 0 ? partners.map(partner => (
                            partner.logo_url ? (
                                <img key={partner.id} src={partner.logo_url} alt={partner.name} className="h-10 w-auto object-contain hover:scale-110 transition-transform" title={partner.name} />
                            ) : (
                                <span key={partner.id} className="text-lg font-bold text-gray-400">{partner.name}</span>
                            )
                        )) : (
                            // Static placeholders for design proof
                            <>
                                <div className="text-2xl font-bold text-gray-300">Partner 1</div>
                                <div className="text-2xl font-bold text-gray-300">Partner 2</div>
                                <div className="text-2xl font-bold text-gray-300">Partner 3</div>
                                <div className="text-2xl font-bold text-gray-300">Partner 4</div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-24 bg-purple-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-[120px] opacity-20 -ml-20 -mt-20"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 -mr-20 -mb-20"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-heading font-bold">Stories of Impact</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.slice(0, 3).map((testimonial, idx) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative hover:bg-white/10 transition-colors"
                                >
                                    <div className="text-pink-400 mb-6 opacity-50">
                                        <Quote size={32} className="transform rotate-180" />
                                    </div>
                                    <p className="text-purple-100 italic mb-8 leading-relaxed text-lg">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-0.5">
                                            <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                                {testimonial.photo_url ? (
                                                    <img src={testimonial.photo_url} alt={testimonial.author_name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="font-bold text-white">{testimonial.author_name.charAt(0)}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{testimonial.author_name}</h4>
                                            <p className="text-sm text-pink-300">{testimonial.author_role || 'Community Member'}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link to="/testimonials" className="inline-flex items-center gap-2 text-white border-b-2 border-pink-400 pb-1 hover:text-pink-300 hover:border-pink-300 transition-all font-bold">
                                Read More Stories <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-orange-600"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-heading font-bold mb-8"
                    >
                        Ready to Make a Difference?
                    </motion.h2>
                    <p className="text-2xl mb-12 text-purple-100 font-light">Join us in creating lasting change in our communities.</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/contact"
                            className="bg-white text-purple-700 px-12 py-5 rounded-full font-bold hover:shadow-2xl hover:shadow-black/20 transition-all inline-flex items-center gap-3 text-lg"
                        >
                            Contact Us Today <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Include Footer inside the motion context or just as is */}
            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}

export default Home;
