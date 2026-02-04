const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const formController = require('../controllers/formController');

// ===== PUBLIC CONTENT ROUTES =====

// Content Sections
router.get('/sections', contentController.getAllContentSections);
router.get('/sections/:key', contentController.getContentSection);

// Partners
router.get('/partners', contentController.getAllPartners);

// Events
router.get('/events', contentController.getPublishedEvents);
router.get('/events/:id', contentController.getEventById);

// Testimonials
router.get('/testimonials', contentController.getApprovedTestimonials);

// Reports
router.get('/reports', contentController.getPublishedReports);
router.post('/reports/:id/download', contentController.downloadReport);

// Values
router.get('/values', contentController.getActiveValues);

// Wekume App Features
router.get('/app-features', contentController.getAppFeatures);

// Social Links
router.get('/social-links', contentController.getSocialLinks);

// ===== FORM SUBMISSIONS =====

// Support/Contact forms
router.post('/forms/support', formController.submitSupportForm);

// Volunteer applications
router.post('/forms/volunteer', formController.submitVolunteerApplication);

module.exports = router;
