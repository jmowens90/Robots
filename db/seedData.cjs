const client = require('./client.cjs');
const { createRobot } = require('./robots.cjs');
const { createCustomer } = require('./customer.cjs');
const { createTask } = require('./task.cjs')
 

async function dropTables() {
    
    try {
        console.log('Dropping Tables');
        await client.query(`
        DROP TABLE IF EXISTS robot_customer;
        DROP TABLE IF EXISTS robot_task;
        DROP TABLE IF EXISTS tasks;
        DROP TABLE IF EXISTS robots;
        DROP TABLE IF EXISTS customers;
        `)
    } catch(error) {
       throw error;
    }
}

async function createTables() {
    try {
        console.log('Creating Tables');
        
        await client.query(`
            CREATE TABLE robots(
                id SERIAL PRIMARY KEY,
                name VARCHAR(30),
                model VARCHAR(30),
                company_name VARCHAR(30),
                longevity_months int,
                is_child_safe BOOLEAN,
                cost DECIMAL,
                release_date DATE
            )
        `)

        await client.query(`
            CREATE TABLE customers(
                id SERIAL PRIMARY KEY,
                customer_name VARCHAR(30),
                customer_email VARCHAR(30),
                would_recommend BOOLEAN
            )
        `)

        await client.query(`
            CREATE TABLE tasks(
                id SERIAL PRIMARY KEY, 
                task_name VARCHAR(30),
                task_description VARCHAR(200)
            )
        `)

        await client.query(`
            CREATE TABLE robot_customer(
                robot_id INTEGER REFERENCES robots(id),
                customer_id INTEGER REFERENCES customers(id),
                UNIQUE (robot_id, customer_id)
            )
        `)

        await client.query(`
            CREATE TABLE robot_task(
                robot_id INTEGER REFERENCES robots(id),
                task_id INTEGER REFERENCES tasks(id),
                UNIQUE (robot_id, task_id)
            )
        `)
        console.log("Finished creating tables")
    } catch(error) {
        throw error;
    }
}

async function createInitialRobots() {
    console.log('Creating robots');
    try {
        const robotsToCreate = [
            { name: 'Sparky', model: 'gen 2', company_name: 'Valcom', longevity_months: 60, is_child_safe: false, cost: 299.99, release_date: '2020-10-01'},
            { name: 'Clippings', model: 'gen 4', company_name: 'Valcom', longevity_months: 60, is_child_safe: false, cost: 199.99, release_date: '2023-06-01'},
            { name: 'Bard', model: 'gen 1', company_name: 'Valcom', longevity_months: 90, is_child_safe: true, cost: 99.99, release_date: '2022-12-01'}
        ]
        const robots = await Promise.all(robotsToCreate.map(createRobot))
    } catch (error) {
        throw error;
    }
}

async function createInitialCustomers() {
    console.log('Creating customers');
    try {
        const customersToCreate = [
            { customer_name: 'Zelda Hyrule', customer_email: 'Zprincess@hyrule.com', would_recommend: true},
            { customer_name: 'Link Hyrule', customer_email: 'BestWarrior@hyrule.com', would_recommend: false},
            { customer_name: 'Samus Metroid', customer_email: 'BaseCannon@metroid.com', would_recommend: true}
        ]
        const customers = await Promise.all(customersToCreate.map(createCustomer))
    } catch (error) {
        throw error;
    }
}

async function createInitialTasks() {
    console.log('Creating Tasks');
    try {
        const tasksToCreate = [
            { task_name: 'Electrical Work', task_description: 'Able to work on all basic electrical needs around your home.'},
            { task_name: 'Yard Work', task_description: 'Able to work on all yard care needs around your home.'},
            { task_name: 'Story Telling', task_description: 'Able to recite wondrous classics of literature.'}
        ]
        const tasks = await Promise.all(tasksToCreate.map(createTask))
    } catch (error) {
        throw error;
    }
}

async function syncAndSeed() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialRobots();
        await createInitialCustomers();
        await createInitialTasks();
    } catch(error) {
        throw error;
    }
}

module.exports = {
    syncAndSeed
}