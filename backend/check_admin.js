const { sequelize } = require('./config/database');
const { User } = require('./models');

async function checkAdmin() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const users = await User.findAll({ where: { role: 'admin' } }); // Assuming 'role' and 'admin' value based on authController log
        console.log('Admin Users found:', users.length);

        if (users.length > 0) {
            users.forEach(u => console.log(`- ${u.email} (Active: ${u.is_active})`));
        } else {
            console.log('No admin users found. Creating one...');
            await User.create({
                fullname: 'System Admin',
                email: 'admin@wekume.org',
                password_hash: 'admin123', // Will be hashed by hooks
                role: 'admin',
                is_active: true
            });
            console.log('Created default admin: admin@wekume.org / admin123');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkAdmin();
