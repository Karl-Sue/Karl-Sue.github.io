import { MongoClient, Db } from 'mongodb';
import { Env } from '../types';


// Cached client instance
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(env: Env): Promise<Db> {
    if (cachedDb && cachedClient) {
        return cachedDb;
    }

    const uri: string = env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI env var is missing.');
    }

    const dbName: string = env.DB_NAME || 'test_database';

    // Create client
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        minPoolSize: 0,
        maxIdleTimeMS: 10000,
    });

    await client.connect();

    await client.db('admin').command({ ping: 1 });
    console.log('Successfully connected!');

    cachedClient = client;
    cachedDb = client.db(dbName);
    
    return cachedDb;
}
