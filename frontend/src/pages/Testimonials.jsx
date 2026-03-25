import { useState, useEffect, useCallback, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';

/* ─── Single testimonial card ───────────────────────────────── */
function TestimonialCard({ testimonial }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full">
            <div className="mb-6 text-purple-500">
                <Quote size={40} className="opacity-20 transform rotate-180" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 flex-grow italic">
                "{testimonial.content}"
            </p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 font-bold text-xl overflow-hidden flex-shrink-0">
                    {testimonial.photo_url ? (
                        <img src={testimonial.photo_url} alt={testimonial.author_name} className="h-full w-full object-cover" />
                    ) : (
                        <span className="font-heading">{testimonial.author_name.charAt(0)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate">{testimonial.author_name}</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400 truncate">{testimonial.author_role || 'Community Member'}</p>
                </div>
                {testimonial.rating && (
                    <div className="ml-auto flex gap-0.5 flex-shrink-0">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Carousel component ────────────────────────────────────── */
function TestimonialCarousel({ testimonials }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const timerRef = useRef(null);

    // Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
    const [cardsPerPage, setCardsPerPage] = useState(3);

    useEffect(() => {
        const updatePerPage = () => {
            const w = window.innerWidth;
            if (w < 768) setCardsPerPage(1);
            else if (w < 1024) setCardsPerPage(2);
            else setCardsPerPage(3);
        };
        updatePerPage();
        window.addEventListener('resize', updatePerPage);
        return () => window.removeEventListener('resize', updatePerPage);
    }, []);

    const totalPages = Math.ceil(testimonials.length / cardsPerPage);

    const goTo = useCallback((page, dir) => {
        setDirection(dir);
        setCurrentPage(page);
    }, []);

    const next = useCallback(() => {
        goTo((currentPage + 1) % totalPages, 1);
    }, [currentPage, totalPages, goTo]);

    const prev = useCallback(() => {
        goTo((currentPage - 1 + totalPages) % totalPages, -1);
    }, [currentPage, totalPages, goTo]);

    // Auto-play
    useEffect(() => {
        if (isPaused || totalPages <= 1) return;
        timerRef.current = setInterval(next, 5000);
        return () => clearInterval(timerRef.current);
    }, [isPaused, next, totalPages]);

    const pageTestimonials = testimonials.slice(
        currentPage * cardsPerPage,
        currentPage * cardsPerPage + cardsPerPage
    );

    const variants = {
        enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Carousel container */}
            <div className="overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`grid gap-6 sm:gap-8 ${
                            cardsPerPage === 1 ? 'grid-cols-1' :
                            cardsPerPage === 2 ? 'grid-cols-2' :
                            'grid-cols-3'
                        }`}
                    >
                        {pageTestimonials.map((t) => (
                            <TestimonialCard key={t.id} testimonial={t} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            {totalPages > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors z-10"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors z-10"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Dots */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8 sm:mt-10">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i, i > currentPage ? 1 : -1)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                i === currentPage
                                    ? 'w-8 bg-purple-600'
                                    : 'w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400'
                            }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── Main Testimonials Page ────────────────────────────────── */
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />

            <PageHeader
                badge="Community Stories"
                title="Voices of Impact"
                subtitle="Real stories from students, partners, and volunteers who are part of the Wekume journey."
            />

            {/* Testimonials Carousel */}
            <section className="py-8 sm:py-10 md:py-12 flex-grow">
                <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-14">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
                        testimonials.length > 0 ? (
                            <TestimonialCarousel testimonials={testimonials} />
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
