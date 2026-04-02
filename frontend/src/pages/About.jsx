import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';
import { Users, BookOpen, Smartphone, Download } from 'lucide-react';

function About() {
    const { region } = useRegion();
    const [founderStory, setFounderStory] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [storyRes, teamRes] = await Promise.all([
                    contentAPI.getSection('about_story', region).catch(() => ({ data: { content: null } })),
                    contentAPI.getTeamMembers(region).catch(() => ({ data: { members: [] } }))
                ]);

                setFounderStory(storyRes.data?.content || null);
                setTeamMembers(teamRes.data?.members || []);
            } catch (error) {
                console.error("Error fetching our story data:", error);
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

                {/* The Founder's Story */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Founder's Story</h2>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {founderStory ? founderStory : (
                                <p className="italic text-gray-500">
                                    Our founder's story will be updated here shortly. We are driven by a passion to ensure that every young person has access to essential health education and resources...
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Our Team */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-xl text-orange-600 dark:text-orange-400">
                            <Users size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Team</h2>
                    </div>

                    {teamMembers.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {teamMembers.filter(m => m.is_active !== false).map((member) => (
                                <div key={member.id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                                    <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                                        {member.photo_url ? (
                                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 text-4xl font-black text-purple-200 dark:text-purple-800">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="w-full p-4 text-center border-t border-gray-50 dark:border-gray-800/50 bg-white dark:bg-gray-900">
                                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{member.name}</h3>
                                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1 truncate">{member.role || 'Team Member'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-100 dark:border-gray-800">
                            <Users size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">Our amazing team will be showcased here soon.</p>
                        </div>
                    )}
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
