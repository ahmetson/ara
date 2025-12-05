import { ObjectId } from 'mongodb';
import { getCollection, create } from './db'

export interface GalaxyModel {
    _id?: ObjectId
    maintainer: ObjectId
    name: string;
    description: string;
    stars: number;
    sunshines: number;
    users: number;
    donationAmount: number;
    x: number;
    y: number;
    tags?: string[];
}

/**
 * Get all galaxies
 */
export async function getAllGalaxies(): Promise<GalaxyModel[]> {
    try {
        const collection = await getCollection<GalaxyModel>('galaxies')
        const galaxies = await collection.find({}).toArray()
        return galaxies
    } catch (error) {
        console.error('Error getting all galaxies:', error)
        return []
    }
}

/**
 * Get galaxy by ID
 */
export async function getGalaxyById(id: string): Promise<GalaxyModel | null> {
    try {
        const collection = await getCollection<GalaxyModel>('galaxies')
        const result = await collection.findOne({ id })
        return result
    } catch (error) {
        console.error('Error getting galaxy by id:', error)
        return null
    }
}

/**
 * Create a new galaxy
 */
export async function createGalaxy(galaxy: GalaxyModel): Promise<boolean> {
    try {
        return await create<GalaxyModel>('galaxies', galaxy)
    } catch (error) {
        console.error('Error creating galaxy:', error)
        return false
    }
}

