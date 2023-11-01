const { json, text } = require('express')
const knex = require('../conexao')

const novaPostagem = async (req, res) => {
    const { id } = req.usuario
    const { texto, fotos } = req.body

    if (!fotos || fotos.length === 0) {
        return res.status(400).json({ mensagem: "É preciso informar pelo menos uma foto" })
    }

    try {
        const postagem = await knex('postagens').insert({
            usuario_id: id,
            texto
        }).returning('*')

        if (!postagem) {
            return res.status(400).json({ mensagem: "Não foi possivel concluir a postagem" })
        }

        for (const foto of fotos) {
            foto.postagem_id = postagem[0].id
        }

        const fotosCadastradas = await knex('postagem_fotos').insert(fotos)

        if (!fotosCadastradas) {
            await knex('postagem').where({ id: postagem[0].id }).del()
            return res.status(400).json({ mensagem: "Não foi possivel concluir a postagem" })
        }

        return res.status(201).json({ mensagem: "Postado!" })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

const curtirPostagem = async (req, res) => {
    const { id } = req.usuario
    const { postagemId } = req.params

    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first()
        if (!postagem) {
            return res.status(404).json({ mensagem: "Não achei a postagem" })
        }

        const jaCurtiu = await knex('postagem_curtidas').where({ usuario_id: id, postagem_id: postagem.id }).first()
        if (jaCurtiu) {
            return res.status(403).json({ mensagem: "Postagem já curtida" })
        }

        const curtida = await knex('postagem_curtidas').insert({
            usuario_id: id,
            postagem_id: postagem.id
        })

        if (!curtida) {
            return res.status(400).json({ mensagem: "Não foi possivel curtir esta postagem" })
        }

        return res.status(201).json({ mensagem: "Postagem curtida com sucesso" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }

}

const comentarPostagem = async (req, res) => {
    const { id } = req.usuario
    const { postagemId } = req.params
    const { texto } = req.body
    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first()
        if (!postagem) {
            return res.status(404).json({ mensagem: "Não achei a postagem" })
        }

        if (!texto) {
            return res.status(403).json({ mensagem: "Pra comentar é preciso comentar!" })
        }
        const comentario = await knex('postagem_comentarios').insert({
            texto,
            usuario_id: id,
            postagem_id: postagem.id
        })


        if (!comentario) {
            return res.status(400).json({ mensagem: "Não foi possivel comentar nesta postagem" })
        }

        return res.status(201).json({ mensagem: "Comentado!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }

}

module.exports = {
    novaPostagem,
    curtirPostagem,
    comentarPostagem
}