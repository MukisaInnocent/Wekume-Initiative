const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // === Production / Render Environment (PostgreSQL via connection string) ===
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    define: { timestamps: true, underscored: false },
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
  console.log('📡 Using PostgreSQL (DATABASE_URL)');

} else if (process.env.DB_HOST) {
  // === Local PostgreSQL (explicit host configured in .env) ===
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      define: { timestamps: true, underscored: false },
      dialectOptions: {}
    }
  );
  console.log('📡 Using Local PostgreSQL');

} else {
  // === Zero-Config Local Development (SQLite file) ===
  const dbPath = path.join(__dirname, '..', 'wekume_dev.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    define: { timestamps: true, underscored: false }
  });
  console.log(`📦 Using SQLite database at: ${dbPath}`);
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };

