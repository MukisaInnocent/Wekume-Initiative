const models = require('../models');
const { sequelize } = require('../config/database');

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('📡 Connected to PostgreSQL');

        // 1. Publish all Events
        const [updatedEvents] = await models.Event.update({ is_published: true }, { where: {} });
        console.log(`✅ Published \${updatedEvents} Events`);

        // 2. Approve all Testimonials
        const [updatedTestimonials] = await models.Testimonial.update({ is_approved: true, is_featured: true }, { where: {} });
        console.log(`✅ Approved \${updatedTestimonials} Testimonials`);

        // 3. Activate all Partners
        const [updatedPartners] = await models.Partner.update({ is_active: true }, { where: {} });
        console.log(`✅ Activated \${updatedPartners} Partners`);

        // 4. Activate all Values
        const [updatedValues] = await models.Value.update({ is_active: true }, { where: {} });
        console.log(`✅ Activated \${updatedValues} Core Values`);

        console.log('🎉 Data visibility fix complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Data visibility fix failed:', err);
        process.exit(1);
    }
}

fix();
