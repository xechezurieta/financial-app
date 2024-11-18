import { getAPIUrl } from '@/lib/utils'
import { Transaction } from '@/types/types'

export const getTransactions = async ({
	from,
	to,
	accountId,
	userId
}: {
	from: Date | undefined
	to: Date | undefined
	accountId: string
	userId: string
}) => {
	const apiUrl = getAPIUrl('/transactions')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from,
				to,
				accountId,
				userId
			})
		})
		if (!response.ok) {
			return null
		}
		const data: { transactions: Transaction[] } = await response.json()
		return data
	} catch (error) {
		return null
	}
}
