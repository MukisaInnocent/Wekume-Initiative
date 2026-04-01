import { useState, useEffect } from 'react';

function ContentSectionForm({ section, defaultRegion = 'global', onSubmit, onCancel, loading, title }) {
    const [formData, setFormData] = useState({
        section_title: '',
        content_text: '',
        region: defaultRegion
    });

    useEffect(() => {
        if (section) {
            setFormData({
                section_title: section.section_title || '',
                content_text: section.content_text || '',
                region: section.region || defaultRegion
            });
        }
    }, [section, defaultRegion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...section,
            section_title: formData.section_title,
            content_text: formData.content_text,
            region: formData.region
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{title || 'Edit Content'}</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-4 uppercase tracking-widest text-[10px]">Managing: {section?.section_key}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-purple-100 rounded-xl p-1 shadow-sm flex items-center">
                    <span className="pl-3 pr-2 text-[10px] font-bold text-gray-400 tracking-wider">REGION</span>
                    <select
                        value={formData.region}
                        onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                        className="bg-transparent text-sm font-bold text-purple-700 outline-none cursor-pointer pr-8 py-1.5 focus:ring-0"
                    >
                        <option value="global">Global</option>
                        <option value="ug">Uganda</option>
                        <option value="us">USA</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Section Title</label>
                    <input
                        type="text"
                        value={formData.section_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, section_title: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                        placeholder="e.g. Empowering Youth To Lead"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Content Body</label>
                    <textarea
                        value={formData.content_text}
                        onChange={(e) => setFormData(prev => ({ ...prev, content_text: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                        rows="6"
                        placeholder="Enter the main textual content here..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 transition-colors uppercase tracking-widest"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 active:scale-95"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

export default ContentSectionForm;

