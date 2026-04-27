import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Users, FileText, MessageSquare, Calendar, BarChart3, CheckCircle, Clock, Edit2, Trash2, Plus, Briefcase, Layout, Image as ImageIcon, UserCircle, Menu, X, ChevronLeft, Phone, Bot, Save, Upload } from 'lucide-react';
import { authAPI, adminAPI, contentAPI } from '../services/api';
import Modal from '../components/Modal';
import EventForm from '../components/forms/EventForm';
import PartnerForm from '../components/forms/PartnerForm';
import ContentSectionForm from '../components/forms/ContentSectionForm';
import ReportForm from '../components/forms/ReportForm';
import MediaLibrary from '../components/MediaLibrary';
import BackgroundManager from '../components/Admin/BackgroundManager';
import TestimonialForm from '../components/forms/TestimonialForm';
import ThemeToggle from '../components/ThemeToggle';

const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Content', icon: Layout },
    { id: 'contact_info', label: 'Contact Info', icon: Phone },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Bot },
    { id: 'backgrounds', label: 'Backgrounds', icon: ImageIcon },
    { id: 'media', label: 'Media Library', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'partners', label: 'Partners', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'forms', label: 'Support Forms', icon: MessageSquare },
    { id: 'volunteers', label: 'Volunteers', icon: Users },
    { id: 'team', label: 'Team', icon: UserCircle },
];

/* ─── Inline Team Member Form ──────────────────────── */
function TeamMemberFormInline({ member, defaultRegion, onSubmit, onCancel, loading }) {
    const [form, setForm] = useState({
        name: member?.name || '',
        role: member?.role || '',
        department: member?.department || '',
        description: member?.description || '',
        photo_url: member?.photo_url || '',
        date_of_birth: member?.date_of_birth || '',
        contact_email: member?.contact_email || '',
        contact_phone: member?.contact_phone || '',
        social_links: member?.social_links || { linkedin: '', twitter: '', instagram: '' },
        region: member?.region || defaultRegion || 'global',
        display_order: member?.display_order || 0,
        is_active: member?.is_active !== undefined ? member.is_active : true,
    });
    const [uploadError, setUploadError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setForm(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] || {}),
                    [child]: value
                }
            }));
            return;
        }
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...form, display_order: parseInt(form.display_order) || 0 });
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError('File size must be less than 5MB');
            return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            setUploadError(null);
            const res = await adminAPI.uploadMedia(uploadFormData);
            setForm(prev => ({ ...prev, photo_url: res.data.file.url }));
        } catch (error) {
            console.error('Upload failed:', error);
            const errorMsg = error.response?.data?.error || 'Upload failed. Please try again.';
            setUploadError(errorMsg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Role *</label>
                    <input name="role" value={form.role} onChange={handleChange} required placeholder="e.g., CEO, Program Director" className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Department</label>
                    <input name="department" value={form.department} onChange={handleChange} placeholder="e.g., Programs, Outreach, Operations" className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Date of Birth</label>
                    <input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Photo URL</label>
                <div className="flex gap-2">
                    <input name="photo_url" value={form.photo_url} onChange={handleChange} placeholder="Photo URL will appear here..." className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-900/50" readOnly />
                    <div className="relative">
                        <input
                            type="file"
                            id="team_photo"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                        <label
                            htmlFor="team_photo"
                            className="px-4 py-3 bg-purple-100 text-purple-700 rounded-xl cursor-pointer hover:bg-purple-200 flex items-center gap-2 h-[46px]"
                        >
                            <Upload size={18} /> Upload
                        </label>
                    </div>
                </div>
                {uploadError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">{uploadError}</p>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Contact Email</label>
                    <input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} placeholder="name@wekume.org" className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Contact Phone</label>
                    <input name="contact_phone" value={form.contact_phone} onChange={handleChange} placeholder="+256..." className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">LinkedIn</label>
                    <input name="social_links.linkedin" value={form.social_links.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/..." className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Twitter</label>
                    <input name="social_links.twitter" value={form.social_links.twitter || ''} onChange={handleChange} placeholder="https://twitter.com/..." className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Instagram</label>
                    <input name="social_links.instagram" value={form.social_links.instagram || ''} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Region</label>
                    <select name="region" value={form.region} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="global">Global</option>
                        <option value="ug">Uganda</option>
                        <option value="us">USA</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Display Order</label>
                    <input name="display_order" type="number" value={form.display_order} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} className="w-5 h-5 rounded text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Active</span>
                    </label>
                </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:bg-gray-900/50 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50">
                    {loading ? 'Saving…' : (member ? 'Update Member' : 'Add Member')}
                </button>
            </div>
        </form>
    );
}

/* ─── Contact Info Admin Panel ──────────────────────── */
function ContactInfoPanel({ sections, onSave, loading }) {
    const [edits, setEdits] = useState({});
    const [saving, setSaving] = useState({});

    const getValue = (key) => edits[key] !== undefined ? edits[key] : (sections.find(s => s.section_key === key)?.content_text || '');
    const getTitle = (key) => sections.find(s => s.section_key === key)?.section_title || key;

    const handleSave = async (key) => {
        setSaving(prev => ({ ...prev, [key]: true }));
        try {
            await onSave(key, { content_text: getValue(key), section_title: getTitle(key) });
            setEdits(prev => { const n = { ...prev }; delete n[key]; return n; });
        } catch (e) {
            console.error('Save failed:', e);
            alert('Unable to save changes. Please try again.');
        }
        setSaving(prev => ({ ...prev, [key]: false }));
    };

    const fields = [
        { key: 'contact.phone', label: 'Phone Number', placeholder: '+256 766 344 603', icon: '📞' },
        { key: 'contact.email', label: 'Email Address', placeholder: 'admin@wekume.org', icon: '📧' },
        { key: 'contact.whatsapp', label: 'WhatsApp Number', placeholder: '+256766344603', icon: '💬' },
        { key: 'contact.po_box', label: 'PO Box', placeholder: 'PO BOX 180589, Kampala GPO', icon: '📮' },
        { key: 'contact.office_address', label: 'Office Address (Uganda)', placeholder: 'Wekume Youth Initiative, Uganda', icon: '🏢' },
        { key: 'contact.office_address_us', label: 'Office Address (USA)', placeholder: 'Friends of Wekume, Provo, UT', icon: '🇺🇸' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Contact Information</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Edit phone numbers, emails, addresses, and WhatsApp links displayed on the public website.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {fields.map(({ key, label, placeholder, icon }) => {
                    const isDirty = edits[key] !== undefined;
                    return (
                        <div key={key} className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 border border-purple-100/50 dark:border-purple-900/50 p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{icon}</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{label}</h3>
                                    <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">{key}</p>
                                </div>
                            </div>
                            <input
                                value={getValue(key)}
                                onChange={e => setEdits(prev => ({ ...prev, [key]: e.target.value }))}
                                placeholder={placeholder}
                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-100"
                            />
                            {isDirty && (
                                <button onClick={() => handleSave(key)} disabled={saving[key]} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                                    {saving[key] ? 'Saving…' : <><Save size={16} /> Save</>}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── AI Assistant Admin Panel ──────────────────────── */
function AIAssistantPanel({ sections, onSave, loading }) {
    const [edits, setEdits] = useState({});
    const [saving, setSaving] = useState({});

    const getValue = (key) => edits[key] !== undefined ? edits[key] : (sections.find(s => s.section_key === key)?.content_text || '');
    const getTitle = (key) => sections.find(s => s.section_key === key)?.section_title || key;

    const handleSave = async (key) => {
        setSaving(prev => ({ ...prev, [key]: true }));
        try {
            await onSave(key, { content_text: getValue(key), section_title: getTitle(key) });
            setEdits(prev => { const n = { ...prev }; delete n[key]; return n; });
        } catch (e) {
            console.error('Save failed:', e);
            alert('Unable to save changes. Please try again.');
        }
        setSaving(prev => ({ ...prev, [key]: false }));
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Assistant Settings</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Control how Lina (the AI assistant) behaves—define the system prompt, tone, and priority topics.</p>
            </div>

            <div className="space-y-6">
                {/* System Prompt */}
                <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 border border-purple-100/50 dark:border-purple-900/50 p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🤖</span>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">System Prompt</h3>
                            <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">ai.system_prompt — Core behavior instructions</p>
                        </div>
                    </div>
                    <textarea
                        value={getValue('ai.system_prompt')}
                        onChange={e => setEdits(prev => ({ ...prev, 'ai.system_prompt': e.target.value }))}
                        rows={12}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-100 font-mono resize-y"
                        placeholder="You are Lina, an AI assistant for Wekume Initiative..."
                    />
                    {edits['ai.system_prompt'] !== undefined && (
                        <button onClick={() => handleSave('ai.system_prompt')} disabled={saving['ai.system_prompt']} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                            {saving['ai.system_prompt'] ? 'Saving…' : <><Save size={16} /> Save System Prompt</>}
                        </button>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Tone */}
                    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 border border-purple-100/50 dark:border-purple-900/50 p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎭</span>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Tone</h3>
                                <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">ai.tone</p>
                            </div>
                        </div>
                        <input
                            value={getValue('ai.tone')}
                            onChange={e => setEdits(prev => ({ ...prev, 'ai.tone': e.target.value }))}
                            placeholder="friendly, youth-focused, compassionate"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-100"
                        />
                        {edits['ai.tone'] !== undefined && (
                            <button onClick={() => handleSave('ai.tone')} disabled={saving['ai.tone']} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                                {saving['ai.tone'] ? 'Saving…' : <><Save size={16} /> Save</>}
                            </button>
                        )}
                    </div>

                    {/* Priority Topics */}
                    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 border border-purple-100/50 dark:border-purple-900/50 p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📋</span>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Priority Topics</h3>
                                <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">ai.priority_topics</p>
                            </div>
                        </div>
                        <input
                            value={getValue('ai.priority_topics')}
                            onChange={e => setEdits(prev => ({ ...prev, 'ai.priority_topics': e.target.value }))}
                            placeholder="SRH, mental health, contraception"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-100"
                        />
                        {edits['ai.priority_topics'] !== undefined && (
                            <button onClick={() => handleSave('ai.priority_topics')} disabled={saving['ai.priority_topics']} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                                {saving['ai.priority_topics'] ? 'Saving…' : <><Save size={16} /> Save</>}
                            </button>
                        )}
                    </div>
                </div>

                {/* Response Guidelines */}
                <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 border border-purple-100/50 dark:border-purple-900/50 p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📏</span>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Response Guidelines</h3>
                            <p className="text-[10px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">ai.response_guidelines</p>
                        </div>
                    </div>
                    <textarea
                        value={getValue('ai.response_guidelines')}
                        onChange={e => setEdits(prev => ({ ...prev, 'ai.response_guidelines': e.target.value }))}
                        rows={4}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-100 resize-y"
                        placeholder="Keep responses concise..."
                    />
                    {edits['ai.response_guidelines'] !== undefined && (
                        <button onClick={() => handleSave('ai.response_guidelines')} disabled={saving['ai.response_guidelines']} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                            {saving['ai.response_guidelines'] ? 'Saving…' : <><Save size={16} /> Save</>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Content Section Create Form ──────────────────── */
function ContentSectionCreateForm({ onSubmit, onCancel, loading }) {
    const [form, setForm] = useState({
        section_key: '',
        section_title: '',
        content_type: 'text',
        content_text: '',
        region: 'global',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Section Key *</label>
                    <input value={form.section_key} onChange={e => setForm(p => ({ ...p, section_key: e.target.value }))} required placeholder="e.g., homepage.cta_title" className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Section Title *</label>
                    <input value={form.section_title} onChange={e => setForm(p => ({ ...p, section_title: e.target.value }))} required placeholder="e.g., Homepage CTA Title" className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Content Type</label>
                    <select value={form.content_type} onChange={e => setForm(p => ({ ...p, content_type: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white">
                        <option value="text">Text</option>
                        <option value="rich_text">Rich Text</option>
                        <option value="image">Image</option>
                        <option value="list">List</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Region</label>
                    <select value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white">
                        <option value="global">Global</option>
                        <option value="ug">Uganda</option>
                        <option value="us">USA</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Content</label>
                <textarea value={form.content_text} onChange={e => setForm(p => ({ ...p, content_text: e.target.value }))} rows={4} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white resize-y" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50">
                    {loading ? 'Creating…' : 'Create Section'}
                </button>
            </div>
        </form>
    );
}

function AdminDashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [events, setEvents] = useState([]);
    const [partners, setPartners] = useState([]);
    const [reports, setReports] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contentSections, setContentSections] = useState([]);
    const [supportForms, setSupportForms] = useState([]);
    const [volunteerApplications, setVolunteerApplications] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [adminRegion, setAdminRegion] = useState('global'); // 'global', 'ug', or 'us'

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        if (activeTab === 'events') fetchEvents();
        if (activeTab === 'partners') fetchPartners();
        if (activeTab === 'content') fetchContent();
        if (activeTab === 'contact_info') fetchContent();
        if (activeTab === 'ai_assistant') fetchContent();
        if (activeTab === 'reports') fetchReports();
        if (activeTab === 'testimonials') fetchTestimonials();
        if (activeTab === 'forms') fetchSupportForms();
        if (activeTab === 'volunteers') fetchVolunteerApplications();
    }, [activeTab]);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
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
            const response = await adminAPI.getAllContentSections();
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

    const fetchSupportForms = async () => {
        try {
            const response = await adminAPI.getAllSupportForms();
            setSupportForms(response.data.forms);
        } catch (error) {
            console.error("Error fetching support forms:", error);
        }
    };

    const fetchVolunteerApplications = async () => {
        try {
            const response = await adminAPI.getAllVolunteerApplications();
            setVolunteerApplications(response.data.applications);
        } catch (error) {
            console.error("Error fetching volunteer applications:", error);
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const response = await adminAPI.getAllTeamMembers();
            setTeamMembers(response.data.members);
        } catch (error) {
            console.error('Error fetching team members:', error);
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
            alert("Unable to save. Please check your information and try again.");
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
            alert("Unable to update. Please try again.");
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
            alert("Unable to delete. Please try again.");
        }
    };

    // Specific wrappers
    const handleUpdateSection = async (formData) => {
        return handleUpdate(adminAPI.updateContentSection, formData.section_key, formData, fetchContent);
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleUpdateFormStatus = async (id, status) => {
        try {
            await adminAPI.updateSupportFormStatus(id, { status });
            fetchSupportForms();
            fetchAnalytics();
        } catch (error) {
            console.error("Failed to update form status", error);
            alert("Unable to update status. Please try again.");
        }
    };

    const handleUpdateVolunteerStatus = async (id, status) => {
        try {
            await adminAPI.updateVolunteerStatus(id, { status });
            fetchVolunteerApplications();
            fetchAnalytics();
        } catch (error) {
            console.error("Failed to update volunteer status", error);
            alert("Unable to update status. Please try again.");
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center shadow-purple text-white font-black text-2xl">
                        W
                    </div>
                    <div className="absolute -inset-1 rounded-2xl border-2 border-purple-500/30 animate-ping" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium animate-pulse">Loading dashboard…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-purple-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700/60 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-gray-900/30' : (isCollapsed ? '-translate-x-full' : '-translate-x-full lg:translate-x-0')} shadow-lg`}>
                {/* Sidebar Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700/60 group relative">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30 flex-shrink-0">
                            W
                        </div>
                        <div>
                            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight whitespace-nowrap">Wekume CMS</h2>
                            <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest">Admin Dashboard</p>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                    
                    {/* Desktop Hide Toggle */}
                    <button 
                        onClick={() => setIsCollapsed(true)}
                        title="Hide sidebar"
                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-800 border border-purple-200 rounded-full items-center justify-center text-gray-400 hover:text-purple-600 dark:text-purple-400 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <ChevronLeft size={14} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5 nice-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.id === 'team') fetchTeamMembers();
                                    setActiveTab(item.id);
                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all duration-200 group relative ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-400 font-bold shadow-sm border border-purple-100/50 dark:border-purple-900/50' 
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:text-purple-400 font-medium border border-transparent'
                                }`}
                            >
                                <Icon size={20} className={`flex-shrink-0 group-hover:scale-110 transition-transform ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 group-hover:text-purple-500 transition-colors'}`} />
                                <span className="whitespace-nowrap flex-1 text-left">{item.label}</span>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse flex-shrink-0" />}
                            </button>
                        );
                    })}
                </div>

                {/* Sidebar Footer (User Info & Logout) */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-purple-100 rounded-xl mb-3 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 flex items-center justify-center font-bold text-purple-700 flex-shrink-0" title={user?.fullname || 'Admin'}>
                            {user?.fullname?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.fullname}</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium capitalize truncate">{user?.role?.replace('_', ' ')}</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 rounded-xl text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100 px-4 py-2.5"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col min-h-screen relative overflow-x-hidden transition-all duration-300 ${isCollapsed ? 'lg:ml-0' : 'lg:ml-72'}`}>
                {/* Decorative blobs for main area */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40"></div>
                <div className={`fixed bottom-0 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-[100px] pointer-events-none -ml-40 -mb-40 transition-all duration-300 ${isCollapsed ? 'left-0' : 'left-72'}`}></div>

                {/* Topbar for main area */}
                <header className="h-16 sm:h-20 bg-white dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700/60 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => {
                                if (window.innerWidth < 1024) setIsSidebarOpen(true);
                                else setIsCollapsed(false);
                            }}
                            className={`p-2.5 bg-white dark:bg-gray-800 border border-purple-100 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm hover:bg-purple-50 dark:bg-purple-900/20 transition-colors hover:scale-105 active:scale-95 ${!isCollapsed ? 'lg:hidden' : ''}`}
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="text-xl sm:text-2xl font-heading font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent hidden sm:block">
                            {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-gray-800 border border-purple-100 rounded-xl p-1 shadow-sm flex items-center">
                            <span className="pl-3 pr-2 text-xs font-semibold text-gray-400 tracking-wider">REGION</span>
                            <select 
                                value={adminRegion}
                                onChange={(e) => setAdminRegion(e.target.value)}
                                className="bg-transparent text-sm font-bold text-purple-700 outline-none cursor-pointer pr-8 py-1.5 focus:ring-0"
                            >
                                <option value="global">Global</option>
                                <option value="ug">Uganda</option>
                                <option value="us">USA</option>
                            </select>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                {/* Dynamic Content Area with AnimatePresence */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10 nice-scrollbar overflow-y-auto w-full max-w-7xl mx-auto pb-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full h-full"
                        >
                {activeTab === 'overview' && analytics && (
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Overview</h2>
                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50 dark:border-purple-900/50" onClick={() => setActiveTab('events')}>
                                <div className="flex items-center justify-between"><div><p className="text-purple-600 dark:text-purple-400/70 text-sm font-semibold uppercase tracking-wide">Total Events</p><p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.totalEvents}</p><p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium">{analytics.publishedEvents} published</p></div><div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Calendar className="text-purple-600 dark:text-purple-400" size={36} /></div></div>
                            </div>
                            <div className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50 dark:border-purple-900/50" onClick={() => setActiveTab('partners')}>
                                <div className="flex items-center justify-between"><div><p className="text-purple-600 dark:text-purple-400/70 text-sm font-semibold uppercase tracking-wide">Partners</p><p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.totalPartners}</p><p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium">Active partnerships</p></div><div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Briefcase className="text-purple-600 dark:text-purple-400" size={36} /></div></div>
                            </div>
                            <div className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-orange-500/10 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 border border-orange-100/50 dark:border-orange-900/50" onClick={() => setActiveTab('testimonials')}>
                                <div className="flex items-center justify-between"><div><p className="text-orange-600/70 text-sm font-semibold uppercase tracking-wide">Testimonials</p><p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.totalTestimonials}</p><p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium">{analytics.approvedTestimonials} approved</p></div><div className="p-4 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><MessageSquare className="text-orange-600" size={36} /></div></div>
                            </div>
                            <div className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50 dark:border-purple-900/50" onClick={() => setActiveTab('volunteers')}>
                                <div className="flex items-center justify-between"><div><p className="text-purple-600 dark:text-purple-400/70 text-sm font-semibold uppercase tracking-wide">Volunteers</p><p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-3">{analytics.volunteerApplications.total}</p><p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-medium">{analytics.volunteerApplications.pending} pending</p></div><div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl group-hover:scale-110 transition-transform"><Users className="text-purple-600 dark:text-purple-400" size={36} /></div></div>
                            </div>
                        </div>
                        {/* Recent Activity */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-7 border border-purple-100/50 dark:border-purple-900/50">
                                <h3 className="text-xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Support Forms Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100/50 dark:border-purple-900/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><CheckCircle className="text-purple-600 dark:text-purple-400" size={22} /></div><span className="font-semibold text-gray-700 dark:text-gray-200">Resolved</span></div><span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.supportForms.resolved}</span></div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-pink-50/50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl border border-orange-100/50 dark:border-orange-900/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Clock className="text-orange-600" size={22} /></div><span className="font-semibold text-gray-700 dark:text-gray-200">In Progress</span></div><span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">{analytics.supportForms.inProgress}</span></div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100/50 dark:border-purple-900/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><FileText className="text-purple-600 dark:text-purple-400" size={22} /></div><span className="font-semibold text-gray-700 dark:text-gray-200">New</span></div><span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.supportForms.new}</span></div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-7 border border-purple-100/50 dark:border-purple-900/50">
                                <h3 className="text-xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Volunteer Applications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100/50 dark:border-purple-900/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><CheckCircle className="text-purple-600 dark:text-purple-400" size={22} /></div><span className="font-semibold text-gray-700 dark:text-gray-200">Approved</span></div><span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{analytics.volunteerApplications.approved}</span></div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-pink-50/50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl border border-orange-100/50 dark:border-orange-900/50 hover:shadow-md transition-shadow"><div className="flex items-center gap-3"><div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"><Clock className="text-orange-600" size={22} /></div><span className="font-semibold text-gray-700 dark:text-gray-200">Pending Review</span></div><span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">{analytics.volunteerApplications.pending}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Content Management</h2>
                            <div className="flex items-center gap-3">
                                {adminRegion !== 'global' && <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Filtering by: {adminRegion}</span>}
                                <button onClick={() => openModal('create_content_section')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> New Section</button>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {contentSections
                                .filter(s => s.section_key && !s.section_key.startsWith('contact.') && !s.section_key.startsWith('ai.'))
                                .filter(s => adminRegion === 'global' || s.region === 'global' || s.region === adminRegion)
                                .map(section => (
                                <div key={section.id} className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm p-7 rounded-2xl shadow-lg shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 border border-purple-100/50 dark:border-purple-900/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="uppercase tracking-wide text-xs text-purple-600 dark:text-purple-400 font-bold">{section.section_key?.replace('_', ' ')}</div>
                                                <span className="text-[10px] bg-gray-100 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full uppercase">{section.region}</span>
                                            </div>
                                            <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">{section.section_title}</h3>
                                            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{section.content_text || 'Click edit to manage textual content and configuration.'}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => openModal('edit_content', section)} className="p-3 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors group-hover:scale-110"><Edit2 size={20} /></button>
                                            {user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteContentSection, section.id, fetchContent, 'content section')} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"><Trash2 size={18} /></button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'contact_info' && (
                    <ContactInfoPanel sections={contentSections.filter(s => s.section_key && s.section_key.startsWith('contact.'))} onSave={async (key, data) => { await adminAPI.updateContentSection(key, data); fetchContent(); }} loading={actionLoading} />
                )}

                {activeTab === 'ai_assistant' && (
                    <AIAssistantPanel sections={contentSections.filter(s => s.section_key && s.section_key.startsWith('ai.'))} onSave={async (key, data) => { await adminAPI.updateContentSection(key, data); fetchContent(); }} loading={actionLoading} />
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
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50 dark:border-purple-900/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 uppercase text-xs font-bold border-b border-purple-200/50 dark:border-purple-800/50"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Location</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-purple-100/30 dark:divide-purple-900/50">{events.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No events found. Create your first event!</td></tr>) : (events.filter(e => adminRegion === 'global' || e.region === 'global' || e.region === adminRegion).map((event) => (<tr key={event.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"><td className="px-6 py-4"><div className="font-semibold text-gray-900 dark:text-white">{event.title} <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full uppercase">{event.region}</span></div><div className="text-xs text-purple-600 dark:text-purple-400 capitalize font-medium">{event.event_type}</div></td><td className="px-6 py-4 text-gray-700 dark:text-gray-200 font-medium">{new Date(event.event_date).toLocaleDateString()}</td><td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">{event.location}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${event.is_published ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-700 dark:text-gray-200'}`}>{event.is_published ? 'Published' : 'Draft'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_event', event)} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteEvent, event.id, fetchEvents, 'event')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'partners' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Partners Management</h2><button onClick={() => openModal('create_partner')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Add Partner</button></div>
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50 dark:border-purple-900/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 uppercase text-xs font-bold border-b border-purple-200/50 dark:border-purple-800/50"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Website</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-purple-100/30 dark:divide-purple-900/50">{partners.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No partners found. Add your first partner!</td></tr>) : (partners.filter(p => adminRegion === 'global' || p.region === 'global' || p.region === adminRegion).map((partner) => (<tr key={partner.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"><td className="px-6 py-4 hover:text-purple-600 dark:text-purple-400 cursor-pointer font-medium" onClick={() => openModal('edit_partner', partner)}><div className="flex items-center gap-3">{partner.logo_url && <img src={partner.logo_url} alt={partner.name} className="h-10 w-10 object-contain rounded-lg border border-purple-100" />}<span className="font-semibold text-gray-900 dark:text-white">{partner.name} <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full uppercase">{partner.region}</span></span></div></td><td className="px-6 py-4 text-gray-700 dark:text-gray-200 capitalize font-medium">{partner.type}</td><td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">{partner.website ? <a href={partner.website} target="_blank" rel="noreferrer" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 hover:underline font-medium">Visit Link</a> : '-'}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${partner.is_active ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-red-100 text-red-700'}`}>{partner.is_active ? 'Active' : 'Inactive'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_partner', partner)} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deletePartner, partner.id, fetchPartners, 'partner')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'testimonials' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">Testimonials Management</h2><button onClick={() => openModal('create_testimonial')} className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Add Testimonial</button></div>
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-orange-500/10 overflow-hidden border border-orange-100/50 dark:border-orange-900/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-orange-50/80 to-pink-50/50 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-700 dark:text-orange-300 uppercase text-xs font-bold border-b border-orange-200/50 dark:border-orange-800/50"><tr><th className="px-6 py-4">Author</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Rating</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-orange-100/30 dark:divide-orange-900/50">{testimonials.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No testimonials found.</td></tr>) : (testimonials.filter(t => adminRegion === 'global' || t.region === 'global' || t.region === adminRegion).map((test) => (<tr key={test.id} className="hover:bg-orange-50/30 transition-colors"><td className="px-6 py-4"><div className="flex items-center gap-3">{test.photo_url && <img src={test.photo_url} alt={test.author_name} className="h-10 w-10 object-cover rounded-full border-2 border-orange-200" />}<div className="font-semibold text-gray-900 dark:text-white">{test.author_name} <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full uppercase">{test.region}</span></div></div></td><td className="px-6 py-4 text-gray-700 dark:text-gray-200 font-medium">{test.author_role}</td><td className="px-6 py-4 text-gray-700 dark:text-gray-200 font-bold">{test.rating}/5</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${test.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{test.is_approved ? 'Approved' : 'Pending'}</span>{test.is_featured && <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Featured</span>}</td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_testimonial', test)} className="text-orange-600 hover:text-orange-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button><button onClick={() => handleDelete(adminAPI.deleteTestimonial, test.id, fetchTestimonials, 'testimonial')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button></td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Reports Management</h2><button onClick={() => openModal('create_report')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"><Plus size={20} /> Add Report</button></div>
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50 dark:border-purple-900/50"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 uppercase text-xs font-bold border-b border-purple-200/50 dark:border-purple-800/50"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Year</th><th className="px-6 py-4">Downloads</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-purple-100/30 dark:divide-purple-900/50">{reports.length === 0 ? (<tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No reports found. Upload your first report!</td></tr>) : (reports.map((report) => (<tr key={report.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"><td className="px-6 py-4"><div className="font-semibold text-gray-900 dark:text-white">{report.title}</div></td><td className="px-6 py-4 text-gray-700 dark:text-gray-200 font-medium">{report.year}</td><td className="px-6 py-4 text-gray-700 dark:text-gray-200 font-medium">{report.downloads || 0}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${report.is_published ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-700 dark:text-gray-200'}`}>{report.is_published ? 'Published' : 'Draft'}</span></td><td className="px-6 py-4 text-right flex justify-end gap-3"><button onClick={() => openModal('edit_report', report)} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 hover:scale-110 transition-transform" title="Edit"><Edit2 size={18} /></button>{user.role === 'super_admin' && <button onClick={() => handleDelete(adminAPI.deleteReport, report.id, fetchReports, 'report')} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform" title="Delete"><Trash2 size={18} /></button>}</td></tr>)))}</tbody></table></div></div>
                    </div>
                )}

                {activeTab === 'forms' && (
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Support Forms</h2>
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50 dark:border-purple-900/50">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 uppercase text-xs font-bold border-b border-purple-200/50 dark:border-purple-800/50">
                                        <tr>
                                            <th className="px-6 py-4">Name/Email</th>
                                            <th className="px-6 py-4">Subject</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-purple-100/30 dark:divide-purple-900/50">
                                        {supportForms.length === 0 ? (
                                            <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No support forms submitted yet.</td></tr>
                                        ) : (
                                            supportForms.map((form) => (
                                                <tr key={form.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-900 dark:text-white">{form.name}</div>
                                                        <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">{form.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{form.subject}</td>
                                                    <td className="px-6 py-4">
                                                        <select
                                                            value={form.status}
                                                            onChange={(e) => handleUpdateFormStatus(form.id, e.target.value)}
                                                            className={`text-xs font-bold rounded-full px-3 py-1 outline-none appearance-none cursor-pointer ${
                                                                form.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                                form.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            <option value="new">New</option>
                                                            <option value="in_progress">In Progress</option>
                                                            <option value="resolved">Resolved</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(form.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                                                        <button onClick={() => alert(`Message from ${form.name}:\n\n${form.message}`)} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 hover:scale-110 transition-transform bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg text-xs font-bold">View Message</button>
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

                {activeTab === 'volunteers' && (
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Volunteer Applications</h2>
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50 dark:border-purple-900/50">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gradient-to-r from-purple-50/80 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 uppercase text-xs font-bold border-b border-purple-200/50 dark:border-purple-800/50">
                                        <tr>
                                            <th className="px-6 py-4">Applicant</th>
                                            <th className="px-6 py-4">Role / Availability</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-purple-100/30 dark:divide-purple-900/50">
                                        {volunteerApplications.length === 0 ? (
                                            <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No volunteer applications yet.</td></tr>
                                        ) : (
                                            volunteerApplications.map((app) => (
                                                <tr key={app.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-900 dark:text-white">{app.first_name} {app.last_name}</div>
                                                        <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">{app.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">{app.preferred_role?.replace('_', ' ') || 'General'}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{app.availability || 'Not specified'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <select
                                                            value={app.status}
                                                            onChange={(e) => handleUpdateVolunteerStatus(app.id, e.target.value)}
                                                            className={`text-xs font-bold rounded-full px-3 py-1 outline-none appearance-none cursor-pointer ${
                                                                app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="approved">Approved</option>
                                                            <option value="rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(app.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                                                        <button onClick={() => alert(`Experience/Motivation:\n\n${app.experience || app.motivation || 'None provided'}`)} className="text-purple-600 dark:text-purple-400 hover:text-purple-800 hover:scale-110 transition-transform bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg text-xs font-bold">View Details</button>
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

                {/* Team Members Tab */}
                {activeTab === 'team' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Team Members</h2>
                            <button onClick={() => openModal('create_team')} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 font-semibold">
                                <Plus size={20} /> Add Member
                            </button>
                        </div>
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden border border-purple-100/50 dark:border-purple-900/50">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gradient-to-r from-purple-50 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 uppercase text-xs font-bold border-b border-purple-200/50 dark:border-purple-800/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Region</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-purple-100/50">
                                        {teamMembers.length === 0 ? (
                                            <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-400">No team members yet. Click "Add Member" to get started.</td></tr>
                                        ) : (
                                            teamMembers.map((member) => (
                                                <tr key={member.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-purple-700 font-bold overflow-hidden flex-shrink-0">
                                                                {member.photo_url ? <img src={member.photo_url} alt={member.name} className="h-full w-full object-cover" /> : member.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-800 dark:text-gray-100">{member.name}</div>
                                                                {member.description && <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{member.description}</div>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{member.role}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{member.department || '—'}</td>
                                                    <td className="px-6 py-4"><span className="text-xs font-bold uppercase bg-purple-100 dark:bg-purple-900/30 text-purple-700 px-2 py-1 rounded-lg">{member.region}</span></td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${member.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 dark:text-gray-400'}`}>
                                                            {member.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => openModal('edit_team', member)} className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 hover:bg-purple-200 transition-all"><Edit2 size={16} /></button>
                                                            <button onClick={() => handleDelete(adminAPI.deleteTeamMember, member.id, fetchTeamMembers, 'team member')} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"><Trash2 size={16} /></button>
                                                        </div>
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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

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
                                                        modalType === 'create_team' ? 'Add Team Member' :
                                                            modalType === 'edit_team' ? 'Edit Team Member' :
                                                                modalType === 'create_content_section' ? 'Create Content Section' :
                                                                    'Edit Item'
                }
            >
                {(modalType === 'create_event' || modalType === 'edit_event') && (
                    <EventForm
                        event={selectedItem}
                        defaultRegion={adminRegion}
                        onSubmit={(data) => modalType === 'create_event' ? handleCreate(adminAPI.createEvent, data, fetchEvents) : handleUpdate(adminAPI.updateEvent, selectedItem.id, data, fetchEvents)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {(modalType === 'create_partner' || modalType === 'edit_partner') && (
                    <PartnerForm
                        partner={selectedItem}
                        defaultRegion={adminRegion}
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
                        defaultRegion={adminRegion}
                        onSubmit={(data) => modalType === 'create_testimonial' ? handleCreate(adminAPI.createTestimonial, data, fetchTestimonials) : handleUpdate(adminAPI.approveTestimonial, selectedItem.id, data, fetchTestimonials)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {modalType === 'edit_content' && (
                    <ContentSectionForm
                        section={selectedItem}
                        defaultRegion={adminRegion}
                        title={`Edit ${selectedItem?.section_title || 'Section'}`}
                        onSubmit={handleUpdateSection}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {(modalType === 'create_team' || modalType === 'edit_team') && (
                    <TeamMemberFormInline
                        member={selectedItem}
                        defaultRegion={adminRegion}
                        onSubmit={(data) => modalType === 'create_team' ? handleCreate(adminAPI.createTeamMember, data, fetchTeamMembers) : handleUpdate(adminAPI.updateTeamMember, selectedItem.id, data, fetchTeamMembers)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
                {modalType === 'create_content_section' && (
                    <ContentSectionCreateForm
                        onSubmit={(data) => handleCreate(adminAPI.createContentSection, data, fetchContent)}
                        onCancel={() => setIsModalOpen(false)}
                        loading={actionLoading}
                    />
                )}
            </Modal>
        </div>
    );
}

export default AdminDashboard;
