const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
    host: process.env.host, // or wherever the db is hosted
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port // The default port
});
