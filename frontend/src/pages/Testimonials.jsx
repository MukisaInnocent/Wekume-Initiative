import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';

function Testimonials() {
    const { region } = useRegion();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await contentAPI.getTestimonials(region);
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
    }, [region]);

    // Fallback data if API returns empty
    const displayTestimonials = testimonials;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />

            <PageHeader
                badge="Community Stories"
                title="Voices of Impact"
                subtitle="Real stories from students, partners, and volunteers who are part of the Wekume journey."
            />

            {/* Testimonials Grid */}
            <section className="py-12 sm:py-16 md:py-20 flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        displayTestimonials.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                                                <p className="text-sm text-purple-600 dark:text-purple-400">{testimonial.author_role || 'Community Member'}</p>
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
