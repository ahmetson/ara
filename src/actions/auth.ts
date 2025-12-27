import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { getAccountsByUserId, getAuthUserById } from '@/server-side/auth'
import type { AuthAccount, AuthUser } from '@/types/auth'

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
    getAuthUserById: defineAction({
        input: z.object({
            userId: z.string(),
        }),
        handler: async ({ userId }): Promise<{ success: boolean; data?: AuthUser; error?: string }> => {
            try {
                const authUser = await getAuthUserById(userId)
                if (!authUser) {
                    return {
                        success: false,
                        error: 'Auth user not found',
                    }
                }
                return {
                    success: true,
                    data: authUser,
                }
            } catch (error) {
                console.error('Error getting auth user by id:', error)
                return {
                    success: false,
                    error: 'An error occurred while getting auth user',
                }
            }
        },
    }),
}
