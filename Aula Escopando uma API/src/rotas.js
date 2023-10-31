const express = require('express')

const {
    cadastrarUsuario,
    obterPerfil,
    editarPerfil
} = require('./controladores/usuarios')

const verificaLogin = require('../src/filtros/verificaLogin')
const login = require('../src/controladores/login')



const rotas = express()

rotas.post('/cadastro', cadastrarUsuario)
rotas.post('/login', login)
rotas.use(verificaLogin)
rotas.get('/perfil', obterPerfil)
rotas.put('/perfil', editarPerfil)

module.exports = rotas