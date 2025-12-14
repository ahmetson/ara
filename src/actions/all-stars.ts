import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Wallet } from 'ethers'
import { getAllStarStats, checkSolarForgeByIssue, updateIssueStars, getGalaxySpace, getUserStar as getUserStarFromSpace, upsertSpaceUserStar, updateUserStarPosition as updateUserStarPositionDb } from '@/server-side/all-stars'
import { getIssueById, updateIssueSolarForgeTxid } from '@/server-side/issue'
import { updateUserStars, getUserById } from '@/server-side/user'
import { getGalaxyById } from '@/server-side/galaxy'
import { getVersionById } from '@/server-side/roadmap'
import type { AllStarStats, SolarForgeByIssueResult, SolarForgeByVersionResult, SolarUser } from '@/types/all-stars'
import { solarForge } from '@/types/all-stars'
import { send } from '../../packages/blockchain-gateway/client-side/client'
import type { RequestSolarForge, ReplySolarForge, ReplyError } from '../../packages/blockchain-gateway/server-side/server.types'
import type { SerializedSolarForge } from '../../packages/blockchain-gateway/server-side/server.types'

// Shared function for solar forging an issue (used by both action and solarForgeByVersion)
async function solarForgeByIssue(issueId: string): Promise<SolarForgeByIssueResult> {
    console.log(`🔥 [solarForgeByIssue] Starting solar forge for issue: ${issueId}`)
    try {
        // Check if already solar forged
        const alreadyForged = await checkSolarForgeByIssue(issueId)
        if (alreadyForged) {
            console.log(`⚠️ [solarForgeByIssue] Issue ${issueId} already forged, skipping`)
            return {
                users: [],
                solarForgeId: '',
                error: 'duplicate',
            }
        }

        // Get issue
        const issue = await getIssueById(issueId)
        if (!issue) {
            console.error(`❌ [solarForgeByIssue] Issue ${issueId} not found`)
            return {
                users: [],
                solarForgeId: '',
                error: 'Issue not found',
            }
        }

        console.log(`📊 [solarForgeByIssue] Issue ${issueId}: sunshines=${issue.sunshines}, author=${issue.author}, contributor=${issue.contributor}, maintainer=${issue.maintainer}`)

        // Check if issue has sunshines
        if (!issue.sunshines || issue.sunshines <= 0) {
            console.log(`⚠️ [solarForgeByIssue] Issue ${issueId} has no sunshines (${issue.sunshines}), skipping`)
            return {
                users: [],
                solarForgeId: '',
                error: 'Issue has no sunshines',
            }
        }

        // Calculate stars
        const totalStars = solarForge(issue.sunshines)
        const starsPerRole = totalStars / 3
        console.log(`⭐ [solarForgeByIssue] Calculated: totalStars=${totalStars}, starsPerRole=${starsPerRole}`)

        // Get stakeholders: author, contributor, maintainer
        const stakeholders: Array<{ userId: string; role: string }> = []
        if (issue.author) {
            stakeholders.push({ userId: issue.author, role: 'author' })
        }
        if (issue.contributor) {
            stakeholders.push({ userId: issue.contributor, role: 'contributor' })
        }
        if (issue.maintainer) {
            stakeholders.push({ userId: issue.maintainer, role: 'maintainer' })
        }

        console.log(`👥 [solarForgeByIssue] Found ${stakeholders.length} stakeholders:`, stakeholders.map(s => `${s.role}:${s.userId}`))

        // Reduce duplicates: group by userId, collect roles
        const userMap = new Map<string, { roles: string[]; stars: number }>()
        for (const stakeholder of stakeholders) {
            const existing = userMap.get(stakeholder.userId)
            if (existing) {
                existing.roles.push(stakeholder.role)
                existing.stars += starsPerRole
            } else {
                userMap.set(stakeholder.userId, {
                    roles: [stakeholder.role],
                    stars: starsPerRole,
                })
            }
        }

        console.log(`👥 [solarForgeByIssue] After deduplication: ${userMap.size} unique users`)

        // Update issue: reset sunshines to 0, increment stars
        console.log(`💾 [solarForgeByIssue] Updating issue: adding ${totalStars} stars, resetting ${issue.sunshines} sunshines`)
        const issueUpdated = await updateIssueStars(issueId, totalStars, issue.sunshines)
        if (!issueUpdated) {
            console.error(`❌ [solarForgeByIssue] Failed to update issue ${issueId}`)
            return {
                users: [],
                solarForgeId: '',
                error: 'Failed to update issue',
            }
        }
        console.log(`✅ [solarForgeByIssue] Issue updated successfully`)

        // Update users: increment stars for each stakeholder
        const solarUsers: SolarUser[] = []
        const userIds: string[] = []
        const userAddresses: string[] = []

        console.log(`👤 [solarForgeByIssue] Processing ${userMap.size} users for star updates`)
        for (const [userId, data] of userMap.entries()) {
            console.log(`👤 [solarForgeByIssue] Processing user ${userId}: roles=${data.roles.join(',')}, stars=${data.stars}`)
            const userUpdated = await updateUserStars(userId, data.stars)
            if (userUpdated) {
                const user = await getUserById(userId)
                if (!user) {
                    console.warn(`⚠️ [solarForgeByIssue] User ${userId} not found after update`)
                    continue
                }

                // Derive Ethereum address from demoPrivateKey
                if (!user.demoPrivateKey) {
                    console.error(`❌ [solarForgeByIssue] User ${userId} missing demoPrivateKey, skipping blockchain solar forge`)
                    continue
                }

                try {
                    const wallet = new Wallet(user.demoPrivateKey)
                    const address = wallet.address
                    userAddresses.push(address)
                    console.log(`✅ [solarForgeByIssue] User ${userId} address: ${address}`)
                } catch (error) {
                    console.error(`❌ [solarForgeByIssue] Error deriving address for user ${userId}:`, error)
                    continue
                }

                if (issue.galaxy) {
                    await upsertSpaceUserStar({
                        galaxyId: issue.galaxy,
                        userId,
                        data: {
                            nickname: user.nickname,
                            src: user.src,
                            alt: user.alt,
                            stars: user.stars,
                            sunshines: user.sunshines,
                            role: user.role,
                            uri: user.uri,
                        },
                    })
                }
                solarUsers.push({
                    id: userId,
                    roles: data.roles,
                    stars: data.stars,
                })
                userIds.push(userId)
            }
        }

        // Check if we have addresses for all stakeholders
        if (userAddresses.length === 0) {
            console.error(`❌ [solarForgeByIssue] No valid user addresses found for blockchain solar forge`)
            return {
                users: [],
                solarForgeId: '',
                error: 'No valid user addresses found for blockchain solar forge',
            }
        }

        console.log(`🌌 [solarForgeByIssue] Found ${userAddresses.length} user addresses for blockchain`)

        // Get galaxy to get blockchainId
        const galaxy = await getGalaxyById(issue.galaxy)
        if (!galaxy || !galaxy.blockchainId) {
            console.error(`❌ [solarForgeByIssue] Galaxy ${issue.galaxy} not found or missing blockchainId`)
            return {
                users: [],
                solarForgeId: '',
                error: 'Galaxy not found or missing blockchainId',
            }
        }

        console.log(`🌌 [solarForgeByIssue] Galaxy blockchainId: ${galaxy.blockchainId}`)

        // Create SerializedSolarForge for blockchain
        const serializedSolarForge: SerializedSolarForge = {
            _id: issueId,
            solarForgeType: 'issue',
            issueId: issueId,
            users: userAddresses,
            stars: totalStars,
        }

        console.log(`🔗 [solarForgeByIssue] Calling blockchain gateway:`, {
            galaxyId: galaxy.blockchainId,
            issueId: issueId,
            users: userAddresses.length,
            stars: totalStars,
        })

        // Call blockchain gateway solarForge
        try {
            const request: RequestSolarForge = {
                cmd: "solarForge",
                params: {
                    galaxyId: galaxy.blockchainId,
                    models: [serializedSolarForge],
                }
            }

            console.log(`📡 [solarForgeByIssue] Sending request to blockchain gateway...`)
            const reply = await send(request)
            console.log(`📡 [solarForgeByIssue] Received reply from blockchain gateway`)

            if ('error' in reply) {
                const errorReply = reply as ReplyError
                console.error(`❌ [solarForgeByIssue] Blockchain solar forge error:`, errorReply.error)
                return {
                    users: [],
                    solarForgeId: '',
                    error: `Blockchain error: ${errorReply.error}`,
                }
            }

            const successReply = reply as ReplySolarForge
            const txHash = successReply.params.txHash
            console.log(`✅ [solarForgeByIssue] Blockchain transaction successful: ${txHash}`)

            // Update issue with solarForgeTxid
            const updated = await updateIssueSolarForgeTxid(issueId, txHash)
            if (!updated) {
                console.error(`⚠️ [solarForgeByIssue] Failed to update issue with solarForgeTxid`)
                // Still return success since blockchain transaction succeeded
            } else {
                console.log(`✅ [solarForgeByIssue] Issue updated with solarForgeTxid: ${txHash}`)
            }

            console.log(`🎉 [solarForgeByIssue] Solar forge completed successfully for issue ${issueId}: ${solarUsers.length} users, tx: ${txHash}`)
            return {
                users: solarUsers,
                solarForgeId: txHash,
            }
        } catch (error) {
            console.error(`❌ [solarForgeByIssue] Error calling blockchain gateway:`, error)
            return {
                users: [],
                solarForgeId: '',
                error: `Failed to call blockchain gateway: ${error instanceof Error ? error.message : String(error)}`,
            }
        }

    } catch (error) {
        console.error(`❌ [solarForgeByIssue] Unexpected error:`, error)
        return {
            users: [],
            solarForgeId: '',
            error: 'An error occurred while solar forging issue',
        }
    }
}

export const server = {
    allStarStats: defineAction({
        accept: 'json',
        input: z.object({}),
        handler: async (): Promise<AllStarStats> => {
            try {
                const stats = await getAllStarStats()
                return stats
            } catch (error) {
                console.error('Error in allStarStats action:', error)
                // Return default values on error
                return {
                    totalGalaxies: 0,
                    totalStars: 0,
                    totalUsers: 0,
                    totalSunshines: 0,
                }
            }
        },
    }),
    getGalaxySpace: defineAction({
        accept: 'json',
        input: z.object({
            galaxyId: z.string(),
        }),
        handler: async ({ galaxyId }) => {
            const space = await getGalaxySpace(galaxyId)
            return { space }
        },
    }),
    getUserStar: defineAction({
        accept: 'json',
        input: z.object({
            galaxyId: z.string(),
            userId: z.string(),
        }),
        handler: async ({ galaxyId, userId }) => {
            const userStar = await getUserStarFromSpace(galaxyId, userId)
            return { userStar }
        },
    }),
    updateUserStarPosition: defineAction({
        accept: 'json',
        input: z.object({
            galaxyId: z.string(),
            userId: z.string(),
            x: z.number(),
            y: z.number(),
        }),
        handler: async ({ galaxyId, userId, x, y }) => {
            const success = await updateUserStarPositionDb({ galaxyId, userId, x, y })
            return { success }
        },
    }),
    // solarForgeByIssue: defineAction({
    //     accept: 'json',
    //     input: z.object({
    //         issueId: z.string(),
    //     }),
    //     handler: async ({ issueId }): Promise<SolarForgeByIssueResult> => {
    //         try {
    //             const alreadyForged = await checkSolarForgeByIssue(issueId)
    //             if (alreadyForged) {
    //                 return {
    //                     users: [],
    //                     solarForgeId: '',
    //                     error: 'duplicate',
    //                 }
    //             }

    //             // Get issue
    //             const issue = await getIssueById(issueId)
    //             if (!issue) {
    //                 return {
    //                     users: [],
    //                     solarForgeId: '',
    //                     error: 'Issue not found',
    //                 }
    //             }

    //             // Check if issue has sunshines
    //             if (!issue.sunshines || issue.sunshines <= 0) {
    //                 return {
    //                     users: [],
    //                     solarForgeId: '',
    //                     error: 'Issue has no sunshines',
    //                 }
    //             }

    //             // Calculate stars
    //             const totalStars = solarForge(issue.sunshines)
    //             const starsPerRole = totalStars / 3

    //             // Get stakeholders: author, contributor, maintainer
    //             const stakeholders: Array<{ userId: string; role: string }> = []
    //             if (issue.author) {
    //                 stakeholders.push({ userId: issue.author, role: 'author' })
    //             }
    //             if (issue.contributor) {
    //                 stakeholders.push({ userId: issue.contributor, role: 'contributor' })
    //             }
    //             if (issue.maintainer) {
    //                 stakeholders.push({ userId: issue.maintainer, role: 'maintainer' })
    //             }

    //             // Reduce duplicates: group by userId, collect roles
    //             const userMap = new Map<string, { roles: string[]; stars: number }>()
    //             for (const stakeholder of stakeholders) {
    //                 const existing = userMap.get(stakeholder.userId)
    //                 if (existing) {
    //                     existing.roles.push(stakeholder.role)
    //                     existing.stars += starsPerRole
    //                 } else {
    //                     userMap.set(stakeholder.userId, {
    //                         roles: [stakeholder.role],
    //                         stars: starsPerRole,
    //                     })
    //                 }
    //             }

    //             // Update issue: reset sunshines to 0, increment stars
    //             const issueUpdated = await updateIssueStars(issueId, totalStars, issue.sunshines)
    //             if (!issueUpdated) {
    //                 return {
    //                     users: [],
    //                     solarForgeId: '',
    //                     error: 'Failed to update issue',
    //                 }
    //             }

    //             // Update users: increment stars for each stakeholder
    //             const solarUsers: SolarUser[] = []
    //             const userIds: string[] = []
    //             for (const [userId, data] of userMap.entries()) {
    //                 const userUpdated = await updateUserStars(userId, data.stars)
    //                 if (userUpdated) {
    //                     solarUsers.push({
    //                         id: userId,
    //                         roles: data.roles,
    //                         stars: data.stars,
    //                     })
    //                     userIds.push(userId)
    //                 }
    //             }

    //             // Create solar forge tracker entry
    //             const solarForgeId = await createSolarForge({
    //                 solarForgeType: 'issue',
    //                 issueId: issueId,
    //                 users: userIds,
    //                 sunshines: issue.sunshines,
    //                 createdTime: Math.floor(Date.now() / 1000),
    //             })

    //             // Broadcast ISSUE_UPDATE event (client-side will handle this)
    //             // Note: Events are typically broadcast on client-side, but we can emit here for server-side awareness
    //             // The client-side will fetch updated issue and broadcast

    //             // Broadcast USER_UPDATE events for each updated user
    //             for (const userId of userIds) {
    //                 const user = await getUserById(userId)
    //                 if (user) {
    //                     // Note: Events are typically handled client-side
    //                     // The client will listen and update accordingly
    //                 }
    //             }

    //             return {
    //                 users: solarUsers,
    //                 solarForgeId,
    //             }
    //         } catch (error) {
    //             console.error('Error in solarForgeByIssue:', error)
    //             return {
    //                 users: [],
    //                 solarForgeId: '',
    //                 error: 'An error occurred while solar forging issue',
    //             }
    //         }
    //     },
    // }),
    solarForgeByVersion: defineAction({
        accept: 'json',
        input: z.object({
            versionId: z.string(),
        }),
        handler: async ({ versionId }): Promise<SolarForgeByVersionResult> => {
            console.log(`🚀 [solarForgeByVersion] Starting solar forge for version: ${versionId}`)
            try {
                // Get version
                const version = await getVersionById(versionId)
                if (!version) {
                    console.error(`❌ [solarForgeByVersion] Version ${versionId} not found`)
                    return {
                        users: [],
                        totalIssues: 0,
                        totalSunshines: 0,
                        totalStars: 0,
                    }
                }

                console.log(`📦 [solarForgeByVersion] Version found: ${version.tag || versionId}, patches: ${version.patches.length}`)

                // Get all issues from patches
                const issueIds = version.patches.map(patch => patch.id)
                if (issueIds.length === 0) {
                    console.warn(`⚠️ [solarForgeByVersion] No issues found in version ${versionId}`)
                    return {
                        users: [],
                        totalIssues: 0,
                        totalSunshines: 0,
                        totalStars: 0,
                    }
                }

                console.log(`📋 [solarForgeByVersion] Processing ${issueIds.length} issues:`, issueIds)

                // Call solarForgeByIssue for each issue
                const allSolarUsers = new Map<string, SolarUser>()
                let totalSunshines = 0
                let totalStars = 0
                let processedIssues = 0

                for (let i = 0; i < issueIds.length; i++) {
                    const issueId = issueIds[i]
                    console.log(`\n📝 [solarForgeByVersion] Processing issue ${i + 1}/${issueIds.length}: ${issueId}`)

                    // Get issue to check sunshines BEFORE calling solarForgeByIssue
                    // (because solarForgeByIssue will reset sunshines to 0)
                    const issue = await getIssueById(issueId)
                    if (!issue) {
                        console.warn(`⚠️ [solarForgeByVersion] Issue ${issueId} not found, skipping`)
                        continue
                    }

                    const issueSunshines = issue.sunshines || 0
                    if (issueSunshines <= 0) {
                        console.log(`⚠️ [solarForgeByVersion] Issue ${issueId} has no sunshines (${issueSunshines}), skipping`)
                        continue
                    }

                    // Calculate stars from original sunshines (before they're reset)
                    const issueStars = solarForge(issueSunshines)
                    console.log(`⭐ [solarForgeByVersion] Issue ${issueId}: sunshines=${issueSunshines}, stars=${issueStars}`)

                    // Call solarForgeByIssue internal function (this will handle duplicate check internally)
                    const result = await solarForgeByIssue(issueId)
                    if (result.error && result.error !== 'duplicate') {
                        // Skip issues with errors (except duplicates which are expected)
                        console.warn(`⚠️ [solarForgeByVersion] Issue ${issueId} had error: ${result.error}, skipping`)
                        continue
                    }

                    if (result.error === 'duplicate') {
                        console.log(`ℹ️ [solarForgeByVersion] Issue ${issueId} already forged (duplicate), but counting stats`)
                        // Still count stats for duplicates
                        processedIssues++
                        totalSunshines += issueSunshines
                        totalStars += issueStars
                        continue
                    }

                    if (result.users.length > 0) {
                        processedIssues++
                        totalSunshines += issueSunshines
                        totalStars += issueStars
                        console.log(`✅ [solarForgeByVersion] Issue ${issueId} processed: ${result.users.length} users, ${issueSunshines} sunshines, ${issueStars} stars`)

                        // Aggregate solar users: merge by userId, sum stars, combine roles
                        for (const solarUser of result.users) {
                            const existing = allSolarUsers.get(solarUser.id)
                            if (existing) {
                                // Merge roles (avoid duplicates)
                                const combinedRoles = [...new Set([...existing.roles, ...solarUser.roles])]
                                existing.roles = combinedRoles
                                existing.stars += solarUser.stars
                                console.log(`👤 [solarForgeByVersion] Aggregated user ${solarUser.id}: total stars=${existing.stars}, roles=${combinedRoles.join(',')}`)
                            } else {
                                allSolarUsers.set(solarUser.id, {
                                    id: solarUser.id,
                                    roles: [...solarUser.roles],
                                    stars: solarUser.stars,
                                })
                                console.log(`👤 [solarForgeByVersion] Added new user ${solarUser.id}: stars=${solarUser.stars}, roles=${solarUser.roles.join(',')}`)
                            }
                        }
                    } else {
                        console.warn(`⚠️ [solarForgeByVersion] Issue ${issueId} returned no users`)
                    }
                }

                // Convert map to array and sort by stars descending
                const aggregatedUsers = Array.from(allSolarUsers.values()).sort((a, b) => b.stars - a.stars)

                console.log(`\n🎉 [solarForgeByVersion] Completed: ${processedIssues} issues processed, ${aggregatedUsers.length} users, ${totalSunshines} total sunshines, ${totalStars} total stars`)
                console.log(`📊 [solarForgeByVersion] Final result:`, {
                    totalIssues: processedIssues,
                    totalSunshines,
                    totalStars,
                    usersCount: aggregatedUsers.length,
                })

                return {
                    users: aggregatedUsers,
                    totalIssues: processedIssues,
                    totalSunshines,
                    totalStars,
                }
            } catch (error) {
                console.error(`❌ [solarForgeByVersion] Unexpected error:`, error)
                return {
                    users: [],
                    totalIssues: 0,
                    totalSunshines: 0,
                    totalStars: 0,
                }
            }
        },
    }),
}

