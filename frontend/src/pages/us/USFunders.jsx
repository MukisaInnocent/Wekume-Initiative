import React from 'react';
import { Briefcase, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function USFunders() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {/* Header */}
                <div className="bg-blue-900 text-white py-20 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Funders & Partnership Channels</h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto">Discover strategic ways to fund and support Wekume's programs with measurable ROI on social impact.</p>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <Briefcase size={40} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Corporate Sponsorships</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">Align your brand with health and youth empowerment. Partner to sponsor large-scale school outreach events.</p>
                            <Link to="/us/contact" className="mt-auto text-blue-600 dark:text-blue-400 font-semibold hover:underline">Inquire About Sponsorships</Link>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                            <Target size={40} className="text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Institutional Grants</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">We provide detailed proposals and logic models for grants focused on public health, tech accessibility, and reproductive rights.</p>
                            <Link to="/us/contact" className="mt-auto text-blue-600 dark:text-blue-400 font-semibold hover:underline">Request a Proposal</Link>
                        </div>
                        <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-2xl text-white text-center mt-8 shadow-xl">
                            <TrendingUp size={40} className="mx-auto mb-4 opacity-80" />
                            <h3 className="text-2xl font-bold mb-4">Individual Philanthropy & Seed Funding</h3>
                            <p className="text-blue-100 mb-8 max-w-3xl mx-auto">Join our inner circle of early-stage backers. Your seed funds directly build the Wekume App architecture and train peer educators.</p>
                            <Link to="/us/support" className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow">Support Directly</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default USFunders;
