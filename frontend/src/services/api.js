import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: '/api', // Use relative path to leverage Vite proxy (bypasses CORS)
    timeout: 10000,
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
    getSections: () => api.get('/content/sections'),
    getSection: (key) => api.get(`/content/sections/${key}`),

    // Partners
    getPartners: () => api.get('/content/partners'),

    // Events
    getEvents: () => api.get('/content/events'),
    getEvent: (id) => api.get(`/content/events/${id}`),

    // Testimonials
    getTestimonials: () => api.get('/content/testimonials'),

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

// ===== ADMIN API (Coming in next phase) =====

export const adminAPI = {
    // Content Management
    updateSection: (key, data) => api.put(`/admin/sections/${key}`, data),
    createEvent: (data) => api.post('/admin/events', data),
    updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/admin/events/${id}`),

    // Media
    uploadMedia: (formData) => api.post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    // Analytics
    getAnalytics: () => api.get('/admin/analytics'),

    // Events (Full Management)
    getAllEvents: () => api.get('/admin/events'),

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

