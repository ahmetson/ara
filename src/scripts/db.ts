import { MongoClient, Db, Collection } from 'mongodb'

interface WishlistModel {
    _id?: any
    email: string
    time: number
}

let client: MongoClient | null = null
let db: Db | null = null
let isConnected = false
let dbInitialized = false

const DB_NAME = 'Ara'

async function getClient(): Promise<MongoClient> {
    if (!client) {
        const uri = import.meta.env.MONGODB_URI
        if (!uri) {
            throw new Error('MONGODB_URI environment variable is not set')
        }
        client = new MongoClient(uri)
        await client.connect()
        isConnected = true
        console.log('✅ Database connected successfully')
    }
    return client
}

async function getDb(): Promise<Db> {
    if (!db) {
        const mongoClient = await getClient()
        db = mongoClient.db(DB_NAME)

        // Check if database exists
        try {
            const adminDb = mongoClient.db('admin').admin()
            const databases = await adminDb.listDatabases()
            const dbExists = databases.databases.some((d: { name: string }) => d.name === DB_NAME)

            if (!dbExists) {
                // Create database by creating a collection (MongoDB creates DB implicitly)
                // We'll create a dummy collection to ensure the database exists
                const tempCollection = db.collection('_init')
                await tempCollection.insertOne({ _init: true, createdAt: new Date() })
                await tempCollection.deleteOne({ _init: true })
                console.log(`✅ Database '${DB_NAME}' created`)
                dbInitialized = true
            } else {
                console.log(`✅ Database '${DB_NAME}' already exists`)
                dbInitialized = false
            }
        } catch (error) {
            // If we can't check, assume it doesn't exist and create it
            console.log(`⚠️  Could not check database existence, creating '${DB_NAME}'...`)
            const tempCollection = db.collection('_init')
            await tempCollection.insertOne({ _init: true, createdAt: new Date() })
            await tempCollection.deleteOne({ _init: true })
            console.log(`✅ Database '${DB_NAME}' created`)
            dbInitialized = true
        }

        console.log(`📊 Database name: ${DB_NAME}`)
        console.log(`🔌 Connection status: ${isConnected ? 'Connected' : 'Disconnected'}`)
        console.log(`🆕 Database was created: ${dbInitialized ? 'Yes' : 'No (already existed)'}`)
    }
    return db
}

async function getWishlistCollection(): Promise<Collection<WishlistModel>> {
    const database = await getDb()
    return database.collection<WishlistModel>('wishlist')
}

export async function isWishlisted(email: string): Promise<boolean> {
    try {
        const collection = await getWishlistCollection()
        const result = await collection.findOne({ email })
        return result !== null
    } catch (error) {
        console.error('Error checking if email is wishlisted:', error)
        return false
    }
}

export async function joinWishlist(email: string): Promise<boolean> {
    try {
        const collection = await getWishlistCollection()
        const wishlistEntry: WishlistModel = {
            email,
            time: Date.now()
        }
        await collection.insertOne(wishlistEntry)
        return true
    } catch (error) {
        console.error('Error joining wishlist:', error)
        return false
    }
}

