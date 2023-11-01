const express = require('express')

const {
    cadastrarUsuario,
    obterPerfil,
    editarPerfil
} = require('./controladores/usuarios')

const verificaLogin = require('../src/filtros/verificaLogin')
const login = require('../src/controladores/login')
const { novaPostagem, curtirPostagem, comentarPostagem } = require('./controladores/postagens')



const rotas = express()

rotas.post('/cadastro', cadastrarUsuario)
rotas.post('/login', login)
rotas.use(verificaLogin)
rotas.get('/perfil', obterPerfil)
rotas.put('/perfil', editarPerfil)

rotas.post('/postagens', novaPostagem)
rotas.post('/postagens/:postagemId/curtir', curtirPostagem)
rotas.post('/postagens/:postagemId/comentar', comentarPostagem)
module.exports = rotas