'use client'
import React from 'react'
import SignOutButton from './SignOutButton'
import { useIsCurrentUser } from '@/hooks/useIsCurrentUser'

interface ConditionalSignOutButtonProps {
    starEmail?: string | null
    className?: string
}

const ConditionalSignOutButton: React.FC<ConditionalSignOutButtonProps> = ({ starEmail, className }) => {
    const { isCurrentUser, isLoading } = useIsCurrentUser(starEmail)

    // Don't show button while loading or if not current user
    if (isLoading || !isCurrentUser) {
        return null
    }

    return <SignOutButton className={className} />
}

export default ConditionalSignOutButton
