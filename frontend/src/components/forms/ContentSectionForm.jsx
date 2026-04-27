import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { adminAPI } from '../../services/api';

function ContentSectionForm({ section, defaultRegion = 'global', onSubmit, onCancel, loading, title }) {
    const [formData, setFormData] = useState({
        section_title: '',
        content_text: '',
        image_url: '',
        region: defaultRegion
    });
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (section) {
            setFormData({
                section_title: section.section_title || '',
                content_text: section.content_text || '',
                image_url: section.image_url || '',
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
            image_url: formData.image_url,
            region: formData.region
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError('File size must be less than 5MB');
            return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            setUploadError(null);
            const res = await adminAPI.uploadMedia(uploadFormData);
            setFormData(prev => ({ ...prev, image_url: res.data.file.url }));
        } catch (error) {
            console.error('Image upload failed:', error);
            const errorMsg = error.response?.data?.error || 'Upload failed. Please try again.';
            setUploadError(errorMsg);
        }
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

                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Associated Image (Optional)</label>
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <ImageIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={formData.image_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-900/50 text-sm"
                                placeholder="Image URL will appear here..."
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                id="section_image"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="section_image"
                                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-200 flex items-center gap-2 text-sm font-bold transition-colors"
                            >
                                <Upload size={18} /> Upload
                            </label>
                        </div>
                    </div>
                    {uploadError && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{uploadError}</p>
                    )}
                    {formData.image_url && (
                        <div className="mt-2 relative group w-32 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
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

