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
import MediaLibrary from '../components/MediaLibrary';

function AdminDashboard() {
    const navigate = useNavigate();
    // ... state declarations ...
    const [activeTab, setActiveTab] = useState('overview');
    // ...

    // ... (keep useEffects and logic) ...

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar ... */}
            <div className="bg-white shadow-md">
                {/* ... */}
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        <button onClick={() => setActiveTab('overview')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><BarChart3 className="inline mr-2" size={18} />Overview</button>
                        <button onClick={() => setActiveTab('content')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'content' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Layout className="inline mr-2" size={18} />Content</button>
                        <button onClick={() => setActiveTab('media')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'media' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Image className="inline mr-2" size={18} />Media</button>
                        <button onClick={() => setActiveTab('events')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'events' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Calendar className="inline mr-2" size={18} />Events</button>
                        {/* ... other buttons ... */}
                        <button onClick={() => setActiveTab('partners')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'partners' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Briefcase className="inline mr-2" size={18} />Partners</button>
                        <button onClick={() => setActiveTab('reports')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'reports' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><FileText className="inline mr-2" size={18} />Reports</button>
                        <button onClick={() => setActiveTab('forms')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'forms' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><MessageSquare className="inline mr-2" size={18} />Support Forms</button>
                        <button onClick={() => setActiveTab('volunteers')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'volunteers' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Users className="inline mr-2" size={18} />Volunteers</button>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && analytics && (
                    // ... (keep overview content) ...
                    // Just referencing variable to ensure not deleted, but using block replace or standard replace is hard with huge file.
                    // I will use replace_file_content with targeted chunks to insert MediaLibrary.
                    // This huge block replacement is risky. I will cancel this and do targeted.
                    <div></div> // Dummy to close logic here
                )}
            </div>
        </div>
    );
}
const navigate = useNavigate();
const [user, setUser] = useState(null);
const [analytics, setAnalytics] = useState(null);
const [events, setEvents] = useState([]);
const [partners, setPartners] = useState([]);
const [reports, setReports] = useState([]);
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
        // Filter to only show editable sections if needed, or show all
        setContentSections(response.data.sections);
    } catch (error) {
        console.error("Error fetching content sections:", error);
    }
};

const fetchReports = async () => {
    try {
        const response = await contentAPI.getReports(); // Backend likely has public endpoint, ideally admin endpoint needed for all
        setReports(response.data.reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
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
        await apiMethod(id, formData); // Some methods might take (key, data) instead of (id, data)
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

// Specific wrappers to match signature
const handleUpdateSection = async (formData) => {
    // formData contains the full section object with updated content
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
                    <button onClick={() => setActiveTab('overview')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><BarChart3 className="inline mr-2" size={18} />Overview</button>
                    <button onClick={() => setActiveTab('content')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'content' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Layout className="inline mr-2" size={18} />Content</button>
                    <button onClick={() => setActiveTab('media')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'media' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><FileText className="inline mr-2" size={18} />Media</button>
                    <button onClick={() => setActiveTab('events')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'events' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Calendar className="inline mr-2" size={18} />Events</button>
                    <button onClick={() => setActiveTab('partners')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'partners' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Briefcase className="inline mr-2" size={18} />Partners</button>
                    <button onClick={() => setActiveTab('reports')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'reports' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><FileText className="inline mr-2" size={18} />Reports</button>
                    <button onClick={() => setActiveTab('forms')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'forms' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><MessageSquare className="inline mr-2" size={18} />Support Forms</button>
                    <button onClick={() => setActiveTab('volunteers')} className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'volunteers' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}><Users className="inline mr-2" size={18} />Volunteers</button>
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
                        <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('events')}>
                            <div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm font-medium">Total Events</p><p className="text-3xl font-bold text-primary-600 mt-2">{analytics.totalEvents}</p><p className="text-xs text-gray-500 mt-1">{analytics.publishedEvents} published</p></div><Calendar className="text-primary-600" size={40} /></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('partners')}>
                            <div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm font-medium">Partners</p><p className="text-3xl font-bold text-secondary-600 mt-2">{analytics.totalPartners}</p><p className="text-xs text-gray-500 mt-1">Active partnerships</p></div><Briefcase className="text-secondary-600" size={40} /></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('forms')}>
                            <div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm font-medium">Support Forms</p><p className="text-3xl font-bold text-primary-600 mt-2">{analytics.supportForms.total}</p><p className="text-xs text-gray-500 mt-1">{analytics.supportForms.new} new</p></div><MessageSquare className="text-primary-600" size={40} /></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('volunteers')}>
                            <div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm font-medium">Volunteers</p><p className="text-3xl font-bold text-secondary-600 mt-2">{analytics.volunteerApplications.total}</p><p className="text-xs text-gray-500 mt-1">{analytics.volunteerApplications.pending} pending</p></div><Users className="text-secondary-600" size={40} /></div>
                        </div>
                    </div>
                    {/* Recent Activity */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-heading font-bold mb-4">Support Forms Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><div className="flex items-center gap-3"><CheckCircle className="text-green-600" size={20} /><span className="font-medium">Resolved</span></div><span className="text-2xl font-bold text-green-600">{analytics.supportForms.resolved}</span></div>
                                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"><div className="flex items-center gap-3"><Clock className="text-yellow-600" size={20} /><span className="font-medium">In Progress</span></div><span className="text-2xl font-bold text-yellow-600">{analytics.supportForms.inProgress}</span></div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"><div className="flex items-center gap-3"><FileText className="text-blue-600" size={20} /><span className="font-medium">New</span></div><span className="text-2xl font-bold text-blue-600">{analytics.supportForms.new}</span></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-heading font-bold mb-4">Volunteer Applications</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><div className="flex items-center gap-3"><CheckCircle className="text-green-600" size={20} /><span className="font-medium">Approved</span></div><span className="text-2xl font-bold text-green-600">{analytics.volunteerApplications.approved}</span></div>
                                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"><div className="flex items-center gap-3"><Clock className="text-yellow-600" size={20} /><span className="font-medium">Pending Review</span></div><span className="text-2xl font-bold text-yellow-600">{analytics.volunteerApplications.pending}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'content' && (
                <div>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-heading font-bold">Content Management</h2></div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {contentSections.map(section => (
                            <div key={section.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">{section.key.replace('_', ' ')}</div>
                                        <h3 className="mt-2 text-xl font-bold text-gray-900">{section.section_title}</h3>
                                        <p className="mt-2 text-gray-500 text-sm line-clamp-2">Click edit to manage textual content and configuration.</p>
                                    </div>
                                    <button onClick={() => openModal('edit_content', section)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'media' && (
                <div>
                    <MediaLibrary />
                </div>
            )}

            {activeTab === 'events' && (
                <div>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-heading font-bold">Events Management</h2><button onClick={() => openModal('create_event')} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"><Plus size={20} /> Create Event</button></div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Location</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{events.length === 0 ? (<tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No events found. Create your first event!</td></tr>) : (events.map((event) => (<tr key={event.id} className="hover:bg-gray-50"><td className="px-6 py-4"><div className="font-medium text-gray-900">{event.title}</div><div className="text-xs text-gray-500 capitalize">{event.event_type}</div></td><td className="px-6 py-4 text-gray-600">{new Date(event.event_date).toLocaleDateString()}</td><td className="px-6 py-4 text-gray-600 text-sm">{event.location}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{event.is_published ? 'Published' : 'Draft'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_event', event)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteEvent, event.id, fetchEvents, 'event')} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                </div>
            )}

            {activeTab === 'partners' && (
                <div>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-heading font-bold">Partners Management</h2><button onClick={() => openModal('create_partner')} className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center gap-2"><Plus size={20} /> Add Partner</button></div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Website</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{partners.length === 0 ? (<tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No partners found. Add your first partner!</td></tr>) : (partners.map((partner) => (<tr key={partner.id} className="hover:bg-gray-50"><td className="px-6 py-4 hover:text-primary-600 cursor-pointer" onClick={() => openModal('edit_partner', partner)}><div className="flex items-center gap-3">{partner.logo_url && <img src={partner.logo_url} alt={partner.name} className="h-8 w-8 object-contain rounded" />}<span className="font-medium text-gray-900">{partner.name}</span></div></td><td className="px-6 py-4 text-gray-600 capitalize">{partner.type}</td><td className="px-6 py-4 text-gray-600 text-sm">{partner.website ? <a href={partner.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Visit Link</a> : '-'}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${partner.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{partner.is_active ? 'Active' : 'Inactive'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_partner', partner)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deletePartner, partner.id, fetchPartners, 'partner')} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                </div>
            )}

            {activeTab === 'reports' && (
                <div>
                    <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-heading font-bold">Reports Management</h2><button onClick={() => openModal('create_report')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"><Plus size={20} /> Add Report</button></div>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Year</th><th className="px-6 py-4">Downloads</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{reports.length === 0 ? (<tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No reports found. Upload your first report!</td></tr>) : (reports.map((report) => (<tr key={report.id} className="hover:bg-gray-50"><td className="px-6 py-4"><div className="font-medium text-gray-900">{report.title}</div></td><td className="px-6 py-4 text-gray-600">{report.year}</td><td className="px-6 py-4 text-gray-600">{report.downloads || 0}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{report.is_published ? 'Published' : 'Draft'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_report', report)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteReport, report.id, fetchReports, 'report')} className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
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
            title={
                modalType === 'create_event' ? 'Create New Event' :
                    modalType === 'edit_event' ? 'Edit Event' :
                        modalType === 'create_partner' ? 'Add New Partner' :
                            modalType === 'edit_partner' ? 'Edit Partner' :
                                modalType === 'create_report' ? 'Add New Report' :
                                    modalType === 'edit_report' ? 'Edit Report' :
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
