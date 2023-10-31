const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '12345',
        database: 'mini-insta'
    }
});

module.exports = knex