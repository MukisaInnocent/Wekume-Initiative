import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';
import { Smartphone, Download, Check } from 'lucide-react';

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

    const content = appContent || {
        title: "Wekume Mobile App",
        subtitle: "Access standard health information and educational resources on the go.",
        features: ["Offline Access", "Interactive Guides", "Expert Verified Content"]
    };

    return (
        <>
            <Navbar />
            <div className="bg-primary-900 text-white pt-20 pb-32 sm:pt-24 sm:pb-40 md:pt-32 md:pb-48 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex p-3 sm:p-4 bg-white/10 rounded-full mb-4 sm:mb-6 backdrop-blur-sm"><Smartphone size={28} className="sm:w-8 sm:h-8" /></div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-tight">{content.title}</h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">{content.subtitle}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-primary-900 px-6 sm:px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                            <Download size={20} /> Download for Android
                        </button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary-800 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-secondary-900 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20 pb-16 sm:pb-20 bg-white dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-100 dark:border-gray-700">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Why Download Wekume?</h2>
                            <ul className="space-y-3 sm:space-y-4">
                                {(content.features || []).map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                                        <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 p-1 rounded-full mt-0.5"><Check size={16} /></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl h-64 sm:h-80 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-600">
                            {/* App Screenshot Placeholder */}
                            <Smartphone size={48} className="sm:w-16 sm:h-16 mb-2" />
                            <span className="font-medium text-sm sm:text-base">App Screenshot Preview</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default WekumeApp;
