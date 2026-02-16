import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogIn } from 'lucide-react';

function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [debugInfo, setDebugInfo] = useState('');
    const [loading, setLoading] = useState(false);

    // Get API URL for debugging
    const apiUrl = import.meta.env.VITE_API_BASE_URL || '/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation
        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting login...');

            const response = await authAPI.login(formData);
            console.log('Login successful');

            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Invalid response from server');
            }

            // Store auth data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Small delay to ensure storage is set
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 100);

        } catch (err) {
            console.error('Login error:', err);

            // Handle different types of errors
            let errorMessage = 'Login failed. Please try again.';

            if (err.response) {
                // Server responded with an error
                if (err.response.status === 401) {
                    errorMessage = 'Invalid email or password';
                } else if (err.response.status === 404) {
                    errorMessage = 'Login service not found (404)';
                } else if (err.response.data && err.response.data.error) {
                    errorMessage = err.response.data.error;
                }
            } else if (err.request) {
                // Request made but no response
                errorMessage = 'Cannot connect to server. Please check your internet connection or if the backend is running.';
            } else {
                // Something else happened
                errorMessage = err.message;
            }

            // Set debug info
            setDebugInfo(JSON.stringify({
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                url: err.config?.url,
                baseURL: err.config?.baseURL,
                data: err.response?.data
            }, null, 2));

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-primary">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <LogIn className="text-primary-600" size={32} />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Admin Login</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Wekume Initiative CMS</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Debug Info */}
                <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 overflow-auto max-h-32">
                    <p><strong>API Config:</strong> {apiUrl}</p>
                    {debugInfo && <pre className="mt-2 text-red-500">{debugInfo}</pre>}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="admin@wekume.org"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary-500 text-white py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
