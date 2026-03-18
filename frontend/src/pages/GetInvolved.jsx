import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Smartphone, Users, Globe, ArrowRight, MessageCircle, Heart } from 'lucide-react';

function GetInvolved() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-primary-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-primary-900 to-orange-900 opacity-90"></div>
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-orange-500/30">
                            Join the Movement
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 sm:mb-8 leading-tight">
                            Ready to Take Charge of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Health and Future?</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mb-8 sm:mb-10">
                            Wekume is more than just an app – it’s a movement to empower students across Uganda. Whether you’re seeking guidance, resources, or community, we have everything you need to thrive.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <Link to="/wekume-app" className="bg-white text-primary-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-orange-400 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                                <Smartphone size={20} /> Download App
                            </Link>
                            <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                                Contact Us <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 sm:w-96 sm:h-96 bg-orange-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            </div>

            {/* How can you start section */}
            <div className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">Here’s How You Can Start</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Card 1: Download App */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-purple-100 dark:border-purple-700 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-50 dark:bg-purple-900 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Smartphone size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Download the FREE App</h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Get access to SafeChat, QuickTest, and Health Tips at your fingertips! Unlock a world of information, resources, and support.
                            </p>
                            <Link to="/wekume-app" className="inline-flex items-center text-purple-600 font-bold hover:text-purple-700 text-sm sm:text-base">
                                Get the App <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Card 2: Connect with Us */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-pink-100 dark:border-pink-700 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-50 dark:bg-pink-900 rounded-2xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                <Globe size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Connect with Us!</h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Curious about our exchange programs, internships, or business incubator? Reach out! Wekume offers unique opportunities to broaden your horizons.
                            </p>
                            <Link to="/contact" className="inline-flex items-center text-pink-600 font-bold hover:text-pink-700 text-sm sm:text-base">
                                Contact Team <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Card 3: Join Community */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-orange-100 dark:border-orange-700 group">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 dark:bg-orange-900 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <Users size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Join the Community</h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                You’re not alone! Join a network of like-minded students dedicated to health, growth, and positive change. Membership is FREE.
                            </p>
                            <a href="#" className="inline-flex items-center text-orange-600 font-bold hover:text-orange-700 text-sm sm:text-base">
                                Join Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white dark:bg-gray-900 py-12 sm:py-16 md:py-20 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex p-3 bg-white/10 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
                                <MessageCircle size={24} className="sm:w-8 sm:h-8" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">We Want To Hear From You!</h2>
                            <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
                                Have ideas, questions, or want to partner with us? Let's build a better future for students together.
                            </p>
                            <Link to="/contact" className="bg-white text-purple-600 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold hover:bg-orange-400 hover:text-white transition-all shadow-lg inline-flex items-center gap-2 transform hover:scale-105 text-sm sm:text-base">
                                <Heart size={18} className="sm:w-5 sm:h-5 fill-current" /> Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default GetInvolved;
