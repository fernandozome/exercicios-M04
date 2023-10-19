const knex = require('../src/conexao')

const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        if (!nome || !senha) {
            return res.status(400).json({ mensagem: "Dados obrigatórios!" })
        }

        const inserirUsuario = await knex('usuarios').insert({ nome, email, senha }).returning('*')
        if (!inserirUsuario.length) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar usuário" })
        }

        return res.status(201).json(inserirUsuario[0])

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }

}

const listarUsuarios = async (req, res) => {

    try {
        const usuarios = await knex('usuarios')

        return res.json(usuarios).send()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }


}

const listarPorId = async (req, res) => {
    const { id } = req.params

    try {
        const usuarioEncontrado = await knex('usuarios').where({ id }).first()

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }

        return res.status(200).json(usuarioEncontrado)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body

    try {

        if (!nome || !senha) {
            return res.status(400).json({ mensagem: "Dados obrigatórios!" })
        }

        const usuarioEncontrado = await knex('usuarios').where({ id }).first()
        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }
        const usuarioEditado = await knex('usuarios').update({ nome, email, senha }).where({ id })

        if (!usuarioEditado) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar usuário" })
        }
        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

const excluirUsuario = async (req, res) => {
    const { id } = req.params

    try {
        const usuarioEncontrado = await knex('usuarios').where({ id }).first()

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }

        const deleteUsuario = await knex('usuarios').where({ id }).del()
        if (!deleteUsuario) {
            return res.status(400).json({ mensagem: "Não foi possível deletar usuário" })
        }

        return res.status(410).send()
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}
module.exports = {
    listarUsuarios,
    listarPorId,
    criarUsuario,
    editarUsuario,
    excluirUsuario
}