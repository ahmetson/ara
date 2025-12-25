import { actions } from 'astro:actions'
import type { AuthAccount } from '@/types/auth'

/**
 * Get accounts by user ID
 */
export async function getAccountsByUserId(userId: string): Promise<AuthAccount[]> {
    try {
        const result = await actions.getAccountsByUserId({ userId })
        if (result.data?.success && result.data.data) {
            return result.data.data
        }
        return []
    } catch (error) {
        console.error('Error getting accounts by user id:', error)
        return []
    }
}
