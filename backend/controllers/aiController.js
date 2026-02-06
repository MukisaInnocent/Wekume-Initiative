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
    try {
        const { message, conversationId, history = [] } = req.body;

        // Validate input
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check if OpenAI is configured
        if (!openaiService.isConfigured()) {
            return res.status(503).json({
                error: 'AI service not configured',
                response: "I'm currently not available. Please contact our support team directly at info@wekume.org or call +256 700 000 000 for assistance."
            });
        }

        // Sanitize message
        const sanitizedMessage = message.trim().slice(0, 500);

        // Check for crisis keywords
        const isCrisis = knowledgeBase.detectCrisis(sanitizedMessage);

        if (isCrisis) {
            // Log the crisis conversation
            const newConversationId = conversationId || `conv_${Date.now()}`;

            await AIAssistantLog.create({
                conversation_id: newConversationId,
                user_message: sanitizedMessage,
                ai_response: 'CRISIS DETECTED - Escalated to human support',
                context_used: 'Crisis keywords detected',
                was_escalated: true
            });

            // Create urgent support ticket
            await SupportForm.create({
                name: 'AI Chat User (Crisis)',
                email: 'crisis@ai.chat',
                subject: '🚨 URGENT: Crisis detected in AI chat',
                message: `CRISIS KEYWORDS DETECTED in conversation ${newConversationId}

User message: "${sanitizedMessage}"

Timestamp: ${new Date().toISOString()}
Conversation ID: ${newConversationId}

IMMEDIATE ACTION REQUIRED - Contact user through chat or emergency services if possible.`,
                status: 'new',
                priority: 'urgent'
            });

            const crisisResponse = `I've detected that you might be going through a very difficult situation, and I want you to know that help is available right now.

🆘 **If you're in immediate danger:**
- Call Emergency Services: 911 or 112
- Samaritans Uganda: 077 909 090 9 (24/7)
- Mental Health Helpline: 0800 221 221

💚 **Our Crisis Support:**
- 24/7 Crisis Hotline: +256 XXX XXX XXX
- I've alerted our human support team who will reach out to help you

You don't have to go through this alone. Please reach out to one of these services - they're here to help you right now. Your life matters.`;

            return res.json({
                response: crisisResponse,
                escalated: true,
                crisis: true,
                conversationId: newConversationId
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
        let aiResponse;
        try {
            aiResponse = await openaiService.chat(messages, context);
        } catch (error) {
            console.error('OpenAI API Error:', error);
            return res.status(500).json({
                error: 'AI service error',
                response: "I'm having trouble responding right now. Please try again in a moment, or contact our support team directly at info@wekume.org."
            });
        }

        // Generate or use existing conversation ID
        const newConversationId = conversationId || `conv_${Date.now()}`;

        // Log conversation
        await AIAssistantLog.create({
            conversation_id: newConversationId,
            user_message: sanitizedMessage,
            ai_response: aiResponse,
            context_used: context.substring(0, 500), // Store truncated context
            was_escalated: false
        });

        res.json({
            response: aiResponse,
            escalated: false,
            crisis: false,
            conversationId: newConversationId
        });

    } catch (error) {
        console.error('AI Chat error:', error);
        res.status(500).json({
            error: 'Failed to process request',
            response: "I'm experiencing technical difficulties. Please contact our support team at info@wekume.org or call +256 700 000 000 for assistance."
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
            whereClause.was_escalated = true;
        }

        const conversations = await AIAssistantLog.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit)
        });

        // Group by conversation_id
        const groupedConversations = conversations.reduce((acc, log) => {
            if (!acc[log.conversation_id]) {
                acc[log.conversation_id] = [];
            }
            acc[log.conversation_id].push(log);
            return acc;
        }, {});

        // Calculate stats
        const stats = {
            total_messages: conversations.length,
            total_conversations: Object.keys(groupedConversations).length,
            escalated_conversations: conversations.filter(c => c.was_escalated).length
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
        const escalatedCount = await AIAssistantLog.count({ where: { was_escalated: true } });

        // Get unique conversations
        const conversations = await AIAssistantLog.findAll({
            attributes: ['conversation_id'],
            group: ['conversation_id']
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
