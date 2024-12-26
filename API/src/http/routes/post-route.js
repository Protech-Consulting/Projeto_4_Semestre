import express from 'express'
import upload from '../../../config/mutter.js'
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
                      },
            },
            images: true
        }
    })
    res.status(200).json(posts)
})
postRouter.post('/post-pictures', upload.array("files", 10), async (req, res) => {
    // `req.files` contém informações sobre os arquivos enviados
    console.log("Arquivos recebidos:", req.files);
console.log("Body recebido:", req.body);
    const { postId } = req.body;  // Pegue o ID do post onde as imagens serão associadas

    if (req.files && req.files.length > 0) {
        console.log('Arquivos enviados:', req.files.map(file => file.path)); // Caminhos dos arquivos salvos

        // Verifique se o post existe antes de associar as imagens
        const postExists = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!postExists) {
            return res.status(404).send('Post não encontrado.');
        }

        // Criando várias imagens e associando ao post
        const images = await prisma.productPicture.createMany({
            data: req.files.map(file => ({
                file: file.path,
                postId: postId,  // Associando cada imagem ao post
            })),
        });

        res.send({ message: "Imagens adicionadas ao post com sucesso.", images });
    } else {
        res.status(400).send('Nenhum arquivo enviado.');
    }
});

export default postRouter