import { getCollection, create } from './db'
import { UserModel } from './user'
import { DEMO_COOKIE_NAMES } from './demo-constants'

export interface DemoModel {
    _id?: any
    email: string
    created: number
    users: UserModel[]
}

// Re-export constants for server-side use
export { DEMO_COOKIE_NAMES, demoProjectName } from './demo-constants'

/**
 * Get demo by email
 */
export async function getDemoByEmail(email: string): Promise<DemoModel | null> {
    try {
        const collection = await getCollection<DemoModel>('demo')
        const result = await collection.findOne({ email })
        return result
    } catch (error) {
        console.error('Error getting demo by email:', error)
        return null
    }
}

/**
 * Create new demo entry
 */
export async function createDemo(email: string, users: UserModel[]): Promise<boolean> {
    try {
        const demo: DemoModel = {
            email,
            created: Date.now(),
            users,
        }
        return await create<DemoModel>('demo', demo)
    } catch (error) {
        console.error('Error creating demo:', error)
        return false
    }
}

/**
 * Get users for a demo email
 */
export async function getDemoUsers(email: string): Promise<UserModel[] | null> {
    const demo = await getDemoByEmail(email)
    return demo?.users || null
}

/**
 * Check if demo cookies exist (server-side)
 * This function checks Astro.cookies for demo-email, demo-users, and demo-role
 */
export async function isCookieExist(cookies: any): Promise<boolean> {
    try {
        const emailCookie = cookies.get(DEMO_COOKIE_NAMES.email)
        const usersCookie = cookies.get(DEMO_COOKIE_NAMES.users)
        const roleCookie = cookies.get(DEMO_COOKIE_NAMES.role)

        if (!emailCookie?.value || !usersCookie?.value || !roleCookie?.value) {
            return false
        }

        // Validate that users cookie is valid JSON
        try {
            JSON.parse(usersCookie.value)
        } catch {
            return false
        }

        return true
    } catch (error) {
        console.error('Error checking demo cookies:', error)
        return false
    }
}

