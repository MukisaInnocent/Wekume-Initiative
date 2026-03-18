import React from 'react';
import { BarChart3, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function USImpact() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {/* Header */}
                <div className="bg-green-900 text-white py-20 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Impact Reporting</h1>
                    <p className="text-xl text-green-200 max-w-2xl mx-auto">Transparency and accountability are at our core. See exactly how your support translates into real-world change.</p>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                        <div className="md:w-1/2">
                            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl">
                                <BarChart3 size={60} className="text-green-600 dark:text-green-400 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data-Driven Approach</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    We track every dollar and measure success through robust KPIs. Our programs are continuously evaluated for effectiveness, ensuring maximum reach for youth sexual and reproductive health education.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <div className="flex items-start gap-4">
                                <CheckCircle size={24} className="text-green-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Annual Reports</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Comprehensive summaries of our financials, operational milestones, and stories from the field.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle size={24} className="text-green-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Quarterly Updates</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Regular check-ins detailing ongoing projects, upcoming campaigns, and immediate needs.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle size={24} className="text-green-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Direct App Metrics</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Anonymized usage statistics from the Wekume App demonstrating user engagement and knowledge retention.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-800 pt-12 text-center">
                        <FileText size={48} className="mx-auto text-gray-400 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Request Our Latest Report</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                            Are you a prospective funder or partner? We'd love to share our detailed impact prospectus with you.
                        </p>
                        <Link to="/us/contact" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-lg inline-block">
                            Contact our Partnerships Team
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default USImpact;
