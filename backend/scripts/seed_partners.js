const { sequelize } = require('../config/database');
const models = require('../models');

async function seedPartners() {
    console.log('🌱 Updating sample Partners with details...');
    try {
        await sequelize.authenticate();
        
        await models.Partner.update({ description: 'Guiding national health standards and policies for all Ugandans.' }, { where: { name: 'Ministry of Health UG' } });
        await models.Partner.update({ description: 'The United Nations sexual and reproductive health agency.' }, { where: { name: 'UNFPA' } });
        await models.Partner.update({ description: 'Championing sexual and reproductive health rights across Uganda.' }, { where: { name: 'Reproductive Health UG' } });
        await models.Partner.update({ description: 'A global youth-led organization advocating for comprehensive SRHR.' }, { where: { name: 'Youth Coalition SRHR' } });
        await models.Partner.update({ description: 'Investing to end AIDS, TB, and Malaria as epidemics.' }, { where: { name: 'Global Fund' } });

        console.log('✅ Updated Partners');
        process.exit(0);
    } catch (err) {
        console.error('❌ Update failed:', err);
        process.exit(1);
    }
}

seedPartners();
