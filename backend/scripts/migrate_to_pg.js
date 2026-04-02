const Database = require('better-sqlite3');
const { sequelize } = require('../config/database');
const models = require('../models');

async function migrate() {
    console.log('🔄 Starting migration from SQLite to PostgreSQL...');
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to PostgreSQL successfully.');
        
        console.log('🔄 Syncing PostgreSQL schema...');
        await sequelize.sync({ force: true });
        console.log('✅ PostgreSQL schema synchronized.');

        const sqliteDb = new Database('./wekume_dev.sqlite');

        // Order is crucial for foreign keys
        const tablesToMigrate = [
            { model: models.User, name: 'users' },
            { model: models.ContentSection, name: 'content_sections' },
            { model: models.Partner, name: 'partners' },
            { model: models.Event, name: 'events' },
            { model: models.Testimonial, name: 'testimonials' },
            { model: models.Report, name: 'reports' },
            { model: models.MediaLibrary, name: 'media_library' },
            { model: models.Value, name: 'values' },
            { model: models.WekumeAppFeature, name: 'wekume_app_features' },
            { model: models.SupportForm, name: 'support_forms' },
            { model: models.AIAssistantLog, name: 'ai_assistant_logs' },
            { model: models.PageAnalytics, name: 'page_analytics' },
            { model: models.VolunteerApplication, name: 'volunteer_applications' },
            { model: models.SocialLink, name: 'social_links' },
            { model: models.BackgroundImage, name: 'background_images' },
            { model: models.Donation, name: 'donations' },
            { model: models.TeamMember, name: 'team_members' },
            { model: models.ImpactMetric, name: 'impact_metrics' },
            { model: models.ConfigurableBlock, name: 'configurable_blocks' },
            { model: models.Resource, name: 'resources' },
            { model: models.EventRegistration, name: 'event_registrations' }
        ];

        for (const table of tablesToMigrate) {
            try {
                // Not all models exist or are mapped identically, so let's check
                if (!table.model) {
                    console.log('⚠️ Skipping table ' + table.name + ' because model is not defined.');
                    continue;
                }
                const stmt = sqliteDb.prepare('SELECT * FROM "' + table.name + '"');
                const records = stmt.all();
                
                if (records.length > 0) {
                    await table.model.bulkCreate(records, { validate: false, hooks: false });
                    console.log('✅ Migrated ' + records.length + ' records into ' + table.name);
                } else {
                    console.log('ℹ️ No records found for ' + table.name);
                }
            } catch (err) {
                console.error('❌ Failed to migrate ' + table.name + ':', err.message);
            }
        }

        // --- ENFORCE PARTNER SEEDING FOR HOMEPAGE IF EMPTY ---
        const partnersCount = await models.Partner.count();
        if (partnersCount === 0) {
            console.log('⚠️ No partners found. Injecting dummy partners for homepage...');
            await models.Partner.bulkCreate([
                { name: 'Global Health Org', logo_url: 'https://via.placeholder.com/150?text=Partner1', is_active: true, display_order: 1, created_at: new Date(), updated_at: new Date() },
                { name: 'Africa Care Init', logo_url: 'https://via.placeholder.com/150?text=Partner2', is_active: true, display_order: 2, created_at: new Date(), updated_at: new Date() },
                { name: 'Tech 4 Good', logo_url: 'https://via.placeholder.com/150?text=Partner3', is_active: true, display_order: 3, created_at: new Date(), updated_at: new Date() },
                { name: 'Youth Empowerment', logo_url: 'https://via.placeholder.com/150?text=Partner4', is_active: true, display_order: 4, created_at: new Date(), updated_at: new Date() }
            ]);
            console.log('✅ Injected 4 dummy partners.');
        }
        
        // --- ENFORCE EVENT SEEDING FOR HOMEPAGE IF EMPTY ---
        const eventsCount = await models.Event.count();
        if (eventsCount === 0) {
            console.log('⚠️ No events found. Injecting dummy events for homepage...');
            const adminUser = await models.User.findOne(); // Grab first admin to tie the event to
            const authorId = adminUser ? adminUser.id : null;
            await models.Event.bulkCreate([
                { title: 'Community Health Outreach', description: 'Join us for a free health screening in Kampala.', event_date: new Date(Date.now() + 86400000 * 5), location: 'Kampala', is_published: true, created_by: authorId },
                { title: 'Digital Literacy Workshop', description: 'Empowering youth with digital skills for the future.', event_date: new Date(Date.now() + 86400000 * 12), location: 'Online', is_published: true, created_by: authorId },
                { title: 'Youth Mental Health Summit', description: 'A safe space to discuss mental wellbeing.', event_date: new Date(Date.now() + 86400000 * 20), location: 'Nairobi', is_published: true, created_by: authorId }
            ], { validate: false, hooks: false });
            console.log('✅ Injected 3 dummy events.');
        }

        console.log('🎉 Migration completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

migrate();
