import React from 'react';
import { Gift, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Rewards() {
    return (
        <div className="min-h-screen bg-[#ffffff] dark:bg-[#010101] flex flex-col">
            <Navbar />
            <div className="flex-grow pt-[88px]">
                {/* Header */}
                <div className="bg-gradient-to-br from-purple-600 to-orange-500 text-white py-24 px-4 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold tracking-wide w-fit mx-auto mb-6 flex items-center gap-2">
                            <Gift size={16} /> Wekume Rewards
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Why Wekume Rewards?</h1>
                        <p className="text-xl md:text-2xl text-purple-100 font-medium">Turning fear into action and action into a lifestyle.</p>
                    </div>
                </div>

                {/* The Problem & Solution */}
                <div className="max-w-5xl mx-auto px-4 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div className="bg-red-50 dark:bg-red-900/10 p-10 rounded-3xl border border-red-100 dark:border-red-900/30 relative">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-red-500 mb-4">The Problem</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                Stigma and fear stop young people from accessing SRHR services.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/10 p-10 rounded-3xl border border-green-100 dark:border-green-900/30 relative">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-green-500 mb-4">What We're Changing</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                We make health actions feel safe, normal, and worth it.
                            </p>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mb-24 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700">
                                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 font-black text-2xl">1</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Take a health action</h3>
                                <p className="text-gray-900 dark:text-gray-100 text-sm font-medium bg-gray-50 dark:bg-gray-900/50 py-2 px-4 rounded-lg w-full">HIV testing, contraception, information, treatment support</p>
                            </div>
                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700">
                                <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 font-black text-2xl">2</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Earn points</h3>
                                <p className="text-gray-900 dark:text-gray-100 text-sm font-medium bg-gray-50 dark:bg-gray-900/50 py-2 px-4 rounded-lg w-full">Every positive step you take is recognized and rewarded</p>
                            </div>
                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700">
                                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 font-black text-2xl">3</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get rewarded</h3>
                                <p className="text-gray-900 dark:text-gray-100 text-sm font-medium bg-gray-50 dark:bg-gray-900/50 py-2 px-4 rounded-lg w-full">Redeem your accumulated points for useful benefits</p>
                            </div>
                        </div>
                    </div>

                    {/* Why Rewards Matter & Impact */}
                    <div className="bg-gray-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                        
                        <div className="grid md:grid-cols-2 gap-16 relative z-10">
                            <div>
                                <h3 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Why Rewards Matter</h3>
                                <p className="text-lg text-gray-300 mb-6 font-medium">When young people are rewarded:</p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-4 text-xl">
                                        <Star className="text-secondary-500 shrink-0" size={24} fill="currentColor" />
                                        <span>They are more likely to take action</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-xl">
                                        <Star className="text-yellow-400 shrink-0" size={24} fill="currentColor" />
                                        <span>They begin to prioritise their health</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-xl">
                                        <Star className="text-yellow-400 shrink-0" size={24} fill="currentColor" />
                                        <span>Healthy students become more productive & confident</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-16">
                                <h3 className="text-2xl font-bold mb-6 text-purple-300">The Impact</h3>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center mb-8">
                                    <p className="font-bold text-lg leading-relaxed flex flex-col sm:flex-row items-center justify-center gap-2">
                                        <span className="bg-purple-500/20 px-3 py-1 rounded-lg">Rewarding small actions</span>
                                        <span className="text-pink-500 font-black">→</span>
                                        <span className="bg-orange-500/20 px-3 py-1 rounded-lg">builds habits</span>
                                        <span className="text-orange-400 font-black">→</span>
                                        <span className="bg-pink-500/20 px-3 py-1 rounded-lg">drives behaviour change</span>
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Link to="/ug/activities" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all inline-flex items-center gap-2">
                                        <Award size={20} /> Start Earning Today
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Rewards;
