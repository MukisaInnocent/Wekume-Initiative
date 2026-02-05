import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentAPI } from '../services/api';
import { FileText, Download, Calendar, Search, Loader } from 'lucide-react';

function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await contentAPI.getReports();
                // Filter to only published reports for public view
                const published = (response.data.reports || []).filter(r => r.is_published);
                setReports(published);
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const filteredReports = reports.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.year.toString().includes(searchTerm)
    );

    return (
        <>
            <Navbar />

            {/* Header */}
            <div className="bg-primary-900 text-white py-12 md:py-20 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center uppercase tracking-widest">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold">Wekume Reports</h1>
                    <div className="w-24 h-1 bg-accent-500 mx-auto mt-6"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">

                {/* Search / Filter */}
                <div className="flex justify-between items-center mb-10 flex-col md:flex-row gap-4">
                    <p className="text-gray-600">
                        Explore our annual reports, strategic plans, and performance documents.
                    </p>
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search reports..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Reports Grid */}
                {loading ? (
                    <div className="text-center py-20 flex justify-center items-center gap-2 text-primary-600">
                        <Loader className="animate-spin" /> Loading documents...
                    </div>
                ) : filteredReports.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredReports.map(report => (
                            <div key={report.id} className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col">
                                {/* Preview / Icon Area */}
                                <div className="h-48 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500">
                                    {report.cover_image_url ? (
                                        <img src={report.cover_image_url} alt={report.title} className="h-full w-auto object-contain shadow-md rounded" />
                                    ) : (
                                        <FileText size={64} className="text-primary-300" />
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold font-heading">
                                            {report.year}
                                        </span>
                                        {/* Optional badges can go here */}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {report.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">
                                        {report.description || "Download the full PDF report to view details."}
                                    </p>

                                    <a
                                        href={report.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        <Download size={20} /> Download PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-900">No reports found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Reports;
