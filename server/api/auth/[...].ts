import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'

import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    providers: [
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: any, req: any) {
                if (!credentials) return null

                const res = await fetch(`${useRuntimeConfig().public.apiBase}/v1/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                })

                const accessToken = (await res.json()).accessToken

                // resqust user data
                const resUser = await fetch(`${useRuntimeConfig().public.apiBase}/v1/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const user = await resUser.json()

                if (res.ok && user) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GoogleProvider.default({
            clientId: useRuntimeConfig().public.googleClientId,
            clientSecret: useRuntimeConfig().googleClientSecret
        }),
        FacebookProvider.default({
            clientId: useRuntimeConfig().public.facebookAppId,
            clientSecret: useRuntimeConfig().facebookClientSecret
        }),
        GithubProvider.default({
            clientId: useRuntimeConfig().public.githubClientId,
            clientSecret: useRuntimeConfig().githubClientSecret
        })
    ],
    callbacks: {
        /* on before signin */
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        /* on redirect to another url */
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        /* on session retrival */
        async session({ session, user, token }) {
            return session
        },
        /* on JWT token creation or mutation */
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
        // jwt({ token, account, profile }) {
        //     if (account) {
        //         token.sessionToken = account.session_token
        //     }
        //     return token
        // },
        // async session({ session, token }) {
        //     // Token we injected into the JWT callback above.
        //     const myToken = token.sessionToken

        //     // Fetch data OR add previous data from the JWT callback.
        //     const additionalUserData = await $fetch(`/api/session/${myToken}`)

        //     // Return the modified session
        //     return {
        //         ...session,
        //         user: {
        //             name: additionalUserData.name,
        //             avatar: additionalUserData.avatar,
        //             role: additionalUserData.role
        //         }
        //     }
        // },
    }
})