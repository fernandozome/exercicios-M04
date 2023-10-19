const express = require('express');
const knex = require('./conexao');

const app = express();

app.use(express.json());


app.get('/', async (req, res) => {
    const qntdMedicamento = await knex('farmacia').count()
    const usuarioMaisNovo = await knex('usuarios').min('idade')
    const categoriasNaoNulas = await knex('farmacia').select('categoria').sum('estoque').whereNotNull('categoria').groupBy('categoria')
    const categoriasNulas = await knex('farmacia').whereNull('categoria').count()
    const qntdPorCategoria = await knex('farmacia').select('categoria').count('estoque').whereNotNull('categoria').groupBy('categoria')
    const maioresDeidade = await knex('usuarios').select('idade').count().where('idade', '>=', 18).groupBy('idade')
    return res.json(qntdMedicamento)
})



app.put('/', async (req, res) => {
    const { nome, email, telefone } = req.body
    const { id } = req.params

    const novoRegistro = await knex('agenda').update({
        nome,
        email,
        telefone
    })
        .where({ id }).returning('*')

    return res.json(novoRegistro)
})

app.delete('/', async (req, res) => {
    const { nome, email, telefone } = req.body
    const { id } = req.params

    const novoRegistro = await knex('agenda').del().where({ id }).returning('*')

    return res.json(novoRegistro)
})

app.listen(3000);