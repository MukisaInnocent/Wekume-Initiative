const { sequelize } = require('./config/database');
const { User } = require('./models');

async function debugUsers() {
    try {
        // Disable logging for this check
        sequelize.options.logging = false;
        await sequelize.authenticate();
        console.log('Database connected.');

        const users = await User.findAll({ logging: false });
        console.log(`Found ${users.length} users:`);

        users.forEach(u => {
            const hashPreview = u.password_hash ? u.password_hash.substring(0, 15) + '...' : 'NULL';
            console.log(`User: ${u.email} | Role: ${u.role} | Active: ${u.is_active} | Hash: ${hashPreview}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

debugUsers();
