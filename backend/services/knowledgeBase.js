/**
 * Knowledge Base Service
 * Manages domain-specific knowledge for SRH, mental health, and Wekume Initiative services
 * Provides context to the AI and detects crisis situations
 */

const knowledgeBase = {
    srh: {
        contraception: `Wekume Initiative provides comprehensive education on various contraceptive methods including:
- Condoms (male and female)
- Oral contraceptives (the pill)
- Injectable contraceptives
- IUDs (intrauterine devices)
- Emergency contraception
- Natural family planning methods

We offer free counseling sessions where you can learn about each method, their effectiveness, side effects, and which might be best for you. Our services are confidential and judgment-free.`,

        std_prevention: `STI/STD Prevention and Testing Services:
- Free STI testing available at our health centers
- Education on safe sex practices
- Condom distribution programs
- Partner notification services (confidential)
- Treatment referrals for positive cases

Common STIs we educate about: HIV/AIDS, Chlamydia, Gonorrhea, Syphilis, HPV, Herpes. Prevention is key - use protection and get tested regularly if sexually active.`,

        reproductive_health: `Comprehensive Reproductive Health Services:
- Pregnancy testing and counseling
- Antenatal and postnatal care support
- Menstrual health education
- Puberty and body changes information
- Gender and sexuality education
- Referrals to healthcare providers

All our services are youth-friendly, private, and confidential. We provide accurate, medically-sound information to help you make informed decisions about your body and health.`
    },

    mentalHealth: {
        counseling: `Free Mental Health Counseling Services:
- One-on-one counseling sessions with trained counselors
- Group therapy sessions
- Stress and anxiety management
- Depression support
- Self-esteem and confidence building
- Relationship counseling
- Family conflict resolution

Our counselors are trained to work with young people and understand the unique challenges you face. Sessions are completely confidential. You can walk in or book an appointment.`,

        crisis_support: `24/7 Crisis Support:
If you or someone you know is in crisis, help is available:
- Crisis Hotline: +256 XXX XXX XXX (24/7)
- Emergency Services: 911 or 112
- Samaritans Uganda: 077 909 090 9
- Mental Health Helpline: 0800 221 221

You're not alone. Reaching out for help is a sign of strength, not weakness. Our crisis counselors are available anytime to listen and support you.`,

        peer_support: `Youth Peer Support Groups:
- Weekly peer support group meetings
- Safe space to share experiences
- Learn from others facing similar challenges
- Build friendships and community
- Facilitated by trained peer educators

Meetings every Tuesday and Thursday at 5 PM at our youth centers in Kampala, Wakiso, and Mukono. Drop-ins welcome, no registration needed. Everything shared in the group stays confidential.`
    },

    services: {
        programs: `Wekume Initiative Programs:

1. **Sexual Reproductive Health (SRH) Program**
   - Contraceptive education and access
   - STI testing and prevention
   - Pregnancy support
   - Menstrual health education

2. **Mental Health Support Program**
   - Free counseling services
   - Peer support groups
   - Wellness workshops
   - Crisis intervention

3. **Skills Development Program**
   - Life skills training
   - Entrepreneurship workshops
   - Computer literacy classes
   - Leadership development

4. **Community Outreach**
   - School programs
   - Community health days
   - Awareness campaigns
   - Mobile clinics

All programs are FREE for youth ages 10-24. No ID or parental consent required for most services.`,

        locations: `Find Us:

**Main Office (Kampala)**
- Address: Plot 123, Kampala Road, Kampala
- Hours: Monday-Friday 9 AM - 5 PM, Saturday 10 AM - 2 PM
- Phone: +256 700 000 000

**Youth Centers:**
- Kampala Youth Center - Open Daily 2 PM - 8 PM
- Wakiso Youth Hub - Tuesday, Thursday, Saturday 3 PM - 7 PM  
- Mukono Community Center - Wednesday, Friday 4 PM - 7 PM

**Mobile Clinics:**
- Visit schools and communities - Check our website for schedule
- WhatsApp us for the next location near you: +256 700 000 001`,

        contact: `Contact Wekume Initiative:

- **General Inquiries:** info@wekume.org
- **Phone:** +256 700 000 000
- **WhatsApp:** +256 700 000 001
- **Crisis Hotline:** +256 XXX XXX XXX (24/7)
- **Website:** www.wekume.org
- **Social Media:**
  - Facebook: @WekumeInitiative
  - Instagram: @wekume_ug
  - Twitter: @WekumeUG
  - TikTok: @wekume.initiative

You can also reach us through this chat for immediate questions!`
    },

    // Keywords that indicate a crisis situation requiring immediate escalation
    crisisKeywords: [
        'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
        'hurt myself', 'self harm', 'cutting', 'self-harm',
        'abuse', 'being abused', 'violence', 'violent', 'hitting me',
        'rape', 'raped', 'sexual assault', 'assaulted', 'molested',
        'emergency', 'urgent help', 'immediate help',
        'planning to', 'going to kill', 'thoughts of dying'
    ],

    // Topics for context matching
    topics: {
        srh: ['contraceptive', 'contraception', 'pregnancy', 'pregnant', 'std', 'sti', 'hiv', 'aids',
            'condom', 'birth control', 'sex', 'sexual health', 'period', 'menstruation', 'testing'],
        mentalHealth: ['mental', 'depression', 'depressed', 'anxiety', 'anxious', 'stress', 'stressed',
            'counseling', 'therapy', 'sad', 'lonely', 'worried', 'fear', 'scared', 'overwhelmed'],
        programs: ['program', 'service', 'join', 'participate', 'volunteer', 'skills', 'training', 'workshop'],
        location: ['where', 'location', 'address', 'office', 'center', 'hours', 'time', 'when open'],
        contact: ['contact', 'reach', 'phone', 'email', 'whatsapp', 'call', 'message']
    }
};

class KnowledgeBaseService {
    /**
     * Get relevant context based on user message
     * @param {String} userMessage - The user's message
     * @returns {String} Relevant context for AI
     */
    getRelevantContext(userMessage) {
        const message = userMessage.toLowerCase();
        let context = [];

        // Check for SRH topics
        if (this.matchesTopics(message, knowledgeBase.topics.srh)) {
            context.push(knowledgeBase.srh.contraception);
            context.push(knowledgeBase.srh.std_prevention);
            context.push(knowledgeBase.srh.reproductive_health);
        }

        // Check for mental health topics
        if (this.matchesTopics(message, knowledgeBase.topics.mentalHealth)) {
            context.push(knowledgeBase.mentalHealth.counseling);
            context.push(knowledgeBase.mentalHealth.peer_support);
        }

        // Check for program inquiries
        if (this.matchesTopics(message, knowledgeBase.topics.programs)) {
            context.push(knowledgeBase.services.programs);
        }

        // Check for location inquiries
        if (this.matchesTopics(message, knowledgeBase.topics.location)) {
            context.push(knowledgeBase.services.locations);
        }

        // Check for contact inquiries
        if (this.matchesTopics(message, knowledgeBase.topics.contact)) {
            context.push(knowledgeBase.services.contact);
        }

        // If no specific context, provide general overview
        if (context.length === 0) {
            context.push(knowledgeBase.services.programs);
            context.push(knowledgeBase.services.contact);
        }

        return context.join('\n\n');
    }

    /**
     * Detect crisis situations that require immediate escalation
     * @param {String} message - The user's message
     * @returns {Boolean} True if crisis detected
     */
    detectCrisis(message) {
        const lowerMessage = message.toLowerCase();
        return knowledgeBase.crisisKeywords.some(keyword =>
            lowerMessage.includes(keyword)
        );
    }

    /**
     * Check if message matches any topic keywords
     * @param {String} message - User message in lowercase
     * @param {Array} keywords - Array of keywords to match
     * @returns {Boolean}
     */
    matchesTopics(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    /**
     * Get crisis support information
     * @returns {String} Crisis support resources
     */
    getCrisisSupportInfo() {
        return knowledgeBase.mentalHealth.crisis_support;
    }
}

module.exports = new KnowledgeBaseService();
