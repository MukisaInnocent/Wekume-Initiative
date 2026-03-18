import axios from 'axios';

// Create axios instance with base configuration
const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_BASE_URL || '/api';

    // If it's a full URL or hostname from Render
    if (url !== '/api') {
        // Add protocol if missing (Render 'host' property doesn't include it)
        if (!url.startsWith('http')) {
            url = `https://${url}`;
        }
        // Add /api suffix if missing
        if (!url.endsWith('/api')) {
            url = `${url}/api`;
        }
    }
    return url;
};

const api = axios.create({
    baseURL: getBaseUrl(),
    timeout: 60000, // 60s — Lina AI responses can take 30-40 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// ===== AUTH API =====

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data) => api.put('/auth/profile', data),
    changePassword: (data) => api.post('/auth/change-password', data)
};

// ===== CONTENT API =====

export const contentAPI = {
    // Content Sections
    getSections: (region) => api.get('/content/sections', { params: { region } }),
    getSection: (key, region) => api.get(`/content/sections/${key}`, { params: { region } }),

    // Partners
    getPartners: (region) => api.get('/content/partners', { params: { region } }),

    // Events
    getEvents: (region) => api.get('/content/events', { params: { region } }),
    getEvent: (id, region) => api.get(`/content/events/${id}`, { params: { region } }),

    // Testimonials
    getTestimonials: (region) => api.get('/content/testimonials', { params: { region } }),

    // New Region Aware Models
    getTeamMembers: (region) => api.get('/content/team', { params: { region } }),
    getImpactMetrics: (region) => api.get('/content/impact-metrics', { params: { region } }),
    getConfigurableBlocks: (region) => api.get('/content/blocks', { params: { region } }),
    getResources: (region) => api.get('/content/resources', { params: { region } }),

    // Reports
    getReports: () => api.get('/content/reports'),
    downloadReport: (id) => api.post(`/content/reports/${id}/download`),

    // Values
    getValues: () => api.get('/content/values'),

    // App Features
    getAppFeatures: () => api.get('/content/app-features'),

    // Social Links
    getSocialLinks: () => api.get('/content/social-links')
};

// ===== FORM API =====

export const formAPI = {
    submitSupport: (data) => api.post('/content/forms/support', data),
    submitVolunteer: (data) => api.post('/content/forms/volunteer', data)
};

// ===== DONATION API =====

export const donationAPI = {
    create: (data) => api.post('/donations', data)
};

// ===== BACKGROUND API =====

export const backgroundAPI = {
    // Background Images (Public)
    getActiveBackgrounds: () => api.get('/backgrounds/active')
};

// ===== ADMIN API (Coming in next phase) =====

export const adminAPI = {
    // Content Sections
    updateContentSection: (key, data) => api.put(`/admin/sections/${key}`, data),

    // Background Images (Admin)
    getAllBackgrounds: () => api.get('/backgrounds'),
    uploadBackground: (formData) => api.post('/backgrounds', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    updateBackground: (id, data) => api.put(`/backgrounds/${id}`, data),
    deleteBackground: (id) => api.delete(`/backgrounds/${id}`),

    // Events
    getAllEvents: () => api.get('/admin/events'),
    createEvent: (data) => api.post('/admin/events', data),
    updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/admin/events/${id}`),

    // Media
    uploadMedia: (formData) => api.post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    // Analytics
    getAnalytics: () => api.get('/admin/analytics'),

    // Partners
    getAllPartners: () => api.get('/admin/partners'),
    createPartner: (data) => api.post('/admin/partners', data),
    updatePartner: (id, data) => api.put(`/admin/partners/${id}`, data),
    deletePartner: (id) => api.delete(`/admin/partners/${id}`),

    // Reports
    updateReport: (id, data) => api.put(`/admin/reports/${id}`, data),
    createReport: (data) => api.post(`/admin/reports`, data),
    deleteReport: (id) => api.delete(`/admin/reports/${id}`),

    // Testimonials
    getAllTestimonials: () => api.get('/admin/testimonials'),
    createTestimonial: (data) => api.post('/admin/testimonials', data),
    approveTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
    deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),

    // Support Forms
    getAllSupportForms: () => api.get('/admin/support-forms'),
    updateSupportFormStatus: (id, data) => api.put(`/admin/support-forms/${id}`, data),

    // Volunteer Applications
    getAllVolunteerApplications: () => api.get('/admin/volunteer-applications'),
    updateVolunteerStatus: (id, data) => api.put(`/admin/volunteer-applications/${id}`, data),
};

// ===== AI ASSISTANT API =====

export const aiAPI = {
    chat: (data) => api.post('/ai/chat', data),
    getConversations: () => api.get('/ai/conversations'),
    getAnalytics: () => api.get('/ai/analytics')
};

export default api;

