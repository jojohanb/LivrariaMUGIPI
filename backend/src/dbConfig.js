const pg = require("pg");
const pgPool = new pg.Pool({
    host:'127.0.0.1',
    database: 'livrariaMUGI',
    user:'postgres',
    password:'postgres',
    port:5432,
    ssl:false
});

module.exports = {pgPool};