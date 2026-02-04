const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middleware/auth'); // Optional: if we want admin-only access to view

// Public: Create a new donation (pledge/record)
router.post('/', donationController.createDonation);

// Admin: View all donations
router.get('/', authMiddleware, donationController.getAllDonations);

module.exports = router;
