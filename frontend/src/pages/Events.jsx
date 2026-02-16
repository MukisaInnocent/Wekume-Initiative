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

            <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 md:py-20 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Events & Programs</h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Join us in our upcoming activities and see what we've been up to.</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                        <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm inline-flex flex-wrap sm:flex-nowrap justify-center w-full sm:w-auto">
                            <button
                                onClick={() => setFilter('upcoming')}
                                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${filter === 'upcoming' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                Upcoming Events
                            </button>
                            <button
                                onClick={() => setFilter('past')}
                                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${filter === 'past' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                Past Events
                            </button>
                        </div>
                    </div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="text-center py-20 text-gray-600 dark:text-gray-300">Loading events...</div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {filteredEvents.map(event => (
                                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group max-w-sm mx-auto w-full">
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        {event.banner_image_url ? (
                                            <img src={event.banner_image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                <Calendar className="text-primary-300" size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                            {event.event_type}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                                            <Calendar size={16} />
                                            {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <MapPin size={16} />
                                            {event.location}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6">{event.description}</p>

                                        {event.registration_link && filter === 'upcoming' ? (
                                            <a href={event.registration_link} className="w-full block text-center bg-secondary-500 text-white py-2 rounded-lg font-semibold hover:bg-secondary-600 transition-colors">
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
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No {filter} events found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Check back later for updates or browse our other events.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Events;
