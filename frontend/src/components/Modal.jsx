import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
