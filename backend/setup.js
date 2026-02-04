const { sequelize } = require('./config/database');
const { User } = require('./models');
require('dotenv').config();

/**
 * Database setup script
 * - Syncs database tables
 * - Creates first super admin user
 */

const setupDatabase = async () => {
    try {
        console.log('🔄 Starting database setup...\n');

        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection successful\n');

        // Sync all models (creates tables)
        console.log('🔄 Synchronizing database models...');
        await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
        console.log('✅ Database models synchronized\n');

        // Check if super admin exists
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@wekume.org';
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log(`⚠️  Super admin already exists: ${adminEmail}`);
        } else {
            // Create super admin
            const adminPassword = process.env.ADMIN_PASSWORD || 'WekumeAdmin2024!';

            const admin = await User.create({
                fullname: 'Wekume Administrator',
                email: adminEmail,
                password_hash: adminPassword, // Will be hashed by the hook
                role: 'super_admin',
                is_active: true
            });

            console.log('✅ Super admin created successfully');
            console.log(`   Email: ${adminEmail}`);
            console.log(`   Password: ${adminPassword}`);
            console.log('   ⚠️  PLEASE CHANGE THIS PASSWORD AFTER FIRST LOGIN!\n');
        }

        console.log('✅ Database setup complete!\n');
        console.log('You can now start the server with: npm run dev\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        process.exit(1);
    }
};

setupDatabase();
