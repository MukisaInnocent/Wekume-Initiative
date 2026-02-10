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

// ===== SUPPORT FORMS =====
router.get('/support-forms', adminController.getAllSupportForms);
router.put('/support-forms/:id', adminController.updateSupportFormStatus);

// ===== VOLUNTEER APPLICATIONS =====
router.get('/volunteer-applications', adminController.getAllVolunteerApplications);
router.put('/volunteer-applications/:id', adminController.updateVolunteerStatus);

// ===== ANALYTICS =====
router.get('/analytics', adminController.getAnalytics);

// ===== MEDIA =====
const upload = require('../middleware/upload');
router.post('/media/upload', upload.single('file'), adminController.uploadMedia);

module.exports = router;
