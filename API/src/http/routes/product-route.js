import express from 'express'
import upload from '../../../config/mutter.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const productRouter = express.Router()
//Cadastro de Produtos
productRouter.post('/produtos', async (req, res) => {
    await prisma.product.create({
        data: {
            nome: req.body.nome,
            imagem_Id: req.body.imagem_Id,
            unidade_de_medida: req.body.unidade_de_medida,
            marca: req.body.marca,
            tratamento: req.body.tratamento,
            valor: req.body.valor
        }
    })
    res.status(201).json(req.body)
})
//Consulta de Produtos
productRouter.get('/produtos', async (req, res) => {
    const products = await prisma.product.findMany({
        include: {
            imagem: true,
        },
    })
    res.status(200).json(products)
})
//Atualizar Produtos
productRouter.put('/produtos/:id', async (req, res) => {
    await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            nome: req.body.nome,
            foto: req.body.foto,
            unidade_de_medida: req.body.unidade_de_medida,
            marca: req.body.marca,
            tratamento: req.body.tratamento,
            valor: req.body.valor
        }
    })
    res.status(200).json(req.body)
})
//Deletar Produtos
productRouter.delete('/produtos/:id', async (req, res) => {
    await prisma.product.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Produto Deletado" })
})
productRouter.post('/picture', upload.single("file"), async (req, res) => {
    // `req.file` contém informações sobre o arquivo enviado
    if (req.file) {
        console.log('Arquivo enviado para:', req.file.path); // Caminho do arquivo salvo
        const image = await prisma.productPicture.create({
            data: {
                file: req.file.path
            },
            select: {
                id: true,      // Retorna a chave primária
            },
        })
        res.send(image)
    } else {
        res.send('Nenhum arquivo enviado.');
    }
})

export default productRouter