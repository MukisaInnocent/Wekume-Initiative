import React from 'react';
import { ArrowRight, Globe, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function USHome() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-semibold text-xs tracking-wider uppercase mb-6">
                            Wekume Initiative US
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-8">
                            Empowering Change.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Join our network of partners and funders in building sustainable health solutions and empowering the youth in Uganda.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link to="/us/funders" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg w-full sm:w-auto text-center flex justify-center items-center gap-2">
                                Become a Funder <ArrowRight size={20} />
                            </Link>
                            <Link to="/us/contact" className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full font-bold text-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition w-full sm:w-auto text-center">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Global Reach</h3>
                                <p className="text-gray-600 dark:text-gray-400">Connecting resources in the US directly to impactful grassroots initiatives in Uganda.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
                                    <Shield size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Total Transparency</h3>
                                <p className="text-gray-600 dark:text-gray-400">See exactly how your funds are utilized with our comprehensive impact reporting system.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                                <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                                    <Heart size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sustainable Impact</h3>
                                <p className="text-gray-600 dark:text-gray-400">We don't just provide aid; we build self-sustaining health and education ecosystems.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default USHome;
