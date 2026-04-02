const { sequelize } = require('./config/database');

async function checkTables() {
    try {
        const results = await sequelize.getQueryInterface().showAllTables();
        console.log('Tables in database:', results);
        process.exit(0);
    } catch (error) {
        console.error('Error checking tables:', error);
        process.exit(1);
    }
}

checkTables();
