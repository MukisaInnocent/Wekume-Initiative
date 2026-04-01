const { sequelize } = require('../config/database');
const models = require('../models');

async function check() {
    await sequelize.authenticate();
    const tables = Object.values(models);
    for (const model of tables) {
        if (model && model.count) {
            const count = await model.count();
            console.log(model.name + ': ' + count);
        }
    }
    process.exit(0);
}
check();
