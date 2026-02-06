const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middleware/auth');

// Public: Create a new donation
router.post('/', donationController.createDonation);

// Admin: View all donations with optional filters
router.get('/', authMiddleware, donationController.getAllDonations);

// Admin: Get single donation by ID
router.get('/:id', authMiddleware, donationController.getDonation);

// Admin: Update donation status (pending, completed, failed)
router.patch('/:id/status', authMiddleware, donationController.updateDonationStatus);

module.exports = router;
