/**
 * Seed Content Sections
 * Creates initial CMS key-value entries for all editable page content,
 * contact info, and AI assistant settings.
 * 
 * Safe to run multiple times — uses findOrCreate to avoid duplicates.
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize, testConnection } = require('../config/database');
const { ContentSection } = require('../models');

const sections = [
    // ===== HOMEPAGE =====
    { section_key: 'homepage.hero_title', section_title: 'Homepage Hero Title', content_type: 'text', content_text: 'Empowering Youth Through Health & Education', region: 'global' },
    { section_key: 'homepage.hero_subtitle', section_title: 'Homepage Hero Subtitle', content_type: 'text', content_text: 'Wekume Initiative transforms lives by providing access to sexual reproductive health services, mental health support, and skills development for young people in Uganda.', region: 'global' },
    { section_key: 'homepage.mission', section_title: 'Homepage Mission', content_type: 'text', content_text: 'To empower young people with knowledge, skills, and access to sexual reproductive health services and mental health support for a healthier, more informed generation.', region: 'global' },
    { section_key: 'homepage.vision', section_title: 'Homepage Vision', content_type: 'text', content_text: 'A world where every young person has the knowledge and support to make informed decisions about their health and well-being.', region: 'global' },
    { section_key: 'homepage.our_story', section_title: 'Our Story (Homepage)', content_type: 'rich_text', content_text: 'Wekume Initiative was founded with the vision of bridging the gap in sexual reproductive health education and mental health support for youth in Uganda.', region: 'global' },
    { section_key: 'homepage.fund_the_future', section_title: 'Fund the Future', content_type: 'rich_text', content_text: 'Your contribution directly impacts the lives of young people. Help us expand our programs and reach more communities.', region: 'global' },
    { section_key: 'homepage.why_we_exist', section_title: 'Why We Exist', content_type: 'rich_text', content_text: 'In Uganda, young people face significant barriers to accessing accurate health information and support services. Wekume exists to break down these barriers.', region: 'global' },
    { section_key: 'homepage.founder_story', section_title: "Founder's Story", content_type: 'rich_text', content_text: '', region: 'global' },

    // ===== ABOUT PAGE =====
    { section_key: 'about.mission', section_title: 'About – Mission', content_type: 'rich_text', content_text: 'To empower young people with knowledge, skills, and access to sexual reproductive health services and mental health support.', region: 'global' },
    { section_key: 'about.vision', section_title: 'About – Vision', content_type: 'rich_text', content_text: 'A world where every young person has the knowledge and support to make informed decisions about their health and well-being.', region: 'global' },
    { section_key: 'about.objectives', section_title: 'About – Objectives', content_type: 'rich_text', content_text: '', region: 'global' },
    { section_key: 'about.values', section_title: 'About – Values', content_type: 'rich_text', content_text: '', region: 'global' },
    { section_key: 'about.story', section_title: 'About – Our Story', content_type: 'rich_text', content_text: '', region: 'global' },

    // ===== CONTACT INFO =====
    { section_key: 'contact.phone', section_title: 'Contact Phone', content_type: 'text', content_text: '+256 766 344 603', region: 'global' },
    { section_key: 'contact.email', section_title: 'Contact Email', content_type: 'text', content_text: 'admin@wekume.org', region: 'global' },
    { section_key: 'contact.whatsapp', section_title: 'Contact WhatsApp', content_type: 'text', content_text: '+256766344603', region: 'global' },
    { section_key: 'contact.po_box', section_title: 'Contact PO Box', content_type: 'text', content_text: 'PO BOX 180589, Kampala GPO', region: 'ug' },
    { section_key: 'contact.office_address', section_title: 'Office Address (Uganda)', content_type: 'text', content_text: 'Wekume Youth Initiative, Uganda', region: 'ug' },
    { section_key: 'contact.office_address_us', section_title: 'Office Address (USA)', content_type: 'text', content_text: 'Friends of Wekume (US), 4844 North 300 West Ste 300, Provo, Utah 84604, USA', region: 'us' },

    // ===== AI ASSISTANT SETTINGS =====
    { section_key: 'ai.system_prompt', section_title: 'AI System Prompt', content_type: 'rich_text', content_text: `You are Lina, a specific and highly specialized AI assistant for the Wekume Initiative, a youth-focused NGO in Uganda.

STRICT CORE DIRECTIVE:
You are programmed to ONLY discuss Sexual and Reproductive Health (SRH) issues. Under no circumstances should you answer questions about politics, coding, general knowledge, math, or any other topic outside of SRH.

If a user asks about anything other than Sexual Reproductive Health, politely decline and state exactly: "I am specialized only in Sexual Reproductive Health issues. For other topics or further detailed assistance, please download the Wekume mobile app."

Your role:
- Provide accurate, compassionate, and non-judgmental information strictly about SRH.
- Always recommend that the user downloads the Wekume mobile app for more comprehensive assistance, human counseling, and professional support.
- Be youth-friendly and culturally sensitive.
- DO NOT diagnose illnesses or provide medical treatments.
- If you detect a crisis or urgent situation, prioritize user safety and recommend connecting with a human counselor immediately.`, region: 'global' },
    { section_key: 'ai.tone', section_title: 'AI Tone Instructions', content_type: 'text', content_text: 'friendly, youth-focused, compassionate, non-judgmental', region: 'global' },
    { section_key: 'ai.priority_topics', section_title: 'AI Priority Topics', content_type: 'text', content_text: 'SRH, mental health, contraception, STI prevention, puberty, menstrual health, peer support', region: 'global' },
    { section_key: 'ai.response_guidelines', section_title: 'AI Response Guidelines', content_type: 'text', content_text: 'Keep responses concise (2-3 short paragraphs maximum). Use simple, clear language that youth can understand. Always respect privacy and confidentiality.', region: 'global' },
];

async function seed() {
    try {
        await testConnection();
        await sequelize.sync({ alter: true });

        let created = 0;
        let existing = 0;

        for (const section of sections) {
            const [record, wasCreated] = await ContentSection.findOrCreate({
                where: { section_key: section.section_key },
                defaults: section
            });

            if (wasCreated) {
                created++;
                console.log(`  ✅ Created: ${section.section_key}`);
            } else {
                existing++;
                console.log(`  ⏭  Already exists: ${section.section_key}`);
            }
        }

        console.log(`\n🎯 Done! Created: ${created}, Already existed: ${existing}, Total: ${sections.length}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
