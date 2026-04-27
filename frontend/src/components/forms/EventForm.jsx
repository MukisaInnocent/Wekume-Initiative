import { useState, useEffect } from 'react';
import { Calendar, MapPin, Link as LinkIcon, Image as ImageIcon, Upload } from 'lucide-react';
import { adminAPI } from '../../services/api';

function EventForm({ event, defaultRegion = 'global', onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_type: 'workshop',
        event_date: '',
        location: '',
        banner_image_url: '',
        registration_link: '',
        is_published: false,
        region: defaultRegion,
        category: ''
    });
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (event) {
            // Format date for input field (YYYY-MM-DDThh:mm)
            const date = event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '';
            setFormData({
                ...event,
                event_date: date
            });
        }
    }, [event]);

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

    const handleBannerImageUpload = async (e) => {
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
            setFormData(prev => ({ ...prev, banner_image_url: res.data.file.url }));
        } catch (error) {
            console.error('Image upload failed:', error);
            const errorMsg = error.response?.data?.error || 'Upload failed. Please try again.';
            setUploadError(errorMsg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Event Title</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Youth Innovation Summit 2024"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Event Type</label>
                    <select
                        name="event_type"
                        value={formData.event_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="workshop">Workshop</option>
                        <option value="training">Training</option>
                        <option value="webinar">Webinar</option>
                        <option value="outreach">Community Outreach</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Date & Time</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="datetime-local"
                            name="event_date"
                            required
                            value={formData.event_date}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Target Region</label>
                    <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="global">Global (Both Regions)</option>
                        <option value="ug">Uganda Only</option>
                        <option value="us">United States Only</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Category Code (Optional)</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g. 1, 2, 8, U"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Location</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., Makerere University Main Hall (or Online)"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
                <textarea
                    name="description"
                    rows="4"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe the event details..."
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Banner Image URL</label>
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <ImageIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="banner_image_url"
                            value={formData.banner_image_url}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-900/50"
                            placeholder="Banner URL will appear here..."
                            readOnly
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            id="event_banner"
                            className="hidden"
                            accept="image/*"
                            onChange={handleBannerImageUpload}
                        />
                        <label
                            htmlFor="event_banner"
                            className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-200 flex items-center gap-2 h-[42px]"
                        >
                            <Upload size={20} /> Upload
                        </label>
                    </div>
                </div>
                {uploadError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">{uploadError}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Registration Link</label>
                <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="url"
                        name="registration_link"
                        value={formData.registration_link}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://forms.google.com/..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="is_published"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Publish this event immediately
                </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
                </button>
            </div>
        </form>
    );
}

export default EventForm;
