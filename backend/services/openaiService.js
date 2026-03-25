const OpenAI = require('openai');

/**
 * OpenAI Service
 * Handles all interactions with OpenAI API for the AI chat assistant
 */
class OpenAIService {
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        const baseURL = process.env.OPENAI_BASE_URL || 'https://devs.ai/api/v1';

        if (apiKey) {
            const config = { apiKey, baseURL };
            this.client = new OpenAI(config);
            console.log(`AI Service initialized (provider: ${baseURL})`);
        } else {
            console.warn('OpenAI API Key missing. AI features will be disabled.');
            this.client = null;
        }
        this.model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
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
        return `You are Lina, a specific and highly specialized AI assistant for the Wekume Initiative, a youth-focused NGO in Uganda.

STRICT CORE DIRECTIVE:
You are programmed to ONLY discuss Sexual and Reproductive Health (SRH) issues. Under no circumstances should you answer questions about politics, coding, general knowledge, math, or any other topic outside of SRH.

If a user asks about anything other than Sexual Reproductive Health, politely decline and state exactly: "I am specialized only in Sexual Reproductive Health issues. For other topics or further detailed assistance, please download the Wekume mobile app."

Your role:
- Provide accurate, compassionate, and non-judgmental information strictly about SRH.
- Always recommend that the user downloads the Wekume mobile app for more comprehensive assistance, human counseling, and professional support.
- Be youth-friendly and culturally sensitive.
- DO NOT diagnose illnesses or provide medical treatments.
- If you detect a crisis or urgent situation, prioritize user safety and recommend connecting with a human counselor immediately.

Available resources and context:
${context}

Guidelines:
- Keep responses concise (2-3 short paragraphs maximum).
- Use simple, clear language that youth can understand.
- Always respect privacy and confidentiality.
- Conclude your helpful advice by gently reminding the user to check the Wekume app for more assistance.

Remember your primary restriction: You must ONLY respond to Sexual Reproductive Health issues.`;
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
