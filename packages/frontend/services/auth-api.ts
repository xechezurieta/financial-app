import { getAPIUrl } from '@/lib/utils'

export const login = async (email: string, password: string) => {
	const apiUrl = getAPIUrl('/login')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
		if (!response.ok) {
			return null
		}
		const data = await response.json()
		return data.user
	} catch (error) {
		console.error(error)
		return null
	}
}
