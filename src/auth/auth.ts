import { PrismaClient } from "@prisma/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { openAPI, organization } from "better-auth/plugins"

const prisma = new PrismaClient()

export const auth = betterAuth({
    url: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(
        prisma, {
        provider: "postgresql"
    }),
    plugins: [openAPI(), organization()
    ],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
})
