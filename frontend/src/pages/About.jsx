import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';
import { Heart, Users, Lightbulb } from 'lucide-react';

function About() {
    const [sections, setSections] = useState({});
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [missionRes, visionRes, storyRes, valuesRes] = await Promise.all([
                    contentAPI.getSection('about_mission'),
                    contentAPI.getSection('about_vision'),
                    contentAPI.getSection('about_story'),
                    contentAPI.getValues()
                ]);

                setSections({
                    mission: missionRes.data.content,
                    vision: visionRes.data.content,
                    story: storyRes.data.content
                });
                setValues(valuesRes.data.values || []);
            } catch (error) {
                console.error("Error fetching about data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const parseContent = (content) => {
        if (!content) return null;
        return typeof content === 'string' ? JSON.parse(content) : content;
    };

    const mission = parseContent(sections.mission) || { title: "Our Mission", text: "To empower youth..." };
    const vision = parseContent(sections.vision) || { title: "Our Vision", text: "A world where..." };
    const story = parseContent(sections.story) || { title: "Our Story", text: "Founded in..." };

    return (
        <>
            <Navbar />

            {/* Header */}
            <div className="bg-primary-900 text-white py-12 sm:py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">About Wekume Initiative</h1>
                    <p className="text-base sm:text-lg md:text-xl opacity-90">Building a healthier, informed future.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-16 md:space-y-20 bg-white dark:bg-gray-900">

                {/* Who We Are & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                    <div>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">Our Mission</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-4 sm:mb-6">Empowering Through Knowledge & Growth</h2>
                        <div className="prose text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed space-y-3 sm:space-y-4">
                            <p>
                                At Wekume, our mission is to empower university students to take control of their reproductive health while nurturing personal and professional growth. We believe that every student should have access to reliable health resources, regardless of their background.
                            </p>
                            <p>
                                Guided by values of inclusivity, accessibility, and empowerment, Wekume aims to create a positive, sustainable impact on students' lives.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-orange-100 dark:from-purple-900 dark:to-orange-900 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Students collaborating"
                            className="relative rounded-2xl sm:rounded-3xl shadow-xl w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Core Values */}
                <div className="py-8 sm:py-10 md:py-12">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16">
                        <span className="text-orange-600 dark:text-orange-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">Guiding Principles</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                title: "Inclusivity",
                                icon: <Users className="text-purple-600" size={32} />,
                                desc: "We believe that everyone deserves access to quality healthcare, regardless of background. We celebrate diversity and support all students, including marginalized groups like refugees.",
                                color: "bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800"
                            },
                            {
                                title: "Empowerment",
                                icon: <Lightbulb className="text-orange-600" size={32} />,
                                desc: "We empower students to take control of their reproductive health and personal growth, helping them build confidence in making informed health and career choices.",
                                color: "bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800"
                            },
                            {
                                title: "Compassion",
                                icon: <Heart className="text-pink-600" size={32} />,
                                desc: "Our SafeChat and counseling services provide a compassionate, non-judgmental space. We prioritize listening, understanding, and supporting each individual’s unique needs.",
                                color: "bg-pink-50 dark:bg-pink-900/30 border-pink-100 dark:border-pink-800"
                            },
                            {
                                title: "Innovation",
                                icon: <div className="text-blue-600 font-bold text-xl">🚀</div>,
                                desc: "We harness technology to ensure accessibility. Our user-friendly app and features like QuickTest make it easier for students to access information on their terms.",
                                color: "bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800"
                            },
                            {
                                title: "Community",
                                icon: <div className="text-green-600 font-bold text-xl">🤝</div>,
                                desc: "We foster collaboration through exchange programs and partnerships, encouraging students to connect, learn, and grow together for impactful service.",
                                color: "bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800"
                            }
                        ].map((value, idx) => (
                            <div key={idx} className={`p-8 rounded-2xl border ${value.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                                <div className="mb-6">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why We Exist */}
                <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-16 overflow-hidden relative">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-900 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Why We Exist</h2>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                            Ugandan university students face unique challenges around reproductive health. Many lack access to safe resources, and stigma prevents open conversations. Minority groups, including refugees, are especially vulnerable.
                        </p>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            Wekume addresses these issues by offering an inclusive, digital platform that simplifies access to information, support, and resources tailored to students’ needs.
                        </p>
                    </div>
                </div>

                {/* Next Big Dreams */}
                <div className="py-12">
                    <div className="text-center mb-16">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold tracking-wider uppercase text-sm">Future Goals</span>
                        <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2">Our Next Big Dreams</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400 text-2xl">💼</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Business Development</h3>
                            <p className="text-gray-600 dark:text-gray-300">Incubator for student entrepreneurs providing mentorship, workshops, and fundraising resources.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 dark:text-orange-400 text-2xl">🌍</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Exchange Programs</h3>
                            <p className="text-gray-600 dark:text-gray-300">Facilitating varied perspectives through regional exchange programs and internship opportunities.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600 dark:text-pink-400 text-2xl">🤲</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Total Inclusivity</h3>
                            <p className="text-gray-600 dark:text-gray-300">Ensuring resources are accessible to marginalized groups, such as refugees, creating a safe space for everyone.</p>
                        </div>
                    </div>
                </div>

                {/* Impact Statement */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold mb-8">Our Impact</h2>
                        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed italic opacity-90">
                            “Wekume is already making a difference in the lives of students across Uganda. By connecting young people to essential resources and enabling them to make informed decisions, we aim to reduce rates of reproductive health issues, increase access to health supplies, and encourage entrepreneurship among students.”
                        </blockquote>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                to="/wekume-app"
                                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Download App
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
