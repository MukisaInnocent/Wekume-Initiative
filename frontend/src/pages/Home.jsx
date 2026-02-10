import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import { ArrowRight, Heart, Users, Lightbulb, Calendar, ArrowUpRight, MessageCircle, Shield, Clock } from 'lucide-react';
import { contentAPI } from '../services/api';

function Home() {

    const [values, setValues] = useState([]);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [valuesRes, eventsRes, partnersRes] = await Promise.all([
                    contentAPI.getValues(),
                    contentAPI.getEvents(),
                    contentAPI.getPartners()
                ]);



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



    return (
        <>
            <Navbar isTransparent={true} />

            {/* Dynamic Hero Carousel */}
            <HeroCarousel />

            {/* Our Story Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Origin</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-8 leading-tight">
                                Wekume was born from a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">deeply personal place</span>.
                            </h2>

                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Our founder, <strong className="text-gray-900">Joshua Walusimbi</strong>, lost his older sister while she was a university student. Like many young people, she entered adulthood without the tools or support to navigate her sexual and reproductive health. She contracted HIV, became pregnant, and passed away before she could reach her dreams.
                                </p>
                                <p>
                                    Years later, when Joshua entered university, he saw the same patterns repeating. Friends were struggling with preventable complications—unintended pregnancies, STIs, mental health crises—all in silence. There was no safe, stigma-free space to ask questions or seek support.
                                </p>
                                <p>
                                    Joshua had been fortunate. As a teenager, he was introduced to sexual health education through his church. That knowledge empowered him to make informed choices and avoid the hardships so many of his peers were facing. He knew things had to change.
                                </p>
                                <p>
                                    That’s why he founded <span className="font-bold text-purple-600">Wekume</span>—a youth-led initiative empowering university students to take control of their health with confidence and dignity.
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-orange-400 rounded-full"></div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">"Wekume"</p>
                                    <p className="text-gray-500">Means "Protect Yourself"</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 relative">
                            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute -top-6 -left-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
                                    <Lightbulb size={32} />
                                </div>
                                <blockquote className="text-xl font-medium text-gray-700 italic mb-6 pt-4">
                                    "Joshua knew things had to change. Through features like SafeChat, QuickTest, and our Circumcision appointment scheduler, Wekume offers students discreet, trusted access to professional help."
                                </blockquote>
                                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                                        JW
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Joshua Walusimbi</div>
                                        <div className="text-sm text-purple-600">Founder, Wekume Initiative</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative backing */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-orange-500 rounded-3xl transform -rotate-2 opacity-10 scale-105 z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Lina - AI Safe Chat Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-6">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                    AI-Powered Support
                                </div>
                                <h2 className="text-4xl font-heading font-bold mb-6">
                                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">Lina</span> – Your AI Safe Chat
                                </h2>
                                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                                    Click on the “Lina AI Safe Chat” icon to get answers to your questions about sexual and reproductive health! It’s <span className="font-bold text-white">secure, private, and confidential</span>.
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-300">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Why the 30-40 Second Wait?</h4>
                                            <p className="text-sm text-blue-200 leading-relaxed">
                                                Lina accesses a vast knowledge base and performs careful analysis to ensure every response is accurate and culturally sensitive. This detailed process guarantees the best support for critical topics.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
                                        <Shield size={16} className="text-green-400" />
                                        <span>Private & Anonymous</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
                                        <MessageCircle size={16} className="text-blue-400" />
                                        <span>24/7 Availability</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative hidden md:block">
                                {/* Chat Interface Mockup */}
                                <div className="bg-white text-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-sm mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-gradient-primary p-4 flex items-center justify-between text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                <MessageCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Lina</p>
                                                <p className="text-xs opacity-80">AI Safe Chat</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-50 space-y-4">
                                        <div className="flex justify-end">
                                            <div className="bg-purple-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-sm">
                                                I'm worried about my privacy. Is this chat really safe?
                                            </div>
                                        </div>
                                        <div className="flex justify-start">
                                            <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%] shadow-sm">
                                                <p className="mb-2">Yes, absolutely. Everything you share with me is secure, private, and confidential.</p>
                                                <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                                    <Shield size={12} /> Encrypted
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center py-2">
                                            <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full animate-pulse">Lina is thinking... (35s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <div className={`inline-flex p-4 rounded-xl mb-6 ${index % 2 === 0 ? 'bg-primary-50 text-primary-500' : 'bg-purple-50 text-purple-500'}`}>
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
                                    <div className="inline-flex p-4 rounded-xl mb-6 bg-purple-50 text-purple-500"><Users size={32} /></div>
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
                                <span className="text-orange-600 font-semibold tracking-wider uppercase text-sm">Get Involved</span>
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
            <section className="gradient-purple text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-heading font-bold mb-6">Ready to Make a Difference?</h2>
                    <p className="text-xl mb-8 text-purple-50">Join us in creating lasting change in our communities.</p>
                    <Link
                        to="/contact"
                        className="bg-white text-primary-600 px-10 py-4 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-colors inline-block shadow-lg"
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
