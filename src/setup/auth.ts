import { setupBetterAuth } from "@/lib/auth";

/**
 * Setup demo galaxies - creates projects first, then links galaxies
 */
export async function setup(): Promise<void> {
    console.log('🔄 Setting up demo...')
    try {
        // Step 1: Setup better-auth collections and indexes
        console.log('🔐 Setting up better-auth...')
        await setupBetterAuth()
        console.log('✅ Better-auth setup completed\n')
    } catch (error) {
        console.error('Error setting up demo galaxies:', error)
        throw error
    }
}


