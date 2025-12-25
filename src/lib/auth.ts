import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins"
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb } from "@/server-side/db"; // your mongodb client

export const auth = betterAuth({
    database: mongodbAdapter(await getDb()),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        },
    },
    plugins: [
        username(),
    ]
});

