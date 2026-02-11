import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await contentAPI.getTestimonials();
                if (response.data && response.data.testimonials) {
                    setTestimonials(response.data.testimonials);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Fallback data if API returns empty
    const displayTestimonials = testimonials;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-purple-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-pink-300 font-semibold tracking-wider uppercase text-sm mb-2 block">Community Stories</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Voices of Impact</h1>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                        Real stories from students, partners, and volunteers who are part of the Wekume journey.
                    </p>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        displayTestimonials.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayTestimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                                    >
                                        <div className="mb-6 text-purple-500">
                                            <Quote size={40} className="opacity-20 transform rotate-180" />
                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 flex-grow italic">
                                            "{testimonial.content}"
                                        </p>

                                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 font-bold text-xl overflow-hidden">
                                                {testimonial.photo_url ? (
                                                    <img src={testimonial.photo_url} alt={testimonial.author_name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="font-heading">{testimonial.author_name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author_name}</h4>
                                                <p className="text-sm text-purple-600">{testimonial.author_role || 'Community Member'}</p>
                                            </div>
                                            {testimonial.rating && (
                                                <div className="ml-auto flex gap-0.5">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No testimonials available yet.</p>
                            </div>
                        )
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Testimonials;
