import React from 'react';
import { Gift, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Rewards() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-[88px]">
                {/* Header */}
                <div className="bg-gradient-to-br from-purple-600 to-orange-500 text-white py-20 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Wekume Rewards</h1>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto">Active participation fuels your growth and our community. Earn points and redeem them for exclusive benefits.</p>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 text-center hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                            <Star size={40} className="mx-auto text-yellow-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Essential Health Kits</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Redeem points for specialized health resource kits, testing kits, and wellness packages to support your health journey.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 text-center hover:border-pink-300 dark:hover:border-pink-600 transition-colors">
                            <Gift size={40} className="mx-auto text-pink-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Exclusive Swag</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Rock Wekume gear including branded t-shirts, hoodies, notebooks, and tote bags that represent your commitment to learning.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 text-center hover:border-orange-300 dark:hover:border-orange-600 transition-colors">
                            <Award size={40} className="mx-auto text-orange-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">VIP Event Passes</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Skip the line and gain VIP access to highly demanded workshops, on-campus dialogues, and premium community events.</p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/ug/activities" className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all inline-block">
                            Attend Activities to Earn
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Rewards;
