const { MongoClient } = require('mongodb');
const { MONGODB_URL } = require('../config/serverConfig');

let userCollection;
let dreamsCollection;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(MONGODB_URL);
        const db = client.db('dreamlog');
        userCollection = db.collection('users');
        dreamsCollection = db.collection("dreams");
        console.log('Database connected');
    } catch (error) {
        console.log('MongoDB connection failed:', error);
        process.exit(1); 
    }
}

const getDB = () => db;

const getUserCollection = () => userCollection;
const getDreamsCollection = () => dreamsCollection;

module.exports = { connectDB, getDB, getUserCollection, getDreamsCollection };