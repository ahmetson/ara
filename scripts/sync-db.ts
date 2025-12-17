import { MongoClient, Db } from 'mongodb';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Parse MONGODB_URI from a .env file
function getMongoUriFromFile(filePath: string): string | undefined {
    try {
        const content = readFileSync(filePath, 'utf-8');
        for (const line of content.split('\n')) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const match = trimmed.match(/^MONGODB_URI=(.*)$/);
                if (match) {
                    let value = match[1].trim();
                    // Remove quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    return value;
                }
            }
        }
    } catch (error) {
        return undefined;
    }
    return undefined;
}

// Load environment variables from .env and .env.dev
function loadEnv() {
    const rootDir = resolve(process.cwd());

    const remoteUri = getMongoUriFromFile(resolve(rootDir, '.env'));
    const localUri = getMongoUriFromFile(resolve(rootDir, '.env.dev'));

    return { remoteUri, localUri };
}

const DB_NAME = 'Ara';

async function syncDatabases() {
    console.log('🔄 Starting database sync...\n');

    // Load environment variables
    const { remoteUri, localUri } = loadEnv();

    if (!remoteUri) {
        throw new Error('MONGODB_URI not found in .env file');
    }

    if (!localUri) {
        throw new Error('MONGODB_URI not found in .env.dev file');
    }

    console.log('📡 Connecting to local MongoDB...');
    const localClient = new MongoClient(localUri);
    await localClient.connect();
    const localDb = localClient.db(DB_NAME);
    console.log('✅ Connected to local MongoDB\n');

    console.log('📡 Connecting to remote MongoDB...');
    const remoteClient = new MongoClient(remoteUri);
    await remoteClient.connect();
    const remoteDb = remoteClient.db(DB_NAME);
    console.log('✅ Connected to remote MongoDB\n');

    try {
        // Get all collections from local database
        console.log('📋 Getting list of collections from local database...');
        const localCollections = await localDb.listCollections().toArray();
        const localCollectionNames = localCollections.map(col => col.name);
        console.log(`Found ${localCollectionNames.length} collections: ${localCollectionNames.join(', ')}\n`);

        // Get all collections from remote database
        console.log('📋 Getting list of collections from remote database...');
        const remoteCollections = await remoteDb.listCollections().toArray();
        const remoteCollectionNames = new Set(remoteCollections.map(col => col.name));
        console.log(`Found ${remoteCollectionNames.size} collections: ${Array.from(remoteCollectionNames).join(', ')}\n`);

        // Find collections that exist in local but not in remote
        const collectionsToSync = localCollectionNames.filter(name => !remoteCollectionNames.has(name));

        if (collectionsToSync.length === 0) {
            console.log('✅ All collections already exist in remote database. Nothing to sync.\n');
            return;
        }

        console.log(`🔄 Found ${collectionsToSync.length} collection(s) to sync: ${collectionsToSync.join(', ')}\n`);

        // Sync each collection
        for (const collectionName of collectionsToSync) {
            console.log(`📦 Syncing collection: ${collectionName}`);

            const localCollection = localDb.collection(collectionName);
            const remoteCollection = remoteDb.collection(collectionName);

            // Get all documents from local collection
            const documents = await localCollection.find({}).toArray();
            console.log(`   Found ${documents.length} document(s) in local collection`);

            if (documents.length === 0) {
                console.log(`   ⚠️  Collection is empty, skipping...\n`);
                continue;
            }

            // Insert all documents into remote collection
            if (documents.length > 0) {
                await remoteCollection.insertMany(documents);
                console.log(`   ✅ Copied ${documents.length} document(s) to remote collection\n`);
            }
        }

        console.log('✅ Database sync completed successfully!\n');

    } finally {
        // Close connections
        await localClient.close();
        await remoteClient.close();
        console.log('🔌 Database connections closed');
    }
}

// Run the sync
syncDatabases()
    .then(() => {
        console.log('✨ Sync script finished');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error during sync:', error);
        process.exit(1);
    });
