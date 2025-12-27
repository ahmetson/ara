import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"
import { actions } from 'astro:actions'
import type { AuthUser } from '@/types/auth'

export const authClient = createAuthClient({
    plugins: [
        usernameClient()
    ]
})

// Export methods from authClient for convenience
export const { signIn, signUp, signOut, useSession } = authClient

/**
 * Get auth user by ID
 */
export async function getAuthUserById(userId: string): Promise<AuthUser | null> {
    try {
        const result = await actions.getAuthUserById({ userId })
        if (result.data?.success && result.data.data) {
            return result.data.data
        }
        return null
    } catch (error) {
        console.error('Error getting auth user by id:', error)
        return null
    }
}
