const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || "dbaddress";

const client = new Client({
    connectionString,
});

module.exports = client;