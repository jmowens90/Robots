const client = require('./client.cjs');
const { syncAndSeed } = require('./seedData.cjs');

syncAndSeed()
    .catch(console.error)
    .finally(() => client.end)