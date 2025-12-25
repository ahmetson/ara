import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { getAccountsByUserId } from '@/server-side/auth'
import type { AuthAccount } from '@/types/auth'

export const server = {
    getAccountsByUserId: defineAction({
        input: z.object({
            userId: z.string(),
        }),
        handler: async ({ userId }): Promise<{ success: boolean; data?: AuthAccount[]; error?: string }> => {
            try {
                const accounts = await getAccountsByUserId(userId)
                return {
                    success: true,
                    data: accounts,
                }
            } catch (error) {
                console.error('Error getting accounts by user id:', error)
                return {
                    success: false,
                    error: 'An error occurred while getting accounts',
                }
            }
        },
    }),
}
