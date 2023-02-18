import express from 'express'
import { db, connectToDb } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin'
// import path from 'path';
import 'dotenv/config';

const port = process.env.PORT || 8000
app.get('/', (req, res) => {
    res.send("Hello!  server deployed")
})

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

// serving statically
// app.use(express.static(path.join(__dirname, '../build')));
// app.get(/^(?!\/api).+/, (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })

// middleware
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};

    next();
});

// fetching data from local database
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params
    const { uid } = req.user;

    const article = db.collection('articles').findOne({ name })

    if (article) {
        const upvotesIds = article.upvotesIds || [];
        article.canUpvote = uid && !upvotesIds.includes(uid);

        res.json(article);
    } else {
        res.sendStatus(404);
    }
})


// middleware
app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

// adding upvotes
app.put('/api/articles/:name/upvotes', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvotesIds = article.upvotesIds || [];
        const canUpvote = uid && !upvotesIds.includes(uid);

        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvotesIds: uid },
            });
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
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
})

connectToDb(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    })
});
