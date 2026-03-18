const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// Public: Chat with AI assistant
router.post('/chat', aiController.chat);

// Admin: View all AI conversations
router.get('/conversations', authMiddleware, aiController.getConversations);

// Admin: Get AI analytics
router.get('/analytics', authMiddleware, aiController.getAnalytics);

module.exports = router;
