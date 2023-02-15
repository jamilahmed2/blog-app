import { MongoClient } from 'mongodb'

import mongoose from 'mongoose'
mongoose.set('strictQuery', true);

let db;

async function connectToDb(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('react-blog-db');
    cb();
}

export { db, connectToDb }