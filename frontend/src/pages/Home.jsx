import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import { ArrowRight, Heart, Users, Lightbulb, Calendar, ArrowUpRight, MessageCircle, Shield, Clock, Quote, Sparkles, CheckCircle, Activity, Target, Eye, Flag, Gift, Smartphone } from 'lucide-react';
import { contentAPI, backgroundAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegion } from '../context/RegionContext';

function Home() {
    const { region, isUS } = useRegion();

    const [values, setValues] = useState([]);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contentSections, setContentSections] = useState([]);
    const [dynamicBackgrounds, setDynamicBackgrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // New state for mission and vision
    const [mission, setMission] = useState(null);
    const [vision, setVision] = useState(null);

    const backgroundImagesModules = import.meta.glob('../assets/background images/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const localBackgroundImages = Object.values(backgroundImagesModules).map(module => module.default);
    const backgroundImages = dynamicBackgrounds.length > 0 ? dynamicBackgrounds.map(bg => bg.image_url) : localBackgroundImages;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [valuesRes, partnersRes, testimonialsRes, backgroundsRes, sectionsRes, missionRes, visionRes] = await Promise.all([
                    contentAPI.getValues(),
                    contentAPI.getPartners(region),
                    contentAPI.getTestimonials(region),
                    backgroundAPI.getActiveBackgrounds().catch(err => ({ data: { backgrounds: [] } })),
                    contentAPI.getSections(region).catch(err => ({ data: { sections: [] } })),
                    contentAPI.getSection('about_mission', region).catch(() => ({ data: { content: null } })),
                    contentAPI.getSection('about_vision', region).catch(() => ({ data: { content: null } }))
                ]);

                setValues(valuesRes.data.values || []);
                setPartners(partnersRes.data.partners || []);
                setTestimonials(testimonialsRes.data.testimonials || []);
                setContentSections(sectionsRes.data.sections || []);
                setMission(missionRes.data?.content || "Empowering university students to take control of their reproductive health while nurturing personal and professional growth.");
                setVision(visionRes.data?.content || "A healthier, informed future for the youth of Africa.");
                
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
                    {/* Why Us section integrated */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-900 text-white rounded-[2.5rem] p-8 sm:p-14 mb-20 relative overflow-hidden text-center max-w-5xl mx-auto border border-white/10"
                    >
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-600/30 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block relative z-10">The Context</span>
                        <h2 className="text-4xl font-heading font-black mb-6 relative z-10">Why We Exist</h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed relative z-10">
                            Ugandan university students face unique challenges around reproductive health. Many lack access to safe resources, and stigma prevents open conversations. Wekume addresses these issues by offering an inclusive, digital platform that connects them to vital information, healthcare services, and a supportive community.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events Description & Rewards Program Brief */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col md:flex-row group">
                        
                        <div className={`${!isUS ? 'md:w-1/2 border-r border-gray-100 dark:border-gray-700' : 'w-full'} p-6 sm:p-10 md:p-14 flex flex-col justify-center relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 group-hover:bg-white transition-colors`}>
                            <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-sm font-bold tracking-wide w-fit mb-6 flex items-center gap-2">
                                <Calendar size={16} /> Activities
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6">Experience the Action</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
                                Wekume organizes impactful community drives, on-campus health dialogues, and hostel outreach programs. Our events are safe spaces to learn, connect, and empower one another. Join us in shaping a well-informed generation.
                            </p>
                            <Link to="/ug/activities" className="mt-auto text-purple-600 dark:text-purple-400 font-bold text-lg flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
                                View Our Events <ArrowRight size={20} />
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
            {testimonials && testimonials.length > 0 && (
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
                            {[...testimonials, ...testimonials, ...testimonials].map((t, index) => (
                                <div 
                                    key={`${t.id || index}-${index}`}
                                    className="group bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:border-pink-200 dark:hover:border-pink-800 transition-all duration-300 w-[85vw] sm:w-[350px] lg:w-[400px] shrink-0 flex flex-col relative"
                                    tabIndex={0}
                                >
                                    <Quote className="text-pink-200 dark:text-pink-900/40 absolute top-6 right-6" size={40} />
                                    <p className="text-gray-700 dark:text-gray-300 italic mb-8 relative z-10 flex-1 text-lg">"{t.content}"</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 border-2 border-white dark:border-gray-700 shadow-sm shrink-0">
                                            {t.photo_url ? (
                                                <img src={t.photo_url} alt={t.author_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-bold">{t.author_name?.charAt(0)}</div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{t.author_name}</h4>
                                            <p className="text-xs text-pink-600 dark:text-pink-400 font-medium tracking-wide uppercase mt-0.5">{t.author_role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
            {isUS && (
            <section className="relative py-24 overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-gray-900"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Heart className="mx-auto text-pink-500 mb-6 animate-pulse" fill="currentColor" size={48} />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-8 tracking-tight"
                    >
                        Fund the Future
                    </motion.h2>
                    <p className="text-xl sm:text-2xl text-purple-100 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Your contribution provides testing kits, salaries, community events, and vital resources. Stand with us to empower youth across Uganda.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                        <Link
                            to="/us/support"
                            className="bg-white text-purple-700 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-extrabold hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            Fund Us Today <ArrowRight size={22} className="stroke-[3]" />
                        </Link>
                    </motion.div>
                </div>
            </section>
            )}

            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}

export default Home;
