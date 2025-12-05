import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { getDemoByEmail, createDemo } from '@/scripts/demo'
import { UserModel, Roles, emailToNickname, createUsers, getUserByIds } from '@/scripts/user'

/**
 * Generate a random user with profile picture from DiceBear
 */
function generateRandomUser(role: Roles, index: number): UserModel {
    const randomSeed = `${role}-${index}-${Date.now()}-${Math.random()}`
    const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${randomSeed}&size=256`

    // Generate random names for demo
    const names = [
        'Alex Johnson',
        'Sam Taylor',
        'Jordan Smith',
        'Casey Brown',
        'Morgan Davis',
        'Riley Wilson',
        'Avery Martinez',
        'Quinn Anderson',
        'Sage Thompson',
        'River Garcia'
    ]

    const randomName = names[Math.floor(Math.random() * names.length)]

    // Generate random stats
    const sunshines = Math.floor(Math.random() * 50000) + 10000
    const stars = Math.random() * 100 + 10

    return {
        src: avatarUrl,
        alt: `${role} avatar`,
        uri: '/profile?nickname=' + randomName.replace(' ', '-').toLowerCase(),
        nickname: randomName.replace(' ', '-').toLowerCase(),
        sunshines,
        stars: Math.round(stars * 100) / 100,
        role: role as Roles,
        balance: 0,
    }
}

/**
 * Create three demo users with different roles
 */
async function generateDemoUsers(email: string): Promise<UserModel[]> {
    const users = [{
        email,
        role: 'maintainer',
        nickname: emailToNickname(email),
        src: `https://api.dicebear.com/9.x/avataaars/svg?seed=${email}&size=256`,
        alt: 'Maintainer avatar',
        uri: '/profile?nickname=' + emailToNickname(email),
    } as UserModel,
    generateRandomUser('user', 1) as UserModel,
    generateRandomUser('contributor', 2) as UserModel
    ]
    const createdIds = await createUsers(users)
    return createdIds.map((id, index) => ({
        ...users[index],
        _id: id,
    }))

}

export const server = {
    start: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email(),
        }),
        handler: async ({ email }): Promise<{ success: boolean; users?: UserModel[]; error?: string }> => {
            try {
                // Check if demo exists
                const existingDemo = await getDemoByEmail(email)

                if (existingDemo) {
                    // Return existing users
                    const users = await getUserByIds(existingDemo.users)
                    // Convert ObjectId to string for serialization
                    const serializedUsers = users.map(user => ({
                        ...user,
                        _id: user._id?.toString(),
                    }))
                    return {
                        success: true,
                        users: serializedUsers,
                    }
                }

                // Create new demo with three users
                const users = await generateDemoUsers(email)
                const created = await createDemo(email, users.map(user => user._id))

                if (!created) {
                    return {
                        success: false,
                        error: 'Failed to create demo',
                    }
                }

                // Convert ObjectId to string for serialization
                const serializedUsers = users.map(user => ({
                    ...user,
                    _id: user._id?.toString(),
                }))

                return {
                    success: true,
                    users: serializedUsers,
                }
            } catch (error) {
                console.error('Error in demo start action:', error)
                return {
                    success: false,
                    error: 'An error occurred while starting the demo',
                }
            }
        },
    }),
}

