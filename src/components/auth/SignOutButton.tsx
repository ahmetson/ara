'use client'
import React, { useState } from 'react'
import Button from '@/components/custom-ui/Button'
import { authClient } from '@/client-side/auth'

interface SignOutButtonProps {
    className?: string
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ className }) => {
    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true)
            const result = await authClient.signOut()
            if (result.error) {
                console.error('Sign-out error:', result.error)
                alert('Failed to sign out. Please try again.')
            } else {
                // Redirect to home page after sign out
                window.location.href = '/'
            }
        } catch (error) {
            console.error('Sign-out error:', error)
            alert('An error occurred during sign-out. Please try again.')
        } finally {
            setIsSigningOut(false)
        }
    }

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={className}
        >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </Button>
    )
}

export default SignOutButton
