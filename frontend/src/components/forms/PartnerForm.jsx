import { useState, useEffect } from 'react';
import { Link as LinkIcon, Image as ImageIcon, Briefcase, Upload } from 'lucide-react';

function PartnerForm({ partner, onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        name: '',
        type: 'corporate', // corporate, ngo, academic, government, other
        description: '',
        logo_url: '',
        website: '',
        display_order: 0,
        is_active: true
    });

    useEffect(() => {
        if (partner) {
            setFormData(partner);
        }
    }, [partner]);

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Makerere University"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Type</label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="corporate">Corporate</option>
                            <option value="ngo">NGO</option>
                            <option value="academic">Academic / Education</option>
                            <option value="government">Government</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                        type="number"
                        name="display_order"
                        value={formData.display_order}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief details about the partnership..."
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <ImageIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="logo_url"
                            value={formData.logo_url}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                            placeholder="Logo URL will appear here..."
                            readOnly
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            id="partner_logo"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                const uploadFormData = new FormData();
                                uploadFormData.append('file', file);

                                try {
                                    const { adminAPI } = await import('../../services/api');
                                    const res = await adminAPI.uploadMedia(uploadFormData);
                                    setFormData(prev => ({ ...prev, logo_url: res.data.file.url }));
                                } catch (error) {
                                    console.error("Upload failed", error);
                                    alert("Image upload failed");
                                }
                            }}
                        />
                        <label
                            htmlFor="partner_logo"
                            className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-200 flex items-center gap-2"
                        >
                            <Upload size={20} /> Upload
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://partner-site.com"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="is_active"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Partner is active
                </label>
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
                    {loading ? 'Saving...' : (partner ? 'Update Partner' : 'Create Partner')}
                </button>
            </div>
        </form>
    );
}

export default PartnerForm;
