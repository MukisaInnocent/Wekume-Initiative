import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 'mission',
        title: "Empowering Youth Through Education & Innovation",
        subtitle: "Learn. Unlearn. Relearn. Building a healthier, more informed future for young people.",
        ctaText: "Download App",
        ctaLink: "/wekume-app",
        theme: "from-purple-600 via-primary-500 to-orange-500" // Purple/Pink/Orange
    },
    {
        id: 'values',
        title: "Integrity. Innovation. Inclusivity.",
        subtitle: "Guided by our core values to create safe, supportive spaces for everyone.",
        ctaText: "Run With Us",
        ctaLink: "/about",
        theme: "from-blue-600 via-purple-500 to-pink-500" // Blue/Purple/Pink
    },
    {
        id: 'purpose',
        title: "Building a Healthier, Brighter Future",
        subtitle: "Driven by a purpose to eliminate barriers to sexual and reproductive health.",
        ctaText: "Get Involved",
        ctaLink: "/get-involved",
        theme: "from-orange-500 via-red-500 to-purple-600" // Orange/Red/Purple
    }
];

function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative text-white min-h-[90vh] flex items-center overflow-hidden">

            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.theme} animate-gradient-shift`}></div>

                    {/* Overlay Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '48px 48px'
                        }}></div>
                    </div>

                    {/* Floating Shapes (Consistent across slides but re-rendered) */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 backdrop-blur-xl rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 backdrop-blur-xl rounded-full blur-3xl animate-float-delayed"></div>
                </div>
            ))}

            {/* Content Layer */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">

                {/* Content Transition Container */}
                <div className="relative min-h-[400px] flex flex-col justify-center items-center">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${index === currentSlide
                                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                                }`}
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
                                <span className={`text-sm font-semibold text-white/90 uppercase tracking-widest`}>
                                    {slide.id === 'mission' ? 'Our Mission' : slide.id === 'values' ? 'Our Values' : 'Our Purpose'}
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight tracking-tight drop-shadow-lg">
                                {slide.title}
                            </h1>

                            {/* Subtitle */}
                            <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                                    {slide.subtitle}
                                </p>
                            </div>

                            {/* CTA */}
                            <Link
                                to={slide.ctaLink}
                                className="group relative bg-white text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-2xl"
                            >
                                <span>{slide.ctaText}</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110 z-20 group"
                aria-label="Previous slide"
            >
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110 z-20 group"
                aria-label="Next slide"
            >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Bottom Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                ? 'w-12 h-3 bg-white'
                                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}

export default HeroCarousel;
