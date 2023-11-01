const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '12345',
        database: 'mini_insta'
    }
});

module.exports = knex