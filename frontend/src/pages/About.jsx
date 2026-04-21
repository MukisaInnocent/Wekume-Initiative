import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';
import { Users, BookOpen, Smartphone, Download, Quote } from 'lucide-react';

function About() {
    const { region } = useRegion();
    const [founderStory, setFounderStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectionsRes = await contentAPI.getSections(region).catch(() => ({ data: { sections: [] } }));

                const sectionsList = sectionsRes.data.sections || [];
                const storySection = sectionsList.find(s => s.section_key === 'homepage.founder_story' || s.section_key === 'about.story');
                setFounderStory(storySection ? storySection.content_text : null);
            } catch (error) {
                console.error("Error fetching about page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [region]);

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
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

                    <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-3xl border border-gray-200/50 dark:border-gray-800/80 rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.4)] animate-fade-in-up">
                        
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
                                        className="prose prose-xl md:prose-2xl dark:prose-invert prose-headings:font-black prose-p:leading-[1.8] md:prose-p:leading-[2] prose-p:text-gray-900 dark:prose-p:text-gray-100 prose-p:font-medium prose-p:tracking-tight max-w-none first-letter:float-left first-letter:text-[6rem] md:first-letter:text-[8rem] first-letter:font-black first-letter:text-purple-600 dark:first-letter:text-purple-400 first-letter:leading-[0.8] first-letter:mr-4 first-letter:mt-2"
                                        dangerouslySetInnerHTML={{ __html: `<p>${founderStory.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>` }}
                                    ></div>
                                ) : (
                                    <div className="prose prose-xl md:prose-2xl dark:prose-invert prose-p:leading-[1.8] prose-p:text-gray-900 dark:prose-p:text-gray-100 max-w-none text-center">
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



                {/* Download App */}
                <section>
                    <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-3xl overflow-hidden relative shadow-2xl border border-purple-500">
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
