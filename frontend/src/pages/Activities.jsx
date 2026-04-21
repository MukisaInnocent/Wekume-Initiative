import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { Calendar, MapPin, ArrowRight, Heart, Users, Briefcase, MessageSquare, Quote, X, CheckCircle, Smartphone } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

function Activities() {
    const { region, isUS } = useRegion();
    const [events, setEvents] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventFilter, setEventFilter] = useState('all'); // 'all', 'community', 'on-campus', 'hostel'
    
    // Registration Modal State
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', university: '' });
    const [regStatus, setRegStatus] = useState('idle'); // idle, submitting, success

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try {
                const [eventsRes, testRes] = await Promise.all([
                    contentAPI.getEvents(region).catch(() => ({ data: { events: [] } })),
                    contentAPI.getTestimonials(region).catch(() => ({ data: { testimonials: [] } }))
                ]);
                setEvents(eventsRes.data.events || []);
                setTestimonials(testRes.data.testimonials || []);
            } catch (error) {
                console.error("Error fetching activities data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivitiesData();
    }, [region]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegStatus('submitting');
        try {
            await contentAPI.registerEvent(selectedEvent.id, regForm);
            setRegStatus('success');
            setRegForm({ name: '', email: '', phone: '', university: '' });
        } catch (error) {
            console.error("Registration failed:", error);
            setRegStatus('idle');
            alert('Failed to register. Please try again.');
        }
    };

    const closeRegistrationModal = () => {
        setSelectedEvent(null);
        setRegStatus('idle');
    };

    const getCategorizedEvents = () => {
        const now = new Date();
        const upcomingEvents = events.filter(e => new Date(e.event_date) >= now);
        if (eventFilter === 'all') return upcomingEvents;
        
        // Map filter to generic matching strings or assumed types
        return upcomingEvents.filter(e => {
            const type = (e.event_type || '').toLowerCase();
            if (eventFilter === 'community') return type.includes('community');
            if (eventFilter === 'on-campus') return type.includes('campus') || type.includes('university');
            if (eventFilter === 'hostel') return type.includes('hostel');
            return true;
        });
    };

    const filteredEvents = getCategorizedEvents();

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <Navbar />

            <PageHeader
                badge="Impact in Action"
                title="Our Activities"
                subtitle="Discover our events, see how you can get involved, and read stories of impact."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
                
                {/* 1. Events Section */}
                <section>
                    <div className="text-center mb-10">
                        <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wider uppercase text-sm">Join Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">Upcoming Events</h2>
                    </div>

                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl inline-flex flex-wrap sm:flex-nowrap gap-1">
                            {['all', 'community', 'on-campus', 'hostel'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setEventFilter(filter)}
                                    className={`px-5 py-2 rounded-lg font-medium text-sm transition-all capitalize ${eventFilter === filter ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'}`}
                                >
                                    {filter.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading events...</div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map(event => (
                                <div key={event.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        {event.banner_image_url ? (
                                            <img src={event.banner_image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-orange-100 dark:from-purple-900/40 dark:to-orange-900/40 flex items-center justify-center">
                                                <Calendar className="text-purple-400 dark:text-purple-600 opacity-50" size={64} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                            {event.event_type || 'General'}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-bold mb-3">
                                            <Calendar size={16} />
                                            {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <MapPin size={16} /> <span className="truncate">{event.location}</span>
                                        </div>
                                        <p className="text-gray-900 dark:text-gray-100 text-sm line-clamp-3 mb-6 flex-1">{event.description}</p>
                                        
                                        <button 
                                            onClick={() => setSelectedEvent(event)}
                                            className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold rounded-xl transition-colors border border-purple-200 dark:border-purple-800/50"
                                        >
                                            Register for Event
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No {eventFilter !== 'all' ? eventFilter : ''} events currently scheduled</h3>
                            <p className="text-gray-500">Check back later for updates to our activities calendar.</p>
                        </div>
                    )}
                </section>

                {/* 2. Get Involved Section */}
                <section className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/10 dark:to-orange-900/10 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-900/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-200/50 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-200/50 dark:bg-orange-900/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <span className="text-orange-600 dark:text-orange-400 font-bold tracking-wider uppercase text-sm">Take Action</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Get Involved</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-12">There are many ways to support the Wekume Initiative and help us build a healthier future for university students.</p>

                        <div className={`grid md:grid-cols-${isUS ? '3' : '2'} gap-6 max-w-4xl mx-auto`}>
                            <Link to={`/${region}/contact`} className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl transition-all flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Briefcase size={28} />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Partnership</h3>
                                <p className="text-sm text-gray-900 dark:text-gray-100">Work with us to expand our reach and impact.</p>
                            </Link>
                            
                            <Link to={`/${region}/contact`} className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-xl transition-all flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users size={28} />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Volunteer</h3>
                                <p className="text-sm text-gray-900 dark:text-gray-100">Join our community programs on the ground.</p>
                            </Link>

                            {isUS && (
                            <Link to="/us/support" className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-xl transition-all flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Heart size={28} />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Funding</h3>
                                <p className="text-sm text-gray-900 dark:text-gray-100">Fund specific causes like testing kits and events.</p>
                            </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* 3. Why We Exist Section */}
                <section>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-3xl p-8 md:p-12 border border-orange-100 dark:border-orange-900/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-200/50 dark:bg-orange-900/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-red-200/50 dark:bg-red-900/20 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <span className="text-orange-600 dark:text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block">Our Purpose</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Why We Exist</h2>
                            <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed">
                                Ugandan university students face unique challenges around reproductive health. Many lack access to safe, reliable resources, and pervasive stigma prevents open conversations. Wekume Initiative exists to address these critical gaps by offering an inclusive, evidence-based digital platform that connects young people to vital health information, verified education, and supportive communities—empowering them to take ownership of their reproductive health and future.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Founders Story Section */}
                <section>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-900/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 bg-purple-200/50 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-64 h-64 bg-pink-200/50 dark:bg-pink-900/20 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">The Founders' Journey</h2>
                            <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed mb-6">
                                Wekume Initiative was founded by visionary young leaders who recognized a critical gap in reproductive health education and support for university students. Frustrated by the lack of accessible, stigma-free resources and the pervasive silence around sexual and reproductive health, our founders decided to take action.
                            </p>
                            <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed">
                                Drawing on their own experiences as university students and their passion for social impact, they envisioned a platform that would be peer-led, community-centered, and grounded in evidence-based information. Today, Wekume stands as a testament to their commitment to breaking stigma, fostering dialogue, and empowering the next generation of young Africans to own their health and future.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. Wekume App Section */}
                <section>
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 max-w-6xl mx-auto">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="flex-1 text-center lg:text-left">
                                    <span className="px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide w-fit mb-6 inline-flex items-center gap-2">
                                        <Smartphone size={16} /> Wekume App
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Health in Your Pocket</h2>
                                    <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed mb-8 max-w-2xl">
                                        Get verified reproductive health information, exclusive youth-focused content, and access to a supportive community—directly from your phone. The Wekume App is designed to put vital healthcare resources right within your reach.
                                    </p>
                                    <button disabled className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-8 py-4 rounded-full font-bold shadow-sm cursor-not-allowed inline-flex items-center gap-3 text-lg border border-gray-300 dark:border-gray-700">
                                        <Smartphone size={22} /> Coming Soon
                                    </button>
                                </div>
                                <div className="flex-1 relative w-full flex justify-center">
                                    <div className="absolute inset-0 bg-indigo-600/10 blur-3xl rounded-full"></div>
                                    {/* App Mockup Illustration */}
                                    <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl relative z-10 overflow-hidden flex flex-col">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                                        <div className="p-6 pt-12 flex-1 bg-gradient-to-b from-indigo-900 to-gray-900">
                                            <div className="w-12 h-12 rounded-full bg-indigo-500/30 mb-6 animate-pulse"></div>
                                            <div className="space-y-4">
                                                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                                                <div className="h-4 bg-white/20 rounded w-1/2"></div>
                                            </div>
                                            <div className="mt-8 space-y-4">
                                                <div className="h-24 bg-white/10 rounded-xl"></div>
                                                <div className="h-24 bg-white/10 rounded-xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Testimonials Section */}
                <section>
                    <div className="text-center mb-10">
                        <span className="text-pink-600 dark:text-pink-400 font-bold tracking-wider uppercase text-sm">Real Impacts</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">Stories from the Community</h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading stories...</div>
                    ) : testimonials.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.slice(0, 3).map((t, idx) => (
                                <div key={t.id || idx} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl relative border border-gray-100 dark:border-gray-800">
                                    <Quote className="text-purple-200 dark:text-purple-900/50 absolute top-6 left-6" size={48} />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <p className="text-gray-900 dark:text-gray-100 italic mb-6 flex-1 text-lg">"{t.content}"</p>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white dark:border-gray-800 shadow-sm">
                                                {t.photo_url ? (
                                                    <img src={t.photo_url} alt={t.author_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-700 font-bold">{t.author_name?.charAt(0)}</div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{t.author_name}</h4>
                                                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{t.author_role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">No testimonials available yet.</div>
                    )}
                </section>
            </div>

            {/* Event Registration Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-gray-800 relative animate-fade-in relative">
                        <button onClick={closeRegistrationModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 z-10 bg-white/50 dark:bg-black/50 p-1 rounded-full backdrop-blur-md">
                            <X size={20} />
                        </button>

                        <div className="h-24 bg-gradient-to-r from-purple-600 to-orange-500 relative">
                            {selectedEvent.banner_image_url && (
                                <img src={selectedEvent.banner_image_url} className="w-full h-full object-cover mix-blend-overlay opacity-50" alt="event banner" />
                            )}
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Register for Event</h3>
                            <p className="text-purple-600 dark:text-purple-400 font-bold mb-6 truncate">{selectedEvent.title}</p>

                            {regStatus === 'success' ? (
                                <div className="text-center py-8">
                                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Registration Complete!</h4>
                                    <p className="text-gray-500 mb-6">Thank you for registering. Check your email for event details.</p>
                                    <button onClick={closeRegistrationModal} className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Full Name *</label>
                                        <input required type="text" className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 dark:text-white outline-none transition-all" value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} placeholder="Jane Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Email Address *</label>
                                        <input required type="email" className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 dark:text-white outline-none transition-all" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} placeholder="jane@example.com" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Phone Number</label>
                                            <input type="tel" className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 dark:text-white outline-none transition-all" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} placeholder="+256..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">University / Campus</label>
                                            <input type="text" className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 dark:text-white outline-none transition-all" value={regForm.university} onChange={e => setRegForm({...regForm, university: e.target.value})} placeholder="e.g. Makerere" />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={regStatus === 'submitting'}
                                        className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {regStatus === 'submitting' ? 'Submitting...' : 'Confirm Registration'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}

export default Activities;
