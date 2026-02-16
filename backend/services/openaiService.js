const OpenAI = require('openai');

/**
 * OpenAI Service
 * Handles all interactions with OpenAI API for the AI chat assistant
 */
class OpenAIService {
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (apiKey) {
            this.client = new OpenAI({ apiKey });
        } else {
            console.warn('OpenAI API Key missing. AI features will be disabled.');
            this.client = null;
        }
        this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
    }

    /**
     * Send a chat message and get AI response
     * @param {Array} messages - Array of message objects with role and content
     * @param {String} context - Additional context for the AI
     * @returns {String} AI response
     */
    async chat(messages, context = '') {
        try {
            if (!this.client) {
                return "I'm sorry, I cannot answer questions right now because my AI brain (OpenAI API) is not configured.";
            }

            const systemPrompt = this.buildSystemPrompt(context);

            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to get AI response');
        }
    }

    /**
     * Build the system prompt with context
     * @param {String} context - Relevant context from knowledge base
     * @returns {String} Complete system prompt
     */
    buildSystemPrompt(context) {
        return `You are a helpful AI assistant for Wekume Initiative, a youth-focused NGO in Uganda providing services in Sexual Reproductive Health (SRH), mental health support, and community development.

Your role:
- Provide accurate, compassionate information about SRH and mental health
- Share information about Wekume Initiative programs and services
- Be youth-friendly, non-judgmental, and culturally sensitive
- Use simple, relatable language appropriate for young people
- If you detect a crisis or urgent situation, recommend connecting with a human counselor immediately
- Always prioritize user safety and well-being

Available resources and context:
${context}

Guidelines:
- Keep responses concise (2-3 short paragraphs maximum)
- Use simple, clear language that youth can understand
- Provide actionable advice when appropriate
- Be empathetic and non-judgmental
- Always respect privacy and confidentiality
- If you don't know something, admit it and suggest contacting the team directly
- For serious medical or mental health issues, always recommend professional help

Remember: You're here to inform and support, not to diagnose or provide medical treatment.`;
    }

    /**
     * Check if OpenAI API is properly configured
     * @returns {Boolean}
     */
    isConfigured() {
        return !!process.env.OPENAI_API_KEY;
    }
}

module.exports = new OpenAIService();
