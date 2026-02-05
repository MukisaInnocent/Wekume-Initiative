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
            <div className="bg-primary-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About Wekume Initiative</h1>
                    <p className="text-xl opacity-90">Building a healthier, infromed future.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary-500 border-l border-r border-b border-primary-100">
                        <h2 className="text-3xl font-heading font-bold text-primary-900 mb-4">{mission.title || "Our Mission"}</h2>
                        <div className="prose text-gray-700" dangerouslySetInnerHTML={{ __html: mission.text || mission.content_text }} />
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-secondary-500 border-l border-r border-b border-secondary-100">
                        <h2 className="text-3xl font-heading font-bold text-primary-900 mb-4">{vision.title || "Our Vision"}</h2>
                        <div className="prose text-gray-700" dangerouslySetInnerHTML={{ __html: vision.text || vision.content_text }} />
                    </div>
                </div>

                {/* Story */}
                <div className="bg-primary-50 rounded-3xl p-8 md:p-12 border border-primary-100">
                    <h2 className="text-3xl font-heading font-bold text-primary-900 mb-6 text-center">{story.title || "Our Story"}</h2>
                    <div className="prose max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed space-y-4">
                        {/* If text is HTML, render it, else display directly */}
                        <div dangerouslySetInnerHTML={{ __html: story.text || story.content_text }} />
                    </div>
                </div>

                {/* Values (Re-used) */}
                <div>
                    <h2 className="text-3xl font-heading font-bold text-center mb-10">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={value.id} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className={`inline-flex p-3 rounded-xl mb-4 ${index % 2 === 0 ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-600'}`}>
                                    {index === 0 ? <Heart size={24} /> : index === 1 ? <Users size={24} /> : <Lightbulb size={24} />}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
