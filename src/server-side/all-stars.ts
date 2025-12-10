import { ObjectId } from 'mongodb'
import { getCollection } from './db'
import { getAllGalaxies } from './galaxy'
import type { AllStarStats, SolarForgeModel } from '@/types/all-stars'
import type { UserModel } from './user'

/**
 * Get all star statistics by aggregating data from galaxies and users
 */
export async function getAllStarStats(): Promise<AllStarStats> {
    try {
        // Get all galaxies
        const galaxies = await getAllGalaxies()

        // Calculate totals from galaxies
        const totalGalaxies = galaxies.length
        const totalStars = galaxies.reduce((sum, galaxy) => sum + (galaxy.stars || 0), 0)
        const totalSunshines = galaxies.reduce((sum, galaxy) => sum + (galaxy.sunshines || 0), 0)

        // Count distinct users from users collection
        const usersCollection = await getCollection<UserModel>('users')
        const totalUsers = await usersCollection.countDocuments({})

        return {
            totalGalaxies,
            totalStars,
            totalUsers,
            totalSunshines,
        }
    } catch (error) {
        console.error('Error getting all star stats:', error)
        // Return default values on error
        return {
            totalGalaxies: 0,
            totalStars: 0,
            totalUsers: 0,
            totalSunshines: 0,
        }
    }
}

/**
 * Check if an issue has already been solar forged
 */
export async function checkSolarForgeByIssue(issueId: string | ObjectId): Promise<boolean> {
    try {
        const collection = await getCollection<SolarForgeModel>('solarForges')
        const issueIdStr = typeof issueId === 'string' ? issueId : issueId.toString()
        const result = await collection.findOne({
            solarForgeType: 'issue',
            issueId: issueIdStr,
        })
        return result !== null
    } catch (error) {
        console.error('Error checking solar forge by issue:', error)
        return false
    }
}

/**
 * Create a solar forge tracker entry
 */
export async function createSolarForge(solarForge: SolarForgeModel): Promise<string> {
    try {
        const collection = await getCollection<SolarForgeModel>('solarForges')
        const solarForgeModel = {
            ...solarForge,
            issueId: solarForge.issueId,
            createdTime: solarForge.createdTime || Math.floor(Date.now() / 1000),
        }
        const result = await collection.insertOne(solarForgeModel as any)
        return result.insertedId.toString()
    } catch (error) {
        console.error('Error creating solar forge:', error)
        throw error
    }
}

/**
 * Update issue: reset sunshines to 0 and increment stars
 */
export async function updateIssueStars(
    issueId: string | ObjectId,
    stars: number,
    sunshines: number
): Promise<boolean> {
    try {
        const { getCollection: getIssueCollection } = await import('./db')
        const collection = await getIssueCollection<any>('issues')
        const objectId = typeof issueId === 'string' ? new ObjectId(issueId) : issueId

        // Get current issue to check if stars field exists
        const issue = await collection.findOne({ _id: objectId })
        if (!issue) {
            return false
        }

        const updateOps: any = {
            $set: {
                sunshines: 0,
            },
        }

        // If stars field doesn't exist, set it; otherwise increment it
        if (issue.stars === undefined || issue.stars === null) {
            updateOps.$set.stars = stars
        } else {
            updateOps.$inc = {
                stars: stars,
            }
        }

        const result = await collection.updateOne(
            { _id: objectId },
            updateOps
        )
        return result.modifiedCount > 0
    } catch (error) {
        console.error('Error updating issue stars:', error)
        return false
    }
}

