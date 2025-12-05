import { ObjectId } from 'mongodb'
import { getCollection } from './db'

export type Roles = 'user' | 'maintainer' | 'contributor'

export interface UserModel {
    _id?: any
    email?: string
    src?: string
    alt?: string
    uri?: string
    nickname?: string
    sunshines?: number
    stars?: number
    role?: Roles
    balance?: number
}


export const emailToNickname = (email: string): string => {
    return email.split('@')[0]
}
/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<UserModel | null> {
    try {
        const collection = await getCollection<UserModel>('users')
        const result = await collection.findOne({ email })
        return result
    } catch (error) {
        console.error('Error getting user by email:', error)
        return null
    }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string | ObjectId): Promise<UserModel | null> {
    try {
        const collection = await getCollection<UserModel>('users')
        const objectId = typeof id === 'string' ? new ObjectId(id) : id
        const result = await collection.findOne({ _id: objectId })
        return result
    } catch (error) {
        console.error('Error getting user by id:', error)
        return null
    }
}

/**
 * Get multiple users by IDs
 */
export async function getUserByIds(ids: ObjectId[]): Promise<UserModel[]> {
    try {
        if (ids.length === 0) {
            return []
        }
        const collection = await getCollection<UserModel>('users')
        const result = await collection.find({ _id: { $in: ids } }).toArray()
        return result
    } catch (error) {
        console.error('Error getting users by ids:', error)
        return []
    }
}

/**
 * Create a new user
 */
export async function createUser(user: UserModel): Promise<ObjectId> {
    try {
        const collection = await getCollection<UserModel>('users')
        const result = await collection.insertOne(user as any)
        return result.insertedId
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

/**
 * Create multiple users in bulk
 */
export async function createUsers(users: UserModel[]): Promise<ObjectId[]> {
    try {
        if (users.length === 0) {
            return []
        }
        const collection = await getCollection<UserModel>('users')
        const result = await collection.insertMany(users as any)
        return Object.values(result.insertedIds)
    } catch (error) {
        console.error('Error creating users:', error)
        throw error
    }
}

/**
 * Get or create user by email (returns ObjectId)
 */
export async function getOrCreateUserByEmail(email: string): Promise<ObjectId> {
    try {
        // Try to get existing user
        const existingUser = await getUserByEmail(email)
        if (existingUser && existingUser._id) {
            return existingUser._id
        }

        // Create new user if doesn't exist
        const newUser: UserModel = {
            email,
            role: 'maintainer',
            nickname: emailToNickname(email),
        }
        const insertedId = await createUser(newUser)
        return insertedId
    } catch (error) {
        console.error('Error getting or creating user by email:', error)
        throw error
    }
}

