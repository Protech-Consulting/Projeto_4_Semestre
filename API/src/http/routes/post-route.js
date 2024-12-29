import express from 'express'
import upload from '../../../config/mutter-multi.js';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const postRouter = express.Router()
//Consulta de Produtos
postRouter.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            produto:{
                include:{
                        imagem: true,
                        Stock:true,
                      },
            },
            images: true
        }
    })
    res.status(200).json(posts)
})
postRouter.get('/posts/:id',async(req,res)=>{
    const posts = await prisma.post.findUnique({
        include: {
            produto:{
                include:{
                        imagem: true,
                        Stock:true,
                      },
            },
            images: true
        },
        where:{
            id: req.params.id
        }
    })
    res.status(200).json(posts)
})
postRouter.post('/posts', upload.array("files", 10), async (req, res) => {
    console.log(req.body); // Para dados JSON
console.log(req.files); // Para arquivos enviados
    try {
        console.log("Arquivos recebidos:", req.files);
        console.log("Body recebido:", req.body);

        const { title, content,produtoId } = req.body;

        if (!title) {
            return res.status(400).send('O título do post é obrigatório.');
        }

        // Validação para verificar se há arquivos de imagem
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('Pelo menos uma imagem deve ser enviada.');
        }

        // Criação do post com as imagens associadas
        const post = await prisma.post.create({
            data: {
                produtoId,
                title,
                content,
                images: {
                    create: req.files.map(file => ({
                        file: file.path, // Caminho do arquivo salvo
                    })),
                },
            },
            include: {
                produto: true,
                images: true, // Inclui as imagens criadas na resposta
            },
        });

        res.status(201).send({
            message: "Post criado com sucesso!",
            post,
        });
    } catch (error) {
        console.error("Erro ao criar post com imagens:", error);
        res.status(500).send('Erro interno ao criar post.');
    }
});
//Atualizar Anuncio
postRouter.put('/posts/:id',async (req,res)=>{
    await prisma.post.update({
        where:{
            id: req.params.id
        },
        data:{
            title: req.title,
            content: req.body.content,
            produtoId: req.body.produtoId
        }
    })
    res.status(200).json(req.body)
});
//Deletar Anuncio
postRouter.delete('/posts/:id', async (req, res) => {
    await prisma.post.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Anuncio Deletado" })
})
export default postRouter