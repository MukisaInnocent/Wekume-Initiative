const { sequelize } = require('./config/database');
const { User } = require('./models');

async function checkAdmin() {
    try {
        // Assume database is already connected from server.js

        const users = await User.findAll({ where: { role: ['super_admin', 'admin'] } });
        console.log('Admin Users found:', users.length);

        if (users.length > 0) {
            console.log('✅ Admin user exists.');
        } else {
            console.log('⚠️ No admin users found. Creating default admin...');

            const adminEmail = process.env.ADMIN_EMAIL || 'admin@wekume.org';
            const adminPassword = process.env.ADMIN_PASSWORD || 'WekumeAdmin2024!';

            await User.create({
                fullname: 'System Admin',
                email: adminEmail,
                password_hash: adminPassword, // Will be hashed by hooks
                role: 'super_admin', // Use super_admin as per setup.js
                is_active: true
            });
            console.log(`✅ Created default admin: ${adminEmail}`);
            console.log(`   Password: ${adminPassword}`);
        }
    } catch (error) {
        console.error('❌ Error checking admin:', error);
    }
}

module.exports = checkAdmin;
