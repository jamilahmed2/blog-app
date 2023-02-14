import express from 'express'
const app = express();
const port = 8000

app.get('/hello',(req,res)=>{
    res.status(200).send("Hello World!")
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})