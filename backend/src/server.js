import express from 'express'
import { MongoClient } from 'mongodb'

const app = express();
const port = 8000
app.use(express.json());

// fetching data from local database
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params

    const client = new MongoClient('http://127.0.0.1:27107');
    await client.connect();

    const db = client.db('react-blog-db');

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

    const client = new MongoClient('http://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })
    const article = await db.collection('articles').findOne({ name })

    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send('The article doen\'t exists');
    }
})

// adding comments
app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.comments.push({ postedBy, text });
        res.send(article.comments)
    } else {
        res.send('The article doen\'t exists');
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})