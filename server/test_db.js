const { Client } = require('pg');

async function testConnection(password) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres', // Connect to default postgres DB first
        password: password,
        port: 5432,
    });
    try {
        await client.connect();
        console.log(`SUCCESS with password: "${password}"`);
        await client.end();
        return true;
    } catch (err) {
        console.log(`FAILED with password: "${password}" - ${err.message}`);
        return false;
    }
}

async function run() {
    const passwords = ['', 'postgres', 'admin', 'password', '123456'];
    for (const pw of passwords) {
        if (await testConnection(pw)) {
            process.exit(0);
        }
    }
    process.exit(1);
}

run();
