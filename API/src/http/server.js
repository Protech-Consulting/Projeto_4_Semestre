import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const prisma = new PrismaClient()
import express from 'express'
import productRouter from './routes/product-route.js'
import userRouter from './routes/user-route.js'
import stockRouter from './routes/stock-route.js'

const app = express()
app.use(cors())
app.use(express.json())

//ROUTES

app.use('/',productRouter)

app.use('/',userRouter)

app.use('/',stockRouter)

app.listen(3000)