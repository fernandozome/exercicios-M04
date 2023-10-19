const express = require('express')
const { listarUsuarios, listarPorId, criarUsuario, editarUsuario, excluirUsuario } = require('../Controladores/usuarios')


const rotas = express()

rotas.get('/usuarios', listarUsuarios)
rotas.get('/usuarios/:id', listarPorId)
rotas.post('/usuarios', criarUsuario)
rotas.put('/usuarios/:id', editarUsuario)
rotas.delete('/usuarios/:id', excluirUsuario)

module.exports = rotas