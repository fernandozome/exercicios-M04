const transport = require('../email')
const compiladorHtlm = require('../utils/compliadorHtlm')

const usuario = {
    email: "fernandozome@gmail.com",
    nome: "Fernando Zome",
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


    const html = await compiladorHtlm('./src/Templates/login.html', {
        nomeusuario: usuario.nome
    })

    transport.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${usuario.nome} <${usuario.email}>`,
        subject: "Tentativa de Login",
        html
    })
    return res.json({ mensagem: 'Login efetuado com sucesso' })
}

module.exports = login