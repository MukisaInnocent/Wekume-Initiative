import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Heart, Users, Lightbulb, Calendar, ArrowUpRight } from 'lucide-react';
import { contentAPI } from '../services/api';

function Home() {
    const [heroContent, setHeroContent] = useState(null);
    const [values, setValues] = useState([]);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sectionsRes, valuesRes, eventsRes, partnersRes] = await Promise.all([
                    contentAPI.getSection('home_hero'),
                    contentAPI.getValues(),
                    contentAPI.getEvents(),
                    contentAPI.getPartners()
                ]);

                // Parse hero content if it exists, otherwise use defaults
                if (sectionsRes.data.content) {
                    setHeroContent(typeof sectionsRes.data.content === 'string'
                        ? JSON.parse(sectionsRes.data.content)
                        : sectionsRes.data.content);
                }

                setValues(valuesRes.data.values || []);
                setEvents(eventsRes.data.events?.slice(0, 3) || []); // Top 3 events
                setPartners(partnersRes.data.partners || []);
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const hero = heroContent || {
        title: "Empowering Youth Through Education & Innovation",
        subtitle: "Learn. Unlearn. Relearn. Building a healthier, more informed future for young people."
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="gradient-primary text-white py-20 min-h-[80vh] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in leading-tight">
                        {hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-primary-50">
                        {hero.subtitle}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            to="/wekume-app"
                            className="bg-accent-400 text-primary-900 px-8 py-4 rounded-full font-bold hover:bg-accent-300 transition-transform hover:scale-105 flex items-center gap-2 shadow-lg"
                        >
                            Download App <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/get-involved"
                            className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all hover:scale-105"
                        >
                            Get Involved
                        </Link>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Who We Are</span>
                        <h2 className="text-4xl font-heading font-bold text-gray-900 mt-2">Our Core Values</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Static Fallback or Dynamic Values */}
                        {values.length > 0 ? values.map((value, index) => (
                            <div key={value.id} className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                <div className={`inline-flex p-4 rounded-xl mb-6 ${index % 2 === 0 ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-600'}`}>
                                    {index === 0 ? <Heart size={32} /> : index === 1 ? <Users size={32} /> : <Lightbulb size={32} />}
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        )) : (
                            // Fallback if no values in DB yet
                            <>
                                <div className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                    <div className="inline-flex p-4 rounded-xl mb-6 bg-primary-50 text-primary-600"><Heart size={32} /></div>
                                    <h3 className="text-2xl font-heading font-bold mb-3">Learn, Unlearn, Relearn</h3>
                                    <p className="text-gray-600">Embracing continuous growth and adaptation in an ever-changing world.</p>
                                </div>
                                <div className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                    <div className="inline-flex p-4 rounded-xl mb-6 bg-secondary-50 text-secondary-600"><Users size={32} /></div>
                                    <h3 className="text-2xl font-heading font-bold mb-3">Innovation</h3>
                                    <p className="text-gray-600">Using technology and creative solutions to solve real problems.</p>
                                </div>
                                <div className="text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                    <div className="inline-flex p-4 rounded-xl mb-6 bg-primary-50 text-primary-600"><Lightbulb size={32} /></div>
                                    <h3 className="text-2xl font-heading font-bold mb-3">Accessibility</h3>
                                    <p className="text-gray-600">Making education and health resources available to everyone.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Preview */}
            {events.length > 0 && (
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-secondary-600 font-semibold tracking-wider uppercase text-sm">Get Involved</span>
                                <h2 className="text-4xl font-heading font-bold text-gray-900 mt-2">Upcoming Events</h2>
                            </div>
                            <Link to="/events" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700">View All <ArrowRight size={20} /></Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {events.map(event => (
                                <div key={event.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        {/* Placeholder or real image */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                                                    <Calendar size={16} />
                                                    {new Date(event.event_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{event.description}</p>
                                        <span className="text-primary-600 font-semibold text-sm flex items-center gap-1">Learn More <ArrowUpRight size={16} /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center md:hidden">
                            <Link to="/events" className="btn-secondary">View All Events</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Partners Banner */}
            {partners.length > 0 && (
                <section className="py-12 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mb-8">Trusted by our partners</p>
                        <div className="flex flex-wrap justify-center gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {partners.map(partner => (
                                partner.logo_url ? (
                                    <img key={partner.id} src={partner.logo_url} alt={partner.name} className="h-12 w-auto object-contain" title={partner.name} />
                                ) : (
                                    <span key={partner.id} className="text-xl font-bold text-gray-400">{partner.name}</span>
                                )
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-heading font-bold mb-6">Ready to Make a Difference?</h2>
                    <p className="text-xl mb-10 text-white/90">
                        Join us in empowering the next generation through education, health, and innovation.
                    </p>
                    <Link
                        to="/contact"
                        className="bg-accent-400 text-primary-900 px-10 py-4 rounded-full font-bold hover:bg-accent-300 transition-colors inline-block shadow-lg"
                    >
                        Contact Us Today
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
