import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';
import { Smartphone, Download, MessageCircle, Activity, Shield, ShoppingBag, Bot, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function WekumeApp() {
    const [appContent, setAppContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await contentAPI.getSection('wekume_app');
                setAppContent(typeof response.data.content === 'string' ? JSON.parse(response.data.content) : response.data.content);
            } catch (error) {
                console.error("Error fetching app content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const features = [
        {
            icon: <MessageCircle size={28} className="text-blue-500" />,
            title: "SafeChat",
            desc: "Private, judgment-free conversations about your health.",
            steps: "Start a chat → ask anything → get trusted guidance",
            color: "bg-blue-50 border-blue-100"
        },
        {
            icon: <Activity size={28} className="text-red-500" />,
            title: "QuickTest",
            desc: "Fast and easy access to STD/STI testing and treatment.",
            steps: "Request a test → choose a location → get tested safely",
            color: "bg-red-50 border-red-100"
        },
        {
            icon: <Shield size={28} className="text-green-500" />,
            title: "Circumcision",
            desc: "Access safe male circumcision services.",
            steps: "Book → get connected to a trusted provider → receive care",
            color: "bg-green-50 border-green-100"
        },
        {
            icon: <ShoppingBag size={28} className="text-purple-500" />,
            title: "Shop",
            desc: "Get essential health products easily.",
            steps: "Browse → order → receive discreetly",
            color: "bg-purple-50 border-purple-100"
        },
        {
            icon: <Bot size={28} className="text-indigo-500" />,
            title: "Lina",
            desc: "Your personal health assistant.",
            steps: "Ask questions → get instant answers → stay informed",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            icon: <Gift size={28} className="text-orange-500" />,
            title: "Rewards",
            desc: "Earn points for taking care of your health.",
            steps: "Take action → earn points → redeem rewards",
            color: "bg-orange-50 border-orange-100"
        }
    ];

    return (
        <>
            <Navbar />
            <div className="bg-primary-900 text-white pt-16 pb-24 sm:pt-20 sm:pb-32 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex p-3 sm:p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm"><Smartphone size={32} className="text-blue-200" /></div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black mb-6 leading-tight">About the Wekume App</h1>
                    
                    <div className="max-w-4xl mx-auto space-y-6 text-lg sm:text-xl text-blue-100 leading-relaxed">
                        <p>
                            The Wekume App is a private, youth-friendly platform designed to help students take control of their health without fear or stigma.
                        </p>
                        <p>
                            It brings together trusted information, easy access to services, and real rewards — all in one place. Whether it's getting tested, asking questions, or finding support, the app makes every step simple, safe, and confidential.
                        </p>
                        <p className="text-2xl font-bold text-white pt-4">
                            At its core, Wekume is about one thing:<br/>
                            <span className="text-blue-300">helping young people protect themselves — and making it easier to do so every day.</span>
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-primary-900 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
                            <Download size={22} /> Download App
                        </button>
                    </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-30 translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="dark:bg-gray-900 bg-gray-50 py-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-heading font-black text-gray-900 dark:text-white mb-4">Core Features</h2>
                        <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className={`p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${feature.color}`}>
                                <div className="bg-white dark:bg-gray-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-900 dark:text-gray-100 text-lg mb-6">{feature.desc}</p>
                                
                                <div className="mt-auto bg-white/60 dark:bg-gray-900/40 p-4 rounded-xl border border-white/40 dark:border-gray-700/50 backdrop-blur-sm">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-100 mb-2">How it works:</h4>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex flex-wrap gap-x-2 gap-y-1">
                                        {feature.steps.split('→').map((step, i, arr) => (
                                            <span key={i} className="flex items-center gap-1">
                                                {step.trim()}
                                                {i < arr.length - 1 && <span className="text-primary-500 font-bold">→</span>}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default WekumeApp;
