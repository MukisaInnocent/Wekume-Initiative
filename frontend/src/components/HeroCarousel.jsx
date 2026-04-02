import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function HeroCarousel({ currentBackgroundIndex, backgroundImages, setCurrentBackgroundIndex, contentSections = [], mission, vision, values, region }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const formattedValues = values && values.length > 0 
        ? values.map(v => v.title).join(" • ")
        : "Integrity • Innovation • Inclusivity";

    const DEFAULT_SLIDES = [
        {
            id: 'mission',
            title: "Our Mission",
            subtitle: mission || "Empowering university students to take control of their reproductive health while nurturing personal and professional growth.",
            ctaText: "Download Wekume App",
            ctaLink: region === 'us' ? "/us/wekume-app" : "/ug/wekume-app",
            theme: "from-purple-600 via-primary-500 to-orange-500",
            image: "/assets/IMG_0445.jpg"
        },
        {
            id: 'objective',
            title: "Our Vision",
            subtitle: vision || "A healthier, informed future for the youth of Africa.",
            ctaText: "Hear Our Story",
            ctaLink: region === 'us' ? "/us/about" : "/ug/about",
            theme: "from-blue-600 via-purple-500 to-pink-500",
            image: "/assets/IMG_0447.jpg"
        },
        {
            id: 'values',
            title: "Core Values",
            subtitle: formattedValues,
            ctaText: "View Activities",
            ctaLink: region === 'us' ? "/us/activities" : "/ug/activities",
            theme: "from-orange-500 via-red-500 to-purple-600",
            image: "/assets/IMG_20250321_112053.jpg"
        }
    ];

    // Derive active slides from contentSections or fallback
    const slides = DEFAULT_SLIDES.map((defSlide, index) => {
        const slideKey = `hero_s${index + 1}_title`;
        const dbSection = contentSections.find(s => s.section_key === slideKey);
        
        if (dbSection) {
            return {
                ...defSlide,
                title: dbSection.section_title || defSlide.title,
                subtitle: dbSection.content_text || defSlide.subtitle
            };
        }
        return defSlide;
    });

    // Auto-play for Content Slides
    useEffect(() => {
        if (!isHovering) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000); 
            return () => clearInterval(timer);
        }
    }, [isHovering, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Ensure we have exactly one image per slide
    const activeImages = slides.map((slide, index) => {
        if (backgroundImages && backgroundImages.length > index) {
            return backgroundImages[index];
        } else if (backgroundImages && backgroundImages.length > 0) {
            return backgroundImages[index % backgroundImages.length];
        }
        return slide.image;
    });

    return (
        <section
            className="relative text-white min-h-[95vh] flex items-center overflow-hidden pt-[88px] outline-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
            tabIndex={0}
        >
            {/* Background Slides */}
            {activeImages.map((imgSrc, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={imgSrc}
                            alt={`Background ${index}`}
                            className="w-full h-full object-cover"
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
                                    {slides[currentSlide].id === 'mission' ? 'Welcome to Wekume' : slides[currentSlide].id === 'objective' ? 'Our Vision' : 'Core Values'}
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
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-primary-500"
                />
            </div>
        </section>
    );
}

export default HeroCarousel;
