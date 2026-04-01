const { sequelize } = require('../config/database');
const models = require('../models');

async function seedData() {
    console.log('🌱 Seeding additional sample data for layout testing...');
    try {
        await sequelize.authenticate();
        
        const superadmin = await models.User.findOne();
        const authorId = superadmin ? superadmin.id : null;

        // Content Sections for Home
        await models.ContentSection.bulkCreate([
            // Slide 1
            { section_key: 'hero_s1_title', section_title: 'Empowering Youth To Lead', content_text: 'Unlocking potential through education, health, and innovation. We built this platform to listen, support, and guide you.', is_active: true, region: 'global', last_updated_by: authorId },
            // Slide 2
            { section_key: 'hero_s2_title', section_title: 'Integrity. Innovation. Inclusivity.', content_text: 'Creating safe, stigma-free spaces where every young person can thrive without fear of judgment.', is_active: true, region: 'global', last_updated_by: authorId },
            // Slide 3
            { section_key: 'hero_s3_title', section_title: 'Your Health, Your Future', content_text: 'Access confidential SRHR services, book appointments, and chat with Lina anytime, anywhere.', is_active: true, region: 'global', last_updated_by: authorId },
            
            // Common keys
            { section_key: 'hero_title', section_title: 'Wekume Initiative', content_text: 'Empowering the next generation.', is_active: true, region: 'global', last_updated_by: authorId },
            { section_key: 'about_preview', section_title: 'About Our Vision', content_text: 'Building an equitable and informed future.', is_active: true, region: 'global', last_updated_by: authorId },
            { section_key: 'footer_about', section_title: 'Wekume', content_text: 'A safe haven for every youth.', is_active: true, region: 'global', last_updated_by: authorId }
        ], { validate: false, hooks: false });
        console.log('✅ Seeded 6 Content Sections');

        // We already seeded Testimonials and Values successfully in the previous run

        // 3. Reports
        await models.Report.bulkCreate([
            { title: 'Annual Impact Report 2025', description: 'A summary of our community outreach over the past year.', file_url: '/dummy-report-2025.pdf', report_type: 'annual', year: 2025, is_published: true, region: 'global', uploaded_by: authorId },
            { title: 'Q1 2026 Financial Audit', description: 'Quarterly financial transparency report.', file_url: '/dummy-q1-2026.pdf', report_type: 'other', year: 2026, is_published: true, region: 'global', uploaded_by: authorId }
        ], { validate: false, hooks: false });
        console.log('✅ Seeded 2 Reports');

        // 5. Support Forms
        await models.SupportForm.bulkCreate([
            { name: 'James Kariuki', email: 'james@example.com', phone: '+254712345678', subject: 'Partnering on upcoming event', message: 'We would love to sponsor the Health Summit.', status: 'new', region: 'ug' },
            { name: 'Emma Watson', email: 'emma@example.com', phone: '+15551234567', subject: 'Volunteer Application Query', message: 'I have submitted my application, when should I expect to hear back?', status: 'in_progress', region: 'us' }
        ], { validate: false, hooks: false });
        console.log('✅ Seeded 2 Support Forms');

        console.log('🎉 Layout Seed Complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seedData();
