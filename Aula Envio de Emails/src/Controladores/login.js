const usuario = {
    email: "fernandozome@gmail.com",
    senha: "123abc"

}

const login = async (req, res) => {

    const { email, senha } = req.body

    if (usuario.email !== email) {
        return res.status(400).json({ mensagem: "Email ou senha invalidos" })
    }

    if (usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Email ou senha invalidos" })
    }

    return res.json({ mensagem: 'Login efetuado com sucesso' })
}

module.exports = login