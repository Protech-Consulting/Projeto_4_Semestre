import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userRouter = express.Router()
//Cadastro de Usuario
userRouter.post('/usuario', async (req, res) => {
    await prisma.user.create({
        data: {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            celular: req.body.celular,
            uf: req.body.uf,
            rua: req.body.rua,
            cep: req.body.cep,
            usuario: req.body.usuario,
            senha: req.body.senha,
            nivel_acesso: req.body.nivel_acesso
        }
    })
    res.status(201).json(req.body)
})
//Consulta de Usuario
userRouter.get('/usuario', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})
//Atualizar Usuario
userRouter.put('/usuario/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            celular: req.body.celular,
            uf: req.body.uf,
            rua: req.body.rua,
            cep: req.body.cep,
            usuario: req.body.usuario,
            senha: req.body.senha,
            nivel_acesso: req.body.nivel_acesso
        }
    })
    res.status(200).json(req.body)
})
//Deletar Usuario
userRouter.delete('/usuario/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuario Deletado" })
})
export default userRouter