'use server'
import { getAPIUrl } from '@/lib/utils'
import { Account } from '@/types/types'

export const getAccounts = async () => {
	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl)
		if (!response.ok) {
			throw new Error('Failed to fetch accounts')
		}
		const data: { accounts: Account[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw new Error('Failed to fetch accounts')
	}
}
