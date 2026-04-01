const { Client } = require('pg');

async function createDb() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    port: 5432,
    database: 'postgres' // Connect to default DB to issue CREATE DATABASE
  });

  try {
    await client.connect();
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname='wekume_db'");
    if (res.rowCount === 0) {
      console.log('Database wekume_db does not exist. Creating...');
      await client.query('CREATE DATABASE wekume_db');
      console.log('Database created successfully.');
    } else {
      console.log('Database wekume_db already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDb();
