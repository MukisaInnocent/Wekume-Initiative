import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import { ArrowRight, Heart, Users, Lightbulb, Calendar, ArrowUpRight, MessageCircle, Shield, Clock, Quote, Sparkles, CheckCircle, Activity, Target, Eye, Flag } from 'lucide-react';
import { contentAPI, backgroundAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegion } from '../context/RegionContext';

function Home() {
    const { region } = useRegion();

    const [values, setValues] = useState([]);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contentSections, setContentSections] = useState([]);
    const [dynamicBackgrounds, setDynamicBackgrounds] = useState([]);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [loading, setLoading] = useState(true);

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
                const [valuesRes, eventsRes, partnersRes, testimonialsRes, backgroundsRes, sectionsRes] = await Promise.all([
                    contentAPI.getValues(),
                    contentAPI.getEvents(region),
                    contentAPI.getPartners(region),
                    contentAPI.getTestimonials(region),
                    backgroundAPI.getActiveBackgrounds().catch(err => ({ data: { backgrounds: [] } })),
                    contentAPI.getSections(region).catch(err => ({ data: { sections: [] } }))
                ]);

                setValues(valuesRes.data.values || []);
                setEvents(eventsRes.data.events?.slice(0, 3) || []); // Top 3 events
                setPartners(partnersRes.data.partners || []);
                setTestimonials(testimonialsRes.data.testimonials || []);
                setContentSections(sectionsRes.data.sections || []);

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
                contentSections={contentSections}
            />


            {/* Values Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
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
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
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
                            {events.length > 0 ? events.map(event => (
                                <motion.div
                                    key={event.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                                >
                                    <div className="h-56 bg-gray-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
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
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">{event.description}</p>
                                        <Link to="/events" className="text-purple-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all w-fit mt-auto cursor-pointer">Read More <ArrowUpRight size={16} /></Link>
                                    </div>
                                </motion.div>
                            )) : (
                                [1, 2, 3].map(i => (
                                    <motion.div
                                        key={`fallback-event-${i}`}
                                        variants={fadeInUp}
                                        className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col opacity-80"
                                    >
                                        <div className="h-56 bg-gradient-to-br from-purple-500/20 to-orange-400/20 relative flex items-center justify-center text-purple-300">
                                            <Calendar size={48} />
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                            <div className="space-y-2 mb-6 flex-1">
                                                <div className="h-4 bg-gray-100 dark:bg-gray-700/50 rounded w-full"></div>
                                                <div className="h-4 bg-gray-100 dark:bg-gray-700/50 rounded w-5/6"></div>
                                            </div>
                                            <Link to="/events" className="text-purple-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all w-fit mt-auto cursor-pointer">Explore Events <ArrowUpRight size={16} /></Link>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                        <div className="mt-12 text-center md:hidden">
                            <Link to="/events" className="px-6 py-3 bg-white dark:bg-gray-800 text-purple-600 font-bold rounded-xl shadow-md border border-gray-100 dark:border-gray-700">View All Events</Link>
                        </div>
                    </div>
                </section>

            {/* Partners Banner */}
            <div className="py-16 border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-10">Trusted by our partners</p>
                </div>
                
                {/* Gradient Masks for smooth entering/exiting */}
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-8 md:gap-12 items-center w-max px-8 py-4"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    >
                        {/* Fallback Partners if API data is missing/empty, or use real data */}
                        {partners.length > 0 ? [...partners, ...partners].map((partner, index) => (
                            <div 
                                key={`${partner.id}-${index}`} 
                                className="group flex flex-col items-center justify-between p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-500 shrink-0 w-[280px] md:w-[320px] h-[180px] cursor-default"
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
                                
                                {partner.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-normal line-clamp-3 mt-3 italic opacity-80 group-hover:opacity-100 transition-opacity">
                                        "{partner.description}"
                                    </p>
                                )}
                            </div>
                        )) : (
                            // Static placeholders if no data
                            [1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                                <div key={`fallback-${index}`} className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-dashed border-gray-200 dark:border-gray-700 shrink-0 w-[280px] h-[180px] opacity-40">
                                    <Users size={32} className="text-gray-300 dark:text-gray-600 mb-3" />
                                    <div className="text-xl font-bold text-gray-300 dark:text-gray-600">Partner {i}</div>
                                </div>
                            ))
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Testimonials Section */}
            <section className="py-16 bg-purple-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-[120px] opacity-20 -ml-20 -mt-20"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 -mr-20 -mb-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold">Stories of Impact</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.length > 0 ? testimonials.slice(0, 3).map((testimonial, idx) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative hover:bg-white/10 transition-colors flex flex-col"
                            >
                                <div className="text-pink-400 mb-6 opacity-50">
                                    <Quote size={32} className="transform rotate-180" />
                                </div>
                                <p className="text-purple-100 italic mb-8 leading-relaxed text-lg flex-1">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
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
                                <Link to="/testimonials" className="text-pink-300 hover:text-white font-bold text-sm mt-4 flex items-center gap-1 transition-colors">Read Full Story <ArrowUpRight size={14}/></Link>
                            </motion.div>
                        )) : (
                            // Fallback Testimonials
                            [1, 2, 3].map((i) => (
                            <motion.div
                                key={`fallback-test-${i}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative flex flex-col opacity-60"
                            >
                                <div className="text-pink-400/50 mb-6">
                                    <Quote size={32} className="transform rotate-180" />
                                </div>
                                <div className="space-y-3 mb-8 flex-1">
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-2/3"></div>
                                </div>
                                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-white/10"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-white/20 rounded w-24"></div>
                                        <div className="h-3 bg-white/10 rounded w-16"></div>
                                    </div>
                                </div>
                                <Link to="/testimonials" className="text-pink-300 font-bold text-sm mt-4 flex items-center gap-1 transition-colors">Read Stories <ArrowUpRight size={14}/></Link>
                            </motion.div>
                            ))
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/testimonials" className="inline-flex items-center gap-2 text-white border-b-2 border-pink-400 pb-1 hover:text-pink-300 hover:border-pink-300 transition-all font-bold tracking-wide">
                            View All Stories <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative py-16 overflow-hidden">
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
