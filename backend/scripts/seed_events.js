const { sequelize } = require('../config/database');
const models = require('../models');

async function seedEvents() {
    console.log('🌱 Seeding sample Events...');
    try {
        await sequelize.authenticate();
        
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const inTwoMonths = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

        await models.Event.bulkCreate([
            { 
                title: 'Youth Sexual Health Webinar', 
                description: 'Join us for an interactive digital session discussing sexual rights and reproductive health directly from health experts.', 
                event_type: 'webinar',
                event_date: nextWeek,
                location: 'Online (Zoom)',
                is_published: true,
                region: 'global'
            },
            { 
                title: 'Community Outreach Kampala', 
                description: 'We are bringing educational materials, free testing, and medical professionals to the heart of Kampala for a 2-day awareness campaign.', 
                event_type: 'outreach',
                event_date: nextMonth,
                location: 'Kampala, Uganda',
                is_published: true,
                region: 'ug'
            },
            { 
                title: 'Mental Health & SRHR Training Workshop', 
                description: 'A dedicated capacity building training for peer educators to handle the intersection of mental health challenges and sexual health.', 
                event_type: 'workshop',
                event_date: inTwoMonths,
                location: 'Mutessa I Royal University',
                is_published: true,
                region: 'global'
            }
        ], { ignoreDuplicates: true });
        
        console.log('✅ Seeded Events');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seedEvents();
