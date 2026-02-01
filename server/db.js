const { Pool, Client } = require('pg');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
};

const dbName = process.env.DB_NAME || 'traveltales';

const pool = new Pool({
    ...dbConfig,
    database: dbName,
});

// Test connection and initialize tables
const initDB = async () => {
    try {
        // 1. Ensure the database exists
        const client = new Client({ ...dbConfig, database: 'postgres' });
        await client.connect();

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
        if (res.rowCount === 0) {
            console.log(`Creating database "${dbName}"...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`✅ Database "${dbName}" created`);
        }
        await client.end();

        // 2. Initialize tables using the pool
        await pool.query('SELECT NOW()');
        console.log('✅ PostgreSQL Connected');

        // Create Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255),
                google_id VARCHAR(255) UNIQUE,
                picture VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create Itineraries table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS itineraries (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                destination VARCHAR(255) NOT NULL,
                plan_data JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('✅ Database tables initialized');
    } catch (err) {
        console.error('❌ Database initialization error:', err);
    }
};

initDB();

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
