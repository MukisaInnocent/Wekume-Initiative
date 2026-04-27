import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { FileText, Download, Calendar, Search, Loader2, AlertCircle } from 'lucide-react';

function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await contentAPI.getReports();
                const published = (response.data.reports || []).filter(r => r.is_published);
                setReports(published);
            } catch (err) {
                console.error('Error fetching reports:', err);
                setError('Unable to load reports. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const filteredReports = reports.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.year?.toString().includes(searchTerm)
    );

    return (
        <>
            <Navbar />

            <PageHeader
                badge="Transparency & Accountability"
                title="Wekume Reports"
                subtitle="Annual reports, strategic plans, and performance documents — our commitment to openness."
            />

            <div className="bg-white dark:bg-gray-900 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

                    {/* Section intro + Search */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <span className="section-eyebrow">Documents</span>
                            <p className="text-gray-600 dark:text-gray-400 max-w-lg text-base leading-relaxed">
                                Download our publicly available reports to understand our programmes,
                                finances, and impact across Uganda and the United States.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80 shrink-0">
                            <Search
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
                                size={18}
                                aria-hidden="true"
                            />
                            <input
                                id="reports-search"
                                type="text"
                                placeholder="Search by title or year…"
                                aria-label="Search reports"
                                className="input pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="divider-brand mb-12" />

                    {/* States */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500 dark:text-gray-400">
                            <Loader2 className="animate-spin text-primary-500" size={40} />
                            <p className="text-sm font-medium">Loading documents…</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 px-5 py-4 rounded-xl max-w-lg mx-auto">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    ) : filteredReports.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {filteredReports.map(report => (
                                <ReportCard key={report.id} report={report} />
                            ))}
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="text-primary-400 dark:text-primary-300" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {searchTerm ? 'No matching reports' : 'No reports published yet'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                                {searchTerm
                                    ? 'Try adjusting your search terms or browse all documents.'
                                    : 'Check back soon — our team is preparing documents for publication.'}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

/* ── Report Card ────────────────────────────────────── */
function ReportCard({ report }) {
    return (
        <article
            className="group card card-hover flex flex-col overflow-hidden"
            aria-label={`Report: ${report.title}`}
        >
            {/* Preview / Cover area */}
            <div
                className="h-48 bg-gradient-to-br from-secondary-900/90 to-primary-900/80
                           dark:from-gray-800 dark:to-gray-700
                           flex items-center justify-center relative overflow-hidden shrink-0"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'radial-gradient(circle, #f7b2d0 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                    aria-hidden="true"
                />

                {report.cover_image_url ? (
                    <img
                        src={report.cover_image_url}
                        alt={`Cover of ${report.title}`}
                        className="h-full w-auto object-contain shadow-md rounded relative z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3 relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                            <FileText size={32} className="text-primary-200" />
                        </div>
                        {report.year && (
                            <span className="text-white/60 text-xs font-bold tracking-widest uppercase">
                                {report.year}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Year badge */}
                {report.year && (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="badge badge-primary">
                            <Calendar size={12} />
                            {report.year}
                        </span>
                    </div>
                )}

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2
                               group-hover:text-primary-600 dark:group-hover:text-primary-400
                               transition-colors leading-snug">
                    {report.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {report.description || 'Download the full PDF report to view details and impact data.'}
                </p>

                {/* Download CTA */}
                {report.file_url ? (
                    <a
                        href={report.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download ${report.title} PDF`}
                        className="btn btn-primary btn-md w-full group/dl"
                    >
                        <Download
                            size={18}
                            className="group-hover/dl:translate-y-0.5 transition-transform"
                            aria-hidden="true"
                        />
                        Download PDF
                    </a>
                ) : (
                    <span className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full
                                    bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500
                                    text-sm font-semibold cursor-not-allowed">
                        <FileText size={16} />
                        File unavailable
                    </span>
                )}
            </div>
        </article>
    );
}

export default Reports;
