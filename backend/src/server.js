import express from 'express'
import {db, connectToDb } from './db.js';

const app = express();
const port = 8000
app.use(express.json());

// fetching data from local database
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params

    const article = db.collection('articles').findOne({ name })

    if (article) {
        res.json(article)
    } else {
        res.status(404).send({ message: "not found" })
    }
})

// adding upvotes
app.put('/api/articles/:name/upvotes', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })
    const article = await db.collection('articles').findOne({ name })

    if (article) {
        res.json(article);
    } else {
        res.send('The article doen\'t exists');
    }
})

// adding comments
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    })
    const article = await db.collection('articles').findOne({ name })

    if (article) {
        res.send(article)
    } else {
        res.send('The article doen\'t exists');
    }
})

connectToDb(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })
})
