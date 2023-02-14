import express from 'express'
const app = express();
const port = 8000
app.use(express.json());

let articlesInfo = [
    {
        name: "learn-react",
        upvotes: 0,
        comments: [],
    },
    {
        name: "learn-node",
        upvotes: 0,
        comments: [],
    },
    {
        name: "learn-mongodb",
        upvotes: 0,
        comments: [],
    }
];


app.put('/api/articles/:name/upvotes', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send('The article doen\'t exists');
    }
})

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