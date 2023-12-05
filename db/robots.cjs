const client = require('./client.cjs');

async function createRobot({name, model, company_name, longevity_months, is_child_safe, cost, release_date}) {
    try {
        const {rows: [robot]} = await client.query(`
            INSERT INTO robots(name, model, company_name, longevity_months, is_child_safe, cost, release_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [name, model, company_name, longevity_months, is_child_safe, cost, release_date]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createRobot
}