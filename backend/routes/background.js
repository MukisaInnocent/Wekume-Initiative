const express = require('express');
const router = express.Router();
const backgroundController = require('../controllers/backgroundController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

// Public route to get active backgrounds (for Home page)
router.get('/active', backgroundController.getActiveBackgrounds);

// Admin routes (Protected)
router.use(authMiddleware);

// Get all backgrounds (for Admin Dashboard)
router.get('/', roleCheck('super_admin', 'editor'), backgroundController.getAllBackgrounds);

// Upload new background
router.post('/', roleCheck('super_admin', 'editor'), upload.single('image'), backgroundController.uploadBackground);

// Update background (active status, order)
router.put('/:id', roleCheck('super_admin', 'editor'), backgroundController.updateBackground);

// Delete background
router.delete('/:id', roleCheck('super_admin'), backgroundController.deleteBackground);

module.exports = router;
