import React from 'react';
import { Gift, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function USRewards() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {/* Header */}
                <div className="bg-purple-900 text-white py-20 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Funder Rewards Program</h1>
                    <p className="text-xl text-purple-200 max-w-2xl mx-auto">We believe in acknowledging the heroes who power our mission. Explore the benefits of partnering with Wekume.</p>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                            <Star size={40} className="mx-auto text-yellow-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Impact Badges</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Receive verified digital badges that you can display on your website, LinkedIn, or corporate CSR materials showing your tier of support.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                            <Gift size={40} className="mx-auto text-pink-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Exclusive Updates</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Get early access to our quarterly reports, invites to virtual town halls with our ground team in Uganda, and personalized video thank yous.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                            <Award size={40} className="mx-auto text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Naming Rights</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Major donors have the opportunity to name a scholarship, a specific health outreach program, or a feature within the Wekume App.</p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/us/donate" className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition shadow-lg inline-block">
                            Start Earning Rewards
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default USRewards;
