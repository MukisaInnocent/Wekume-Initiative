import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Background images are now passed as props from parent
const slides = [
    {
        id: 'mission',
        title: "Empowering Youth To Lead",
        subtitle: "Unlocking potential through education, health, and innovation. We built this platform to listen, support, and guide you.",
        ctaText: "Download Wekume App",
        ctaLink: "/wekume-app",
        theme: "from-purple-600 via-primary-500 to-orange-500", // Purple/Pink/Orange
        image: "/assets/IMG_0445.jpg" // Fallback
    },
    {
        id: 'values',
        title: "Integrity. Innovation. Inclusivity.",
        subtitle: "Creating safe, stigma-free spaces where every young person can thrive without fear of judgment.",
        ctaText: "Our Story",
        ctaLink: "/about",
        theme: "from-blue-600 via-purple-500 to-pink-500", // Blue/Purple/Pink
        image: "/assets/IMG_0447.jpg" // Fallback
    },
    {
        id: 'purpose',
        title: "Your Health, Your Future",
        subtitle: "Access confidential SRHR services, book appointments, and chat with Lina anytime, anywhere.",
        ctaText: "Get Involved",
        ctaLink: "/get-involved",
        theme: "from-orange-500 via-red-500 to-purple-600", // Orange/Red/Purple
        image: "/assets/IMG_20250321_112053.jpg" // Fallback
    }
];

function HeroCarousel({ currentBackgroundIndex, backgroundImages, setCurrentBackgroundIndex }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Auto-play for Content Slides
    useEffect(() => {
        if (!isHovering) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 8000); // Change content every 8 seconds
            return () => clearInterval(timer);
        }
    }, [isHovering]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Determine which images to show (Dynamic vs Fallback)
    const activeImages = backgroundImages.length > 0 ? backgroundImages : slides.map(s => s.image);
    const activeIndex = backgroundImages.length > 0 ? currentBackgroundIndex : currentSlide;

    return (
        <section
            className="relative text-white min-h-[95vh] flex items-center overflow-hidden pt-[88px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Background Slides */}
            {activeImages.map((imgSrc, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <motion.img
                            key={imgSrc}
                            src={imgSrc}
                            alt={`Background ${index}`}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{
                                scale: index === activeIndex ? 1.05 : 1.1,
                                transition: { duration: 10, ease: "linear" }
                            }}
                        />
                        {/* Gradient Overlay for enhanced readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    </div>
                </div>
            ))}

            {/* Content Layer */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <AnimatePresence mode='wait'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-left"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">
                                    {slides[currentSlide].id === 'mission' ? 'Our Mission' : slides[currentSlide].id === 'values' ? 'Core Values' : 'Our Purpose'}
                                </span>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to={slides[currentSlide].ctaLink}
                                    className="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-primary-600/30"
                                >
                                    <span>{slides[currentSlide].ctaText}</span>
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold transition-all hover:scale-105 flex items-center gap-2"
                                >
                                    <Play size={20} fill="currentColor" className="opacity-80" />
                                    <span>Watch Video</span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Empty div for layout balance on large screens if desired, or additional dynamic content */}
                        <div className="hidden lg:block"></div>
                    </div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 z-20 flex items-center gap-6">
                {/* Slide Numbers */}
                <div className="text-2xl font-bold font-heading tabular-nums flex items-end gap-1">
                    <span>0{currentSlide + 1}</span>
                    <span className="text-base font-normal text-gray-400 mb-1">/ 0{slides.length}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-20">
                <motion.div
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    className="h-full bg-primary-500"
                />
            </div>
        </section>
    );
}

export default HeroCarousel;
