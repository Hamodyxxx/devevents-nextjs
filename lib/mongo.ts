import mongoose, { Mongoose } from "mongoose";


/**
 * Interface representing the cached Mongoose connection.
 * 'conn' holds the active Mongoose connection, while 'promise' holds the connection attempt.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Global declaration to preserve the Mongoose connection across hot-reloads
 * in the Next.js development environment. This prevents multiple connections
 * from being opened and exceeding the database limits.
 */
declare global {
  var mongooseCache: MongooseCache;
}

// Initialize the cache object from the global scope or create a new one
let cached: MongooseCache = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {


    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, 
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default dbConnect;
