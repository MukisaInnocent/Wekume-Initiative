import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Trash2, Upload, Loader, Check, X, Image as ImageIcon, RefreshCcw } from 'lucide-react';

const BackgroundManager = () => {
    const [backgrounds, setBackgrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchBackgrounds();
    }, []);

    const fetchBackgrounds = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getAllBackgrounds();
            setBackgrounds(response.data.backgrounds || []);
        } catch (err) {
            console.error('Failed to fetch backgrounds:', err);
            setError('Failed to load background images');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            setError('File size must be less than 5MB');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            setError(null);
            await adminAPI.uploadBackground(formData);
            setSuccessMessage('Background uploaded successfully');
            fetchBackgrounds(); // Refresh list

            // Clear success message after 3s
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Upload failed:', err);
            setError(err.response?.data?.error || 'Failed to upload background');
        } finally {
            setUploading(false);
            // Reset file input
            e.target.value = null;
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this background image?')) return;

        try {
            await adminAPI.deleteBackground(id);
            setSuccessMessage('Background deleted successfully');
            setBackgrounds(prev => prev.filter(bg => bg.id !== id));
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Delete failed:', err);
            setError('Failed to delete background');
        }
    };

    const toggleActive = async (id, currentStatus) => {
        try {
            // Optimistic update
            setBackgrounds(prev => prev.map(bg =>
                bg.id === id ? { ...bg, is_active: !currentStatus } : bg
            ));

            await adminAPI.updateBackground(id, { is_active: !currentStatus });
        } catch (err) {
            console.error('Update failed:', err);
            setError('Failed to update background status');
            fetchBackgrounds(); // Revert on error
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader className="animate-spin text-primary-600" size={32} /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Background Images</h2>
                <div className="relative">
                    <input
                        type="file"
                        id="bg-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="bg-upload"
                        className={`btn-primary flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? <Loader className="animate-spin" size={20} /> : <Upload size={20} />}
                        {uploading ? 'Uploading...' : 'Upload New Image'}
                    </label>
                    <button
                        onClick={fetchBackgrounds}
                        disabled={loading}
                        className="btn-secondary flex items-center gap-2 ml-3"
                        title="Force Sync with Server"
                    >
                        <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                        Sync
                    </button>
                </div>
            </div>

            {
                error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                        <X size={20} /> {error}
                    </div>
                )
            }

            {
                successMessage && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center gap-2">
                        <Check size={20} /> {successMessage}
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {backgrounds.map((bg) => (
                    <div key={bg.id} className={`group relative rounded-xl overflow-hidden shadow-md border-2 transition-all ${bg.is_active ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700 grayscale'}`}>
                        <div className="aspect-video relative bg-gray-100">
                            <img
                                src={bg.image_url}
                                alt="Background"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => toggleActive(bg.id, bg.is_active)}
                                    className={`p-2 rounded-full ${bg.is_active ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}
                                    title={bg.is_active ? "Deactivate" : "Activate"}
                                >
                                    {bg.is_active ? <X size={20} /> : <Check size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(bg.id)}
                                    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800">
                            <div className="mb-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={bg.public_id}>
                                    {bg.public_id}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`text-xs font-medium ${bg.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                                    {bg.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(bg.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {backgrounds.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No background images found.</p>
                        <p className="text-sm mt-1">Upload images to get started.</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default BackgroundManager;
