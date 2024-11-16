import NextAuth, { User, Session } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUser } from './actions'
import { authConfig } from './auth.config'

interface ExtendedSession extends Session {
	user: User
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {},
			async authorize({ email, password }: any) {
				const user = await getUser(email, password)
				console.log('USER: ', { user })
				return user
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}

			return token
		},
		async session({
			session,
			token
		}: {
			session: ExtendedSession
			token: any
		}) {
			if (session.user) {
				session.user.id = token.id as string
			}

			return session
		}
	}
})
