import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText, MessageSquare, Calendar, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';
import { authAPI, adminAPI } from '../services/api';

function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            try {
                const userResponse = await authAPI.getProfile();
                setUser(userResponse.data.user);

                const analyticsResponse = await adminAPI.getAnalytics();
                setAnalytics(analyticsResponse.data.stats);
            } catch (error) {
                console.error('Auth error:', error);
                navigate('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar */}
            <div className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-sm text-gray-600">Wekume Initiative CMS</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{user.fullname}</p>
                            <p className="text-xs text-gray-600 capitalize">{user.role.replace('_', ' ')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <BarChart3 className="inline mr-2" size={18} />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'events'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Calendar className="inline mr-2" size={18} />
                            Events
                        </button>
                        <button
                            onClick={() => setActiveTab('forms')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'forms'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <MessageSquare className="inline mr-2" size={18} />
                            Support Forms
                        </button>
                        <button
                            onClick={() => setActiveTab('volunteers')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === 'volunteers'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Users className="inline mr-2" size={18} />
                            Volunteers
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && analytics && (
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-6">Overview</h2>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Total Events</p>
                                        <p className="text-3xl font-bold text-primary-600 mt-2">{analytics.totalEvents}</p>
                                        <p className="text-xs text-gray-500 mt-1">{analytics.publishedEvents} published</p>
                                    </div>
                                    <Calendar className="text-primary-600" size={40} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Partners</p>
                                        <p className="text-3xl font-bold text-secondary-600 mt-2">{analytics.totalPartners}</p>
                                        <p className="text-xs text-gray-500 mt-1">Active partnerships</p>
                                    </div>
                                    <Users className="text-secondary-600" size={40} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Support Forms</p>
                                        <p className="text-3xl font-bold text-primary-600 mt-2">{analytics.supportForms.total}</p>
                                        <p className="text-xs text-gray-500 mt-1">{analytics.supportForms.new} new</p>
                                    </div>
                                    <MessageSquare className="text-primary-600" size={40} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">Volunteers</p>
                                        <p className="text-3xl font-bold text-secondary-600 mt-2">{analytics.volunteerApplications.total}</p>
                                        <p className="text-xs text-gray-500 mt-1">{analytics.volunteerApplications.pending} pending</p>
                                    </div>
                                    <Users className="text-secondary-600" size={40} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-heading font-bold mb-4">Support Forms Status</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="text-green-600" size={20} />
                                            <span className="font-medium">Resolved</span>
                                        </div>
                                        <span className="text-2xl font-bold text-green-600">{analytics.supportForms.resolved}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Clock className="text-yellow-600" size={20} />
                                            <span className="font-medium">In Progress</span>
                                        </div>
                                        <span className="text-2xl font-bold text-yellow-600">{analytics.supportForms.inProgress}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-blue-600" size={20} />
                                            <span className="font-medium">New</span>
                                        </div>
                                        <span className="text-2xl font-bold text-blue-600">{analytics.supportForms.new}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-heading font-bold mb-4">Volunteer Applications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="text-green-600" size={20} />
                                            <span className="font-medium">Approved</span>
                                        </div>
                                        <span className="text-2xl font-bold text-green-600">{analytics.volunteerApplications.approved}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Clock className="text-yellow-600" size={20} />
                                            <span className="font-medium">Pending Review</span>
                                        </div>
                                        <span className="text-2xl font-bold text-yellow-600">{analytics.volunteerApplications.pending}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-heading font-bold">Events Management</h2>
                            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                + Create Event
                            </button>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <p className="text-gray-600">Event management interface coming soon...</p>
                        </div>
                    </div>
                )}

                {activeTab === 'forms' && (
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-6">Support Forms</h2>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <p className="text-gray-600">Support forms management interface coming soon...</p>
                        </div>
                    </div>
                )}

                {activeTab === 'volunteers' && (
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-6">Volunteer Applications</h2>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <p className="text-gray-600">Volunteer management interface coming soon...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
