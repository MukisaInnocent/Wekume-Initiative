const { sequelize } = require('./config/database');
const { User } = require('./models');

async function checkAdmin() {
    try {
        // Assume database is already connected from server.js

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@wekume.org';
        const adminPassword = process.env.ADMIN_PASSWORD || 'WekumeAdmin2024!';

        const adminUser = await User.findOne({ where: { email: adminEmail } });

        if (adminUser) {
            console.log(`✅ Admin user found: ${adminEmail}`);
            // Force reset password to ensure it matches
            adminUser.password_hash = adminPassword;
            // Triggers beforeUpdate hook to hash it
            await adminUser.save();
            console.log('🔄 Admin password reset to ensure access.');
        } else {
            console.log('⚠️ No admin users found. Creating default admin...');

            await User.create({
                fullname: 'System Admin',
                email: adminEmail,
                password_hash: adminPassword, // Will be hashed by hooks
                role: 'super_admin',
                is_active: true
            });
            console.log(`✅ Created default admin: ${adminEmail}`);
        }
    } catch (error) {
        console.error('❌ Error checking admin:', error);
    }
}

module.exports = checkAdmin;
