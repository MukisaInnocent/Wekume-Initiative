const { AIAssistantLog, SupportForm } = require('../models');
const openaiService = require('../services/openaiService');
const knowledgeBase = require('../services/knowledgeBase');

/**
 * AI Chat Controller
 * Handles chat requests, crisis detection, and escalation
 */

/**
 * Handle chat message from user
 * POST /api/ai/chat
 */
exports.chat = async (req, res) => {
    let logEntry = null;
    const conversationId = req.body.conversationId || `conv_${Date.now()}`;
    
    try {
        const { message, history = [] } = req.body;

        // Validate input
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        const sanitizedMessage = message.trim().slice(0, 500);

        // 1. EAGER LOGGING: Create the log entry immediately
        logEntry = await AIAssistantLog.create({
            session_id: conversationId,
            user_question: sanitizedMessage,
            ai_response: 'Processing...', // Initial state
            topic_category: 'general',
            escalated: false,
            ip_address: req.ip || req.headers['x-forwarded-for'] || '',
            user_agent: req.headers['user-agent'] || ''
        });

        // Check if OpenAI is configured
        if (!openaiService.isConfigured()) {
            const errorMsg = "I'm currently not available. Please contact our support team directly at admin@wekume.org or call +256 766 344 603 for assistance.";
            await logEntry.update({ ai_response: 'ERROR: AI service not configured' });
            
            return res.status(503).json({
                error: 'AI service not configured',
                response: errorMsg
            });
        }

        // Check for crisis keywords
        const isCrisis = knowledgeBase.detectCrisis(sanitizedMessage);

        if (isCrisis) {
            const crisisResponse = `I've detected that you might be going through a very difficult situation, and I want you to know that help is available right now.

🆘 **If you're in immediate danger:**
- Call Emergency Services: 999 or 112
- Mental Health Uganda Helpline: 0800 21 21 21

💚 **Our Crisis Support:**
- 24/7 Crisis Hotline: +256 766 344 603
- I've alerted our human support team who will reach out to help you

You don't have to go through this alone. Please reach out to one of these services - they're here to help you right now. Your life matters.`;

            // Update log with crisis info
            await logEntry.update({
                ai_response: 'CRISIS DETECTED - Escalated to human support',
                escalated: true
            });

            // Create urgent support ticket
            await SupportForm.create({
                name: 'AI Chat User (Crisis)',
                email: 'crisis@ai.chat',
                subject: '🚨 URGENT: Crisis detected in AI chat',
                message: `CRISIS KEYWORDS DETECTED in conversation ${conversationId}

User message: "${sanitizedMessage}"

Timestamp: ${new Date().toISOString()}
Conversation ID: ${conversationId}

IMMEDIATE ACTION REQUIRED - Contact user through chat or emergency services if possible.`,
                status: 'new',
                form_type: 'support'
            });

            return res.json({
                response: crisisResponse,
                escalated: true,
                crisis: true,
                conversationId: conversationId
            });
        }

        // Get relevant context from knowledge base
        const context = knowledgeBase.getRelevantContext(sanitizedMessage);

        // Format message history for OpenAI
        const messages = [
            ...history.slice(-6).map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            { role: 'user', content: sanitizedMessage }
        ];

        // Get AI response
        try {
            const aiResponse = await openaiService.chat(messages, context);
            
            // Update log with real response
            await logEntry.update({
                ai_response: aiResponse
            });

            res.json({
                response: aiResponse,
                escalated: false,
                crisis: false,
                conversationId: conversationId
            });
        } catch (error) {
            console.error('OpenAI API Error:', error);
            const errorMsg = "I'm having trouble responding right now. Please try again in a moment, or contact our support team directly at admin@wekume.org.";
            
            // Update log with error state
            if (logEntry) {
                await logEntry.update({ ai_response: `ERROR: ${error.message}` });
            }

            return res.status(500).json({
                error: 'AI service error',
                response: errorMsg
            });
        }

    } catch (error) {
        console.error('AI Chat error:', error);
        
        // Final fallback to update log if it exists
        if (logEntry) {
            await logEntry.update({ ai_response: `FATAL ERROR: ${error.message}` });
        }

        res.status(500).json({
            error: 'Failed to process request',
            response: "I'm experiencing technical difficulties. Please contact our support team at admin@wekume.org or call +256 766 344 603 for assistance."
        });
    }
};

/**
 * Get all AI conversations (Admin only)
 * GET /api/ai/conversations
 */
exports.getConversations = async (req, res) => {
    try {
        const { limit = 100, escalated } = req.query;

        const whereClause = {};
        if (escalated === 'true') {
            whereClause.escalated = true;
        }

        const conversations = await AIAssistantLog.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit)
        });

        // Group by conversation_id
        const groupedConversations = conversations.reduce((acc, log) => {
            if (!acc[log.session_id]) {
                acc[log.session_id] = [];
            }
            acc[log.session_id].push(log);
            return acc;
        }, {});

        // Calculate stats
        const stats = {
            total_messages: conversations.length,
            total_conversations: Object.keys(groupedConversations).length,
            escalated_conversations: conversations.filter(c => c.escalated).length
        };

        res.json({
            conversations: groupedConversations,
            stats
        });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
};

/**
 * Get analytics for AI assistant usage (Admin only)
 * GET /api/ai/analytics
 */
exports.getAnalytics = async (req, res) => {
    try {
        const totalMessages = await AIAssistantLog.count();
        const escalatedCount = await AIAssistantLog.count({ where: { escalated: true } });

        // Get unique conversations
        const conversations = await AIAssistantLog.findAll({
            attributes: ['session_id'],
            group: ['session_id']
        });

        const stats = {
            total_messages: totalMessages,
            total_conversations: conversations.length,
            escalated_conversations: escalatedCount,
            escalation_rate: totalMessages > 0 ? ((escalatedCount / totalMessages) * 100).toFixed(2) + '%' : '0%'
        };

        res.json({ stats });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

module.exports = exports;
