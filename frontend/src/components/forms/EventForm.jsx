import { useState, useEffect } from 'react';
import { Calendar, MapPin, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

function EventForm({ event, onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_type: 'workshop',
        event_date: '',
        location: '',
        banner_image_url: '',
        registration_link: '',
        is_published: false
    });

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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Youth Innovation Summit 2024"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                        name="event_type"
                        value={formData.event_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="webinar">Webinar</option>
                        <option value="outreach">Community Outreach</option>
                        <option value="fundraiser">Fundraiser</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="datetime-local"
                            name="event_date"
                            required
                            value={formData.event_date}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., Makerere University Main Hall (or Online)"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    rows="4"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe the event details..."
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="url"
                        name="banner_image_url"
                        value={formData.banner_image_url}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Direct image link (Media Library upload coming soon)</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link</label>
                <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="url"
                        name="registration_link"
                        value={formData.registration_link}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                    Publish this event immediately
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
                    {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
                </button>
            </div>
        </form>
    );
}

export default EventForm;
