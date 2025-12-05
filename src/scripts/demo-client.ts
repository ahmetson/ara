import { useState, useEffect, useCallback, useMemo } from 'react'
import { DEMO_COOKIE_NAMES } from './demo-constants'
import { Roles, type UserModel } from './user'
import { actions } from 'astro:actions';

// Event types
export interface DemoUserCreatedEvent {
    email: string
    users: UserModel[]
    role: Roles
}

export interface DemoRoleChangeEvent {
    role: Roles
}

// Cookie management functions
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()?.split(';').shift() || '')
    }
    return null
}

function setCookie(name: string, value: string, days: number = 30): void {
    if (typeof document === 'undefined') return
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + days)
    const expires = expirationDate.toUTCString()
    document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

function clearCookie(name: string): void {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

// Get all demo cookies
export function getDemoCookies(): {
    email: string | null
    users: UserModel[] | null
    role: Roles | null
} {
    const email = getCookie(DEMO_COOKIE_NAMES.email)
    const usersStr = getCookie(DEMO_COOKIE_NAMES.users)
    const role = getCookie(DEMO_COOKIE_NAMES.role) as Roles | null

    let users: UserModel[] | null = null
    if (usersStr) {
        try {
            users = JSON.parse(usersStr)
        } catch {
            users = null
        }
    }

    return { email, users, role }
}

// Set all demo cookies
export function setDemoCookies(
    email: string,
    users: UserModel[],
    role: Roles,
    days: number = 30
): void {
    setCookie(DEMO_COOKIE_NAMES.email, email, days)
    setCookie(DEMO_COOKIE_NAMES.users, encodeURIComponent(JSON.stringify(users)), days)
    setCookie(DEMO_COOKIE_NAMES.role, role, days)
}

// Clear all demo cookies
export function clearDemoCookies(): void {
    clearCookie(DEMO_COOKIE_NAMES.email)
    clearCookie(DEMO_COOKIE_NAMES.users)
    clearCookie(DEMO_COOKIE_NAMES.role)
}

// Check if demo cookies exist
export function hasDemoCookies(): boolean {
    const { email, users, role } = getDemoCookies()
    return !!(email && users && role)
}

// Emit demo events
function emitDemoEvent(type: string, detail: any): void {
    if (typeof window === 'undefined') return
    window.dispatchEvent(
        new CustomEvent(type, {
            detail,
        })
    )
}

// Call the start action
export async function startDemo(
    email: string
): Promise<{ success: boolean; users?: UserModel[]; error?: string }> {
    try {
        const formData = new FormData()
        formData.append('email', email.trim())

        const { data, error } = await actions.start(formData)

        if (error) {
            return {
                success: false as const,
                error: error.message,
            }
        }


        return {
            success: true as const,
            users: data?.users,
        }

    } catch (err: any) {
        return {
            success: false,
            error: err.message || 'An error occurred. Please try again.',
        }
    }
}

// React hook for demo client
export function useDemoClient() {
    const [demoState, setDemoState] = useState(() => getDemoCookies())
    const [hasDemo, setHasDemo] = useState(() => hasDemoCookies())

    // Update state from cookies
    const updateState = useCallback(() => {
        const cookies = getDemoCookies()
        setDemoState(cookies)
        setHasDemo(hasDemoCookies())
    }, [])

    // Initialize state on mount
    useEffect(() => {
        updateState()
    }, [updateState])

    // Start demo function
    const handleStartDemo = useCallback(
        async (email: string): Promise<{ success: boolean; error?: string }> => {
            const result = await startDemo(email)

            if (result.success && result.users) {
                const defaultRole: Roles = 'maintainer'
                setDemoCookies(email.trim(), result.users, defaultRole)
                updateState()

                // Emit demo-user-created event
                emitDemoEvent('demo-user-created', {
                    email: email.trim(),
                    users: result.users,
                    role: defaultRole,
                })
            }

            return result
        },
        [updateState]
    )

    // Clear demo function
    const handleClearDemo = useCallback(() => {
        clearDemoCookies()
        updateState()

        // Emit demo-user-deleted event
        emitDemoEvent('demo-user-deleted', {})
    }, [updateState])

    // Change role function
    const handleChangeRole = useCallback(
        (role: Roles) => {
            const { email, users } = demoState
            if (email && users) {
                setDemoCookies(email, users, role)
                updateState()

                // Emit demo-role-change event
                emitDemoEvent('demo-role-change', { role })
            }
        },
        [demoState, updateState]
    )

    // Get current user based on role
    const currentUser = useMemo(() => {
        if (!demoState.users || !demoState.role) return null
        return demoState.users.find((u) => u.role === demoState.role) || null
    }, [demoState.users, demoState.role])

    return {
        email: demoState.email,
        users: demoState.users,
        role: demoState.role,
        hasDemo,
        currentUser,
        startDemo: handleStartDemo,
        clearDemo: handleClearDemo,
        changeRole: handleChangeRole,
        updateState,
    }
}

