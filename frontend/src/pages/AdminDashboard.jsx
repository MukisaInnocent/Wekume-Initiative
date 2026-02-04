import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/admin/login');
            return;
        }

        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar */}
            <div className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-heading font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Welcome, {user.fullname}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium">Total Events</h3>
                        <p className="text-3xl font-bold text-primary-600 mt-2">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium">Support Forms</h3>
                        <p className="text-3xl font-bold text-secondary-600 mt-2">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium">Volunteers</h3>
                        <p className="text-3xl font-bold text-primary-600 mt-2">0</p>
                    </div>
                </div>

                {/* Content Management Sections */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-heading font-bold mb-4">Content Management</h2>
                    <p className="text-gray-600">
                        Admin CMS features coming soon. You'll be able to manage:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                        <li>Website content sections (About, Mission, Vision)</li>
                        <li>Events and programs</li>
                        <li>Partners and testimonials</li>
                        <li>Media library</li>
                        <li>Reports and analytics</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
