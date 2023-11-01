const knex = require('../conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {

    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(400).json({ mensagem: "Username e senha são obrigatórios" })
    }

    if (senha.length < 5) {
        return res.status(400).json({ mensagem: "A senha deve ter pelo menos 5 caracteres" })
    }

    try {
        const usuarioExiste = await knex('usuarios').where({ username }).first()
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: "Username informado já existe" })
        }

        const senhaCripto = await bcrypt.hash(senha, 10)
        const usuario = await knex('usuarios').insert({
            username,
            senha: senhaCripto
        })

        if (!usuario) {
            return res.status(403).json({ mensagem: "Usuário não foi cadastrado" })
        }

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario)
}

const editarPerfil = async (req, res) => {

    let {
        nome,
        email,
        senha,
        imagem,
        username,
        site,
        bio,
        telefone,
        genero
    } = req.body


    const { id } = req.usuario

    if (
        !nome &&
        !email &&
        !senha &&
        !imagem &&
        !username &&
        !site &&
        !bio &&
        !telefone &&
        !genero
    ) { return res.status(400).json({ mensagem: "É necessário informar pelo menos um campo para atualização" }) }

    try {

        if (senha) {
            if (senha.length < 5) {
                return res.status(400).json({ mensagem: "A senha deve ter pelo menos 5 caracteres" })
            }

            senha = await bcrypt.hash(senha, 10)
        }

        if (email != req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios').where({ email }).first()
            if (emailUsuarioExiste) {
                return res.status(400).json({ mensagem: "Email informado já existe" })
            }
        }

        if (username != req.usuario.username) {
            const usernameUsuarioExiste = await knex('usuarios').where({ username }).first()
            if (usernameUsuarioExiste) {
                return res.status(400).json({ mensagem: "Username informado já existe" })
            }
        }

        const usuarioAtualizado = await knex('usuarios').where({ id }).update({
            nome,
            email,
            senha,
            imagem,
            username,
            site,
            bio,
            telefone,
            genero
        })

        if (!usuarioAtualizado) {
            return res.status(403).json({ mensagem: "Usuário não pôde ser atualizado" })
        }

        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    editarPerfil
}