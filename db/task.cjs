const client = require('./client.cjs');

async function createTask({task_name, task_description}) {
    try {
        const {rows: [task]} = await client.query(`
            INSERT INTO tasks(task_name, task_description)
            VALUES ($1, $2)
            RETURNING *;
        `, [task_name, task_description]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTask
}