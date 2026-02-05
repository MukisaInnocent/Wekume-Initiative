import { useState } from 'react';
import { Upload, X, Copy, Check, Trash2 } from 'lucide-react';
import { adminAPI } from '../services/api';

function MediaLibrary() {
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // In a real app, fetch from backend
    const [copiedId, setCopiedId] = useState(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await adminAPI.uploadMedia(formData);
            const newFile = response.data.file;
            setUploadedFiles(prev => [newFile, ...prev]);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-heading font-bold text-gray-900">Media Library</h2>

                <div className="relative">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${uploading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                            }`}
                    >
                        <Upload size={20} />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {uploadedFiles.length === 0 ? (
                    <div className="col-span-full py-12 text-center bg-white border-2 border-dashed border-gray-300 rounded-xl">
                        <Upload className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No images uploaded yet</p>
                        <p className="text-sm text-gray-400 mt-1">Upload images to use them in your content</p>
                    </div>
                ) : (
                    uploadedFiles.map((file, index) => (
                        <div key={file.public_id || index} className="group relative bg-white rounded-lg border overflow-hidden aspect-square shadow-sm hover:shadow-md transition-shadow">
                            <img
                                src={file.url}
                                alt="Uploaded"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => copyToClipboard(file.url, file.public_id)}
                                    className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                                    title="Copy URL"
                                >
                                    {copiedId === file.public_id ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                                </button>
                                {/* Delete button placeholder - would need delete endpoint */}
                                <button
                                    className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                    title="Delete"
                                    onClick={() => alert('Delete functionality coming soon')}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="bg-primary-50 p-4 rounded-lg flex gap-3 text-sm text-primary-800 border border-primary-100">
                <div className="flex-shrink-0 mt-0.5"><Upload size={16} /></div>
                <p>
                    <strong>Tip:</strong> Upload images here, then copy the URL to use in content sections, event banners, or partner logos.
                </p>
            </div>
        </div>
    );
}

export default MediaLibrary;
