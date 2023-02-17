import express from 'express'
import { db, connectToDb } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin'

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);

admin.initializeApp({
    credential: admin.cert(credentials),
})

const app = express();
const port = 8000
app.use(express.json());

// middleware
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
            // const user = await admin.auth().verifyIdToken(authtoken);
            // req.user = user;
        } catch (e) {
            res.sendStatus(400);
        }
    }
    next();
});

// fetching data from local database
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params
    const { uid } = req.user;

    const article = db.collection('articles').findOne({ name })

    if (article) {
        const upvotesIds = article.upvotesIds || [];
        article.canUpvote = uid && !upvotesIds.include(uid);
        res.json(article)
    } else {
        res.status(404).send({ message: "not found" })
    }
})


// middleware
app.use(async (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

// adding upvotes
app.put('/api/articles/:name/upvotes', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user

    if (article) {
        const upvotesIds = article.upvotesIds || [];
        const canUpvote = uid && !upvotesIds.include(uid);
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvotesIds: uid }
            })
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        res.send('The article doen\'t exists');
    }
})

// adding comments
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
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
