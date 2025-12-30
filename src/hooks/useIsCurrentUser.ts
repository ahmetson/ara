'use client'
import { useEffect, useState } from 'react'
import { authClient } from '@/client-side/auth'
import type { AuthUser } from '@/types/auth'

/**
 * Hook to check if the current signed-in user is viewing their own profile
 * @param starEmail - The email of the star being viewed
 * @returns Object with isCurrentUser boolean and loading state
 */
export function useIsCurrentUser(starEmail?: string | null) {
  const { data: session, isPending } = authClient.useSession()
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIsCurrentUser = async () => {
      if (isPending || !starEmail) {
        setIsCurrentUser(false)
        setIsLoading(false)
        return
      }

      const user = session?.user as AuthUser | undefined
      if (!user?.email) {
        setIsCurrentUser(false)
        setIsLoading(false)
        return
      }

      // Compare emails (case-insensitive)
      setIsCurrentUser(user.email.toLowerCase() === starEmail.toLowerCase())
      setIsLoading(false)
    }

    checkIsCurrentUser()
  }, [session, starEmail, isPending])

  return { isCurrentUser, isLoading }
}
