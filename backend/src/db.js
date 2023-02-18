import { MongoClient } from 'mongodb'
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
let db;

async function connectToDb(cb) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ep9cpnh.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db = client.db('react-blog-app');
    cb();
}

export { db, connectToDb }