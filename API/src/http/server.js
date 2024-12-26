import { PrismaClient } from '@prisma/client'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient()
import express from 'express'
import productRouter from './routes/product-route.js'
import userRouter from './routes/user-route.js'
import stockRouter from './routes/stock-route.js'
import postRouter from './routes/post-route.js';

const app = express()
app.use(cors())
app.use(express.json())

app.use('/API/uploads', express.static(path.join(__dirname, '../../uploads')));
//ROUTES

app.use('/',productRouter)

app.use('/',userRouter)

app.use('/',stockRouter)

app.use('/',postRouter)

app.listen(3000)