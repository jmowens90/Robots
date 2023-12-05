const client = require('./client.cjs');

async function createCustomer({customer_name, customer_email, would_recommend}) {
    try {
        const {rows: [customer]} = await client.query(`
            INSERT INTO customers(customer_name, customer_email, would_recommend)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [customer_name, customer_email, would_recommend]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCustomer
}