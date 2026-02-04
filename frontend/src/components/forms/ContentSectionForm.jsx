import { useState, useEffect } from 'react';

function ContentSectionForm({ section, onSubmit, onCancel, loading, title }) {
    const [formData, setFormData] = useState({
        title: '',
        content: {}, // Dynamic JSON content
    });

    useEffect(() => {
        if (section) {
            setFormData({
                title: section.section_title || section.key, // Fallback
                content: typeof section.content === 'string' ? JSON.parse(section.content) : section.content
            });
        }
    }, [section]);

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
            content: formData.content
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
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{title || 'Edit Content'}</h3>
                {/* We generally don't edit the section title/key itself in this simple view, just the content */}
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
