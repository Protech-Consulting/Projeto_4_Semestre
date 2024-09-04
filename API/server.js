import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import express from 'express'

const app = express()
app.use(express.json())

app.post('/produtos',async (req,res)=>{
    await prisma.product.create({
        data:{
            nome: req.body.nome,
            marca: req.body.marca
        }
    })
    res.status(201).json(req.body)
})
app.get('/produtos',async(req,res)=>{
    const products =  await prisma.product.findMany()
    res.status(200).json(products)
})
app.put('/produtos/:id',async (req,res)=>{
    await prisma.product.update({
        where:{
            id: req.params.id
        },
        data:{
            nome: req.body.nome,
            marca: req.body.marca
        }
    })
    res.status(200).json(req.body)
})
app.delete('/produtos/:id',async (req,res)=>{
    await prisma.product.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message:"Usuario Deletado"})
})

app.listen(3000)