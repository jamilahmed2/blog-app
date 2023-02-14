import express from 'express'
const app = express();
const port = 8000
app.use(express.json());

app.post('/hello',(req,res)=>{
    res.status(200).send(`Hello ${req.body.name}!`)
})

app.get('/hello/:name',(req,res)=>{
    const {name}= req.params;
    res.status(200).send(`Hello ${name}!!`)
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})