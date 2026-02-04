import { useState } from 'react';
import { FileText, Upload, Calendar } from 'lucide-react';

function ReportForm({ report, onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: new Date().getFullYear(),
        file_url: 'https://example.com/report.pdf', // Placeholder until file upload is ready
        cover_image_url: '',
        is_published: false
    });

    useState(() => {
        if (report) {
            setFormData(report);
        }
    }, [report]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Annual Impact Report 2024"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Year</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="number"
                            name="year"
                            required
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center pt-6">
                    <input
                        type="checkbox"
                        name="is_published"
                        id="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_published" className="ml-2 text-sm font-medium text-gray-700">
                        Publish Immediately
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Summary of the report..."
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="file_url"
                            value={formData.file_url}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                            placeholder="File URL will appear here..."
                            readOnly
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            id="report_file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                const uploadFormData = new FormData();
                                uploadFormData.append('file', file);

                                // Show loading state specifically for upload if needed, or just rely on quick upload
                                const originalText = e.target.previousSibling?.innerText; // unavailable reference, ignore

                                try {
                                    // Could add a local uploading state here if desired
                                    const { adminAPI } = await import('../../services/api');
                                    const res = await adminAPI.uploadMedia(uploadFormData);
                                    setFormData(prev => ({ ...prev, file_url: res.data.file.url }));
                                } catch (error) {
                                    console.error("Upload failed", error);
                                    alert("File upload failed");
                                }
                            }}
                        />
                        <label
                            htmlFor="report_file"
                            className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-200 flex items-center gap-2"
                        >
                            <Upload size={20} /> Upload
                        </label>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Upload the report PDF document.</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (report ? 'Update Report' : 'Add Report')}
                </button>
            </div>
        </form>
    );
}

export default ReportForm;
