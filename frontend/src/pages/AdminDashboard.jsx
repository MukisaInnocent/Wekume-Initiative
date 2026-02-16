import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText, MessageSquare, Calendar, BarChart3, CheckCircle, XCircle, Clock, Edit2, Trash2, Plus, Briefcase, Layout, Image } from 'lucide-react';
import { authAPI, adminAPI, contentAPI } from '../services/api';
import Modal from '../components/Modal';
import EventForm from '../components/forms/EventForm';
import PartnerForm from '../components/forms/PartnerForm';
import ContentSectionForm from '../components/forms/ContentSectionForm';
import ReportForm from '../components/forms/ReportForm';
import MediaLibrary from '../components/MediaLibrary';
import BackgroundManager from '../components/Admin/BackgroundManager';

import TestimonialForm from '../components/forms/TestimonialForm';

function AdminDashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [reports, setReports] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contentSections, setContentSections] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        if (activeTab === 'events') fetchEvents();
        if (activeTab === 'partners') fetchPartners();
        if (activeTab === 'content') fetchContent();
        if (activeTab === 'reports') fetchReports();
        if (activeTab === 'testimonials') fetchTestimonials();
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
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchPartners = async () => {
        try {
            const response = await adminAPI.getAllPartners();
            setPartners(response.data.partners);
        } catch (error) {
            console.error('Error fetching partners:', error);
        }
    };

    const fetchContent = async () => {
        try {
            const response = await contentAPI.getSections();
            setContentSections(response.data.sections);
        } catch (error) {
            console.error("Error fetching content sections:", error);
        }
    };

    const fetchReports = async () => {
        try {
            const response = await contentAPI.getReports();
            setReports(response.data.reports);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const response = await adminAPI.getAllTestimonials();
            setTestimonials(response.data.testimonials);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    // Generic Create/Update Handlers
    const handleCreate = async (apiMethod, formData, fetchMethod) => {
        setActionLoading(true);
        try {
            await apiMethod(formData);
            setIsModalOpen(false);
            fetchMethod();
            fetchAnalytics();
        } catch (error) {
            console.error("Create failed:", error);
            alert("Operation failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdate = async (apiMethod, id, formData, fetchMethod) => {
        setActionLoading(true);
        try {
            await apiMethod(id, formData);
            setIsModalOpen(false);
            setSelectedItem(null);
            fetchMethod();
        } catch (error) {
            console.error("Update failed:", error);
            alert("Operation failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (apiMethod, id, fetchMethod, typeName) => {
        if (!window.confirm(`Are you sure you want to delete this ${typeName}?`)) return;
        try {
            await apiMethod(id);
            fetchMethod();
            fetchAnalytics();
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Delete operation failed");
        }
    };

    // Specific wrappers
    const handleUpdateSection = async (formData) => {
        return handleUpdate(adminAPI.updateSection, formData.key, formData, fetchContent);
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 relative overflow-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float-delayed"></div>

            {/* Top Bar */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg shadow-purple-500/5 sticky top-0 z-50 border-b border-purple-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-wrap justify-between items-center gap-3">
                    <div>
                        <h1 className="text-xl sm:text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Dashboard</h1>
                        <p className="text-xs sm:text-sm text-purple-600/70 font-medium mt-1">Wekume Initiative CMS</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl border border-purple-200/50">
                            <p className="text-xs sm:text-sm font-bold text-gray-900">{user.fullname}</p>
                            <p className="text-xs text-purple-600 capitalize font-medium">{user.role.replace('_', ' ')}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-white bg-gradient-to-r from-red-500 to-pink-600 px-3 sm:px-5 py-2 sm:py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white/70 backdrop-blur-sm border-b border-purple-100/50 sticky top-[73px] z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-2 overflow-x-auto py-3">
                        <button onClick={() => setActiveTab('overview')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'overview' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><BarChart3 className="inline mr-2" size={18} />Overview</button>
                        <button onClick={() => setActiveTab('content')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'content' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><Layout className="inline mr-2" size={18} />Content</button>
                        <button onClick={() => setActiveTab('backgrounds')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'backgrounds' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><Image className="inline mr-2" size={18} />Backgrounds</button>
                        <button onClick={() => setActiveTab('media')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'media' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><FileText className="inline mr-2" size={18} />Media Library</button>
                        <button onClick={() => setActiveTab('events')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'events' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><Calendar className="inline mr-2" size={18} />Events</button>
                        <button onClick={() => setActiveTab('partners')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'partners' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><Briefcase className="inline mr-2" size={18} />Partners</button>
                        <button onClick={() => setActiveTab('testimonials')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'testimonials' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><MessageSquare className="inline mr-2" size={18} />Testimonials</button>
                        <button onClick={() => setActiveTab('reports')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'reports' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><FileText className="inline mr-2" size={18} />Reports</button>
                        <button onClick={() => setActiveTab('forms')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'forms' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><MessageSquare className="inline mr-2" size={18} />Support Forms</button>
                        <button onClick={() => setActiveTab('volunteers')} className={`py-3 px-5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === 'volunteers' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`}><Users className="inline mr-2" size={18} />Volunteers</button>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && analytics && (
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Overview</h2>
                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="group bg-white/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50" onClick={() => setActiveTab('events')}>
                                <div className="flex items-center justify-between"><div><p className="text-purple-600/70 text-sm font-semibold uppercase tracking-wide">Total Events</p><p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.totalEvents}</p><p className="text-xs text-gray-600 mt-2 font-medium">{analytics.publishedEvents} published</p></div><div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Calendar className="text-purple-600" size={36} /></div></div>
                            </div>
                            <div className="group bg-white/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50" onClick={() => setActiveTab('partners')}>
                                <div className="flex items-center justify-between"><div><p className="text-purple-600/70 text-sm font-semibold uppercase tracking-wide">Partners</p><p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.totalPartners}</p><p className="text-xs text-gray-600 mt-2 font-medium">Active partnerships</p></div><div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Briefcase className="text-purple-600" size={36} /></div></div>
                            </div>
                            <div className="group bg-white/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-orange-500/10 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 border border-orange-100/50" onClick={() => setActiveTab('testimonials')}>
                                <div className="flex items-center justify-between"><div><p className="text-orange-600/70 text-sm font-semibold uppercase tracking-wide">Testimonials</p><p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.totalTestimonials}</p><p className="text-xs text-gray-600 mt-2 font-medium">{analytics.approvedTestimonials} approved</p></div><div className="p-4 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><MessageSquare className="text-orange-600" size={36} /></div></div>
                            </div>
                            <div className="group bg-white/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50" onClick={() => setActiveTab('volunteers')}>
                                <div className="flex items-center justify-between"><div><p className="text-purple-600/70 text-sm font-semibold uppercase tracking-wide">Volunteers</p><p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.volunteerApplications.total}</p><p className="text-xs text-gray-600 mt-2 font-medium">{analytics.volunteerApplications.pending} pending</p></div><div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Users className="text-purple-600" size={36} /></div></div>
                            </div>
                        </div>
                        {/* Recent Activity */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-7 border border-purple-100/50">
                                <h3 className="text-xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Support Forms Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50/50 rounded-xl border border-purple-100/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm"><CheckCircle className="text-purple-600" size={22} /></div><span className="font-semibold text-gray-700">Resolved</span></div><span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.supportForms.resolved}</span></div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-pink-50/50 rounded-xl border border-orange-100/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm"><Clock className="text-orange-600" size={22} /></div><span className="font-semibold text-gray-700">In Progress</span></div><span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">{analytics.supportForms.inProgress}</span></div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50/50 rounded-xl border border-purple-100/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm"><FileText className="text-purple-600" size={22} /></div><span className="font-semibold text-gray-700">New</span></div><span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.supportForms.new}</span></div>
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-7 border border-purple-100/50">
                                <h3 className="text-xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Volunteer Applications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50/50 rounded-xl border border-purple-100/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm"><CheckCircle className="text-purple-600" size={22} /></div><span className="font-semibold text-gray-700">Approved</span></div><span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.volunteerApplications.approved}</span></div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-pink-50/50 rounded-xl border border-orange-100/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white rounded-lg shadow-sm"><Clock className="text-orange-600" size={22} /></div><span className="font-semibold text-gray-700">Pending Review</span></div><span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">{analytics.volunteerApplications.pending}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Content Management</h2></div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {contentSections.map(section => (
                                <div key={section.id} className="group bg-white/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="uppercase tracking-wide text-xs text-purple-600 font-bold">{section.key.replace('_', ' ')}</div>
                                            <h3 className="mt-3 text-xl font-bold text-gray-900">{section.section_title}</h3>
                                            <p className="mt-3 text-gray-600 text-sm line-clamp-2">Click edit to manage textual content and configuration.</p>
                                        </div>
                                        <button onClick={() => openModal('edit_content', section)} className="p-3 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors group-hover:scale-110"><Edit2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'backgrounds' && (
                    <BackgroundManager />
                )}

                {activeTab === 'media' && (
                    <div>
                        <MediaLibrary />
                    </div>
                )}

                {activeTab === 'events' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Events Management</h2><button onClick={() => openModal('create_event')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Create Event</button></div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 text-purple-700 uppercase text-xs font-bold border-b border-purple-200/50"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Location</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-purple-100/30">{events.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No events found. Create your first event!</td></tr>) : (events.map((event) => (<tr key={event.id} className="hover:bg-purple-50/30 transition-colors"><td className="px-6 py-4"><div className="font-semibold text-gray-900">{event.title}</div><div className="text-xs text-purple-600 capitalize font-medium">{event.event_type}</div></td><td className="px-6 py-4 text-gray-700 font-medium">{new Date(event.event_date).toLocaleDateString()}</td><td className="px-6 py-4 text-gray-600 text-sm">{event.location}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${event.is_published ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{event.is_published ? 'Published' : 'Draft'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_event', event)} className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteEvent, event.id, fetchEvents, 'event')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'partners' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Partners Management</h2><button onClick={() => openModal('create_partner')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Add Partner</button></div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 text-purple-700 uppercase text-xs font-bold border-b border-purple-200/50"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Website</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-purple-100/30">{partners.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No partners found. Add your first partner!</td></tr>) : (partners.map((partner) => (<tr key={partner.id} className="hover:bg-purple-50/30 transition-colors"><td className="px-6 py-4 hover:text-purple-600 cursor-pointer font-medium" onClick={() => openModal('edit_partner', partner)}><div className="flex items-center gap-3">{partner.logo_url && <img src={partner.logo_url} alt={partner.name} className="h-10 w-10 object-contain rounded-lg border border-purple-100" />}<span className="font-semibold text-gray-900">{partner.name}</span></div></td><td className="px-6 py-4 text-gray-700 capitalize font-medium">{partner.type}</td><td className="px-6 py-4 text-gray-600 text-sm">{partner.website ? <a href={partner.website} target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-800 hover:underline font-medium">Visit Link</a> : '-'}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${partner.is_active ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-red-100 text-red-700'}`}>{partner.is_active ? 'Active' : 'Inactive'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_partner', partner)} className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deletePartner, partner.id, fetchPartners, 'partner')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'testimonials' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">Testimonials Management</h2><button onClick={() => openModal('create_testimonial')} className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Add Testimonial</button></div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-orange-500/10 overflow-hidden border border-orange-100/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-orange-50/80 to-pink-50/50 text-orange-700 uppercase text-xs font-bold border-b border-orange-200/50"><tr><th className="px-6 py-4">Author</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Rating</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-orange-100/30">{testimonials.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No testimonials found.</td></tr>) : (testimonials.map((test) => (<tr key={test.id} className="hover:bg-orange-50/30 transition-colors"><td className="px-6 py-4"><div className="flex items-center gap-3">{test.photo_url && <img src={test.photo_url} alt={test.author_name} className="h-10 w-10 object-cover rounded-full border-2 border-orange-200" />}<div className="font-semibold text-gray-900">{test.author_name}</div></div></td><td className="px-6 py-4 text-gray-700 font-medium">{test.author_role}</td><td className="px-6 py-4 text-gray-700 font-bold">{test.rating}/5</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${test.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{test.is_approved ? 'Approved' : 'Pending'}</span>{test.is_featured && <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Featured</span>}</td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_testimonial', test)} className="text-orange-600 hover:text-orange-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button><button onClick={() => handleDelete(adminAPI.deleteTestimonial, test.id, fetchTestimonials, 'testimonial')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button></td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Reports Management</h2><button onClick={() => openModal('create_report')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Add Report</button></div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 text-purple-700 uppercase text-xs font-bold border-b border-purple-200/50"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Year</th><th className="px-6 py-4">Downloads</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-purple-100/30">{reports.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No reports found. Upload your first report!</td></tr>) : (reports.map((report) => (<tr key={report.id} className="hover:bg-purple-50/30 transition-colors"><td className="px-6 py-4"><div className="font-semibold text-gray-900">{report.title}</div></td><td className="px-6 py-4 text-gray-700 font-medium">{report.year}</td><td className="px-6 py-4 text-gray-700 font-medium">{report.downloads || 0}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${report.is_published ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{report.is_published ? 'Published' : 'Draft'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_report', report)} className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteReport, report.id, fetchReports, 'report')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'forms' && (
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Support Forms</h2>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-8 border border-purple-100/50">
                            <p className="text-gray-600">Support forms management interface coming soon...</p>
                        </div>
                    </div>
                )}

                {activeTab === 'volunteers' && (
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Volunteer Applications</h2>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-8 border border-purple-100/50">
                            <p className="text-gray-600">Volunteer management interface coming soon...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={
                    modalType === 'create_event' ? 'Create New Event' :
                        modalType === 'edit_event' ? 'Edit Event' :
                            modalType === 'create_partner' ? 'Add New Partner' :
                                modalType === 'edit_partner' ? 'Edit Partner' :
                                    modalType === 'create_report' ? 'Add New Report' :
                                        modalType === 'edit_report' ? 'Edit Report' :
                                            modalType === 'create_testimonial' ? 'Add Testimonial' :
                                                modalType === 'edit_testimonial' ? 'Edit Testimonial' :
                                                    modalType === 'edit_content' ? 'Edit Content Section' :
                                                        'Edit Item'
                }
            >
                {(modalType === 'create_event' || modalType === 'edit_event') && (
                    <EventForm
                        event={selectedItem}
                        onSubmit={(data) => modalType === 'create_event' ? handleCreate(adminAPI.createEvent, data, fetchEvents) : handleUpdate(adminAPI.updateEvent, selectedItem.id, data, fetchEvents)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {(modalType === 'create_partner' || modalType === 'edit_partner') && (
                    <PartnerForm
                        partner={selectedItem}
                        onSubmit={(data) => modalType === 'create_partner' ? handleCreate(adminAPI.createPartner, data, fetchPartners) : handleUpdate(adminAPI.updatePartner, selectedItem.id, data, fetchPartners)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {(modalType === 'create_report' || modalType === 'edit_report') && (
                    <ReportForm
                        report={selectedItem}
                        onSubmit={(data) => modalType === 'create_report' ? handleCreate(adminAPI.createReport, data, fetchReports) : handleUpdate(adminAPI.updateReport, selectedItem.id, data, fetchReports)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {(modalType === 'create_testimonial' || modalType === 'edit_testimonial') && (
                    <TestimonialForm
                        testimonial={selectedItem}
                        onSubmit={(data) => modalType === 'create_testimonial' ? handleCreate(adminAPI.createTestimonial, data, fetchTestimonials) : handleUpdate(adminAPI.approveTestimonial, selectedItem.id, data, fetchTestimonials)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {modalType === 'edit_content' && (
                    <ContentSectionForm
                        section={selectedItem}
                        title={`Edit ${selectedItem.section_title}`}
                        onSubmit={handleUpdateSection}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
            </Modal>
        </div>
    );
}

export default AdminDashboard;
