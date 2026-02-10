import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

function TestimonialForm({ testimonial, onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        author_name: '',
        author_role: '',
        content: '',
        rating: 5,
        photo_url: '',
        is_featured: false,
        is_approved: true
    });

    useEffect(() => {
        if (testimonial) {
            setFormData({
                author_name: testimonial.author_name || '',
                author_role: testimonial.author_role || '',
                content: testimonial.content || '',
                rating: testimonial.rating || 5,
                photo_url: testimonial.photo_url || '',
                is_featured: testimonial.is_featured || false,
                is_approved: testimonial.is_approved !== undefined ? testimonial.is_approved : true
            });
        }
    }, [testimonial]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Handle file upload for photo
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await adminAPI.uploadMedia(formData);
            setFormData(prev => ({ ...prev, photo_url: response.data.file.url }));
        } catch (error) {
            console.error('File upload failed:', error);
            alert('Failed to upload image');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
                <input
                    type="text"
                    required
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g. John Doe"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
                <input
                    type="text"
                    value={formData.author_role}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g. Volunteer"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content *</label>
                <textarea
                    required
                    rows="4"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter the testimonial text..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div className="flex items-center space-x-4 pt-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.is_featured}
                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                            className="rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Featured</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.is_approved}
                            onChange={(e) => setFormData({ ...formData, is_approved: e.target.checked })}
                            className="rounded text-secondary-600 focus:ring-secondary-500"
                        />
                        <span className="text-sm text-gray-700">Approved</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <div className="flex gap-4 items-center">
                    {formData.photo_url && (
                        <img src={formData.photo_url} alt="Preview" className="h-16 w-16 object-cover rounded-full border" />
                    )}
                    <div className="flex-1">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                        <input
                            type="text"
                            placeholder="Or paste image URL"
                            value={formData.photo_url}
                            onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                            className="mt-2 w-full px-3 py-1 text-sm border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : (testimonial ? 'Update Testimonial' : 'Create Testimonial')}
                </button>
            </div>
        </form>
    );
}

export default TestimonialForm;
