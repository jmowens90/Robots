const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/robots';

const client = new Client({
    connectionString,
});

module.exports = client;