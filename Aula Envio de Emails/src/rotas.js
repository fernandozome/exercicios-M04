const express = require('express')
const login = require('./Controladores/login')

const rotas = express()

rotas.post('/login', login)

module.exports = rotas