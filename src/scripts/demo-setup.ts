import { getCollection } from './db'
import { getOrCreateUserByEmail } from './user'
import { GalaxyModel } from './galaxy'

// Initial galaxy data for demo setup
const initialGalaxies: Omit<GalaxyModel, '_id' | 'maintainer'>[] = [
    {
        name: 'Hyperpayment',
        description: 'A protocol and its implementation to transfer a resource between arbitrary amount parties. Used for example in Ara to distribute donations',
        stars: 0,
        sunshines: 0,
        users: 0,
        donationAmount: 0,
        x: 1300,
        y: 100,
        tags: ['Payment', 'Protocol', 'Blockchain', 'Solidity', 'P2P'],
    },
    {
        name: 'Reflect',
        description: 'A modern reflection library for TypeScript and JavaScript',
        stars: 0,
        sunshines: 0,
        users: 189,
        donationAmount: 0,
        x: 1200,
        y: 400,
        tags: ['TypeScript', 'JavaScript', 'Library', 'Reflection', 'Meta'],
    },
    {
        name: 'Ara App',
        description: 'The frontend application for Ara platform',
        stars: 0,
        sunshines: 0,
        users: 0,
        donationAmount: 0,
        x: 400,
        y: 200,
        tags: ['Frontend', 'React', 'Astro', 'Web3', 'Open Source'],
    },
    {
        name: 'Blockchain Verification Tool',
        description: 'An open-source tool for verifying software components on the blockchain',
        stars: 0,
        sunshines: 0,
        users: 0,
        donationAmount: 0,
        x: 1000,
        y: 600,
        tags: ['Blockchain', 'Verification', 'Security', 'Tool', 'Ethereum'],
    },
    {
        name: 'Galaxy Engine',
        description: 'A rendering engine for creating beautiful galaxy visualizations',
        stars: 0,
        sunshines: 0,
        users: 0,
        donationAmount: 0,
        x: 400,
        y: 500,
        tags: ['Graphics', 'WebGL', 'Visualization', '3D', 'Rendering'],
    },
]

/**
 * Setup demo galaxies - checks if galaxies exist, creates first 5 if missing
 */
export async function setupDemoGalaxies(): Promise<void> {
    try {
        // Check if any galaxies exist
        const collection = await getCollection<GalaxyModel>('galaxies')
        const count = await collection.countDocuments({})

        if (count > 0) {
            console.log(`✅ Galaxies already exist (${count} found)`)
            return
        }

        // Get or create maintainer user
        const maintainerId = await getOrCreateUserByEmail('milayter@gmail.com')
        console.log(`✅ Maintainer user ID: ${maintainerId}`)

        // Create first 5 galaxies with maintainer reference
        const galaxiesToCreate: GalaxyModel[] = initialGalaxies.map((galaxy) => ({
            ...galaxy,
            maintainer: maintainerId,
        }))

        // Insert galaxies
        const insertResult = await collection.insertMany(galaxiesToCreate as any)
        console.log(`✅ Created ${insertResult.insertedCount} demo galaxies`)
    } catch (error) {
        console.error('Error setting up demo galaxies:', error)
        throw error
    }
}

