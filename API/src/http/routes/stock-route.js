import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const stockRouter = express.Router()
//Cadastro de Estoque
stockRouter.post('/estoque',async (req,res)=>{
    await prisma.stock.create({
        data:{
            produto_Id: req.body.produto_Id,
            quantidade: req.body.quantidade
        }
    })
    res.status(201).json(req.body)
})
//Consulta de Estoque
stockRouter.get('/estoque',async(req,res)=>{
    const stocks = await prisma.stock.findMany({
        include: {
          produto: {
            include: {
              imagem: {
                select: {
                  id: true,
                  file: true,
                },
              },
            },
          },
        },
      });
    res.status(200).json(stocks)
})
//Atualizar Estoque
stockRouter.put('/estoque/:id',async (req,res)=>{
    await prisma.stock.update({
        where:{
            id: req.params.id
        },
        data:{
            produto_Id: req.body.produto_Id,
            quantidade: req.body.quantidade
        }
    })
    res.status(200).json(req.body)
})
//Deletar Estoque
stockRouter.delete('/estoque/:id', async (req, res) => {
  await prisma.stock.delete({
      where: {
          id: req.params.id
      }
  })
  res.status(200).json({ message: "Estoque Deletado" })
})
export default stockRouter