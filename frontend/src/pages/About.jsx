import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';
import { Users, BookOpen, Smartphone, Download, Quote, Star, ChevronLeft, ChevronRight, Heart, Shield, Target, Lightbulb, Globe } from 'lucide-react';

function About() {
    const { region } = useRegion();
    const [founderStory, setFounderStory] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [testimonialPage, setTestimonialPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sectionsRes, testimonialsRes] = await Promise.all([
                    contentAPI.getSections(region).catch(() => ({ data: { sections: [] } })),
                    contentAPI.getTestimonials(region).catch(() => ({ data: { testimonials: [] } }))
                ]);

                const sectionsList = sectionsRes.data.sections || [];
                const storySection = sectionsList.find(s => s.section_key === 'homepage.founder_story' || s.section_key === 'about.story');
                setFounderStory(storySection ? storySection.content_text : null);
                
                const valuesSection = sectionsList.find(s => s.section_key === 'about.values');
                if (valuesSection && valuesSection.content_text) {
                    const parsed = valuesSection.content_text.split('\n\n').filter(b => b.trim()).map(block => {
                        const lines = block.split('\n');
                        return {
                            title: lines[0].replace(/^\d+\.\s*/, ''),
                            description: lines.slice(1).join('\n').trim()
                        };
                    });
                    setCoreValues(parsed);
                }

                setTestimonials(testimonialsRes.data.testimonials || []);
            } catch (error) {
                console.error("Error fetching about page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [region]);

    // Testimonial pagination
    const testimonialsPerPage = 3;
    const totalTestimonialPages = Math.ceil(testimonials.length / testimonialsPerPage);
    const currentTestimonials = testimonials.slice(
        testimonialPage * testimonialsPerPage,
        testimonialPage * testimonialsPerPage + testimonialsPerPage
    );

    const fallbackTestimonials = [
        { id: 'f1', content: "Wekume has given me access to reliable health resources that I couldn't easily find before. It's truly empowering to have this community.", author_name: "Sarah K.", author_role: "University Student" },
        { id: 'f2', content: "The peer ambassadors are incredibly supportive and create a safe environment for open dialogues. I've learned so much about reproductive health.", author_name: "David M.", author_role: "Peer Educator" },
        { id: 'f3', content: "Attending the community drives opened my eyes to the real impact of accessible healthcare. The app will be a game changer for many of us.", author_name: "Anita T.", author_role: "Community Member" }
    ];

    const displayTestimonials = testimonials.length > 0 ? currentTestimonials : fallbackTestimonials;
    const valueIcons = [Heart, Users, Shield, Lightbulb, Globe, Target];

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Navbar />

            <PageHeader
                badge="Who We Are"
                title="Our Story"
                subtitle="The journey behind Wekume Initiative and the people driving the change."
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

                {/* The Founder's Story - Editorial Layout */}
                <section className="relative w-full max-w-5xl mx-auto py-12">
                    {/* Background Ambient Glows */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
                    </div>

                    <div className="relative bg-white/90 dark:bg-[#1a0a12]/90 backdrop-blur-3xl border border-gray-200/50 dark:border-[#ea638c]/20 rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(234,99,140,0.05)] animate-fade-in-up">
                        
                        {/* Massive Quote Watermark */}
                        <div className="absolute top-8 left-8 md:top-12 md:left-12 text-purple-100 dark:text-gray-800/40 transform -rotate-12 pointer-events-none select-none">
                            <Quote size={160} strokeWidth={1} fill="currentColor" />
                        </div>

                        {/* Content Wrapper */}
                        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                            
                            {/* Header Label */}
                            <div className="inline-flex items-center gap-3 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800/60 w-full justify-center">
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-black uppercase tracking-[0.2em] text-sm md:text-base flex items-center justify-center gap-3">
                                    <BookOpen size={18} className="text-purple-600 inline" />
                                    The Founder's Story
                                </span>
                            </div>

                            {/* Editorial Text Block */}
                            <div className="relative w-full text-left">
                                {founderStory ? (
                                    <div 
                                        className="prose prose-xl md:prose-2xl dark:prose-invert prose-headings:font-black prose-p:leading-[1.8] md:prose-p:leading-[2] prose-p:font-medium prose-p:tracking-tight max-w-none [&>p]:text-gray-900 dark:[&>p]:text-gray-100 first-letter:float-left first-letter:text-[6rem] md:first-letter:text-[8rem] first-letter:font-black first-letter:text-purple-600 dark:first-letter:text-purple-400 first-letter:leading-[0.8] first-letter:mr-4 first-letter:mt-2"
                                        dangerouslySetInnerHTML={{ __html: `<p>${founderStory.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>` }}
                                    ></div>
                                ) : (
                                    <div className="prose prose-xl md:prose-2xl dark:prose-invert prose-p:leading-[1.8] max-w-none text-center [&>p]:text-gray-900 dark:[&>p]:text-gray-100">
                                        <p className="italic">
                                            "Our founder's story will be updated here shortly. We are driven by a passion to ensure that every young person has access to essential health education and resources..."
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Stylish Ending Separator */}
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent mt-16 rounded-full opacity-50"></div>
                        </div>
                    </div>
                </section>

                {/* ── Core Values Section ─────────────────── */}
                {coreValues.length > 0 && (
                    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wider uppercase text-sm mb-2 block">Our Principles</span>
                                <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white mb-4">Core Values</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                            </div>
                            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {coreValues.map((value, idx) => {
                                    const Icon = valueIcons[idx % valueIcons.length];
                                    return (
                                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-purple-500/5 border border-purple-100/50 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group">
                                            <div className="w-14 h-14 bg-purple-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                                <Icon size={28} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Testimonials Section ─────────────────── */}
                <section className="py-12 md:py-20">
                    <div className="text-center mb-12">
                        <span className="text-pink-600 dark:text-pink-400 font-bold tracking-wider uppercase text-sm mb-2 block">Voices of Change</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white mb-4">What Our Community Says</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="relative">
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {displayTestimonials.map((t) => (
                                <div
                                    key={t.id}
                                    className="bg-white dark:bg-gray-800/80 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="mb-5 text-purple-500/20">
                                        <Quote size={36} className="transform rotate-180" fill="currentColor" />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-6 flex-grow italic">
                                        "{t.content}"
                                    </p>
                                    {t.rating && (
                                        <div className="flex gap-0.5 mb-4">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4 mt-auto pt-5 border-t border-gray-100 dark:border-gray-700/50">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
                                            {t.photo_url ? (
                                                <img src={t.photo_url} alt={t.author_name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span>{t.author_name?.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{t.author_name}</h4>
                                            <p className="text-sm text-pink-600 dark:text-pink-400 truncate">{t.author_role || 'Community Member'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {testimonials.length > testimonialsPerPage && (
                            <div className="flex justify-center items-center gap-4 mt-10">
                                <button
                                    onClick={() => setTestimonialPage(p => Math.max(0, p - 1))}
                                    disabled={testimonialPage === 0}
                                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-30"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <div className="flex gap-2">
                                    {Array.from({ length: totalTestimonialPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setTestimonialPage(i)}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                                i === testimonialPage
                                                    ? 'w-8 bg-purple-600'
                                                    : 'w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => setTestimonialPage(p => Math.min(totalTestimonialPages - 1, p + 1))}
                                    disabled={testimonialPage >= totalTestimonialPages - 1}
                                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-30"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Download App */}
                <section>
                    <div className="bg-gradient-to-br from-[#341525] via-[#7d52a0] to-[#1a0a12] rounded-3xl overflow-hidden relative shadow-2xl border border-primary-500/30">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                        
                        <div className="relative z-10 px-8 py-12 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="md:w-1/2 text-center md:text-left">
                                <h3 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4">Download the Wekume App</h3>
                                <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                                    Get direct access to essential reproductive health education, ask questions anonymously via our SafeChat, and discover rewards programs.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <Link to={`/${region}/wekume-app`} className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                                        <Download size={20} /> Get the App Now
                                    </Link>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <div className="relative w-48 sm:w-64">
                                     <div className="aspect-[9/19] bg-gray-900 rounded-[2.5rem] p-2 sm:p-3 shadow-2xl border-4 border-gray-800 relative z-10 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                                        <div className="w-full h-full bg-gradient-to-b from-purple-500 to-orange-500 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center text-center px-4">
                                            <Smartphone size={64} className="text-white mb-4 drop-shadow-lg" />
                                            <span className="text-white font-black text-xl tracking-wider">WEKUME APP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
}

export default About;
