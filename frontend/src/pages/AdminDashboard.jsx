import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText, MessageSquare, Calendar, BarChart3, CheckCircle, XCircle, Clock, Edit2, Trash2, Plus } from 'lucide-react';
import { authAPI, adminAPI } from '../services/api';
import Modal from '../components/Modal';
import EventForm from '../components/forms/EventForm';

function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'create_event', 'edit_event', etc.
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        if (activeTab === 'events') {
            fetchEvents();
        }
    }, [activeTab]);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        try {
            const userResponse = await authAPI.getProfile();
            setUser(userResponse.data.user);
            fetchAnalytics();
        } catch (error) {
            console.error('Auth error:', error);
            navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const analyticsResponse = await adminAPI.getAnalytics();
            setAnalytics(analyticsResponse.data.stats);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await adminAPI.getAllEvents();
            // adminAPI.getAllEvents needs to be added to api.js if not exists, 
            // currently api.js has getEvents in contentAPI, but admin might have specific endpoint or use same
            // Let's assume we use the one we defined in backend routes: router.get('/events', adminController.getAllEvents);
            // Wait, let's check api.js content again.
            // api.js has contentAPI.getEvents and adminAPI.createEvent/updateEvent/deleteEvent.
            // We should probably add getAllEvents to adminAPI or use contentAPI.getEvents if it returns everything.
            // Backend adminController.getAllEvents returns { events: [...] }
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    // Event Handlers
    const handleCreateEvent = async (formData) => {
        setActionLoading(true);
        try {
            await adminAPI.createEvent(formData);
            setIsModalOpen(false);
            fetchEvents();
            fetchAnalytics(); // Update stats
        } catch (error) {
            console.error('Failed to create event:', error);
            alert('Failed to create event');
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateEvent = async (formData) => {
        setActionLoading(true);
        try {
            await adminAPI.updateEvent(selectedItem.id, formData);
            setIsModalOpen(false);
            setSelectedItem(null);
            fetchEvents();
        } catch (error) {
            console.error('Failed to update event:', error);
            alert('Failed to update event');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            await adminAPI.deleteEvent(id);
            fetchEvents();
            fetchAnalytics();
        } catch (error) {
            console.error('Failed to delete event:', error);
            alert('Failed to delete event');
        }
    };

    const openCreateModal = () => {
        setModalType('create_event');
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (event) => {
        setModalType('edit_event');
        setSelectedItem(event);
        setIsModalOpen(true);
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
                    <div className="flex space-x-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py - 4 px - 2 border - b - 2 font - medium text - sm whitespace - nowrap ${activeTab === 'overview'
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                } `}
                        >
                            <BarChart3 className="inline mr-2" size={18} />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`py - 4 px - 2 border - b - 2 font - medium text - sm whitespace - nowrap ${activeTab === 'events'
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                } `}
                        >
                            <Calendar className="inline mr-2" size={18} />
                            Events
                        </button>
                        <button
                            onClick={() => setActiveTab('forms')}
                            className={`py - 4 px - 2 border - b - 2 font - medium text - sm whitespace - nowrap ${activeTab === 'forms'
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                } `}
                        >
                            <MessageSquare className="inline mr-2" size={18} />
                            Support Forms
                        </button>
                        <button
                            onClick={() => setActiveTab('volunteers')}
                            className={`py - 4 px - 2 border - b - 2 font - medium text - sm whitespace - nowrap ${activeTab === 'volunteers'
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                } `}
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
                            <button
                                onClick={openCreateModal}
                                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                            >
                                <Plus size={20} /> Create Event
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {events.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                    No events found. Create your first event!
                                                </td>
                                            </tr>
                                        ) : (
                                            events.map((event) => (
                                                <tr key={event.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900">{event.title}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{event.event_type}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {new Date(event.event_date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                                        {event.location}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline - flex items - center px - 2.5 py - 0.5 rounded - full text - xs font - medium ${event.is_published
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                            } `}>
                                                            {event.is_published ? 'Published' : 'Draft'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                                                        <button
                                                            onClick={() => openEditModal(event)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        {user.role === 'super_admin' && (
                                                            <button
                                                                onClick={() => handleDeleteEvent(event.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
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

            {/* Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalType === 'create_event' ? 'Create New Event' : 'Edit Event'}
            >
                {(modalType === 'create_event' || modalType === 'edit_event') && (
                    <EventForm
                        event={selectedItem}
                        onSubmit={modalType === 'create_event' ? handleCreateEvent : handleUpdateEvent}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
            </Modal>
        </div>
    );
}

export default AdminDashboard;
