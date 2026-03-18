const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Apply authentication and role check to all admin routes
router.use(authMiddleware);
router.use(roleCheck('super_admin', 'editor'));

// ===== CONTENT SECTIONS =====
router.put('/sections/:key', adminController.updateContentSection);

// ===== EVENTS =====
router.get('/events', adminController.getAllEvents);
router.post('/events', adminController.createEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', roleCheck('super_admin'), adminController.deleteEvent);

// ===== PARTNERS =====
router.get('/partners', adminController.getAllPartners);
router.post('/partners', adminController.createPartner);
router.put('/partners/:id', adminController.updatePartner);
router.delete('/partners/:id', roleCheck('super_admin'), adminController.deletePartner);

// ===== TESTIMONIALS =====
router.get('/testimonials', adminController.getAllTestimonials);
router.post('/testimonials', adminController.createTestimonial);
router.put('/testimonials/:id', adminController.approveTestimonial);
router.delete('/testimonials/:id', roleCheck('super_admin', 'editor'), adminController.deleteTestimonial);

// ===== REPORTS =====
router.get('/reports', adminController.getAllReports);
router.post('/reports', adminController.createReport);
router.put('/reports/:id', adminController.updateReport);
router.delete('/reports/:id', roleCheck('super_admin'), adminController.deleteReport);

// ===== SUPPORT FORMS =====
router.get('/support-forms', adminController.getAllSupportForms);
router.put('/support-forms/:id', adminController.updateSupportFormStatus);

// ===== VOLUNTEER APPLICATIONS =====
router.get('/volunteer-applications', adminController.getAllVolunteerApplications);
router.put('/volunteer-applications/:id', adminController.updateVolunteerStatus);

// ===== ANALYTICS =====
router.get('/analytics', adminController.getAnalytics);

// ===== TEAM MEMBERS =====
router.get('/team', adminController.getAllTeamMembers);
router.post('/team', adminController.createTeamMember);
router.put('/team/:id', adminController.updateTeamMember);
router.delete('/team/:id', roleCheck('super_admin', 'editor'), adminController.deleteTeamMember);

// ===== IMPACT METRICS =====
router.get('/impact-metrics', adminController.getAllImpactMetrics);
router.post('/impact-metrics', adminController.createImpactMetric);
router.put('/impact-metrics/:id', adminController.updateImpactMetric);
router.delete('/impact-metrics/:id', roleCheck('super_admin'), adminController.deleteImpactMetric);

// ===== CONFIGURABLE BLOCKS =====
router.get('/blocks', adminController.getAllConfigurableBlocks);
router.post('/blocks', adminController.createConfigurableBlock);
router.put('/blocks/:id', adminController.updateConfigurableBlock);
router.delete('/blocks/:id', roleCheck('super_admin'), adminController.deleteConfigurableBlock);

// ===== RESOURCES =====
router.get('/resources', adminController.getAllResources);
router.post('/resources', adminController.createResource);
router.put('/resources/:id', adminController.updateResource);
router.delete('/resources/:id', roleCheck('super_admin', 'editor'), adminController.deleteResource);

// ===== MEDIA =====
const upload = require('../middleware/upload');
router.post('/media/upload', upload.single('file'), adminController.uploadMedia);

module.exports = router;
