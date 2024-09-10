import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import express from 'express'

const app = express()
app.use(express.json())

//Cadastro de Produtos
app.post('/produtos',async (req,res)=>{
    await prisma.product.create({
        data:{
            nome:  req.body.nome,
            foto:   req.body.foto,
            unidade_de_medida:  req.body.unidade_de_medida,
            marca:  req.body.marca,
            tratamento:  req.body.tratamento,
            valor:  req.body.valor
        }
    })
    res.status(201).json(req.body)
})
//Consulta de Produtos
app.get('/produtos',async(req,res)=>{
    const products =  await prisma.product.findMany()
    res.status(200).json(products)
})
//Atualizar Produtos
app.put('/produtos/:id',async (req,res)=>{
    await prisma.product.update({
        where:{
            id: req.params.id
        },
        data:{
            nome:  req.body.nome,
            foto:   req.body.foto,
            unidade_de_medida:  req.body.unidade_de_medida,
            marca:  req.body.marca,
            tratamento:  req.body.tratamento,
            valor:  req.body.valor
        }
    })
    res.status(200).json(req.body)
})
//Deletar Produtos
app.delete('/produtos/:id',async (req,res)=>{
    await prisma.product.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message:"Produto Deletado"})
})
//Cadastro de Usuario
app.post('/usuario',async (req,res)=>{
    await prisma.user.create({
        data:{
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            celular: req.body.celular,
            uf:  req.body.uf,
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
app.get('/usuario',async(req,res)=>{
    const users =  await prisma.user.findMany()
    res.status(200).json(users)
})
//Atualizar Usuario
app.put('/usuario/:id',async (req,res)=>{
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            celular: req.body.celular,
            uf:  req.body.uf,
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
app.delete('/usuario/:id',async (req,res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message:"Usuario Deletado"})
})
//Cadastro de Estoque
app.post('/estoque',async (req,res)=>{
    await prisma.stock.create({
        data:{
            produto_Id: req.body.produto_Id,
            quantidade: req.body.quantidade
        }
    })
    res.status(201).json(req.body)
})
//Consulta de Estoque
app.get('/estoque',async(req,res)=>{
    const stocks =  await prisma.stock.findMany({
        include: {
            produto: true,
        },
    })
    res.status(200).json(stocks)
})
//Atualizar Estoque
app.put('/estoque/:id',async (req,res)=>{
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
app.listen(3000)