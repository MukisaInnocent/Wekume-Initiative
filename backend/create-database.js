const { Client } = require('pg');
require('dotenv').config();

/**
 * Script to create the wekume_db database
 * Run this before running setup.js
 */

const createDatabase = async () => {
    // Connect to default postgres database first
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: 'postgres' // Connect to default postgres database
    });

    try {
        console.log('🔄 Connecting to PostgreSQL...\n');
        await client.connect();
        console.log('✅ Connected successfully\n');

        // Check if database already exists
        const checkDb = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'wekume_db'"
        );

        if (checkDb.rows.length > 0) {
            console.log('✅ Database "wekume_db" already exists');
        } else {
            console.log('🔄 Creating database "wekume_db"...');
            await client.query('CREATE DATABASE wekume_db');
            console.log('✅ Database "wekume_db" created successfully');
        }

        console.log('\n✅ Database setup complete!');
        console.log('You can now run: node setup.js\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);

        if (error.message.includes('password authentication failed')) {
            console.log('\n📝 SOLUTION:');
            console.log('1. Open backend/.env file');
            console.log('2. Update DB_PASSWORD with your PostgreSQL password');
            console.log('3. Run this script again\n');
        }
    } finally {
        await client.end();
    }
};

createDatabase();
