import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

function Events() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('upcoming'); // 'upcoming' or 'past'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await contentAPI.getEvents();
                setEvents(response.data.events || []);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const now = new Date();
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.event_date);
        return filter === 'upcoming' ? eventDate >= now : eventDate < now;
    });

    return (
        <>
            <Navbar />

            <div className="bg-gray-50 py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Events & Programs</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join us in our upcoming activities and see what we've been up to.</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
                            <button
                                onClick={() => setFilter('upcoming')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${filter === 'upcoming' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Upcoming Events
                            </button>
                            <button
                                onClick={() => setFilter('past')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${filter === 'past' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Past Events
                            </button>
                        </div>
                    </div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="text-center py-20">Loading events...</div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map(event => (
                                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group max-w-sm mx-auto w-full">
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        {event.banner_image_url ? (
                                            <img src={event.banner_image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                <Calendar className="text-primary-300" size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wide">
                                            {event.event_type}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-primary-600 font-medium mb-2">
                                            <Calendar size={16} />
                                            {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <MapPin size={16} />
                                            {event.location}
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-6">{event.description}</p>

                                        {event.registration_link && filter === 'upcoming' ? (
                                            <a href={event.registration_link} className="w-full block text-center bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                                                Register Now
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-sm font-medium flex items-center gap-1">View Details <ArrowRight size={16} /></span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-900">No {filter} events found</h3>
                            <p className="text-gray-500 mt-2">Check back later for updates or browse our other events.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Events;
