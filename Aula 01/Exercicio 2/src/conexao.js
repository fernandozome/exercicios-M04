const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '12345',
        database: 'exercicio_aula_query_builder'
    }
});

module.exports = knex