import { NextAuthConfig } from 'next-auth'

const protectedRoutes = ['/', '/dashboard', '/food', '/my-profile']

export const authConfig = {
	pages: {
		signIn: '/login',
		newUser: '/'
	},
	providers: [
		// added later in auth.ts since it requires bcrypt which is only compatible with Node.js
		// while this file is also used in non-Node.js environments
	],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			let isLoggedIn = !!auth?.user
			let isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
			let isOnRegister = nextUrl.pathname.startsWith('/register')
			let isOnLogin = nextUrl.pathname.startsWith('/login')

			if (isLoggedIn && (isOnLogin || isOnRegister)) {
				return Response.redirect(new URL('/dashboard', nextUrl))
			}

			if (isOnRegister || isOnLogin) {
				return true // Always allow access to register and login pages
			}

			if (isOnProtectedRoute) {
				if (isLoggedIn) return true
				return false // Redirect unauthenticated users to login page
			}

			if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl))
			}

			return true
		}
	}
} satisfies NextAuthConfig
