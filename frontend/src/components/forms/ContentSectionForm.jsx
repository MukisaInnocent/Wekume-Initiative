import { useState, useEffect } from 'react';

function ContentSectionForm({ section, defaultRegion = 'global', onSubmit, onCancel, loading, title }) {
    const [formData, setFormData] = useState({
        title: '',
        content: {}, // Dynamic JSON content
        region: defaultRegion
    });

    useEffect(() => {
        if (section) {
            setFormData({
                title: section.section_title || section.key, // Fallback
                content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content,
                region: section.region || defaultRegion
            });
        }
    }, [section, defaultRegion]);

    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                [key]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert back to format backend expects if necessary, but backend likely accepts JSON content
        onSubmit({
            ...section,
            section_title: formData.title,
            content: formData.content,
            region: formData.region
        });
    };

    // Helper to render fields dynamically based on content structure
    // This is a simplified version; in a real CMS, we might use a schema
    const renderFields = () => {
        if (!formData.content) return null;

        return Object.keys(formData.content).map(key => (
            <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {key.replace(/_/g, ' ')}
                </label>
                {key.includes('description') || key.includes('text') || key.includes('bio') ? (
                    <textarea
                        value={formData.content[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows="4"
                    />
                ) : (
                    <input
                        type="text"
                        value={formData.content[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                )}
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{title || 'Edit Content'}</h3>
                    <p className="text-sm text-gray-500 mb-4">You are editing content for {formData.title}</p>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1 uppercase tracking-wider">Region Context</label>
                    <select
                        value={formData.region}
                        onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                        className="px-3 py-1.5 border border-purple-200 bg-purple-50 text-purple-800 rounded-lg text-sm font-bold shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    >
                        <option value="global">🌐 Global (Fallback for Both)</option>
                        <option value="ug">🇺🇬 Uganda Only</option>
                        <option value="us">🇺🇸 United States Only</option>
                    </select>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
                {renderFields()}
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
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

export default ContentSectionForm;
