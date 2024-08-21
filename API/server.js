import express from 'express'

const app = express()
app.use(express.json())

app.post('/produtos',(req,res)=>{
    res.status(201).json(req.body)
})
app.get('/produtos',(req,res)=>{
    res.send('OK')
})
app.put('')
app.delete('')

app.listen(3000)