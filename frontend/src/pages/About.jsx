import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import { contentAPI } from '../services/api';
import { Heart, Users, Lightbulb, Smartphone, Calendar, Gift, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

function About() {
    const { region, isUS } = useRegion();
    const [sections, setSections] = useState({});
    const [values, setValues] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [missionRes, visionRes, storyRes, valuesRes, teamRes] = await Promise.all([
                    contentAPI.getSection('about_mission', region),
                    contentAPI.getSection('about_vision', region),
                    contentAPI.getSection('about_story', region),
                    contentAPI.getValues(),
                    contentAPI.getTeamMembers(region)
                ]);

                setSections({
                    mission: missionRes.data.content,
                    vision: visionRes.data.content,
                    story: storyRes.data.content
                });
                setValues(valuesRes.data.values || []);
                setTeamMembers(teamRes.data?.members || []);
            } catch (error) {
                console.error("Error fetching about data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [region]);

    const parseContent = (content) => {
        if (!content) return null;
        return typeof content === 'string' ? JSON.parse(content) : content;
    };

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <Navbar />

            <PageHeader
                badge="Who We Are"
                title="About Wekume Initiative"
                subtitle="Building a healthier, informed future."
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 space-y-6 sm:space-y-8 md:space-y-10">

                {/* Who We Are & Mission - Keep this visible as it's the core story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center bg-gray-50/50 dark:bg-gray-900/40 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <div>
                        <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wider uppercase text-xs">Our Mission</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-4">Empowering Through Knowledge</h2>
                        <div className="prose text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed space-y-3">
                            <p>
                                At Wekume, our mission is to empower university students to take control of their reproductive health while nurturing personal and professional growth.
                            </p>
                            <p>
                                Guided by values of inclusivity, accessibility, and empowerment, Wekume aims to create a positive, sustainable impact on students' lives.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-orange-100 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl transform rotate-2"></div>
                        <img
                            src="/uploads/soup-assets/events/inter-university-dialogue-makerere.jpg"
                            alt="Wekume team"
                            className="relative rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover"
                            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                        />
                    </div>
                </div>

                {/* Values & Team - Horizontal Accordions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Core Values - Accordion */}
                    <Accordion title="Our Core Values" icon={<Heart size={20} />} defaultOpen={false} className="h-full">
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            {[
                                { title: "Inclusivity", icon: <Users size={16} className="text-purple-500" /> },
                                { title: "Empowerment", icon: <Lightbulb size={16} className="text-orange-500" /> },
                                { title: "Compassion", icon: <Heart size={16} className="text-pink-500" /> },
                                { title: "Innovation", icon: <Smartphone size={16} className="text-blue-500" /> }
                            ].map((v, i) => (
                                <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        {v.icon}
                                        <h4 className="font-bold text-white text-[11px]">{v.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 italic leading-tight">Guided by inclusivity, empowerment, compassion, and innovation.</p>
                    </Accordion>

                    {/* Meet Our Team - Accordion */}
                    <Accordion title="Meet Our Team" icon={<Users size={20} />} className="h-full">
                        {teamMembers.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                {teamMembers.filter(m => m.is_active !== false).slice(0, 6).map((member) => (
                                    <div key={member.id} className="bg-black/20 rounded-lg overflow-hidden border border-white/5 group relative aspect-square">
                                        {member.photo_url ? (
                                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-xs font-bold text-purple-400/20">{member.name.charAt(0)}</div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-1">
                                            <p className="text-[8px] font-bold text-white truncate text-center">{member.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-6 text-[10px] text-gray-500">Team members coming soon.</p>
                        )}
                    </Accordion>
                </div>

                {/* What We Do & Future Goals - Horizontal Accordions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* What We Do - Accordion */}
                    <Accordion title="What We Do" icon={<Smartphone size={20} />} className="h-full">
                        <div className="flex flex-col gap-2 pt-2">
                            {[
                                { title: 'Wekume App', desc: 'Health info & SafeChat.' },
                                { title: 'Events', desc: 'Workshops & drives.' },
                                { title: 'Volunteer', desc: 'Youth ambassadors.' }
                            ].map((item, i) => (
                                <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                                    <h4 className="text-[11px] font-bold text-white">{item.title}</h4>
                                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Accordion>

                    {/* Future Goals - Accordion */}
                    <Accordion title="Our Next Big Dreams" icon={<Lightbulb size={20} />} className="h-full">
                        <div className="flex flex-col gap-2 pt-2">
                            {[
                                { icon: "💼", title: "Business Dev", desc: "Student incubator." },
                                { icon: "🌍", title: "Exchange", desc: "Regional programs." },
                                { icon: "🤲", title: "Inclusivity", desc: "Safe spaces." }
                            ].map((goal, i) => (
                                <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                                    <span className="text-lg">{goal.icon}</span>
                                    <div>
                                        <h4 className="text-[11px] font-bold text-white">{goal.title}</h4>
                                        <p className="text-[10px] text-gray-400">{goal.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                </div>

                {/* Why We Exist - Simplified Banner */}
                <div className="bg-gray-900 text-white rounded-3xl p-8 overflow-hidden relative border border-white/5">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-900/30 rounded-full blur-3xl"></div>
                    <div className="relative z-10 max-w-2xl mx-auto text-center">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Why We Exist</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Ugandan university students face unique challenges around reproductive health. Many lack access to safe resources, and stigma prevents open conversations. Wekume addresses these issues by offering an inclusive, digital platform.
                        </p>
                    </div>
                </div>

                {/* Get Involved - Buttons Instead of Huge Cards */}
                <div className="bg-gradient-to-br from-purple-500/5 to-orange-500/5 border border-white/5 rounded-3xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold text-white">Join the Movement</h2>
                            <p className="text-xs text-gray-400 mt-1">Ready to make an impact? There are many ways to help.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to={`/${region}/get-involved`} className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">Volunteers</Link>
                            <Link to={`/${region}/contact`} className="bg-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-purple-500 transition-colors">Partnerships</Link>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default About;
