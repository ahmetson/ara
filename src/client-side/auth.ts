import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        usernameClient()
    ]
})

// Export methods from authClient for convenience
export const { signIn, signUp, signOut, useSession } = authClient
